import { randomInt } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { findSector } from "../../pagecraft/tools/sector.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const MENUS = JSON.parse(readFileSync(join(HERE, "menus.json"), "utf8"));
const FINGERPRINTS = join(HERE, "..", "references", "fingerprints.md");
const AXES = ["arc", "actor", "destination", "camera", "time", "set", "signature"];
const MENU_KEY = {
    arc: "arcs",
    actor: "actors",
    destination: "destinations",
    camera: "cameras",
    time: "times",
    set: "sets",
    signature: "signatures",
};
const CARDS = 3;
const MIN_DIFFERENCES = 3;
const MIN_FROM_LAST = 4;
const ATTEMPTS = 20000;

const options = (() => {
    const found = { kind: "physical", sector: null, seed: null, json: false, repeat: false, lock: {}, avoid: {} };
    const args = process.argv.slice(2);
    for (let i = 0; i < args.length; i += 1) {
        const arg = args[i];
        if (arg === "--json") found.json = true;
        else if (arg === "--allow-repeat") found.repeat = true;
        else if (arg === "--kind") found.kind = args[(i += 1)];
        else if (arg === "--sector") found.sector = args[(i += 1)];
        else if (arg === "--seed") found.seed = Number(args[(i += 1)]);
        else if (arg === "--lock") {
            const [axis, value] = args[(i += 1)].split("=");
            found.lock[axis] = value;
        } else if (arg === "--avoid") {
            const [axis, value] = args[(i += 1)].split("=");
            found.avoid[axis] = [...(found.avoid[axis] ?? []), value];
        }
    }
    return found;
})();

const mulberry = (seed) => () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const random = mulberry(options.seed ?? randomInt(2 ** 31));

const readRows = () => {
    if (!existsSync(FINGERPRINTS)) return [];
    const lines = readFileSync(FINGERPRINTS, "utf8")
        .split("\n")
        .filter((line) => line.trim().startsWith("|"));
    const [header, , ...body] = lines;
    if (!header) return [];
    const names = header.split("|").slice(1, -1).map((cell) => cell.trim().toLowerCase());
    return body.map((line) => {
        const cells = line.split("|").slice(1, -1).map((cell) => cell.trim().toLowerCase());
        return Object.fromEntries(names.map((name, index) => [name, cells[index] ?? ""]));
    });
};

const KINDS = new Set(Object.values(MENUS).flatMap((entries) => entries.flatMap((entry) => entry.fits ?? [])));
if (!KINDS.has(options.kind)) {
    console.error(`--kind must be one of: ${[...KINDS].join(", ")}`);
    process.exit(1);
}

const rows = readRows();
const struck = (axis) => new Set(rows.map((row) => row[axis]).filter(Boolean));

const sectorSets = options.sector ? new Set(findSector(options.sector).sets) : null;

const pool = (axis) => {
    const fitting = MENUS[MENU_KEY[axis]].filter(
        (entry) =>
            (!entry.fits || entry.fits.includes(options.kind)) &&
            (axis !== "set" || !sectorSets || sectorSets.has(entry.id)),
    );
    if (options.lock[axis]) return fitting.filter((entry) => entry.id === options.lock[axis]);
    if (options.repeat) return fitting;
    const used = new Set([...struck(axis), ...(options.avoid[axis] ?? [])]);
    const fresh = fitting.filter((entry) => !used.has(entry.id));
    return fresh.length >= (axis === "set" ? CARDS : 2) ? fresh : fitting;
};

const pools = Object.fromEntries(AXES.map((axis) => [axis, pool(axis)]));
const free = AXES.filter((axis) => pools[axis].length > 1);
const required = Math.min(MIN_DIFFERENCES, free.length);

const pick = (axis) => pools[axis][Math.floor(random() * pools[axis].length)];

const draw = () => Object.fromEntries(AXES.map((axis) => [axis, pick(axis)]));

const differences = (a, b) =>
    AXES.filter((axis) => a[axis].id !== b[axis].id).length;

const last = rows.at(-1);
const farFromLast = (card) =>
    !last ||
    options.repeat ||
    AXES.filter((axis) => card[axis].id !== last[axis]).length >= Math.min(MIN_FROM_LAST, free.length);

const lensFits = (card) => !card.set.cameras || card.set.cameras.includes(card.camera.id);

const search = () => {
    for (let attempt = 0; attempt < ATTEMPTS; attempt += 1) {
        const cards = Array.from({ length: CARDS }, draw);
        const apart = cards.every((card, index) =>
            cards
                .slice(index + 1)
                .every(
                    (other) =>
                        differences(card, other) >= required &&
                        card.set.id !== other.set.id &&
                        card.arc.id !== other.arc.id &&
                        card.signature.id !== other.signature.id,
                ),
        );
        if (apart && cards.every(farFromLast) && cards.every(lensFits)) return cards;
    }
    return null;
};

const cards = search();

if (!cards) {
    console.error("No three concepts satisfy the divergence rule. Loosen a lock or use --allow-repeat.");
    process.exit(1);
}

if (options.json) {
    console.log(JSON.stringify(cards.map((card) => Object.fromEntries(AXES.map((axis) => [axis, card[axis].id]))), null, 2));
} else {
    cards.forEach((card, index) => {
        console.log(`Concept ${index + 1}`);
        AXES.forEach((axis) => console.log(`  ${axis.padEnd(12)} ${card[axis].id}`));
        console.log(`  logline      ${card.arc.logline}`);
        console.log("");
    });
    console.log(`kind=${options.kind} excluded-rows=${rows.length} min-differences=${required}`);
}

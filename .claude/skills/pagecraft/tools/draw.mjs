import { randomInt } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { findSector } from "./sector.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const MENUS = JSON.parse(readFileSync(join(HERE, "menus.json"), "utf8"));
const FINGERPRINTS = join(HERE, "..", "references", "fingerprints.md");
const AXES = Object.keys(MENUS.axes);
const CARDS = 3;
const MIN_BETWEEN_CARDS = 3;
const MIN_FROM_ROWS = 4;
const ATTEMPTS = 20000;

const options = (() => {
    const found = { sector: null, world: null, seed: null, json: false, repeat: false, lock: {}, avoid: {} };
    const args = process.argv.slice(2);
    for (let i = 0; i < args.length; i += 1) {
        const arg = args[i];
        const pair = () => args[(i += 1)].split("=");
        if (arg === "--json") found.json = true;
        else if (arg === "--allow-repeat") found.repeat = true;
        else if (arg === "--sector") found.sector = args[(i += 1)];
        else if (arg === "--world") found.world = args[(i += 1)];
        else if (arg === "--seed") found.seed = Number(args[(i += 1)]);
        else if (arg === "--lock") {
            const [axis, value] = pair();
            found.lock[axis] = value;
        } else if (arg === "--avoid") {
            const [axis, value] = pair();
            found.avoid[axis] = [...(found.avoid[axis] ?? []), value];
        }
    }
    return found;
})();

const sector = (() => {
    if (!options.sector) return null;
    try {
        return findSector(options.sector);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
})();
const world = options.world ?? sector?.world;
if (!world || !MENUS.worlds[world]) {
    console.error(`Pass --sector <name> (from docs/economy-coverage-map.md) or --world <${Object.keys(MENUS.worlds).join("|")}>`);
    process.exit(1);
}

const mulberry = (seed) => () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const seed = options.seed ?? randomInt(2 ** 31);
const random = mulberry(seed);
const pickFrom = (list) => list[Math.floor(random() * list.length)];

const readRows = () => {
    if (!existsSync(FINGERPRINTS)) return [];
    const lines = readFileSync(FINGERPRINTS, "utf8").split("\n").filter((line) => line.trim().startsWith("|"));
    const [header, , ...body] = lines;
    if (!header) return [];
    const names = header.split("|").slice(1, -1).map((cell) => cell.trim().toLowerCase());
    return body.map((line) => {
        const cells = line.split("|").slice(1, -1).map((cell) => cell.trim().toLowerCase());
        return Object.fromEntries(names.map((name, index) => [name, cells[index] ?? ""]));
    });
};

const rows = readRows();
const struck = (axis) => new Set([...(options.repeat ? [] : rows.map((row) => row[axis])), ...(options.avoid[axis] ?? [])]);
const fresh = (axis, allowed) => {
    const left = allowed.filter((value) => !struck(axis).has(value));
    return left.length >= 2 || (left.length === 1 && allowed.length === 1) ? left : allowed;
};

const registers = fresh("register", options.lock.register ? [options.lock.register] : MENUS.worlds[world]);

const draw = () => {
    const register = pickFrom(registers);
    const core = MENUS.registers[register];
    const card = { register };
    for (const axis of AXES) {
        const allowed = options.lock[axis] ? [options.lock[axis]] : (core[axis] ?? MENUS.axes[axis]);
        card[axis] = pickFrom(core[axis] ? allowed : fresh(axis, allowed));
    }
    return card;
};

const differences = (a, b) => AXES.filter((axis) => a[axis] !== b[axis]).length;
const farFromRows = (card) => options.repeat || rows.every((row) => differences(card, row) >= MIN_FROM_ROWS);

const search = () => {
    for (let attempt = 0; attempt < ATTEMPTS; attempt += 1) {
        const cards = Array.from({ length: CARDS }, draw);
        const apart = cards.every((card, index) =>
            cards.slice(index + 1).every(
                (other) =>
                    differences(card, other) >= MIN_BETWEEN_CARDS &&
                    (registers.length < CARDS || card.register !== other.register) &&
                    card.signature !== other.signature,
            ),
        );
        if (apart && cards.every(farFromRows)) return cards;
    }
    return null;
};

const cards = search();
if (!cards) {
    console.error("No three directions satisfy the divergence rule. Loosen a lock or use --allow-repeat.");
    process.exit(1);
}

const header = { sector: sector?.name ?? null, archetype: sector?.archetype ?? null, world, sets: sector?.sets ?? null, seed };
if (options.json) {
    console.log(JSON.stringify({ ...header, cards }, null, 2));
} else {
    console.log(`Sector     ${header.sector ?? "(none)"}${header.archetype ? `: ${header.archetype}` : ""}`);
    console.log(`World      ${world} (worlds/${world}.md supplies every instance)`);
    if (header.sets) console.log(`Stage sets ${header.sets.join(", ")}`);
    console.log("");
    cards.forEach((card, index) => {
        console.log(`Direction ${index + 1}`);
        ["register", ...AXES].forEach((axis) => console.log(`  ${axis.padEnd(10)} ${card[axis]}`));
        console.log("");
    });
    console.log(`seed=${seed} excluded-rows=${rows.length} min-from-rows=${MIN_FROM_ROWS}`);
}

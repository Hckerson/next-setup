import { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const API = "https://api.polyhaven.com";
const TYPES = { hdris: "hdris", textures: "textures", models: "models" };
const TEXTURE_MAPS = ["Diffuse", "Rough", "nor_gl", "AO", "Displacement", "arm"];
const SOURCE = "Poly Haven";
const LICENCE = "CC0";
const MANIFEST = "manifest.json";

const args = process.argv.slice(2);
const [command, subject] = args;
const value = (name, fallback) => {
    const at = args.indexOf(`--${name}`);
    return at >= 0 ? args[at + 1] : fallback;
};

const type = TYPES[value("type", "hdris")];
const resolution = value("res", "2k");
const format = value("format", type === "hdris" ? "hdr" : "jpg");
const out = resolve(value("out", "public/stage/assets"));
const limit = Number(value("limit", "15"));
const maps = (value("maps", "") || TEXTURE_MAPS.join(",")).split(",");

const json = async (path) => {
    const response = await fetch(`${API}${path}`);
    if (!response.ok) throw new Error(`${path} returned ${response.status}`);
    return response.json();
};

const download = async (url, target) => {
    const response = await fetch(url);
    if (!response.ok || !response.body) throw new Error(`${url} returned ${response.status}`);
    await pipeline(Readable.fromWeb(response.body), createWriteStream(target));
};

const search = async () => {
    if (!type) throw new Error("--type must be hdris, textures or models");
    const category = subject ? `&c=${encodeURIComponent(subject)}` : "";
    const assets = await json(`/assets?t=${type}${category}`);
    Object.entries(assets)
        .slice(0, limit)
        .forEach(([id, asset]) =>
            console.log(`${id.padEnd(32)} ${asset.name} | ${asset.categories.join(", ")}`),
        );
};

const pickFiles = (files) => {
    if (type === "hdris") {
        const file = files.hdri?.[resolution]?.[format];
        return file ? [{ map: "hdri", ...file }] : [];
    }
    return maps
        .map((map) => ({ map, file: files[map]?.[resolution]?.[format] }))
        .filter(({ file }) => file)
        .map(({ map, file }) => ({ map, ...file }));
};

const record = (entry) => {
    const path = join(out, MANIFEST);
    const manifest = existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : { assets: [] };
    manifest.assets = manifest.assets.filter((asset) => asset.id !== entry.id).concat(entry);
    writeFileSync(path, JSON.stringify(manifest, null, 2));
};

const get = async () => {
    if (!subject) throw new Error("Name the asset id: get <id> --type hdris|textures");
    const [files, info] = await Promise.all([json(`/files/${subject}`), json(`/info/${subject}`)]);
    const chosen = pickFiles(files);
    if (chosen.length === 0) throw new Error(`No ${format} files at ${resolution} for ${subject}`);
    const folder = join(out, subject);
    mkdirSync(folder, { recursive: true });
    const written = [];
    for (const file of chosen) {
        const target = join(folder, basename(new URL(file.url).pathname));
        await download(file.url, target);
        written.push({ map: file.map, file: target, bytes: file.size });
        console.log(`${file.map.padEnd(14)} ${(file.size / 1048576).toFixed(1)} MB  ${target}`);
    }
    record({
        id: subject,
        name: info.name,
        type,
        source: SOURCE,
        licence: LICENCE,
        authors: Object.keys(info.authors ?? {}),
        page: `https://polyhaven.com/a/${subject}`,
        dimensionsMm: info.dimensions ?? null,
        resolution,
        format,
        files: written,
    });
};

const run = { search, get }[command];

if (!run) {
    console.error("Usage: assets.mjs search [category] --type hdris|textures|models | get <id> --type hdris|textures [--res 2k] [--format hdr|jpg] [--maps Diffuse,Rough] [--out dir]");
    process.exit(1);
}

await run();

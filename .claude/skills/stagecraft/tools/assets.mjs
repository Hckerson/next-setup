import { execFileSync } from "node:child_process";
import { createWriteStream, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, join, relative, resolve } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const API = "https://api.polyhaven.com";
const TYPES = { hdris: "hdris", textures: "textures", models: "models" };
const TEXTURE_MAPS = ["Diffuse", "Rough", "nor_gl", "AO", "Displacement", "arm"];
const SOURCE = "Poly Haven";
const LICENCE = "CC0";
const MANIFEST = "manifest.json";
const AMBIENT = "https://ambientcg.com";
const AMBIENT_MAPS = ["Color", "Roughness", "NormalGL"];

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

const generated = () => {
    const spec = value("spec", "");
    const tool = value("tool", "");
    const files = value("files", "").split(",").filter(Boolean);
    if (!subject || !tool || files.length === 0) throw new Error("generated <id> --tool <script> --files a,b --spec <spec.json> --out <folder>");
    record({
        id: subject,
        name: subject,
        type: "generated",
        source: tool,
        licence: "Owned: generated for this build from the recorded inputs",
        authors: [],
        spec: spec ? relative(out, resolve(spec)) : null,
        files: files.map((file) => ({ file, bytes: statSync(join(out, file)).size })),
    });
    console.log(`recorded ${subject}: ${files.length} files`);
};

const ambientcg = async () => {
    if (!subject) throw new Error("Name the asset id: ambientcg <id> [--res 2K] [--maps Color,Roughness,NormalGL]");
    const size = value("res", "2K");
    const wanted = (value("maps", "") || AMBIENT_MAPS.join(",")).split(",");
    const folder = join(out, value("name", subject));
    mkdirSync(folder, { recursive: true });
    const archive = join(folder, `${subject}.zip`);
    await download(`${AMBIENT}/get?file=${subject}_${size}-JPG.zip`, archive);
    const files = wanted.map((map) => `${subject}_${size}-JPG_${map}.jpg`);
    execFileSync("unzip", ["-o", "-j", archive, ...files, "-d", folder]);
    rmSync(archive);
    const written = wanted.map((map, index) => {
        const file = join(folder, files[index]);
        console.log(`${map.padEnd(14)} ${(statSync(file).size / 1048576).toFixed(1)} MB  ${file}`);
        return { map, file: relative(out, file), bytes: statSync(file).size };
    });
    record({
        id: value("name", subject),
        name: subject,
        type: "textures",
        source: "ambientCG",
        licence: LICENCE,
        authors: ["Lennart Demes"],
        page: `${AMBIENT}/view?id=${subject}`,
        resolution: size,
        format: "jpg",
        files: written,
    });
};

const run = { search, get, generated, ambientcg }[command];

if (!run) {
    console.error("Usage: assets.mjs search [category] --type hdris|textures|models | get <id> --type hdris|textures [--res 2k] [--format hdr|jpg] [--maps Diffuse,Rough] [--out dir] | ambientcg <id> [--res 2K] [--maps Color,Roughness,NormalGL] [--name id] [--out dir] | generated <id> --tool <script> --files a,b [--spec spec.json] [--out dir]");
    process.exit(1);
}

await run();

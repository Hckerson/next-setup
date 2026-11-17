import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { crc32, deflateSync } from "node:zlib";

const args = process.argv.slice(2);
const value = (name, fallback) => {
    const at = args.indexOf(`--${name}`);
    return at >= 0 ? args[at + 1] : fallback;
};

const [widthMm, heightMm] = value("size", "420x297").split("x").map(Number);
const pixels = Number(value("px", "4096"));
const grid = Number(value("grid", "5"));
const major = Number(value("major", "5"));
const lineMm = Number(value("line", "0.12"));
const majorMm = Number(value("major-line", "0.2"));
const strength = Number(value("strength", "0.35"));
const majorStrength = Number(value("major-strength", "0.55"));
const grain = Number(value("grain", "0.025"));
const seed = Number(value("seed", "1"));
const fibres = Number(value("fibres", "0"));
const fibreMm = Number(value("fibre-length", "1.2"));
const fibreStrength = Number(value("fibre-strength", "0.12"));
const out = resolve(value("out", "sheet.png"));

const hex = (colour) => [1, 3, 5].map((at) => parseInt(colour.slice(at, at + 2), 16));
const paper = hex(value("paper", "#e3ead6"));
const ink = hex(value("ink", "#9fbf93"));

const width = pixels;
const height = Math.round((pixels * heightMm) / widthMm);
const mmPerPixel = widthMm / width;

const hash = (x, y) => {
    let h = (x * 374761393 + y * 668265263 + seed * 2147483647) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

const smooth = (t) => t * t * (3 - 2 * t);
const CELL = Number(value("mottle", "96"));
const mottle = (x, y) => {
    const gx = Math.floor(x / CELL);
    const gy = Math.floor(y / CELL);
    const fx = smooth(x / CELL - gx);
    const fy = smooth(y / CELL - gy);
    const top = hash(gx, gy) + (hash(gx + 1, gy) - hash(gx, gy)) * fx;
    const bottom = hash(gx, gy + 1) + (hash(gx + 1, gy + 1) - hash(gx, gy + 1)) * fx;
    return top + (bottom - top) * fy;
};

const coverage = (positionMm, spacing, halfWidth) => {
    const offset = Math.abs(positionMm - Math.round(positionMm / spacing) * spacing);
    return Math.min(1, Math.max(0, (halfWidth - offset) / mmPerPixel + 0.5));
};

const lineAt = (positionMm) => {
    if (grid <= 0) return 0;
    const majorCover = coverage(positionMm, grid * major, majorMm / 2) * majorStrength;
    const minorCover = coverage(positionMm, grid, lineMm / 2) * strength;
    return Math.max(majorCover, minorCover);
};

const fibreField = new Float32Array(fibres > 0 ? width * height : 0);
for (let fibre = 0; fibre < fibres; fibre += 1) {
    const x0 = hash(fibre, 1) * width;
    const y0 = hash(fibre, 2) * height;
    const angle = hash(fibre, 3) * Math.PI;
    const length = (0.4 + hash(fibre, 4)) * (fibreMm / mmPerPixel);
    const tone = (hash(fibre, 5) < 0.75 ? -1 : 1) * fibreStrength * (0.4 + 0.6 * hash(fibre, 6));
    for (let step = 0; step < length; step += 1) {
        const x = Math.round(x0 + Math.cos(angle) * step);
        const y = Math.round(y0 + Math.sin(angle) * step);
        if (x >= 0 && y >= 0 && x < width && y < height) fibreField[y * width + x] = tone;
    }
}

const rows = Buffer.alloc((width * 3 + 1) * height);
for (let y = 0; y < height; y += 1) {
    const row = y * (width * 3 + 1);
    rows[row] = 0;
    const lineY = lineAt((y + 0.5) * mmPerPixel);
    for (let x = 0; x < width; x += 1) {
        const lineX = lineAt((x + 0.5) * mmPerPixel);
        const amount = Math.max(lineX, lineY);
        const tone = 1 + (mottle(x, y) - 0.5) * grain * 2 + (hash(x, y) - 0.5) * grain + (fibreField[y * width + x] ?? 0);
        for (let channel = 0; channel < 3; channel += 1) {
            const base = (paper[channel] ?? 0) * tone;
            rows[row + 1 + x * 3 + channel] = Math.max(0, Math.min(255, Math.round(base + ((ink[channel] ?? 0) - base) * amount)));
        }
    }
}

const chunk = (type, data) => {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length);
    const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
    const check = Buffer.alloc(4);
    check.writeUInt32BE(crc32(body));
    return Buffer.concat([length, body, check]);
};

const header = Buffer.alloc(13);
header.writeUInt32BE(width, 0);
header.writeUInt32BE(height, 4);
header.writeUInt8(8, 8);
header.writeUInt8(2, 9);

mkdirSync(dirname(out), { recursive: true });
writeFileSync(
    out,
    Buffer.concat([
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
        chunk("IHDR", header),
        chunk("IDAT", deflateSync(rows, { level: 9 })),
        chunk("IEND", Buffer.alloc(0)),
    ]),
);
console.log(JSON.stringify({ out, width, height, mmPerPixel: Number(mmPerPixel.toFixed(4)), sizeMm: [widthMm, heightMm] }));

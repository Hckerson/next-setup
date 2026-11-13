import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const CHROME =
    process.env.CHROME_PATH ??
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const FINGERPRINTS = join(HERE, "..", "references", "fingerprints.md");
const SAMPLE_WIDTH = 160;
const BORDER = 8;
const BRIGHT = 0.85;
const ACCENT_SHARE = 0.01;
const CHROMA_FLOOR = 0.04;
const WEIGHTS = { ground: 2, hue: 1, accent: 1, range: 1 };

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const value = (name, fallback) => {
    const at = args.indexOf(`--${name}`);
    return at >= 0 ? args[at + 1] : fallback;
};

const url = value("url", "http://localhost:3000/");
const tag = value("tag", "shot");
const out = resolve(value("out", "/tmp/stagecraft"));
const [width, height] = value("size", "1440x900").split("x").map(Number);
const frames = value("frames", "0,0.2,0.4,0.6,0.8,1").split(",").map(Number);
const settle = Number(value("settle", "2500"));
const threshold = Number(value("threshold", "0.25"));
const track = value("track", "");
const reduce = flag("reduce");
const compare = flag("compare");
const PORT = Number(value("port", "9333"));

mkdirSync(out, { recursive: true });

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

const chrome = spawn(
    CHROME,
    [
        "--headless=new",
        `--remote-debugging-port=${PORT}`,
        "--enable-unsafe-webgpu",
        "--use-angle=metal",
        "--ignore-gpu-blocklist",
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
        "--disable-background-timer-throttling",
        `--user-data-dir=${join(out, `profile-${tag}`)}`,
        `--window-size=${width},${height}`,
        "about:blank",
    ],
    { stdio: "ignore" },
);

const connect = async () => {
    for (let attempt = 0; attempt < 60; attempt += 1) {
        try {
            const targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
            const page = targets.find((target) => target.type === "page");
            if (page) return page.webSocketDebuggerUrl;
        } catch {
            await sleep(250);
        }
    }
    throw new Error("Chrome did not start");
};

const socket = new WebSocket(await connect());
await new Promise((open) => (socket.onopen = open));

let counter = 0;
const waiting = new Map();
const logs = [];
socket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    if (data.id && waiting.has(data.id)) {
        waiting.get(data.id)(data.result ?? data.error);
        waiting.delete(data.id);
    }
    if (data.method === "Runtime.consoleAPICalled")
        logs.push(`${data.params.type}: ${data.params.args.map((arg) => arg.value ?? arg.description).join(" ")}`);
    if (data.method === "Runtime.exceptionThrown")
        logs.push(`exception: ${data.params.exceptionDetails.exception?.description ?? data.params.exceptionDetails.text}`);
};

const send = (method, params = {}) =>
    new Promise((done) => {
        counter += 1;
        waiting.set(counter, done);
        socket.send(JSON.stringify({ id: counter, method, params }));
    });

const evaluate = async (expression, awaitPromise = false) =>
    (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise })).result?.value;

const MEASURE = `(async (dataUrl, sampleWidth, border, bright, accentShare, chromaFloor) => {
    const image = new Image();
    image.src = dataUrl;
    await image.decode();
    const scale = sampleWidth / image.width;
    const w = sampleWidth;
    const h = Math.max(1, Math.round(image.height * scale));
    const canvas = new OffscreenCanvas(w, h);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, w, h);
    const { data } = context.getImageData(0, 0, w, h);
    const lin = (c) => { const s = c / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
    const stats = (filter) => {
        let count = 0, lum = 0, chromaSum = 0, x = 0, y = 0;
        for (let row = 0; row < h; row += 1) for (let col = 0; col < w; col += 1) {
            if (!filter(col, row)) continue;
            const i = (row * w + col) * 4;
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
            const max = Math.max(r, g, b) / 255, min = Math.min(r, g, b) / 255;
            const chroma = max - min;
            let hue = 0;
            if (chroma > 0) {
                if (max === r / 255) hue = ((g - b) / 255 / chroma) % 6;
                else if (max === g / 255) hue = (b - r) / 255 / chroma + 2;
                else hue = (r - g) / 255 / chroma + 4;
                hue *= 60; if (hue < 0) hue += 360;
            }
            count += 1; lum += L; chromaSum += chroma;
            x += Math.cos(hue * Math.PI / 180) * chroma; y += Math.sin(hue * Math.PI / 180) * chroma;
        }
        const hue = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
        return { count, lum: lum / Math.max(count, 1), chroma: chromaSum / Math.max(count, 1), hue };
    };
    const edge = (col, row) => col < border || row < border || col >= w - border || row >= h - border;
    const ground = stats(edge);
    const whole = stats(() => true);
    const pixels = [];
    for (let i = 0; i < data.length; i += 4) {
        const max = Math.max(data[i], data[i + 1], data[i + 2]) / 255, min = Math.min(data[i], data[i + 1], data[i + 2]) / 255;
        pixels.push({ i, chroma: max - min, lum: 0.2126 * lin(data[i]) + 0.7152 * lin(data[i + 1]) + 0.0722 * lin(data[i + 2]) });
    }
    const brightShare = pixels.filter((p) => p.lum > bright).length / pixels.length;
    const vivid = pixels.filter((p) => p.chroma > chromaFloor).sort((a, b) => b.chroma - a.chroma).slice(0, Math.max(1, Math.round(pixels.length * accentShare)));
    let ax = 0, ay = 0;
    vivid.forEach((p) => {
        const r = data[p.i], g = data[p.i + 1], b = data[p.i + 2];
        const max = Math.max(r, g, b) / 255, c = p.chroma;
        let hue = 0;
        if (c > 0) { if (max === r / 255) hue = ((g - b) / 255 / c) % 6; else if (max === g / 255) hue = (b - r) / 255 / c + 2; else hue = (r - g) / 255 / c + 4; hue *= 60; if (hue < 0) hue += 360; }
        ax += Math.cos(hue * Math.PI / 180); ay += Math.sin(hue * Math.PI / 180);
    });
    const accentHue = vivid.length ? (Math.atan2(ay, ax) * 180 / Math.PI + 360) % 360 : null;
    return { groundL: ground.lum, groundChroma: ground.chroma, groundHue: ground.hue, meanL: whole.lum, meanChroma: whole.chroma, brightShare, accentHue };
})`;

await send("Runtime.enable");
await send("Page.enable");
if (reduce)
    await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 500 });
await send("Page.navigate", { url });
await sleep(settle + 3000);

const range = await evaluate(
    track
        ? `(() => { const t = document.querySelector(${JSON.stringify(track)}); return t ? t.offsetHeight - innerHeight : document.documentElement.scrollHeight - innerHeight; })()`
        : `document.documentElement.scrollHeight - innerHeight`,
);

const circular = (angles) => {
    const x = angles.reduce((sum, angle) => sum + Math.cos((angle * Math.PI) / 180), 0);
    const y = angles.reduce((sum, angle) => sum + Math.sin((angle * Math.PI) / 180), 0);
    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
};

const results = [];
for (const fraction of frames) {
    const position = fraction <= 1 ? Math.round(range * fraction) : fraction;
    await evaluate(`window.scrollTo(0, ${position})`);
    await sleep(settle);
    const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 72 });
    const file = join(out, `${tag}-${String(fraction).replace(".", "_")}.jpg`);
    writeFileSync(file, Buffer.from(shot.data, "base64"));
    const metrics = await evaluate(
        `${MEASURE}(${JSON.stringify(`data:image/jpeg;base64,${shot.data}`)}, ${SAMPLE_WIDTH}, ${BORDER}, ${BRIGHT}, ${ACCENT_SHARE}, ${CHROMA_FLOOR})`,
        true,
    );
    const probe = await evaluate(`window.__stage ? window.__stage.snapshot() : null`);
    results.push({ fraction, file, ...metrics, probe });
}

const grounds = results.map((frame) => frame.groundL);
const colourful = results.filter((frame) => frame.groundChroma > CHROMA_FLOOR);
const accents = results.map((frame) => frame.accentHue).filter((hue) => hue !== null);
const fingerprint = {
    groundL: Number((grounds.reduce((a, b) => a + b, 0) / grounds.length).toFixed(3)),
    groundRange: Number((Math.max(...grounds) - Math.min(...grounds)).toFixed(3)),
    groundHue: colourful.length ? Math.round(circular(colourful.map((frame) => frame.groundHue))) : null,
    accentHue: accents.length ? Math.round(circular(accents)) : null,
    brightShare: Number((results.reduce((sum, frame) => sum + frame.brightShare, 0) / results.length).toFixed(3)),
};

const hueGap = (a, b) => {
    if (a === null || b === null) return 0;
    const gap = Math.abs(a - b) % 360;
    return Math.min(gap, 360 - gap) / 180;
};

const readRows = () => {
    if (!existsSync(FINGERPRINTS)) return [];
    const lines = readFileSync(FINGERPRINTS, "utf8").split("\n").filter((line) => line.trim().startsWith("|"));
    const [header, , ...body] = lines;
    if (!header) return [];
    const names = header.split("|").slice(1, -1).map((cell) => cell.trim().toLowerCase());
    return body.map((line) => {
        const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
        return Object.fromEntries(names.map((name, index) => [name, cells[index] ?? ""]));
    });
};

const distance = (row) => {
    const total = WEIGHTS.ground + WEIGHTS.hue + WEIGHTS.accent + WEIGHTS.range;
    const rowHue = row["ground hue"] === "" ? null : Number(row["ground hue"]);
    const rowAccent = row["accent hue"] === "" ? null : Number(row["accent hue"]);
    return (
        (Math.abs(fingerprint.groundL - Number(row["ground l"])) * WEIGHTS.ground +
            hueGap(fingerprint.groundHue, rowHue) * WEIGHTS.hue +
            hueGap(fingerprint.accentHue, rowAccent) * WEIGHTS.accent +
            Math.abs(fingerprint.groundRange - Number(row["ground range"] ?? 0)) * WEIGHTS.range) /
        total
    );
};

const near = compare
    ? readRows()
          .filter((row) => row["ground l"] !== "")
          .map((row) => ({ build: row.build, distance: Number(distance(row).toFixed(3)) }))
          .filter((row) => row.distance < threshold)
    : [];

const report = { url, tag, size: `${width}x${height}`, range, fingerprint, frames: results, tooClose: near, console: logs.slice(0, 20) };
writeFileSync(join(out, `${tag}-report.json`), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ fingerprint, tooClose: near, report: join(out, `${tag}-report.json`) }, null, 2));

socket.close();
chrome.kill();
process.exit(near.length > 0 ? 1 : 0);

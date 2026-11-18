import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { measureFrame } from "./measure-frame.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const CHROME =
    process.env.CHROME_PATH ??
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SAMPLE_WIDTH = 160;
const REGION_WIDTH = 480;
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
const out = resolve(value("out", join(homedir(), ".cache", "stagecraft", "captures")));
const [width, height] = value("size", "1440x900").split("x").map(Number);
const frames = value("frames", "0,0.2,0.4,0.6,0.8,1").split(",").map(Number);
const settle = Number(value("settle", "2500"));
const threshold = Number(value("threshold", "0.25"));
const track = value("track", "");
const reduce = flag("reduce");
const compare = flag("compare");
const styles = flag("styles");
const FINGERPRINTS = resolve(value("fingerprints", join(HERE, "..", "references", "fingerprints.md")));
const PORT = Number(value("port", "9333"));
const clicks = value("click", "").split("|").filter(Boolean);
const wheelTotal = Number(value("wheel", "0"));
const WHEEL_STEP = 100;
const WHEEL_PAUSE = 24;
const MIN_RANGE = 50;
const AUTO_WHEEL = 8000;
const copySelector = value("copy", "[data-copy]");
const sequence = Number(value("sequence", "0"));
const hide = value("hide", "nextjs-portal");
const BLANK_RANGE = 0.02;
const BLANK_RETRIES = 4;
const QUIET_MS = 1000;
const QUIET_LIMIT_MS = Number(value("quiet-limit", "60000"));
const POLL_MS = 100;

mkdirSync(out, { recursive: true });
const profile = join(out, `.profile-${tag}-${process.pid}`);
const WATCHDOG_MS = Number(value("timeout", "300000"));

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
        `--user-data-dir=${profile}`,
        `--window-size=${width},${height}`,
        "about:blank",
    ],
    { stdio: "ignore" },
);

const finish = (code) => {
    chrome.kill();
    setTimeout(() => {
        rmSync(profile, { recursive: true, force: true });
        process.exit(code);
    }, 500);
};

const watchdog = setTimeout(() => {
    console.error(`shoot.mjs gave up after ${WATCHDOG_MS} ms`);
    finish(2);
}, WATCHDOG_MS);

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
const inFlight = new Set();
let lastActivity = Date.now();
socket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    if (data.method === "Network.requestWillBeSent") {
        inFlight.add(data.params.requestId);
        lastActivity = Date.now();
    }
    if (data.method === "Network.loadingFinished" || data.method === "Network.loadingFailed") {
        inFlight.delete(data.params.requestId);
        lastActivity = Date.now();
    }
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

const MEASURE = `(${measureFrame.toString()})`;

const READ_COPY = `(() => {
    const linear = (value) => { const unit = value / 255; return unit <= 0.04045 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4; };
    return [...document.querySelectorAll(${JSON.stringify(copySelector)})]
        .filter((element) => { const style = getComputedStyle(element); return style.visibility !== "hidden" && Number(style.opacity) > 0.5 && element.getClientRects().length; })
        .map((element) => {
            const box = element.getBoundingClientRect();
            const [red, green, blue] = getComputedStyle(element).color.match(/[\\d.]+/g).map(Number);
            return {
                text: element.textContent.trim().slice(0, 40),
                box: [box.left / innerWidth, box.top / innerHeight, box.right / innerWidth, box.bottom / innerHeight],
                ink: 0.2126 * linear(red) + 0.7152 * linear(green) + 0.0722 * linear(blue),
            };
        });
})()`;

await send("Runtime.enable");
await send("Page.enable");
await send("Page.setBypassCSP", { enabled: true });
if (reduce)
    await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 500 });
await send("Network.enable");
await send("Page.navigate", { url });
const started = Date.now();
while (Date.now() - started < QUIET_LIMIT_MS && (inFlight.size > 0 || Date.now() - lastActivity < QUIET_MS)) await sleep(POLL_MS);
await sleep(settle);

const clickByText = async (text) => {
    const point = await evaluate(`(() => {
        const wanted = ${JSON.stringify(text.toLowerCase())};
        const candidates = [...document.querySelectorAll("button, a, [role=button], [onclick], div, span")]
            .filter((element) => element.textContent.trim().toLowerCase().includes(wanted) && element.getClientRects().length)
            .sort((a, b) => a.textContent.length - b.textContent.length);
        const target = candidates[0];
        if (!target) return null;
        const box = target.getBoundingClientRect();
        return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    })()`);
    if (!point) return false;
    for (const type of ["mouseMoved", "mousePressed", "mouseReleased"])
        await send("Input.dispatchMouseEvent", { type, x: point.x, y: point.y, button: "left", clickCount: 1 });
    await sleep(settle);
    return true;
};

const clicked = [];
for (const text of clicks) clicked.push({ text, found: await clickByText(text) });

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

const drive = wheelTotal > 0 || range < MIN_RANGE ? "wheel" : "window";
const wheelRange = wheelTotal > 0 ? wheelTotal : AUTO_WHEEL;
let wheeled = 0;

const wheelTo = async (target) => {
    while (Math.abs(target - wheeled) >= 1) {
        const delta = Math.sign(target - wheeled) * Math.min(WHEEL_STEP, Math.abs(target - wheeled));
        await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: width / 2, y: height / 2, deltaX: 0, deltaY: delta });
        wheeled += delta;
        await sleep(WHEEL_PAUSE);
    }
};

if (sequence > 1) {
    const folder = join(out, `${tag}-sequence`);
    mkdirSync(folder, { recursive: true });
    for (let index = 0; index < sequence; index += 1) {
        const fraction = index / (sequence - 1);
        if (drive === "wheel") await wheelTo(Math.round(wheelRange * fraction));
        else await evaluate(`window.scrollTo(0, ${Math.round(range * fraction)})`);
        await sleep(settle);
        const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 82 });
        writeFileSync(join(folder, `${String(index).padStart(4, "0")}.jpg`), Buffer.from(shot.data, "base64"));
    }
    console.log(JSON.stringify({ sequence: folder, frames: sequence, size: `${width}x${height}` }));
    socket.close();
    clearTimeout(watchdog);
    finish(0);
} else {

const CENSUS = `(() => {
    const tally = {};
    const count = (key, raw) => { if (!raw) return; const bucket = (tally[key] ??= {}); bucket[raw] = (bucket[raw] ?? 0) + 1; };
    const many = (key, raw) => raw.split(",").map((part) => part.trim()).forEach((part) => count(key, part));
    for (const element of document.body.querySelectorAll("*")) {
        if (!element.getClientRects().length) continue;
        const style = getComputedStyle(element);
        if (style.visibility === "hidden") continue;
        const text = [...element.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim());
        if (text) {
            count("family", style.fontFamily.split(",")[0].replace(/["']/g, "").trim());
            count("size", style.fontSize);
            count("weight", style.fontWeight);
            count("tracking", style.letterSpacing);
            count("text", style.color);
        }
        if (style.borderRadius !== "0px") count("radius", style.borderRadius);
        if (style.boxShadow !== "none") count("shadow", style.boxShadow);
        if (style.backgroundColor !== "rgba(0, 0, 0, 0)") count("background", style.backgroundColor);
        if (style.borderTopWidth !== "0px" && style.borderTopStyle !== "none") count("border", style.borderTopWidth + " " + style.borderTopColor);
        if (style.transitionDuration !== "0s") { many("duration", style.transitionDuration); many("easing", style.transitionTimingFunction); count("transition", style.transitionProperty); }
        if (style.animationName !== "none") { many("duration", style.animationDuration); many("easing", style.animationTimingFunction); }
    }
    const order = (bucket) => Object.entries(bucket).sort((a, b) => b[1] - a[1]).map(([value, uses]) => ({ value, uses }));
    return Object.fromEntries(Object.entries(tally).map(([key, bucket]) => [key, { distinct: Object.keys(bucket).length, values: order(bucket).slice(0, 12) }]));
})()`;

const hideOverlays = () => evaluate(`document.querySelectorAll(${JSON.stringify(hide)}).forEach((element) => element.remove())`);

const results = [];
for (const fraction of frames) {
    if (drive === "wheel") await wheelTo(fraction <= 1 ? Math.round(wheelRange * fraction) : fraction);
    else await evaluate(`window.scrollTo(0, ${fraction <= 1 ? Math.round(range * fraction) : fraction})`);
    await sleep(settle);
    await hideOverlays();
    let shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 72 });
    const file = join(out, `${tag}-${String(fraction).replace(".", "_")}.jpg`);
    const boxes = await evaluate(`window.__stageBoxes ? window.__stageBoxes() : null`);
    const copies = await evaluate(READ_COPY);
    const measure = () => evaluate(
        `${MEASURE}(${JSON.stringify(`data:image/jpeg;base64,${shot.data}`)}, ${JSON.stringify({
            sampleWidth: SAMPLE_WIDTH,
            regionWidth: REGION_WIDTH,
            border: BORDER,
            bright: BRIGHT,
            accentShare: ACCENT_SHARE,
            chromaFloor: CHROMA_FLOOR,
            boxes,
            copies,
        })})`,
        true,
    );
    let metrics = await measure();
    for (let attempt = 0; attempt < BLANK_RETRIES && metrics.range.high - metrics.range.low < BLANK_RANGE; attempt += 1) {
        await sleep(settle);
        shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 72 });
        metrics = await measure();
    }
    if (metrics.range.high - metrics.range.low < BLANK_RANGE) logs.push(`blank frame at ${fraction}: nothing painted after ${BLANK_RETRIES} retries`);
    writeFileSync(file, Buffer.from(shot.data, "base64"));
    const probe = await evaluate(`window.__stage ? window.__stage.snapshot() : null`);
    results.push({ fraction, file, ...metrics, probe });
}

const census = styles ? await evaluate(CENSUS) : null;
const distinct = census ? Object.fromEntries(Object.entries(census).map(([key, entry]) => [key, entry.distinct])) : null;

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

const actorIds = [...new Set(results.flatMap((frame) => Object.keys(frame.actors ?? {})))];
const critic = {
    maxClipped: Number(Math.max(...results.map((frame) => frame.clippedShare)).toFixed(4)),
    maxCrushed: Number(Math.max(...results.map((frame) => frame.crushedShare)).toFixed(4)),
    maxChannelCrushed: Number(Math.max(...results.map((frame) => frame.channelCrushedShare)).toFixed(4)),
    maxSaturated: Number(Math.max(...results.map((frame) => frame.saturatedShare)).toFixed(4)),
    maxChannelClipped: Number(Math.max(...results.map((frame) => frame.channelClippedShare)).toFixed(4)),
    maxBanding: Number(Math.max(...results.map((frame) => frame.banding)).toFixed(3)),
    flattestRange: Number(Math.min(...results.map((frame) => frame.range.high - frame.range.low)).toFixed(3)),
    softestForeground: Number(Math.min(...results.map((frame) => frame.sharpness.near / Math.max(frame.sharpness.middle, 1e-6))).toFixed(2)),
    minCopyContrast: results.flatMap((frame) => frame.copy.map((line) => line.contrast)).reduce((low, value) => Math.min(low, Number(value.toFixed(2))), Infinity),
    actors: Object.fromEntries(actorIds.map((id) => {
        const seen = results.map((frame) => frame.actors?.[id]).filter(Boolean);
        return [id, {
            meanVariation: Number((seen.reduce((sum, actor) => sum + actor.variation, 0) / seen.length).toFixed(4)),
            worstContact: Number(Math.max(...seen.map((actor) => actor.contact ?? 1)).toFixed(3)),
            darkestExposure: Number(Math.min(...seen.map((actor) => actor.exposure ?? 1)).toFixed(2)),
            palestHighlight: Number(Math.min(...seen.map((actor) => actor.highlightSaturation ?? 1)).toFixed(3)),
        }];
    })),
};

const report = { url, tag, critic, styles: census, size: `${width}x${height}`, range, drive, wheelRange: drive === "wheel" ? wheelRange : null, clicked, fingerprint, frames: results, tooClose: near, console: logs.slice(0, 20) };
writeFileSync(join(out, `${tag}-report.json`), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ fingerprint, critic, distinct, tooClose: near, report: join(out, `${tag}-report.json`) }, null, 2));

socket.close();
clearTimeout(watchdog);
finish(near.length > 0 ? 1 : 0);
}

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const STRIDE = 8;

const motionAt = (data, bodies, frame) => {
    let largest = 0;
    for (let body = 0; body < bodies; body += 1) {
        const now = (frame * bodies + body) * STRIDE;
        const next = ((frame + 1) * bodies + body) * STRIDE;
        largest = Math.max(
            largest,
            Math.hypot(data[next] - data[now], data[next + 1] - data[now + 1], data[next + 2] - data[now + 2]),
        );
    }
    return largest;
};

export const freezeBake = (data, frames, bodies, after, window) => {
    const last = Math.min(frames - 2, after + window);
    let calmest = after;
    let calm = Infinity;
    for (let frame = after; frame <= last; frame += 1) {
        const motion = motionAt(data, bodies, frame);
        if (motion < calm) {
            calm = motion;
            calmest = frame;
        }
    }
    const held = data.slice(calmest * bodies * STRIDE, (calmest + 1) * bodies * STRIDE);
    for (let frame = calmest + 1; frame < frames; frame += 1) data.set(held, frame * bodies * STRIDE);
    return { frame: calmest, motionMm: Number((calm * 1000).toFixed(4)) };
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const [metaPath, after, window] = process.argv.slice(2);
    if (!metaPath || !after || !window) {
        console.error("Usage: freeze.mjs <bake.json> <after-frame> <window-frames>");
        process.exit(1);
    }
    const meta = JSON.parse(readFileSync(metaPath, "utf8"));
    const binPath = join(dirname(metaPath), meta.data);
    const data = new Float32Array(readFileSync(binPath).buffer.slice(0));
    const result = freezeBake(data, meta.frames, meta.bodies, Number(after), Number(window));
    writeFileSync(binPath, Buffer.from(data.buffer));
    meta.source = `${meta.source}, frozen at frame ${result.frame}`;
    writeFileSync(metaPath, JSON.stringify(meta, null, 2));
    console.log(JSON.stringify(result));
}

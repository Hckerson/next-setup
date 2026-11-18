const STRIDE = 8;
const RIM_SAMPLES = 48;
const FACE_SAMPLES = 24;
const FACE_RING = 0.6;
const NEAR = 2.2;
const VISIBLE = 0.0002;

const rotate = ([x, y, z, w], [vx, vy, vz]) => {
    const tx = 2 * (y * vz - z * vy);
    const ty = 2 * (z * vx - x * vz);
    const tz = 2 * (x * vy - y * vx);
    return [vx + w * tx + (y * tz - z * ty), vy + w * ty + (z * tx - x * tz), vz + w * tz + (x * ty - y * tx)];
};

const samplesOf = (radius, half) => {
    const points = [];
    for (let k = 0; k < RIM_SAMPLES; k += 1) {
        const angle = (k / RIM_SAMPLES) * Math.PI * 2;
        for (const y of [-half, 0, half]) points.push([Math.cos(angle) * radius, y, Math.sin(angle) * radius]);
    }
    for (let k = 0; k < FACE_SAMPLES; k += 1) {
        const angle = (k / FACE_SAMPLES) * Math.PI * 2;
        for (const y of [-half, half]) points.push([Math.cos(angle) * radius * FACE_RING, y, Math.sin(angle) * radius * FACE_RING]);
    }
    return points;
};

export const discOverlap = (data, bodies, frame, radius, half) => {
    const samples = samplesOf(radius, half);
    const live = [];
    for (let body = 0; body < bodies; body += 1) {
        const at = (frame * bodies + body) * STRIDE;
        if (data[at + 7] > 0)
            live.push({ p: [data[at], data[at + 1], data[at + 2]], q: [data[at + 3], data[at + 4], data[at + 5], data[at + 6]] });
    }
    let pairs = 0;
    let deepest = 0;
    const depths = [];
    for (let a = 0; a < live.length; a += 1)
        for (let b = a + 1; b < live.length; b += 1) {
            const A = live[a];
            const B = live[b];
            if (Math.hypot(A.p[0] - B.p[0], A.p[1] - B.p[1], A.p[2] - B.p[2]) > NEAR * radius) continue;
            let depth = 0;
            for (const [first, second] of [[A, B], [B, A]])
                for (const sample of samples) {
                    const world = rotate(first.q, sample);
                    const local = rotate([-second.q[0], -second.q[1], -second.q[2], second.q[3]], [
                        first.p[0] + world[0] - second.p[0],
                        first.p[1] + world[1] - second.p[1],
                        first.p[2] + world[2] - second.p[2],
                    ]);
                    const radial = Math.hypot(local[0], local[2]);
                    if (radial < radius && Math.abs(local[1]) < half)
                        depth = Math.max(depth, Math.min(radius - radial, half - Math.abs(local[1])));
                }
            if (depth > VISIBLE) {
                pairs += 1;
                deepest = Math.max(deepest, depth);
                depths.push(depth);
            }
        }
    depths.sort((a, b) => a - b);
    return {
        bodies: live.length,
        visiblePairs: pairs,
        medianMm: depths.length ? Number((depths[Math.floor(depths.length / 2)] * 1000).toFixed(2)) : 0,
        deepestMm: Number((deepest * 1000).toFixed(2)),
    };
};

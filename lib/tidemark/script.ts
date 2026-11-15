import { AD, COIN, DROP_HEIGHT, JAR, LAPTOP, MARK, SPEND_EXIT, SUN, TIDEMARK_PEAK, TRACE_ARC, coinSlot } from "@/lib/tidemark/constants";
import type { Move, MoveCue, Script, Shot } from "@/lib/types";

const cue = (move: Move, at = 0, length = 1): MoveCue => ({ move, at, length });

const indices = (from: number, to: number) =>
    Array.from({ length: to - from }, (_, step) => from + step);

const coin = (index: number) => `coin-${index}`;

const rest = (id: string, x: number, z: number): MoveCue =>
    cue({ verb: "enter", actor: id, from: { x, y: 0, z }, to: { x, y: 0, z } });

const staggered = (indexList: number[], make: (index: number) => Move) =>
    indexList.map((index, order) =>
        cue(make(index), (order / indexList.length) * 0.7, 0.3),
    );

const drop = (index: number): Move => {
    const slot = coinSlot(index);
    return { verb: "enter", actor: coin(index), from: { ...slot, y: slot.y + DROP_HEIGHT }, to: slot };
};

const spend = (index: number): Move => {
    const slot = coinSlot(index);
    return {
        verb: "exit",
        actor: coin(index),
        from: slot,
        to: { x: slot.x + SPEND_EXIT.x, y: slot.y + SPEND_EXIT.y, z: slot.z + SPEND_EXIT.z },
    };
};

const traced = coinSlot(6);

const shots: Shot[] = [
    {
        id: "dawn", at: 0, length: 0.14, camera: "locked-off", copy: true, tone: "dawn",
        moves: [
            rest("jar", JAR.x, 0), rest("laptop", LAPTOP.x, LAPTOP.z), rest("ad", AD.x, AD.z),
            rest("mark", JAR.x, JAR.depth / 2 + MARK.depth), rest("sun", SUN.fromX, 0),
            ...staggered(indices(0, COIN.count), drop),
        ],
    },
    {
        id: "spend", at: 0.14, length: 0.22, camera: "locked-off", copy: true, tone: "spend",
        moves: staggered(indices(0, 6), spend),
    },
    { id: "offpace", at: 0.36, length: 0.16, camera: "locked-off", copy: true, tone: "offpace", moves: [cue({ verb: "hold" })] },
    {
        id: "trace", at: 0.52, length: 0.2, camera: "locked-off", copy: true, tone: "trace",
        moves: [
            cue({ verb: "lift", actor: coin(6), from: traced.y, height: 0.6 }, 0, 0.25),
            cue({ verb: "recolour", actor: coin(6), from: "neutral", to: "search", wipe: "up" }, 0.2, 0.4),
            cue({ verb: "travel", actor: coin(6), path: [...TRACE_ARC], bank: 0.4 }, 0.25, 0.55),
            cue({ verb: "land", actor: coin(6), from: 2.4, surface: 0.1 }, 0.8, 0.2),
        ],
    },
    {
        id: "correct", at: 0.72, length: 0.16, camera: "locked-off", copy: true, tone: "correct",
        moves: staggered(indices(3, 6), drop),
    },
    {
        id: "connect", at: 0.88, length: 0.12, camera: "locked-off", copy: true, tone: "connect",
        moves: [cue({ verb: "recolour", actor: "laptop", from: "neutral", to: "light", wipe: "radial" }, 0.1, 0.7)],
    },
    {
        id: "day", at: 0, length: 1, camera: "locked-off",
        moves: [
            cue({ verb: "travel", actor: "sun", bank: 0, path: [{ x: SUN.fromX, y: 0, z: 0 }, { x: SUN.toX, y: 0, z: 0 }] }),
            cue({ verb: "lift", actor: "mark", from: MARK.startY, height: MARK.drop }),
        ],
    },
];

export const TIDEMARK_SCRIPT: Script = { shots, length: 1, peak: TIDEMARK_PEAK };

import { describe, expect, it } from "vitest";
import { gsap } from "gsap";
import { compileViews, createLiveView, type LiveView } from "@/lib/stage/compile-view";
import type { Script } from "@/lib/types";

const SCRIPT: Script = {
    length: 1,
    peak: "b",
    shots: [
        { id: "a", at: 0, length: 0.5, camera: "flat", moves: [] },
        { id: "b", at: 0.5, length: 0.5, camera: "flat", moves: [] },
    ],
};

const VIEWS = {
    a: { centre: [0, 0, 0], width: 1, exposure: 1 },
    b: { centre: [2, 0, 4], width: 0.5, exposure: 0.8 },
} as const;

const fields = ({ x, y, z, width, exposure }: LiveView) => ({ x, y, z, width, exposure });

describe("compileViews", () => {
    it("holds the first view, then re-projects into each shot's view at its start", () => {
        const live = createLiveView(VIEWS.a);
        const film = gsap.timeline({ paused: true });
        compileViews(film, SCRIPT, VIEWS, live, 0.2);
        film.seek(0.25, false);
        expect(fields(live)).toEqual({ x: 0, y: 0, z: 0, width: 1, exposure: 1 });
        film.seek(1, false);
        expect(fields(live)).toEqual({ x: 2, y: 0, z: 4, width: 0.5, exposure: 0.8 });
        film.seek(0.25, false);
        expect(live.width).toBe(1);
    });
});

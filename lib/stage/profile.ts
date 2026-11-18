import { LatheGeometry, Vector2 } from "three";

const ARC_STEPS = 8;

export const arc = (
    centre: readonly [number, number],
    radius: number,
    from: number,
    to: number,
    steps = ARC_STEPS,
) =>
    Array.from({ length: steps + 1 }, (_, step) => {
        const angle = from + ((to - from) * step) / steps;
        return new Vector2(
            centre[0] + Math.cos(angle) * radius,
            centre[1] + Math.sin(angle) * radius,
        );
    });

export const lathe = (profile: Vector2[], segments: number) => {
    const geometry = new LatheGeometry(profile, segments);
    geometry.computeVertexNormals();
    return geometry;
};

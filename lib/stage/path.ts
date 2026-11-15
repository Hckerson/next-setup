import { CatmullRomCurve3, Vector3 } from "three";
import type { Waypoint } from "@/lib/types";

const CURVE_TENSION = 0.5;

export const createPath = (waypoints: Waypoint[]) =>
    new CatmullRomCurve3(
        waypoints.map(({ x, y, z }) => new Vector3(x, y, z)),
        false,
        "centripetal",
        CURVE_TENSION,
    );

export const headingAt = (curve: CatmullRomCurve3, t: number) => {
    const tangent = curve.getTangent(t);
    return Math.atan2(tangent.x, tangent.z);
};

export const turnAt = (curve: CatmullRomCurve3, t: number, step: number) => {
    const before = headingAt(curve, Math.max(0, t - step));
    const after = headingAt(curve, Math.min(1, t + step));
    const delta = after - before;
    return Math.atan2(Math.sin(delta), Math.cos(delta));
};

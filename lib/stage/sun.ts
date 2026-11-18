import { Color, MathUtils, Vector3 } from "three";

const SUNRISE = 6;
const DAY_LENGTH = 12;
const MAX_ELEVATION = 62;
const WARMEST = 1900;
const COOLEST = 6500;
const WARM_BAND = 45;
const KELVIN_SCALE = 100;

export interface Sun {
    hour: number;
    elevation: number;
    azimuth: number;
    kelvin: number;
    direction: Vector3;
}

export const hourOf = (date: Date) =>
    date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;

export const sunAt = (hour: number): Sun => {
    const day = (hour - SUNRISE) / DAY_LENGTH;
    const elevation = MAX_ELEVATION * Math.sin(Math.PI * day);
    const azimuth = 180 * MathUtils.clamp(day, 0, 1);
    const warmth = MathUtils.smootherstep(Math.max(elevation, 0), 0, WARM_BAND);
    const kelvin = WARMEST + (COOLEST - WARMEST) * warmth;
    const up = MathUtils.degToRad(elevation);
    const across = MathUtils.degToRad(azimuth);
    const direction = new Vector3(
        Math.cos(up) * Math.cos(across),
        Math.sin(up),
        Math.cos(up) * Math.sin(across),
    ).normalize();
    return { hour, elevation, azimuth, kelvin, direction };
};

export const keyAt = (hours: readonly number[], hour: number) => {
    const next = hours.findIndex((key) => key > hour);
    if (next === 0) return 0;
    if (next === -1) return Math.max(hours.length - 1, 0);
    const from = hours[next - 1] ?? hour;
    const to = hours[next] ?? hour;
    return next - 1 + (hour - from) / (to - from);
};

const channel = (value: number) => MathUtils.clamp(value, 0, 255) / 255;

export const kelvinToColor = (kelvin: number, target = new Color()) => {
    const t = kelvin / KELVIN_SCALE;
    const red = t <= 66 ? 255 : 329.698727446 * (t - 60) ** -0.1332047592;
    const green =
        t <= 66
            ? 99.4708025861 * Math.log(t) - 161.1195681661
            : 288.1221695283 * (t - 60) ** -0.0755148492;
    const blue =
        t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
    return target.setRGB(channel(red), channel(green), channel(blue));
};

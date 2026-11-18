export const PRESENCE_SHARE = 0.4;

export const BANK_SAMPLE_STEP = 0.02;

export const COPY_FADE = 0.008;

export const COPY_RISE = 24;

export const COPY_LETTERING = 0.012;

export const COPY_ENTRANCES = {
    rise: { from: { autoAlpha: 0, y: COPY_RISE }, to: { autoAlpha: 1, y: 0 }, duration: COPY_FADE },
    lettered: { from: { autoAlpha: 1, clipPath: "inset(0% 100% 0% 0%)" }, to: { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" }, duration: COPY_LETTERING },
} as const;

export type CopyEntrance = keyof typeof COPY_ENTRANCES;

export const RESOLVE = { inkLeaves: 0.4, solidArrives: 0.25, solidOpaque: 0.6, fillLeaves: 0.7 } as const;

export const TONE_SHARE = 0.8;

export const GROUND_VAR = "--colors-background";

export const INK_VAR = "--colors-text";

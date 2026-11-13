import { Color, type Scene } from "three";
import type { Tone } from "@/lib/types";

export const createTone = (): Tone => ({
    ground: new Color(),
    ink: new Color(),
});

export const paintGround = (scene: Scene, tone: Tone) => {
    if (scene.background instanceof Color) scene.background.copy(tone.ground);
    else scene.background = tone.ground.clone();
};

export const loadTone = (tone: Tone, style: CSSStyleDeclaration, name: string) => {
    tone.ground.setStyle(style.getPropertyValue(`--tones-${name}-ground`).trim());
    tone.ink.setStyle(style.getPropertyValue(`--tones-${name}-ink`).trim());
};

export const loadVariant = (colour: Color, style: CSSStyleDeclaration, name: string) => {
    colour.setStyle(style.getPropertyValue(`--variants-${name}`).trim());
};

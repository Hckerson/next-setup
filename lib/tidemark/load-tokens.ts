import { applyTone } from "@/lib/stage/compile-tone";
import { loadTone, loadVariant } from "@/lib/stage/tone";
import type { Tidemark } from "@/lib/tidemark/context";

const FIRST_TONE = "dawn";

export const loadTokens = (tidemark: Tidemark, root: HTMLElement) => {
    const style = getComputedStyle(root);
    Object.entries(tidemark.tones).forEach(([name, tone]) => loadTone(tone, style, name));
    Object.entries(tidemark.context.variants).forEach(([name, colour]) =>
        loadVariant(colour, style, name),
    );
    const first = tidemark.tones[FIRST_TONE];
    if (!first) return;
    tidemark.live.ground.copy(first.ground);
    tidemark.live.ink.copy(first.ink);
    applyTone(tidemark.live, root);
};

"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { gsap } from "gsap";
import TidemarkCopy from "@/components/sections/tidemark-copy";
import { useStageTimeline } from "@/lib/hooks/use-stage-timeline";
import { compileCopy } from "@/lib/stage/compile-copy";
import { compileScript } from "@/lib/stage/compile-script";
import { compileTone } from "@/lib/stage/compile-tone";
import { exposeStage } from "@/lib/stage/debug";
import { createTidemark } from "@/lib/tidemark/context";
import { loadTokens } from "@/lib/tidemark/load-tokens";
import { TIDEMARK_DEFAULTS, TIDEMARK_PEAK, TIDEMARK_TRACK_CLASS } from "@/lib/tidemark/constants";
import { TIDEMARK_SCRIPT } from "@/lib/tidemark/script";

const TidemarkCanvas = dynamic(() => import("@/components/sections/tidemark-canvas"));

export default function TidemarkStage() {
    const trackRef = useRef<HTMLElement>(null);
    const [tidemark] = useState(createTidemark);

    const compose = useCallback(
        (film: gsap.core.Timeline) => {
            const root = trackRef.current;
            if (!root) return;
            compileScript(film, TIDEMARK_SCRIPT, tidemark.context);
            compileCopy(film, TIDEMARK_SCRIPT, root);
            compileTone(film, TIDEMARK_SCRIPT, tidemark.tones, tidemark.live, root);
        },
        [tidemark],
    );

    useStageTimeline(trackRef, { compose, peak: TIDEMARK_PEAK, defaults: TIDEMARK_DEFAULTS });

    useEffect(() => {
        if (trackRef.current) loadTokens(tidemark, trackRef.current);
        return exposeStage(tidemark.context);
    }, [tidemark]);

    return (
        <section ref={trackRef} className={`${TIDEMARK_TRACK_CLASS} relative bg-background text-text`}>
            <div className="sticky top-0 h-svh overflow-hidden">
                <TidemarkCanvas tidemark={tidemark} />
                <TidemarkCopy />
            </div>
        </section>
    );
}

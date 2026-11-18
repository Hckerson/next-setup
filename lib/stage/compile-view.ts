import type { gsap } from "gsap";
import { smoother } from "@/lib/stage/ease";
import type { OrthoView } from "@/lib/stage/ortho";
import type { Script } from "@/lib/types";

export interface StagedView extends OrthoView {
    exposure: number;
}

export interface LiveView {
    x: number;
    y: number;
    z: number;
    width: number;
    exposure: number;
}

const live = (view: StagedView): LiveView => ({ x: view.centre[0], y: view.centre[1], z: view.centre[2], width: view.width, exposure: view.exposure });

export const createLiveView = (view: StagedView): LiveView => live(view);

export const orthoOf = (view: LiveView): OrthoView => ({ centre: [view.x, view.y, view.z], width: view.width });

export const compileViews = (film: gsap.core.Timeline, script: Script, views: Readonly<Record<string, StagedView>>, target: LiveView, share: number) =>
    script.shots.forEach((shot, index) => {
        const previous = script.shots[index - 1];
        const from = previous ? views[previous.id] : undefined;
        const to = views[shot.id];
        if (!to) throw new Error(`The script names a shot with no view: ${shot.id}`);
        if (!from) {
            film.set(target, { ...live(to), immediateRender: true }, shot.at);
            return;
        }
        film.fromTo(target, live(from), { immediateRender: false, ...live(to), duration: shot.length * share, ease: smoother }, shot.at);
    });

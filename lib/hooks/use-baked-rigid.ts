import { useEffect, useState } from "react";
import { loadBakedRigid } from "@/lib/stage/baked-rigid";
import type { BakedRigid } from "@/lib/types";

export const useBakedRigid = (url: string) => {
    const [bake, setBake] = useState<BakedRigid | null>(null);
    useEffect(() => {
        let live = true;
        loadBakedRigid(url).then((loaded) => {
            if (live) setBake(loaded);
        });
        return () => {
            live = false;
        };
    }, [url]);
    return bake;
};

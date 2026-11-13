import type { ReactNode } from "react";
import StageScrollProvider from "@/components/providers/stage-scroll-provider";
import { TIDEMARK_LENIS } from "@/lib/tidemark/constants";

export default function StageLayout({ children }: { children: ReactNode }) {
    return <StageScrollProvider options={TIDEMARK_LENIS}>{children}</StageScrollProvider>;
}

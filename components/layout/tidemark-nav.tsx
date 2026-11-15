import { TIDEMARK_BRAND } from "@/lib/data/tidemark";

export default function TidemarkNav() {
    return (
        <header className="fixed inset-x-0 top-0 z-(--z-indices-fixed) flex h-16 items-center px-(--stage-gutter) font-display text-h4 text-text">
            {TIDEMARK_BRAND}
        </header>
    );
}

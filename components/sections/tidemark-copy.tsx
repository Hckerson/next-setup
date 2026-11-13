import Button from "@/components/ui/button";
import { TIDEMARK_ACTION, TIDEMARK_COPY } from "@/lib/data/tidemark";
import { TIDEMARK_ANCHOR, TIDEMARK_CONTACT } from "@/lib/tidemark/constants";

const PLACEMENT: Record<string, string> = {
    dawn: "items-start justify-end text-left",
    spend: "items-end justify-center text-right",
    offpace: "items-end justify-start pt-28 text-right",
    trace: "items-end justify-end text-right",
    correct: "items-start justify-center text-left",
    connect: "items-start justify-end text-left",
};

export default function TidemarkCopy() {
    return (
        <>
            {Object.entries(TIDEMARK_COPY).map(([shot, line]) => (
                <div
                    key={shot}
                    data-shot={shot}
                    className={`pointer-events-none invisible absolute inset-0 flex flex-col gap-md px-(--stage-gutter) pb-(--stage-gutter) ${PLACEMENT[shot] ?? ""}`}
                >
                    <h2 className="max-w-(--measures-scene) font-display text-h2 text-balance">
                        {line}
                    </h2>
                    {shot === "connect" ? (
                        <Button id={TIDEMARK_ANCHOR} href={TIDEMARK_CONTACT} className="pointer-events-auto">
                            {TIDEMARK_ACTION}
                        </Button>
                    ) : null}
                </div>
            ))}
        </>
    );
}

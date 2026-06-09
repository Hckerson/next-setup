export function getPercentAndTrendAndCurrentFigure(
    current: number,
    prev: number,
): { change: number; trend: "up" | "down"; currentFigure: number  } {
    if (prev === 0) return { change: 0, trend: "up", currentFigure: current };
    const absValue = Math.abs(current - prev);
    const change = Math.round((absValue / prev) * 100);
    const trend = current > prev ? "up" : "down";
    return {
        change,
        trend,
        currentFigure: Number.isInteger(current)
            ? current
            : +Number.parseFloat(`${current}`).toFixed(2),
    };
}

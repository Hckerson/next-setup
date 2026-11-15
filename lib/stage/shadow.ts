export const shadowScale = (height: number, reach: number) =>
    1 / (1 + Math.max(0, height) / reach);

export const shadowOpacity = (height: number, reach: number) =>
    shadowScale(height, reach) ** 2;

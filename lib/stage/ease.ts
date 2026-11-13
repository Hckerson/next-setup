const TAU = Math.PI * 2;

export const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

export const anticipate = (amount: number) => (t: number) =>
    t * t * ((amount + 1) * t - amount);

export const settle = (damping: number, frequency: number) => {
    const raw = (t: number) => 1 - Math.exp(-damping * t) * Math.cos(TAU * frequency * t);
    const closing = 1 - raw(1);
    return (t: number) => raw(t) + closing * smoother(t);
};

export const rebound = (damping: number, frequency: number) => {
    const raw = (t: number) =>
        1 - Math.exp(-damping * t) * Math.abs(Math.cos(TAU * frequency * t * 0.5));
    const closing = 1 - raw(1);
    return (t: number) => Math.min(1, raw(t) + closing * smoother(t));
};

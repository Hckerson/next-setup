export const writeAsPascalCase = (s: string | undefined) => {
    if (!s) return "";
    return s.replace(/\b\w/g, l => l.toUpperCase()).replace(/\s/g, '');
};

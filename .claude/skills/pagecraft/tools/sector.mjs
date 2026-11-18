import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAP = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "..", "docs", "economy-coverage-map.md");
const LINE = /^- \[[ x]\] \*\*(.+?)\*\* — (.+?)(?: · `#\d+`)? · world `([a-z-]+)` · sets `([a-z, -]+)`$/;

export const readSectors = () =>
    readFileSync(MAP, "utf8")
        .split("\n")
        .map((line) => line.match(LINE))
        .filter(Boolean)
        .map(([, name, archetype, world, sets]) => ({ name, archetype, world, sets: sets.split(", ") }));

export const findSector = (wanted) => {
    const sectors = readSectors();
    const found = sectors.find((sector) => sector.name.toLowerCase().startsWith(wanted.toLowerCase()));
    if (!found) throw new Error(`No sector starts with "${wanted}". Sectors: ${sectors.map((sector) => sector.name).join("; ")}`);
    return found;
};

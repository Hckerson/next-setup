import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "..");
const DIGITS = 4;

const [specPath, ...hourArgs] = process.argv.slice(2);
if (!specPath || hourArgs.length === 0) {
    console.error("Usage: node --experimental-strip-types sun-keys.mjs <set.json> <hour> [hour...]");
    process.exit(1);
}

const { sunAt } = await import(join(ROOT, "lib", "stage", "sun.ts"));
const round = (value) => Number(value.toFixed(DIGITS));
const hours = hourArgs.map(Number).sort((a, b) => a - b);

const spec = JSON.parse(readFileSync(specPath, "utf8"));
spec.keys = hours.map((hour) => {
    const sun = sunAt(hour);
    return {
        name: `h${hour.toFixed(2).replace(".", "")}`,
        hour,
        sun: { direction: sun.direction.toArray().map(round), kelvin: Math.round(sun.kelvin) },
    };
});
writeFileSync(specPath, `${JSON.stringify(spec, null, 4)}\n`);
console.log(JSON.stringify(spec.keys));

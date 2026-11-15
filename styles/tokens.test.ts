import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
const TOKEN_FILE = join(ROOT, "styles", "tokens.css");
const SOURCE_DIRS = ["styles", "app", "components", "lib"];
const SOURCE_FILE = /\.(css|ts|tsx)$/;
const DECLARATION = /^\s*(--[a-z0-9-]+)\s*:\s*([^;]*);/gm;

const filledTokens = (css: string) =>
    [...css.matchAll(DECLARATION)]
        .filter(([, , value]) => value.trim() !== "")
        .map(([, name]) => name);

const sourceText = () =>
    SOURCE_DIRS.map((dir) => join(ROOT, dir))
        .filter((dir) => existsSync(dir))
        .flatMap((dir) =>
            readdirSync(dir, { recursive: true, encoding: "utf8" })
                .filter((file) => SOURCE_FILE.test(file))
                .filter((file) => !file.endsWith(".test.ts"))
                .map((file) => readFileSync(join(dir, file), "utf8")),
        )
        .join("\n");

const isConsumed = (text: string, token: string) =>
    new RegExp(`\\(\\s*${token}\\s*[,)]`).test(text);

describe("design tokens", () => {
    it("gives every token that has a value at least one consumer", () => {
        const text = sourceText();
        const dead = filledTokens(readFileSync(TOKEN_FILE, "utf8")).filter(
            (token) => !isConsumed(text, token),
        );
        expect(dead).toEqual([]);
    });
});

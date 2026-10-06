import { starter } from "./tools/eslint";
import type { ConfigArray } from "typescript-eslint";
import nextTs from "eslint-config-next/typescript";
import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";

const TRANSPORT_MODULE = "@/lib/api-client";
const MAX_FILE_LINES = 150;

const GENERATED = "lib/contract/**";
const VIEWS = ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"];
const SOURCE = [...VIEWS, "lib/**/*.{ts,tsx}"];
const ROUTES = ["app/**/page.tsx"];
const COMPONENTS = ["components/**/*.tsx"];
const PRIMITIVES = ["components/ui/**/*.tsx"];
const TESTS = ["**/*.test.ts"];

type RestrictedPath = { name: string; message: string };

type RestrictedImports = [
    "error",
    {
        paths: RestrictedPath[];
        patterns: { group: string[]; message: string }[];
    },
];

const ID_SOURCE = "IDs come from nanoid — never uuid or Date.now().";

const DATE_NOW =
    "CallExpression[callee.object.name='Date'][callee.property.name='now']";

const ID_SYNTAX = [
    `TemplateLiteral > ${DATE_NOW}`,
    `CallExpression[callee.name='String'] > ${DATE_NOW}`,
    `MemberExpression[property.name='toString'] > ${DATE_NOW}`,
    `Property[key.name=/^id$|Id$/] > ${DATE_NOW}`,
].map((selector) => ({ selector, message: ID_SOURCE }));

const DEEP_RELATIVE = {
    group: ["../*", "../**"],
    message:
        "Import through the '@/' alias. Deep-relative paths break when a file moves.",
};

const LIB_ABOVE_COMPONENTS = {
    group: ["@/components/*", "@/components/**"],
    message:
        "lib/ sits below components/. Move the shared type to lib/types or the value to lib/constants and import it from there.",
};

const restrictedImports = (
    paths: RestrictedPath[] = [],
    patterns = [DEEP_RELATIVE],
): RestrictedImports => [
    "error",
    {
        paths: [{ name: "uuid", message: ID_SOURCE }, ...paths],
        patterns,
    },
];

const starterConfig: ConfigArray = [
    {
        plugins: { starter },
    },
    {
        rules: { "starter/no-comments": "error" },
    },
    {
        files: SOURCE,
        rules: {
            "starter/api-access-boundary": "error",
            "no-restricted-imports": restrictedImports(),
            "max-lines": [
                "error",
                {
                    max: MAX_FILE_LINES,
                    skipBlankLines: false,
                    skipComments: false,
                },
            ],
            "no-console": "error",
            "@typescript-eslint/no-explicit-any": "error",
            "no-restricted-syntax": ["error", ...ID_SYNTAX],
        },
    },
    {
        files: VIEWS,
        rules: {
            "starter/domain-types-in-lib": "error",
            "no-restricted-imports": restrictedImports([
                {
                    name: TRANSPORT_MODULE,
                    message:
                        "Components consume hooks. Import a use-<resource> hook from @/lib/hooks instead.",
                },
            ]),
        },
    },
    {
        files: ["lib/**/*.{ts,tsx}"],
        rules: {
            "no-restricted-imports": restrictedImports(
                [],
                [DEEP_RELATIVE, LIB_ABOVE_COMPONENTS],
            ),
        },
    },
    {
        files: COMPONENTS,
        rules: { "starter/one-component-per-file": "error" },
    },
    {
        files: PRIMITIVES,
        rules: {
            "starter/one-component-per-file": ["error", { compound: true }],
        },
    },
    {
        files: ROUTES,
        rules: { "starter/page-composes-only": "error" },
    },
    {
        files: TESTS,
        rules: { "max-lines": "off" },
    },
];

const eslintConfig = [
    ...defineConfig([
        ...nextVitals,
        ...nextTs,
        globalIgnores([
            ".next/**",
            "out/**",
            "build/**",
            "next-env.d.ts",
            GENERATED,
        ]),
    ]),
    ...starterConfig,
];

export default eslintConfig;

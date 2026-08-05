import { starter } from "./tools/eslint";
import type { ConfigArray } from "typescript-eslint";
import nextTs from "eslint-config-next/typescript";
import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";

const TRANSPORT_MODULE = "@/lib/api-client";

const starterConfig: ConfigArray = [
    {
        plugins: { starter },
        rules: { "starter/api-access-boundary": "error" },
    },
];

const eslintConfig = [
    ...defineConfig([
        ...nextVitals,
        ...nextTs,
        globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
        {
            files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
            rules: {
                "no-restricted-imports": [
                    "error",
                    {
                        paths: [
                            {
                                name: TRANSPORT_MODULE,
                                message:
                                    "Components consume hooks. Import a use-<resource> hook from @/lib/hooks instead.",
                            },
                        ],
                    },
                ],
            },
        },
    ]),
    ...starterConfig,
];

export default eslintConfig;

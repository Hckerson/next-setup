import type { TSESLint } from "@typescript-eslint/utils";
import { apiAccessBoundary } from "./rules/api-access-boundary";

export const starter: TSESLint.FlatConfig.Plugin = {
    meta: { name: "eslint-plugin-starter", version: "0.1.0" },
    rules: { "api-access-boundary": apiAccessBoundary },
};

export default starter;

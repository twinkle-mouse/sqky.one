import { fileURLToPath } from "node:url";

import css from "@eslint/css";
import js from "@eslint/js";
import { defineConfig, includeIgnoreFile } from "eslint/config";
import astro from "eslint-plugin-astro";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import ts from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
    includeIgnoreFile(gitignorePath, { gitignoreResolution: true }),
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    {
        files: ["**/*.{ts,mts,cts}"],
        plugins: { ts },
        extends: ["ts/recommended"],
    },
    {
        files: ["**/*.astro"],
        plugins: { astro },
        extends: ["astro/recommended"],
    },
    {
        files: ["**/*.css"],
        plugins: { css },
        language: "css/css",
        extends: ["css/recommended"],
    },
    {
        plugins: {
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            "simple-import-sort/imports": ["error"],
        },
    },
]);

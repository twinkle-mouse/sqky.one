import eslint from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, eslintPluginAstro.configs.recommended, {
    plugins: {
        "simple-import-sort": simpleImportSort,
    },
    rules: {
        "simple-import-sort/imports": ["error"],
    },
});

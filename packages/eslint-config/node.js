import js from "@eslint/js";
import tseslint from "typescript-eslint";

/**
 * Baseline for Node/TypeScript workspaces (currently apps/api and the
 * packages). The web app keeps its own config because next/core-web-vitals
 * brings React and accessibility rules this does not need.
 */
export default tseslint.config(
  { ignores: ["dist/**", "node_modules/**", "coverage/**", "*.config.js"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Nest constructor injection and decorator metadata trip these.
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      // An unused arg prefixed with _ is a documented placeholder, not a mistake.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
);

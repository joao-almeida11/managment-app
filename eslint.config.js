import eslintPluginNode from "eslint-plugin-node";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import eslintPluginSecurity from "eslint-plugin-security";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import vitest from "@vitest/eslint-plugin";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist", "**/*.d.ts", ".storybook", "node_modules", "prisma"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      parserOptions: {
        parser: tsParser,
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
        sourceType: "module", // ES modules
      },
    },
    plugins: {
      node: eslintPluginNode,
      "@typescript-eslint": typescriptEslintPlugin,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      "simple-import-sort": eslintPluginSimpleImportSort,
      unicorn: eslintPluginUnicorn,
      security: eslintPluginSecurity,
    },
    rules: {
      // allow to use both interface and type in the same project
      "@typescript-eslint/consistent-type-definitions": "off",

      // Prettier integration
      "prettier/prettier": "error",

      // Import sorting
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // TypeScript-specific rules
      //   "@typescript-eslint/explicit-function-return-type": "off", // Allow implicit returns
      //   "@typescript-eslint/no-explicit-any": "warn", // Warn on 'any', don’t error

      // Node.js rules
      "node/no-process-env": "error", // Enforce env handling (e.g., via env-config)

      // Relaxed rules for flexibility
      //   "security/detect-object-injection": "off", // Disable noisy security rule
      //   "unicorn/prefer-module": "off", // Don’t enforce module syntax
      //   "unicorn/no-array-reduce": "off", // Allow reduce for flexibility

      // Import rules (no extension enforcement)
      //   "import/extensions": "off",
      "unicorn/filename-case": [
        "error",
        {
          case: "camelCase",
          ignore: ["README.md"],
        },
      ],
    },
  },
  {
    files: ["**/*.{test,spec}.{ts,tsx}"],
    extends: [vitest.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Turn off ESLint rules that conflict with Prettier
  eslintConfigPrettier,
]);

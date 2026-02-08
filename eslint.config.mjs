import { FlatCompat } from "@eslint/eslintrc";
import unusedImports from "eslint-plugin-unused-imports";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // TypeScript
      "@typescript-eslint/no-explicit-any": "error",
      // React
      "react/display-name": "off",
      // Next.js
      "@next/next/no-img-element": "warn",
      // Unused imports
      "unused-imports/no-unused-imports": "warn",
    },
  },
];

export default eslintConfig;

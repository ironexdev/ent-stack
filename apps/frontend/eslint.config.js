import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin"
import typescriptEslintParser from "@typescript-eslint/parser"

export default [
  {
    files: ["*.ts", "*.tsx"], // Ensure this config only applies to TypeScript files
    languageOptions: {
      parser: typescriptEslintParser, // Use the TypeScript parser
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin, // Include the plugin
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules, // Spread the recommended rules
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "func-style": ["error", "declaration", { allowArrowFunctions: true }],
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
]

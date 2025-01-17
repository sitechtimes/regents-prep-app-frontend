import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import tseslint from "typescript-eslint";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["**/.nuxt", "**/node_modules", "**/.output"]
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  },
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...pluginVue.configs["flat/essential"],
  {
    name: "main",
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    rules: {
      "array-callback-return": ["error", { allowImplicit: true }],
      "no-template-curly-in-string": "error",
      "no-unreachable-loop": "error",
      "no-use-before-define": "error",
      "no-useless-assignment": "error",
      "block-scoped-var": "error",
      camelcase: "error",
      complexity: "error",
      "default-case": "error",
      "default-case-last": "error",
      eqeqeq: "error",
      "max-depth": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-else-return": "error",
      "no-empty-function": "error",
      "no-lonely-if": "error",
      "no-unneeded-ternary": "error",
      "no-unused-expressions": "error",
      "no-useless-computed-key": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "operator-assignment": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-object-has-own": "error",
      "prefer-object-spread": "error",
      "prefer-template": "error",
      yoda: "error",

      "@typescript-eslint/array-type": "error",
      "default-param-last": "off",
      "@typescript-eslint/default-param-last": "error",
      "dot-notation": "off",
      "@typescript-eslint/dot-notation": "error",

      "func-style": ["warn", "declaration"],

      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unnecessary-type-parameters": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",

      "vue/multi-word-component-names": "off"
    }
  }
];

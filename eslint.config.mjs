import noOnlyTests from "eslint-plugin-no-only-tests";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: [
      "src/core/cover-service-api/model/",
      "src/core/cover-service-api/cover-service.ts",
      "src/core/dpl-cms/model",
      "src/core/dpl-cms/dpl-cms.ts",
      "src/core/fbs/fbs.ts",
      "src/core/publizon/publizon.ts",
      "postcss.config.js"
    ]
  },
  ...compat.extends(
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:cypress/recommended"
  ),
  {
    plugins: {
      "no-only-tests": noOnlyTests
    },

    languageOptions: {
      globals: {
        ...globals.browser
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "module",

      parserOptions: {
        allowImportExportEverywhere: false,

        ecmaFeatures: {
          jsx: true,
          globalReturn: false
        },

        project: ["./tsconfig.json", "cypress/tsconfig.json"]
      }
    },

    settings: {
      react: {
        version: "16.11.0"
      },

      "import/core-modules": ["vitest"]
    },

    rules: {
      "prefer-arrow-callback": [
        "error",
        {
          allowNamedFunctions: false,
          allowUnboundThis: true
        }
      ],

      "no-param-reassign": [
        "error",
        {
          props: true,
          ignorePropertyModificationsFor: ["state"]
        }
      ],

      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "/**/*.dev.jsx",
            "/**/*.dev.tsx",
            "/**/*.test.js",
            "/**/*.test.jsx",
            "/**/*.test.ts",
            "/**/*.test.tsx",
            "vitest.config.ts",
            "webpack.config.js",
            "webpack.helpers.js",
            "postcss.config.js",
            "orval.config.ts",
            "cypress/plugins/index.js",
            "cypress/support/index.ts",
            "scripts/postcss-node-sass.js",
            "scripts/post-process-generated-graphql.ts",
            "cypress/utils/graphql-test-utils.ts"
          ]
        }
      ],

      "react/function-component-definition": "off",
      "@typescript-eslint/comma-dangle": "off",
      "@typescript-eslint/lines-between-class-members": "off",
      "@typescript-eslint/no-throw-literal": "off",

      "react-hooks/exhaustive-deps": [
        "warn",
        {
          additionalHooks: "useDeepCompareEffect"
        }
      ],

      "no-only-tests/no-only-tests": "warn"
    }
  },
  {
    files: ["**/*.js", "**/*.jsx"],

    rules: {
      "react/jsx-no-bind": "off",
      "react/function-component-definition": "off",
      "react/forbid-prop-types": "off",
      "react/destructuring-assignment": "off",
      "@typescript-eslint/return-await": "off",
      "no-param-reassign": "off",
      "@typescript-eslint/no-var-requires": "off"
    }
  },
  {
    files: ["**/*.tsx", "**/*.ts"],

    rules: {
      "react/prop-types": "off",
      "react/require-default-props": "off",
      "react/no-unused-prop-types": "off",

      "no-underscore-dangle": [
        "error",
        {
          allow: ["__typename"]
        }
      ],

      "react/forbid-elements": [
        1,
        {
          forbid: [
            {
              element: "main",
              message:
                "dpl-cms provide a <main> to render react in, therefore you must use <section> to avoid duplicate main"
            }
          ]
        }
      ]
    }
  },
  {
    files: ["**/*.dev.jsx", "**/*.dev.tsx"],

    rules: {
      "react/jsx-props-no-spreading": "off"
    }
  },
  {
    files: ["**/*.entry.tsx"],

    rules: {
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
];

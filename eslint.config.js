const prettier = require("eslint-config-prettier");
const airbnbBase = require("eslint-config-airbnb");
const airbnbTypeScript = require("eslint-config-airbnb-typescript");
const airbnbHooks = require("eslint-config-airbnb/hooks");
const prettierRecommended = require("eslint-plugin-prettier").configs
  .recommended;
const cypress = require("eslint-plugin-cypress").configs.recommended;
// Include the recommended settings for @typescript-eslint
const typescriptRecommended = {
  plugins: {
    "@typescript-eslint": require("@typescript-eslint/eslint-plugin")
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
};

// ESLint configuration using flat config
module.exports = [
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        project: "./tsconfig.json", // Specify the TypeScript project configuration
        sourceType: "module",
        ecmaFeatures: {
          jsx: true // Enable JSX support
        }
      }
    },
    settings: {
      react: {
        version: "16.11.0" // React version for linting
      },
      // Since we use vitest alongside our production code, we have to instruct ESLint
      // not to throw the import/no-extraneous-dependencies error when doing so.
      "import/core-modules": ["vitest"]
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      cypress: require("eslint-plugin-cypress"),
      "react-hooks": require("eslint-plugin-react-hooks"),
      react: require("eslint-plugin-react"),
      import: require("eslint-plugin-import"),
      "jsx-a11y": require("eslint-plugin-jsx-a11y"),
      "no-only-tests": require("eslint-plugin-no-only-tests"),
      prettier: require("eslint-plugin-prettier")
    },
    rules: {
      // Extend rules from airbnb, prettier, cypress, and @typescript-eslint plugins
      ...airbnbBase.rules,
      ...airbnbTypeScript.rules,
      ...airbnbHooks.rules,
      ...prettier.rules,
      ...prettierRecommended.rules,
      ...cypress.rules,
      ...typescriptRecommended.rules,
      // Custom rules
      "@typescript-eslint/consistent-type-imports": "off",
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
          ignorePropertyModificationsFor: ["state"] // Ignore state reassignment
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
      // Needed until new TypeScript versions are supported
      "@typescript-eslint/no-empty-function": "off",
      // We like to use arrow function syntax also for functional components.
      "react/function-component-definition": "off",
      // No complaints about missing trailing commas
      "@typescript-eslint/comma-dangle": "off",
      "react-hooks/exhaustive-deps": [
        "warn",
        {
          additionalHooks: "useDeepCompareEffect"
        }
      ],
      "no-only-tests/no-only-tests": "warn" // Warn on `.only` in tests
    }
  },
  // JS/JSX-specific rules
  {
    files: ["*.js", "*.jsx"],
    rules: {
      // These rules were triggered on the former non-TypeScript codebase.
      // We are planning to use only ts/tsx in the future.
      // Therefore, we can separate them by only being ignored on js/jsx files.
      // Start - ddb-react former code
      "react/jsx-no-bind": "off",
      "react/function-component-definition": "off",
      "react/forbid-prop-types": "off",
      "react/destructuring-assignment": "off",
      "@typescript-eslint/return-await": "off",
      "no-param-reassign": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/no-implied-eval": "off",
      "@typescript-eslint/no-throw-literal": "off"
      // End - ddb-react former code
    }
  },
  // TS/TSX-specific rules
  {
    files: ["*.tsx", "*.ts"],
    rules: {
      // We do not use prop-types in TypeScript.
      "react/prop-types": "off",
      "react/require-default-props": "off",
      "react/no-unused-prop-types": "off",
      "no-underscore-dangle": [
        "error",
        {
          allow: ["__typename"] // Allow specific underscores
        }
      ],
      "react/forbid-elements": [
        1,
        {
          forbid: [
            {
              element: "main",
              message:
                "dpl-cms provides a <main> to render React in, therefore you must use <section> to avoid duplicate <main>"
            }
          ]
        }
      ]
    }
  },
  // Storybook development rules
  {
    files: ["*.dev.jsx", "*.dev.tsx"],
    rules: {
      // Allow spreading props in stories
      "react/jsx-props-no-spreading": "off"
    }
  },
  // Entry point rules
  {
    files: ["*.entry.tsx"],
    rules: {
      // Disable unused vars rule for entry points
      "@typescript-eslint/no-unused-vars": "off"
    }
  },
  // Ignore specific files
  {
    ignores: [
      "src/core/cover-service-api/model/*",
      "src/core/cover-service-api/cover-service.ts",
      "src/core/dpl-cms/model/*",
      "src/core/dpl-cms/dpl-cms.ts",
      "src/core/fbs/fbs.ts",
      "src/core/publizon/publizon.ts",
      "src/**/*.test.ts",
      "src/**/*.test.tsx"
    ]
  }
];

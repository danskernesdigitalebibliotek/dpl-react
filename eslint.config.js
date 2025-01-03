const typescriptRecommended = require("@typescript-eslint/eslint-plugin/dist/configs/recommended");
const prettier = require("eslint-config-prettier");
const airbnbBase = require("eslint-config-airbnb");
const airbnbTypeScript = require("eslint-config-airbnb-typescript");
const airbnbHooks = require("eslint-config-airbnb/hooks");
const prettierRecommended = require("eslint-plugin-prettier").configs
  .recommended;
const cypress = require("eslint-plugin-cypress").configs.recommended;

module.exports = [
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: "16.11.0"
      },
      // Since we use vitest alongside our production code we have to instruct eslint
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
      ...airbnbBase.rules,
      ...airbnbTypeScript.rules,
      ...airbnbHooks.rules,
      ...prettier.rules,
      ...prettierRecommended.rules,
      ...cypress.rules,
      ...typescriptRecommended.rules,
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
      // We like to use arrow function syntax also for functional components.
      "react/function-component-definition": "off",
      // No complaints about missing trailing comma
      "@typescript-eslint/comma-dangle": "off",
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
    files: ["*.js", "*.jsx"],
    rules: {
      // These rules were triggered on the former non-typescript codebase.
      // We are planning to use only ts/tsx in the future
      // Therefor we can seperate them by only being ignored on js/jsx files.
      // Start - ddb-react former code
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
    files: ["*.tsx", "*.ts"],
    rules: {
      // We do not use prop-types in ts.
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
    files: ["*.dev.jsx", "*.dev.tsx"],
    rules: {
      // We need a simple way of passing args in stories via object spreading.
      "react/jsx-props-no-spreading": "off"
    }
  },
  {
    files: ["*.entry.tsx"],
    rules: {
      // Since we use High Order Functional Component in entries for text props
      // and want to show the props being used we disable this rule.
      "@typescript-eslint/no-unused-vars": "off"
    }
  },
  {
    ignores: [
      "src/core/cover-service-api/model/*",
      "src/core/cover-service-api/cover-service.ts",
      "src/core/dpl-cms/model/*",
      "src/core/dpl-cms/dpl-cms.ts",
      "src/core/fbs/fbs.ts",
      "src/core/publizon/publizon.ts"
    ]
  }
];

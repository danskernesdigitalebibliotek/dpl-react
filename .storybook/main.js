module.exports = {
  stories: ["../src/**/*.stories.@(jsx|tsx)"],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-queryparams",
    {
      name: "@storybook/preset-typescript"
    }
  ],

  typescript: {
    check: true,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
    }
  },

  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },

  docs: {
    autodocs: true
  }
};

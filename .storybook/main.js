module.exports = {
  stories: ["../src/**/*.dev.@(jsx|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-queryparams",
    {
      name: "@storybook/preset-typescript",
    },
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
    }
  },
  core: {
    builder: "webpack5"
  }
};

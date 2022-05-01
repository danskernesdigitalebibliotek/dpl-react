module.exports = {
  stories: ["../src/**/*.dev.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-controls", { name: "@storybook/preset-typescript" }],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};

const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const nodesass = require("./scripts/postcss-node-sass");

module.exports = ctx => {
  const production = ctx.env === "production";
  return {
    parser: "postcss-scss",
    map: ctx.options.map,
    plugins: [
      nodesass({
        // We always want to inject all of our variables and mixins.
        // There is not to be any actual output from _system.scss.
        data: '@import "./src/components/design-system/_system.scss";'
      }),
      production && autoprefixer,
      production && cssnano
    ]
  };
};

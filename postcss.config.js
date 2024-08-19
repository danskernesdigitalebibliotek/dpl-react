const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcssSass = require("@csstools/postcss-sass");

module.exports = (ctx) => {
  const production = ctx.env === "production";
  return {
    parser: "postcss-scss",
    map: ctx.options.map,
    plugins: [production && autoprefixer, production && cssnano]
  };
};

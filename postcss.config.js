module.exports = ctx => {
  const production = ctx.env === "production";
  return {
    parser: "postcss-scss",
    map: ctx.options.map,
    plugins: [
      require("postcss-node-sass"),
      production && require("autoprefixer"),
      production && require("cssnano"),
    ]
  };
};

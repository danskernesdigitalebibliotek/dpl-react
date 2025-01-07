import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcssSass from "@csstools/postcss-sass";

export default (ctx) => {
  const production = ctx.env === "production";
  return {
    parser: "postcss-scss",
    map: ctx?.options?.map,
    plugins: [
      postcssSass({
        // We always want to inject all of our variables and mixins.
        // There is not to be any actual output from _system.scss.
        data: '@import "./src/components/design-system/_system.scss";'
      }),
      production && autoprefixer,
      production && cssnano
    ]
  };
};

/**
 * POSTCSS-NODE-SASS
 * A PostCSS plugin to parse styles with node-sass
 * https://github.com/arpadHegedus/postcss-node-sass/blob/master/index.js
 */

const postcss = require("postcss");
const defaultNodeSass = require("node-sass");

/**
 * This plugin copies what the postcss node sass plugin does.
 * So the plugin is copied from the github repository mentioned above.
 * The only added feature is possibility for adding extra data (scss) as an argument
 * in postcss.config.js.
 *
 * This entry is added to the original plugin:
 * data: (opt.data || "") + css.css,
 *
 */
module.exports = (opt) => ({
  postcssPlugin: "postcss-node-sass",
  Once(root, { result }) {
    const sass = opt.sass || defaultNodeSass;
    const map = typeof result.opts.map === "object" ? result.opts.map : {};
    const css = root.toResult(
      Object.assign(result.opts, {
        map: {
          annotation: false,
          inline: false,
          sourcesContent: true,
          ...map
        }
      })
    );
    opt = {
      indentWidth: 4,
      omitSourceMapUrl: true,
      outputStyle: "expanded",
      sourceMap: true,
      sourceMapContents: true,
      ...opt,
      data: (opt.data || "") + css.css,
      file: result.opts.from,
      outFile: result.opts.to
    };
    let includedFiles;
    return new Promise((resolve, reject) =>
      sass.render(opt, (err, res) => (err ? reject(err) : resolve(res)))
    )
      .then((res) => {
        includedFiles = res.stats.includedFiles.filter(
          (item, pos, array) => array.indexOf(item) === pos
        );
        return postcss.parse(res.css.toString(), {
          from: result.opts.from,
          map: {
            prev: res.map ? JSON.parse(res.map.toString()) : ""
          }
        });
      })
      .then((res) => {
        result.root = res;
        result.messages = includedFiles.map((file) => ({
          type: "dependency",
          parent: result.opts.from,
          file
        }));
      });
  }
});

module.exports.postcss = true;

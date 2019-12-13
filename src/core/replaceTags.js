/**
 * Provided a string with tags noted inside of it with ":" in front
 * of the keyname we replace said tags with it's value.
 *
 * @param {object} options
 * @param {string} options.text
 * @param {object} options.tag corresponsing keys to what's assigned in the text must be present here.
 * @returns {string} text with the values of the tags inserted.
 */
function replaceTags({ text = "", tags = {} } = {}) {
  return Object.keys(tags).reduce(function replaceTag(acc, tag) {
    return acc.replace(`:${tag}`, tags[tag]);
  }, text);
}

export default replaceTags;

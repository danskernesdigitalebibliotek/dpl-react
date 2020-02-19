/**
 * Provided a string with placeholders noted inside of it with ":" in front
 * of the keyname we replace said placeholders with it's value.
 *
 * @param {object} options
 * @param {string} options.text
 * @param {object} options.placeholders corresponsing keys to what's assigned in the text must be present here.
 * @returns {string} text with the values of the placeholders inserted.
 */
function replacePlaceholders({ text = "", placeholders = {} } = {}) {
  function replaceTag(acc, placeholder) {
    return acc.replace(`:${placeholder}`, placeholders[placeholder]);
  }
  return Object.keys(placeholders).reduce(replaceTag, text);
}

export default replacePlaceholders;

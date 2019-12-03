/**
 * Function to return URL with replacements.
 *
 * @param {object} options
 * @param {string} options.url - the URL to make replacements in.
 * @param {string} options.search - the string to replace in the URL.
 * @param {string} options.replace - the value to replace the search string with.
 * @returns {string} - the URL with the property replaced with the value.
 */
function createPath({ url, property, value }) {
  return url.replace(property, value);
}

export default createPath;

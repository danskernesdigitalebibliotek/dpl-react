let currentToken;

/**
 * We want to set a token we can use for the different services.
 *
 * @param {string} token
 * @export
 */
export function setToken(token) {
  currentToken = token;
}

/**
 * Initialize the getToken closure.
 * Will return a memorized getToken function that in turn
 * returns a token.
 *
 * @returns {function}
 */
function initToken() {
  return function getToken() {
    return currentToken;
  };
}

/**
 * Returns the token.
 *
 * @returns {string} token
 */
export const getToken = initToken();

export default getToken;

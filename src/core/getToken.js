export const TOKEN_KEY = "ddb-token";

/**
 * Initialize the getToken closure.
 * Will return a memorized getToken function that in turn
 * returns a token, either from memory or from localStorage.
 *
 * @returns {function}
 */
function initToken() {
  let token;
  return function getToken() {
    if (token) return token;
    return localStorage.getItem(TOKEN_KEY);
  };
}

/**
 * Returns the token.
 *
 * @returns {string} token
 */
export const getToken = initToken();

export default getToken;

const TOKEN_KEY = "ddb-token";

/**
 * Primarily for development purposes.
 * We want to set a token we can use for the different services.
 *
 * @param {string} token
 * @export
 */
export function setToken(token) {
  const storedToken = localStorage.getItem(TOKEN_KEY);
  if (!storedToken) {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

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

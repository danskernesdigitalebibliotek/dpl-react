import { TOKEN_KEY } from "./getToken.js";

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

export default setToken;

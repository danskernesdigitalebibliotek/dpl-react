const tokens = {};

/**
 * @typedef {"user" | "library"} TokenType
 *
 * - library: The token represents the current library organisation. The library
 *   may also be referred to as the agency.
 * - user: The token represents the current library user. The user may also
 *   be referred to as the patron.
 *   A user token will provide at least the same access as a library token for
 *   the library of the user but since is provides access to personal
 *   information about the current user it must only be used for services which
 *   have an actual need for such information. If not then use the library
 *   token.
 */

/**
 * We want to set a token we can use for the different services.
 *
 * @param {TokenType} type
 * @param {string} value
 */
export function setToken(type, value) {
  tokens[type] = value;
}

/**
 * Returns a token.
 *
 * @param {TokenType} type
 *
 * @returns {string} token
 */
export function getToken(type) {
  return tokens[type];
}

export default getToken;

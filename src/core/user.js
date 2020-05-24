/**
 * A simple collection of functionality in regards to the current user.
 *
 * @class User
 */
import { hasToken } from "./token";

class User {
  /**
   * Returns whether a user is authenticated of not.
   *
   * @static
   * @returns {boolean}
   * @memberof User
   */
  static isAuthenticated() {
    return hasToken("user");
  }
}

export default User;

/**
 * A simple collection of functionality in regards to the current user.
 *
 * @class User
 */
class User {
  /**
   * Returns wheter a user is authenticated of not.
   *
   * @static
   * @returns {boolean}
   * @memberof User
   */
  static isAuthenticated() {
    return window.ddbReact?.userAuthenticated;
  }
}

export default User;

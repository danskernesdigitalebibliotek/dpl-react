/**
 * A simple collection of functionality in regards to the current user.
 *
 * @class User
 */
import { hasToken } from "./token";
import { store, persistor } from "./store";
import { updateStatus, attemptAuthentication } from "./user.slice";

const selectStatus = (state) => state.user.status;

class User {
  /**
   * Used to keep track if we started attempting in this page view.
   *
   * @static
   */
  static #attemptingThisRequest = false;

  /**
   * Returns whether a user is authenticated of not.
   *
   * @static
   * @returns {boolean}
   * @memberof User
   */
  static isAuthenticated() {
    store.dispatch(
      updateStatus({
        hasToken: hasToken("user"),
        doFail: !User.#attemptingThisRequest
      })
    );
    return selectStatus(store.getState()) === "authenticated";
  }

  /**
   * Redirect to login.
   *
   * @param {string} loginUrl the URL to redirect to.
   */
  static authenticate(loginUrl) {
    // Switch state to attempting and flush state to session storage
    // before redirecting.
    store.dispatch(attemptAuthentication()).then(() => persistor.flush());
    User.#attemptingThisRequest = true;
    window.location.href = loginUrl;
  }

  /**
   * Whether authentication failed.
   *
   * Will return true if we just tried authenticating and it failed.
   *
   * @returns {boolean}
   */
  static authenticationFailed() {
    // isAuthenticated() will ensure state is up to date.
    return (
      !this.isAuthenticated() && selectStatus(store.getState()) === "failed"
    );
  }
}

export default User;

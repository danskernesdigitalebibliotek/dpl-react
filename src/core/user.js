/**
 * A simple collection of functionality in regards to the current user.
 *
 * @class User
 */
import { hasToken } from "./token";
import { store, persistor } from "./store";
import {
  authenticationSucceeded,
  authenticationFailed,
  attemptAuthentication
} from "./user.slice";

const selectStatus = state => state.user.status;

// Used to keep track if we started attempting in this page view.
let attemptingThisRequest = false;

class User {
  /**
   * Returns whether a user is authenticated of not.
   *
   * @static
   * @returns {boolean}
   * @memberof User
   */
  static isAuthenticated() {
    const state = selectStatus(store.getState());
    if (state === "unauthenticated" || state === "attempting") {
      if (hasToken("user")) {
        store.dispatch(authenticationSucceeded());
      } else if (state === "attempting" && !attemptingThisRequest) {
        store.dispatch(authenticationFailed());
      }
    }
    return selectStatus(store.getState()) === "authenticated";
  }

  static authenticate(loginUrl) {
    // Switch state to attempting and flush state to session storage
    // before redirecting.
    store.dispatch(attemptAuthentication()).then(() => persistor.flush());
    // console.log(loginUrl);
    attemptingThisRequest = true;
    window.location.href = loginUrl;
  }

  static authenticationFailed() {
    // isAuthenticated() will ensure state is up to date.
    return (
      !this.isAuthenticated() && selectStatus(store.getState()) === "failed"
    );
  }
}

export default User;

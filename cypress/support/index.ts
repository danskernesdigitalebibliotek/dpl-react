// According to the documentation of types and Cypress commands
// the namespace is declared like it is done here. Therefore we'll bypass errors about it.
/* eslint-disable @typescript-eslint/no-namespace */
import "@cypress/code-coverage/support";

const TOKEN_USER_KEY = "user";

Cypress.Commands.add("createFakeAuthenticatedSession", () => {
  window.sessionStorage.setItem(TOKEN_USER_KEY, "999");
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Pretend that a user is logged in.
       * @example cy.createFakeAuthenticatedSession()
       */
      createFakeAuthenticatedSession(): Chainable<Element>;
    }
  }
}

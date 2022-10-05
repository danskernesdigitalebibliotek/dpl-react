// According to the documentation of types and Cypress commands
// the namespace is declared like it is done here. Therefore we'll bypass errors about it.
/* eslint-disable @typescript-eslint/no-namespace */
import "@cypress/code-coverage/support";
import { hasOperationName } from "../utils/graphql-test-utils";

const TOKEN_USER_KEY = "user";

Cypress.Commands.add("createFakeAuthenticatedSession", () => {
  // Since the user token is shared in storybook by setting it in sessionStorage
  // we can use that and fake that we have a inlogged user session
  // by using the same principle.
  // See userToken handling in .storybbok/preview.js.
  window.sessionStorage.setItem(TOKEN_USER_KEY, "999");
});

Cypress.Commands.add(
  "interceptGraphql",
  (operationName: string, fixture: string) => {
    cy.intercept("POST", "**/opac/graphql", (req) => {
      if (hasOperationName(req, operationName)) {
        req.reply({
          fixture
        });
      }
    }).as(`${operationName} Graphql query`);
  }
);

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Pretend that a user is logged in.
       * @example cy.createFakeAuthenticatedSession()
       */
      createFakeAuthenticatedSession(): void;
      interceptGraphql(operationName: string, fixture: string): void;
    }
  }
}

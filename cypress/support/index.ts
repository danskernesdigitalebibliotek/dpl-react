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

type InterceptGraphqlParams = {
  operationName: string;
  fixture: string;
};
Cypress.Commands.add(
  "interceptGraphql",
  ({ operationName, fixture }: InterceptGraphqlParams) => {
    cy.intercept("POST", "**/opac/graphql", (req) => {
      if (hasOperationName(req, operationName)) {
        req.reply({
          fixture
        });
      }
    }).as(`${operationName} Graphql query`);
  }
);
type InterceptRestParams = {
  name: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  fixture: string;
};

Cypress.Commands.add(
  "interceptRest",
  ({ name, method = "GET", url, fixture }: InterceptRestParams) => {
    cy.fixture(fixture)
      .then((result) => {
        cy.intercept(method, url, result);
      })
      .as(name);
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
      interceptGraphql(prams: InterceptGraphqlParams): void;
      interceptRest(params: InterceptRestParams): void;
    }
  }
}

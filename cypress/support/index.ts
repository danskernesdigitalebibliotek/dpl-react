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

/**
 * interceptGraphql is used to make a graphQLrequest that returns fixture data
 *
 * @param {string} operationName The name of the operation to be mocked.
 * @param {string} fixtureFilePath The path to the fixture file to use as response
 *
 */
type InterceptGraphqlParams = {
  operationName: string;
  fixtureFilePath: string;
};
Cypress.Commands.add(
  "interceptGraphql",
  ({ operationName, fixtureFilePath }: InterceptGraphqlParams) => {
    cy.intercept("POST", "**/opac/graphql", (req) => {
      if (hasOperationName(req, operationName)) {
        req.reply({
          fixture: fixtureFilePath
        });
      }
    }).as(`${operationName} GraphQL operation`);
  }
);
/**
 * interceptRest is used to make a REST HTTP request that returns fixture data
 *
 * @param {string} aliasName The name of the alias to use for the request
 * @param {"GET" | "POST" | "PUT" | "DELETE"} httpMethod The HTTP method to intercept
 * @param {string} url The URL to intercept
 * @param {string} fixtureFilePath The path to the fixture file to use as response
 *
 */
type InterceptRestParams = {
  aliasName: string;
  httpMethod?: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  fixtureFilePath: string;
};
Cypress.Commands.add(
  "interceptRest",
  ({
    aliasName,
    httpMethod = "GET",
    url,
    fixtureFilePath
  }: InterceptRestParams) => {
    cy.fixture(fixtureFilePath)
      .then((result) => {
        cy.intercept(httpMethod, url, result);
      })
      .as(aliasName);
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

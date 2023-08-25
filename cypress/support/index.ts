// According to the documentation of types and Cypress commands
// the namespace is declared like it is done here. Therefore we'll bypass errors about it.
/* eslint-disable @typescript-eslint/no-namespace */
import "@cypress/code-coverage/support";
import { hasOperationName } from "../utils/graphql-test-utils";

const TOKEN_LIBRARY_KEY = "library";
const TOKEN_USER_KEY = "user";

Cypress.Commands.add("createFakeLibrarySession", () => {
  // Since the user token is shared in storybook by setting it in sessionStorage
  // we can use that and fake that we have a library session
  // by using the same principle.
  // See libraryToken handling in .storybook/preview.js.
  window.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "999");
});

Cypress.Commands.add("createFakeAuthenticatedSession", () => {
  // Since the user token is shared in storybook by setting it in sessionStorage
  // we can use that and fake that we have a inlogged user session
  // by using the same principle.
  // See userToken handling in .storybook/preview.js.
  window.sessionStorage.setItem(TOKEN_USER_KEY, "999");
});

Cypress.Commands.add("createFakeLibrarySession", () => {
  // Since the user token is shared in storybook by setting it in sessionStorage
  // we can use that and fake that we have a inlogged user session
  // by using the same principle.
  // See userToken handling in .storybbok/preview.js.
  window.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
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
  fixtureFilePath?: string;
  statusCode?: number;
};
Cypress.Commands.add(
  "interceptGraphql",
  ({
    operationName,
    fixtureFilePath,
    statusCode = 200
  }: InterceptGraphqlParams) => {
    cy.intercept("POST", "**/next/graphql", (req) => {
      if (hasOperationName(req, operationName)) {
        if (fixtureFilePath) {
          req.reply({ fixture: fixtureFilePath, statusCode });
        } else {
          req.reply({ statusCode });
        }
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

// Data cy attribute selector helpers.
const visible = (checkVisible: boolean) => (checkVisible ? ":visible" : "");
Cypress.Commands.add("getBySel", (selector, checkVisible = false, ...args) => {
  return cy.get(`[data-cy="${selector}"]${visible(checkVisible)}`, ...args);
});
Cypress.Commands.add(
  "getBySelLike",
  (selector, checkVisible = false, ...args) => {
    return cy.get(`[data-cy*="${selector}"]${visible(checkVisible)}`, ...args);
  }
);
Cypress.Commands.add(
  "getBySelStartEnd",
  (startSelector, endSelector, checkVisible = false, ...args) => {
    const v = visible(checkVisible);
    return cy.get(
      `[data-cy^="${startSelector}"]${v}[data-cy$="${endSelector}"]${v}`,
      ...args
    );
  }
);

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Pretend that a user is logged in.
       * @example cy.createFakeAuthenticatedSession()
       */
      createFakeLibrarySession(): void;
      createFakeAuthenticatedSession(): void;
      createFakeLibrarySession(): void;
      interceptGraphql(prams: InterceptGraphqlParams): void;
      interceptRest(params: InterceptRestParams): void;
      getBySel(
        selector: string,
        checkVisible?: boolean,
        ...args: unknown[]
      ): Chainable;
      getBySelLike(
        selector: string,
        checkVisible?: boolean,
        ...args: unknown[]
      ): Chainable;
      getBySelStartEnd(
        startSelector: string,
        endSelector: string,
        checkVisible?: boolean,
        ...args: unknown[]
      ): Chainable;
    }
  }
}

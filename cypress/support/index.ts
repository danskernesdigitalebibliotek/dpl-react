// According to the documentation of types and Cypress commands
// the namespace is declared like it is done here. Therefore we'll bypass errors about it.
/* eslint-disable @typescript-eslint/no-namespace */
import "@cypress/code-coverage/support";
import { hasOperationName } from "../utils/graphql-test-utils";
import { Operations } from "../../src/core/dbc-gateway/types";

// Install cypress-terminal-report logs collector
require("cypress-terminal-report/src/installLogsCollector")();

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

/**
 * interceptGraphql is used to make a graphQLrequest that returns fixture data
 *
 * @param {Operations} operationName The name of the operation to be mocked.
 * @param {string} fixtureFilePath The path to the fixture file to use as response
 *
 */
type InterceptGraphqlParams = {
  operationName: Operations;
  fixtureFilePath?: string;
  body?: unknown;
  statusCode?: number;
};
Cypress.Commands.add(
  "interceptGraphql",
  ({
    operationName,
    fixtureFilePath,
    body,
    statusCode = 200
  }: InterceptGraphqlParams) => {
    cy.intercept("POST", "**/next*/graphql", (req) => {
      if (hasOperationName(req, operationName)) {
        if (fixtureFilePath) {
          req.reply({ fixture: fixtureFilePath, statusCode });
        } else if (body) {
          req.reply({ statusCode, body });
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
Cypress.Commands.add("getBySel", (selector, checkVisible = false) => {
  return cy.get(`[data-cy="${selector}"]${visible(checkVisible)}`);
});
Cypress.Commands.add("getBySelLike", (selector, checkVisible = false) => {
  return cy.get(`[data-cy*="${selector}"]${visible(checkVisible)}`);
});
Cypress.Commands.add(
  "getBySelStartEnd",
  (startSelector, endSelector, checkVisible = false) => {
    const v = visible(checkVisible);
    return cy.get(
      `[data-cy^="${startSelector}"]${v}[data-cy$="${endSelector}"]${v}`
    );
  }
);

/**
 * Check that an element contains all specified texts
 * @param texts Array of texts to check for
 * @example cy.get('.tags').shouldContainAll(['tag1', 'tag2', 'tag3'])
 */
Cypress.Commands.add(
  "shouldContainAll",
  { prevSubject: true },
  (subject, texts: string[]) => {
    cy.wrap(subject).within(() => {
      texts.forEach((text) => {
        cy.contains(text).scrollIntoView();
        cy.contains(text).should("be.visible");
      });
    });
    return cy.wrap(subject);
  }
);

/**
 * Mock geolocation
 * @param latitude Latitude to mock
 * @param longitude Longitude to mock
 * @example cy.mockGeolocation(55.9383, 12.3036) // Coordinates near Suomisvej 2, 3310 Ølsted
 */
Cypress.Commands.add(
  "mockGeolocation",
  (latitude: number, longitude: number) => {
    cy.window().then(($window) => {
      cy.stub(
        $window.navigator.geolocation,
        "getCurrentPosition",
        (callback) => {
          return callback({ coords: { latitude, longitude } });
        }
      );
    });
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
      interceptGraphql(params: InterceptGraphqlParams): void;
      interceptRest(params: InterceptRestParams): void;
      getBySel(selector: string, checkVisible?: boolean): Chainable;
      getBySelLike(selector: string, checkVisible?: boolean): Chainable;
      getBySelStartEnd(
        startSelector: string,
        endSelector: string,
        checkVisible?: boolean
      ): Chainable;
      /**
       * Check that an element contains all specified texts
       * @example cy.get('.tags').shouldContainAll(['tag1', 'tag2'])
       */
      shouldContainAll(texts: string[]): Chainable;
      mockGeolocation(latitude: number, longitude: number): void;
    }
  }
}

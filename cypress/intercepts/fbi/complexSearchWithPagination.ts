import {
  buildComplexSearchWithPaginationResponse,
  buildComplexSearchWithPaginationEmptyResponse
} from "../../factories/fbi/complexSearchWithPagination.factory";

export const givenComplexSearchWithPaginationResponse = () => {
  cy.interceptGraphql({
    operationName: "complexSearchWithPagination",
    body: buildComplexSearchWithPaginationResponse()
  });
};

export const givenComplexSearchWithPaginationEmptyResponse = () => {
  cy.interceptGraphql({
    operationName: "complexSearchWithPagination",
    body: buildComplexSearchWithPaginationEmptyResponse()
  });
};

/**
 * Intercept and alias for verifying sort parameter in GraphQL request
 */
export const givenComplexSearchWithPaginationResponseAndAlias = (
  alias: string
) => {
  cy.intercept("POST", "**/graphql", (req) => {
    if (req.body?.operationName === "complexSearchWithPagination") {
      req.reply(buildComplexSearchWithPaginationResponse());
    }
  }).as(alias);
};

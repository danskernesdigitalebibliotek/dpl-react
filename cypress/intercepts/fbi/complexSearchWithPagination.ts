import {
  buildComplexSearchWithPaginationResponse,
  buildComplexSearchWithPaginationResponseWithWorks,
  buildComplexSearchWithPaginationEmptyResponse
} from "../../factories/fbi/complexSearchWithPagination.factory";

export const givenComplexSearchWithPaginationResponse = () => {
  cy.interceptGraphql({
    operationName: "complexSearchWithPagination",
    body: buildComplexSearchWithPaginationResponse()
  });
};

export const givenComplexSearchWithPaginationResponseWithWorks = (
  workCount: number
) => {
  cy.interceptGraphql({
    operationName: "complexSearchWithPagination",
    body: buildComplexSearchWithPaginationResponseWithWorks(workCount)
  });
};

export const givenComplexSearchWithPaginationEmptyResponse = () => {
  cy.interceptGraphql({
    operationName: "complexSearchWithPagination",
    body: buildComplexSearchWithPaginationEmptyResponse()
  });
};

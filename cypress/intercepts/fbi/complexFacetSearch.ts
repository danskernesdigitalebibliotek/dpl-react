import { buildComplexFacetSearchResponse } from "../../factories/fbi/complexFacetSearch.factory";

export const givenComplexFacetSearchResponse = () => {
  cy.interceptGraphql({
    operationName: "complexFacetSearch",
    body: buildComplexFacetSearchResponse()
  });
};

import { buildComplexSuggestResponse } from "../../factories/fbi/complexSuggest.factory";

export const givenComplexSuggestResponse = (suggestions?: any) => {
  cy.interceptGraphql({
    operationName: "complexSuggest",
    body: buildComplexSuggestResponse(suggestions)
  });
};

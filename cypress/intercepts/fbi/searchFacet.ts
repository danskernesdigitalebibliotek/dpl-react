export const givenSearchFacetResponse = () => {
  cy.interceptGraphql({
    operationName: "searchFacet",
    fixtureFilePath: "search-result/facet-browser/searchFacet.json"
  });
};

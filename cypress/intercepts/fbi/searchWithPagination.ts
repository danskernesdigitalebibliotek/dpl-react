export const givenSearchWithPaginationResponse = () => {
  cy.interceptGraphql({
    operationName: "searchWithPagination",
    fixtureFilePath: "search-result/facet-browser/searchWithPagination.json"
  });
};

export const givenSearchWithPaginationEmptyResponse = () => {
  cy.interceptGraphql({
    operationName: "searchWithPagination",
    body: {
      data: {
        search: {
          hitcount: 0,
          works: []
        }
      }
    }
  });
};

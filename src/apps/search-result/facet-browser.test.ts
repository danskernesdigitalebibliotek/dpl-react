const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Facet Browser", () => {
  it("Render the search-result site", () => {
    cy.interceptGraphql({
      operationName: "searchFacet",
      fixtureFilePath: "search-result/facet-browser/searchFacet"
    });

    cy.interceptGraphql({
      operationName: "searchWithPagination",
      fixtureFilePath: "search-result/facet-browser/searchWithPagination"
    });
    cy.visit("/iframe.html?id=apps-search-result--search-result");
  });

  it("Show results", () => {
    cy.contains("h1", "“harry” (703)");
  });

  it("Open facet browser", () => {
    cy.contains("button", "+ FLERE FILTRE").click();
  });

  it("Click on creators", () => {
    cy.contains("Creators").click();
  });

  it("Click on Joanne K. Rowling", () => {
    cy.contains("button", "Joanne K. Rowling").click();

    it("Close facet browser", () => {
      cy.get(`[aria-label="Close facet browser modal"]`).click({
        multiple: true,
        force: true
      });
    });

    cy.interceptGraphql({
      operationName: "searchFacet",
      fixtureFilePath:
        "search-result/facet-browser/searchFacet_terms_joanne-k-rowling"
    });

    cy.interceptGraphql({
      operationName: "searchWithPagination",
      fixtureFilePath:
        "search-result/facet-browser/searchWithPagination_terms_joanne-k-rowling"
    });
    cy.visit("/iframe.html?id=apps-search-result--search-result");
  });

  it("Show updatet results", () => {
    cy.contains("h1", "“harry” (36)");
  });

  beforeEach(() => {
    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability.json"
    });

    // Intercept all images from Cloudinary.
    cy.intercept(
      {
        url: coverUrlPattern
      },
      {
        fixture: "images/cover.jpg"
      }
    ).as("Harry Potter cover");

    // Intercept covers.
    cy.fixture("cover.json")
      .then((result) => {
        cy.intercept("GET", "**/covers**", result);
      })
      .as("Cover service");

    // Intercept material list service.
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404,
      body: {}
    }).as("Material list service");
  });
});

export {};

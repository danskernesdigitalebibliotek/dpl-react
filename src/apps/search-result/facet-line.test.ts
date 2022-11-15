const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("The facet line", () => {
  it("renders search page and select lydbog from facet-line term", () => {
    cy.get("article").first().contains("Harry : samtaler med prinsen");
    cy.interceptGraphql({
      operationName: "searchWithPagination",
      fixtureFilePath:
        "search-result/facet-browser/searchWithPagination_terms_lydbog"
    });

    cy.contains("button", "lydbog")
      .should("have.attr", "aria-pressed", "false")
      .click()
      .should("not.have.attr", "aria-pressed", "false");

    cy.contains(".facet-line-selected-terms button", "lydbog").should(
      "have.attr",
      "aria-pressed",
      "true"
    );

    cy.contains(".facet-line-selected-terms button", "lydbog")
      .should("have.attr", "aria-pressed", "true")
      .click();
  });

  it("renders search page and select krimi from facet-line dropdown", () => {
    cy.interceptGraphql({
      operationName: "searchWithPagination",
      fixtureFilePath:
        "search-result/facet-browser/searchWithPagination_terms_krimi"
    });
    cy.get('[aria-label="genreAndForm"]').select("krimi");

    cy.contains(".facet-line-selected-terms button", "krimi").should(
      "have.attr",
      "aria-pressed",
      "true"
    );

    cy.get(".search-result-page__list").first().contains("Kniv");

    cy.contains("button", "+ more filters").click();

    cy.contains("#facet-genreAndForm button", "krimi").should(
      "have.attr",
      "aria-pressed",
      "true"
    );

    cy.get(`[aria-label="Close facet browser modal"]`).click();

    cy.contains(".facet-line-selected-terms button", "krimi")
      .should("have.attr", "aria-pressed", "true")
      .click();

    cy.contains("button", "+ more filters").click();

    cy.get('[aria-controls="facet-genreAndForm"]')
      .click()
      .contains("button", "krimi")
      .should("have.attr", "aria-pressed", "false");

    cy.get(`[aria-label="Close facet browser modal"]`).click();
  });

  beforeEach(() => {
    cy.interceptGraphql({
      operationName: "searchFacet",
      fixtureFilePath: "search-result/facet-browser/searchFacet"
    });

    cy.interceptGraphql({
      operationName: "searchWithPagination",
      fixtureFilePath: "search-result/facet-browser/searchWithPagination"
    });

    cy.interceptGraphql({
      operationName: "intelligentFacets",
      fixtureFilePath: "search-result/facet-browser/intelligentFacets.json"
    });

    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability.json"
    });

    cy.fixture("cover.json")
      .then((result) => {
        cy.intercept("GET", "**/covers**", result);
      })
      .as("Cover service");

    // Intercept all images from Cloudinary.
    cy.intercept(
      {
        url: coverUrlPattern
      },
      {
        fixture: "images/cover.jpg"
      }
    ).as("Harry Potter cover");

    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404,
      body: {}
    }).as("Material list service");

    cy.visit("/iframe.html?id=apps-search-result--search-result");
  });
});
export {};

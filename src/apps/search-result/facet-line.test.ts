const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("The facet line", () => {
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

  it("renders facets with a single term as a button", () => {
    cy.getBySel("facet-line-term-lydbog (net)").should("be.visible");
  });

  it("renders facets with multiple terms as a drop down", () => {
    cy.get('[aria-label="genreAndForm"]')
      .should("be.visible")
      .find("option")
      .should("have.length", 4);

    cy.get('[aria-label="mainLanguages"]')
      .should("be.visible")
      .find("option")
      .should("have.length", 4);
  });

  it("Updates the search result when facets are selected", () => {
    cy.interceptGraphql({
      operationName: "searchWithPagination",
      fixtureFilePath:
        "search-result/facet-browser/searchWithPagination_terms_krimi"
    });
    cy.get('[aria-label="genreAndForm"]').select("krimi");

    cy.getBySel("facet-line-selected-term-krimi")
      .should("be.visible")
      .and("have.attr", "aria-pressed", "true");

    cy.wait("@searchWithPagination GraphQL operation")
      .getBySel("search-result-list")
      .should("be.visible")
      .and("contain", "Kniv");
  });

  it("Shows selected term in facet line", () => {
    cy.getBySel("facet-line-term-lydbog (net)")
      .should("be.visible")
      .and("have.attr", "aria-pressed", "false")
      .click();
    cy.getBySel("facet-line-selected-term-lydbog (net)").should(
      "have.attr",
      "aria-pressed",
      "true"
    );

    cy.get('[aria-label="genreAndForm"]').select("krimi");
    cy.getBySel("facet-line-selected-term-krimi").should(
      "have.attr",
      "aria-pressed",
      "true"
    );
  });

  it("Supports removal of selected terms", () => {
    cy.getBySel("facet-line-term-lydbog (net)")
      .should("be.visible")
      .and("have.attr", "aria-pressed", "false")
      .click();
    cy.getBySel("facet-line-selected-term-lydbog (net)")
      .should("have.attr", "aria-pressed", "true")
      .click();

    cy.get('[aria-label="genreAndForm"]').select("krimi");
    cy.getBySel("facet-line-selected-term-krimi")
      .should("have.attr", "aria-pressed", "true")
      .click();
  });

  it("Renders selected term in facet browser as selected", () => {
    cy.get('[aria-label="genreAndForm"]').select("krimi");

    cy.getBySel("facet-line-open-browser").click();

    cy.getBySel("facet-browser-genreAndForm-krimi").should(
      "have.attr",
      "aria-pressed",
      "true"
    );

    cy.get(`[aria-label="Close facet browser modal"]`).click();

    cy.getBySel("facet-line-selected-term-krimi")
      .should("be.visible")
      .and("have.attr", "aria-pressed", "true")
      .click();

    cy.getBySel("facet-line-open-browser").click();

    cy.get(`[aria-controls="facet-genreAndForm"]`).should(
      "have.attr",
      "aria-expanded",
      "false"
    );

    cy.get(`[aria-label="Close facet browser modal"]`).click();
  });
});
export {};

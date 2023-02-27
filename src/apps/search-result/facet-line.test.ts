const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("The facet line", () => {
  beforeEach(() => {
    // Clear the session storage to avoid previously saved facets
    cy.window().then((win) => {
      win.sessionStorage.removeItem("persist:dpl-react");
    });
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
      fixtureFilePath: "search-result/facet-line/intelligentFacets"
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

  it("Renders facets with a single term as a button", () => {
    cy.getBySel("facet-line-term-lydbog (net)").should("be.visible");
  });

  it("Renders facets with multiple terms as a drop down", () => {
    cy.getBySel("facet-line-genreAndForm-dropdown")
      .should("be.visible")
      .find("option")
      .should("have.length", 4);

    cy.getBySel("facet-line-mainLanguages-dropdown")
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
    cy.getBySel("facet-line-genreAndForm-dropdown").select("krimi");

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

    cy.url().should("include", "filters=usePersistedFilters");

    cy.getBySel("facet-line-selected-term-lydbog (net)").should(
      "have.attr",
      "aria-pressed",
      "true"
    );

    cy.getBySel("facet-line-genreAndForm-dropdown").select("krimi");
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

    cy.url().should("include", "filters=usePersistedFilters");

    cy.getBySel("facet-line-selected-term-lydbog (net)")
      .should("have.attr", "aria-pressed", "true")
      .click();

    cy.getBySel("facet-line-genreAndForm-dropdown").select("krimi");
    cy.getBySel("facet-line-selected-term-krimi")
      .should("have.attr", "aria-pressed", "true")
      .click();
  });

  it("Renders selected term in facet browser as selected", () => {
    cy.getBySel("facet-line-genreAndForm-dropdown").select("krimi");

    cy.getBySel("facet-line-open-browser").click();

    cy.getBySel("facet-browser-genreAndForm-krimi").should(
      "have.attr",
      "aria-pressed",
      "true"
    );

    cy.getBySel("modal-facet-browser-modal-close-button").click();

    cy.getBySel("facet-line-selected-term-krimi")
      .should("be.visible")
      .and("have.attr", "aria-pressed", "true")
      .click();

    cy.getBySel("facet-line-open-browser").click();

    cy.getBySel("facet-browser-genreAndForm").should(
      "have.attr",
      "aria-expanded",
      "false"
    );

    cy.getBySel("modal-facet-browser-modal-close-button").click();
  });

  it("Remembers previously selected facet after reload the page without using the cache", () => {
    cy.getBySel("facet-line-term-lydbog (net)")
      .should("be.visible")
      .and("have.attr", "aria-pressed", "false")
      .click();

    cy.url().should("include", "filters=usePersistedFilters");

    cy.reload(true);

    cy.url().should("include", "filters=usePersistedFilters");

    cy.getBySel("facet-line-selected-term-lydbog (net)").should(
      "have.attr",
      "aria-pressed",
      "true"
    );
  });

  it("Clear all selected facets when filters not present in url", () => {
    cy.getBySel("facet-line-term-lydbog (net)")
      .should("be.visible")
      .and("have.attr", "aria-pressed", "false")
      .click();

    cy.url().should("include", "filters=usePersistedFilters");

    cy.getBySel("facet-line-selected-term-lydbog (net)").should(
      "have.attr",
      "aria-pressed",
      "true"
    );

    cy.visit(
      "/iframe.html?args=q%3Alange+peter&id=apps-search-result--search-result"
    );

    cy.url().should("not.include", "filters=usePersistedFilters");

    cy.getBySel("facet-line-term-lydbog (net)")
      .should("be.visible")
      .and("have.attr", "aria-pressed", "false");
  });
});
export {};

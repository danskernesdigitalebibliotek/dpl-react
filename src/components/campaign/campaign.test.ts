export function isImageLoaded(cy: Cypress.cy) {
  cy.getBySel("campaign-image")
    .should("be.visible")
    .and("have.prop", "naturalWidth")
    .should("be.greaterThan", 0);
}

describe("Campaign", () => {
  beforeEach(() => {
    // Intercept graphql search query.
    cy.interceptGraphql({
      operationName: "searchWithPagination",
      fixtureFilePath: "search-result/fbi-api"
    });

    // Intercept graphql facet query.
    cy.interceptGraphql({
      operationName: "searchFacet",
      fixtureFilePath: "search-result/facet-query-result"
    });

    // Intercept covers.
    cy.interceptGraphql({
      operationName: "GetCoversByPids",
      fixtureFilePath: "cover.json"
    });

    // Intercept availability service.
    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability.json"
    });

    // Intercept material list service.
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404,
      body: {}
    }).as("Material list service");

    cy.interceptGraphql({
      operationName: "intelligentFacets",
      fixtureFilePath: "search-result/facet-line/intelligentFacets"
    });

    cy.visit(
      "/iframe.html?id=apps-search-result--primary&args=pageSizeDesktop:2;pageSizeMobile:2"
    );
  });

  it("Shows a full campaign with image, text & link", () => {
    cy.interceptRest({
      aliasName: "Campaign service - full campaign",
      url: "**/dpl_campaign/**",
      httpMethod: "POST",
      fixtureFilePath: "search-result/campaign.json"
    });

    isImageLoaded(cy);
    cy.getBySel("campaign-image").should("have.attr", "alt");
    cy.getBySel("campaign-body").scrollIntoView({ duration: 500 });
    cy.getBySel("campaign-body").should("be.visible").contains("Harry Potter");
  });

  it("Shows a text-only campaign without an image", () => {
    cy.interceptRest({
      aliasName: "Campaign service - text only campaign",
      url: "**/dpl_campaign/**",
      httpMethod: "POST",
      fixtureFilePath: "search-result/campaign-text-only.json"
    });

    cy.getBySel("campaign-body")
      .should("be.visible")
      .should("contain.text", "Harry Potter");
    cy.getBySel("campaign-body")
      .should("be.visible")
      .find("img")
      .should("not.exist");
  });

  it("Shows an image-only campaign without text", () => {
    cy.interceptRest({
      aliasName: "Campaign service - image only campaign",
      url: "**/dpl_campaign/**",
      httpMethod: "POST",
      fixtureFilePath: "search-result/campaign-image-only.json"
    });

    isImageLoaded(cy);
    cy.getBySel("campaign-image").should("have.attr", "alt");
    cy.getBySel("campaign-body")
      .should("be.visible")
      .children()
      .should("have.length", 1);
  });
});

export default {};

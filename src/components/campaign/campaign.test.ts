const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

export function isImageLoaded(cy: Cypress.cy & EventEmitter) {
  cy.get("img")
    .should("be.visible")
    .and("have.prop", "naturalWidth")
    .should("be.greaterThan", 0);
}

describe("Campaign", () => {
  it("Shows a full campaign with image, text & link", () => {
    cy.wait([
      "@searchFacet GraphQL operation",
      "@searchWithPagination GraphQL operation",
      "@Campaign service - full campaign"
    ]);
    isImageLoaded(cy);
    cy.get("img").should("have.attr", "alt");
    cy.get("section").contains("Harry Potter");
    cy.get("a")
      .first()
      .should(
        "have.attr",
        "href",
        "http://localhost/?path=/story/apps-search-result--search-result"
      );
  });

  it.only("Shows a text-only campaign without an image", () => {
    cy.wait([
      "@searchFacet GraphQL operation",
      "@searchWithPagination GraphQL operation",
      "@Campaign service - text only campaign"
    ]);
    cy.get("section").should("contain.text", "Harry Potter");
    cy.get("section").find("img").should("not.exist");
  });

  it("Shows an image-only campaign without text", () => {
    cy.interceptRest({
      httpMethod: "POST",
      aliasName: "Campaign service - image only campaign",
      url: "**/dpl_campaign/match",
      fixtureFilePath: "search-result/campaign-image-only.json"
    });

    isImageLoaded(cy);
    cy.get("img").should("have.attr", "alt");
    cy.get("section").find("Lorem ipsum Harry Potter").should("not.exist");
  });

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
    cy.interceptRest({
      aliasName: "Cover service",
      url: "**/api/v2/covers?**",
      fixtureFilePath: "cover.json"
    });

    // Intercept availability service.
    cy.interceptRest({
      aliasName: "Availability service",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability.json"
    });

    // Intercept material list service.
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404,
      body: {}
    }).as("Material list service");

    cy.interceptRest({
      aliasName: "Campaign service - full campaign",
      url: "**/dpl_campaign/match",
      fixtureFilePath: "search-result/campaign.json"
    });

    cy.interceptRest({
      httpMethod: "POST",
      aliasName: "Campaign service - text only campaign",
      url: "**/dpl_campaign/match",
      fixtureFilePath: "search-result/campaign-text-only.json"
    });

    cy.visit(
      "/iframe.html?id=apps-search-result--search-result&args=pageSizeDesktop:2;pageSizeMobile:2"
    );
  });
});

export default {};

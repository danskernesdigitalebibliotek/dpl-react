const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

export function isImageLoaded(cy: Cypress.cy & EventEmitter) {
  cy.get("img")
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

    // Intercept availability service.
    cy.intercept("GET", "**/availability/v3**", {
      statusCode: 200,
      body: [
        {
          recordId: "99999999",
          reservable: true,
          available: true,
          reservations: 5
        }
      ]
    }).as("Availability service");

    // Intercept material list service.
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404,
      body: {}
    }).as("Material list service");

    cy.visit(
      "/iframe.html?id=apps-search-result--search-result&args=pageSizeDesktop:2;pageSizeMobile:2"
    );
  });

  it("Shows a full campaign with image, text & link", () => {
    cy.fixture("search-result/campaign.json")
      .then((result) => {
        cy.intercept("**/dpl_campaign/match", result);
      })
      .as("Campaign service - full campaign");

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

  it("Shows a text-only campaign without an image", () => {
    cy.fixture("search-result/campaign-text-only.json")
      .then((result) => {
        cy.intercept("POST", "**/dpl_campaign/match", result);
      })
      .as("Campaign service - text only campaign");

    cy.get("section").should("contain.text", "Harry Potter");
    cy.get("section").find("img").should("not.exist");
  });

  it("Shows an image-only campaign without text", () => {
    cy.fixture("search-result/campaign-image-only.json")
      .then((result) => {
        cy.intercept("POST", "**/dpl_campaign/match", result);
      })
      .as("Campaign service - image only campaign");

    isImageLoaded(cy);
    cy.get("img").should("have.attr", "alt");
    cy.get("section").find("Lorem ipsum Harry Potter").should("not.exist");
  });
});

export default {};

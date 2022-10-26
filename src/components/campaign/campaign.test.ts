const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Find on shelf modal - default", () => {
  beforeEach(() => {
    // Intercept graphql search query.
    cy.fixture("search-result/fbi-api.json")
      .then((result) => {
        cy.intercept("POST", "**/opac/graphql**", result);
      })
      .as("Graphql search query");

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

  it("Shows a full campaign", () => {
    // Intercept campaign data call - full campaign.
    cy.fixture("search-result/campaign.json")
      .then((result) => {
        cy.intercept("POST", "**/dpl_campaign/match", result);
      })
      .as("Campaign service");

    cy.get("section").contains("Lorem ipsum Harry Potter");
  });

  it("Shows a text-only campaign without an image", () => {
    // Intercept campaign data call - full campaign.
    cy.fixture("search-result/campaign-text-only.json")
      .then((result) => {
        cy.intercept("POST", "**/dpl_campaign/match", result);
      })
      .as("Campaign service");

    cy.get("section").find("img").should("not.exist");
  });

  it("Shows an image-only campaign without text", () => {
    // Intercept campaign data call - full campaign.
    cy.fixture("search-result/campaign-image-only.json")
      .then((result) => {
        cy.intercept("POST", "**/dpl_campaign/match", result);
      })
      .as("Campaign service");

    cy.get("section").find("Lorem ipsum Harry Potter").should("not.exist");
  });
});

export {};

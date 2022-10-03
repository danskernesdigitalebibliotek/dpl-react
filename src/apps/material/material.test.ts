const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Material", () => {
  it("Does the Material have title?", () => {
    cy.get(".text-header-h1").should("be.visible");
  });

  it("Check that cover has a src", () => {
    cy.get("img").should("have.attr", "src").and("match", coverUrlPattern);
  });

  it("Does the material have favourite buttons?", () => {
    cy.get(".button-favourite").should(
      "have.attr",
      "aria-label",
      "Add to favorites"
    );
  });

  it("Does the material have horizontal lines?", () => {
    cy.contains("Nr. 1 in series");
    cy.contains("De syv søstre-serien");
  });

  it("Does the material have authors?", () => {
    cy.contains("Lucinda Riley");
  });

  it("Does a material have a availibility label", () => {
    cy.contains("bog");
    cy.contains("unavailable");
  });

  it("Open material details", () => {
    cy.get("details").last().click();
  });

  it("Does the material have a editions with a buttton to reserved", () => {
    cy.scrollTo("bottom");
    cy.contains("Editions (7)").click();
    cy.contains("Reserve");
  });

  it("Open modal by clicking on reserver button (reserve book) and close it with the x bottom", () => {
    cy.contains("button:visible", "Reserve bog").click();
    cy.contains("Pick up at");
    cy.contains("Hovedbiblioteket");
    cy.contains("12345678");
    cy.contains("test@test.com");
    cy.get(`[aria-label="Close reservation modal"]`).click({
      multiple: true,
      force: true
    });
  });

  it("Clicking on Aprove resevation (Godkend reservation and close modal with Ok button)", () => {
    cy.contains("button:visible", "Reserve bog").click();
    cy.contains("button:visible", "Approve reservation").click();
    cy.contains("Material is available and reserved for you!");
    cy.contains("You are number 3 in queue");
    cy.contains("button:visible", "Ok").click();
  });

  beforeEach(() => {
    // Intercept graphql material query.
    cy.fixture("material/fbi-api.json")
      .then((result) => {
        cy.intercept("POST", "**/opac/graphql", result);
      })
      .as("Graphql material query");

    cy.fixture("material/reservations.json")
      .then((result) => {
        cy.intercept("POST", "**/patrons/patronid/reservations/**", result);
      })
      .as("reservations");

    cy.fixture("material/holdings.json")
      .then((result) => {
        cy.intercept("GET", "**/agencyid/catalog/holdings/**", result);
      })
      .as("holdings");

    cy.fixture("material/branches.json")
      .then((result) => {
        cy.intercept("GET", "**/agencyid/branches", result);
      })
      .as("branches");

    cy.fixture("material/user.json")
      .then((result) => {
        cy.intercept("GET", "**/agencyid/patrons/patronid/v2", result);
      })
      .as("user");

    // Intercept covers.
    cy.intercept(
      {
        url: coverUrlPattern
      },
      {
        fixture: "images/cover.jpg"
      }
    );
    cy.fixture("cover.json")
      .then((result) => {
        cy.intercept("GET", "**/api/v2/covers?**", result);
      })
      .as("Cover service");

    // Intercept availability's service.
    cy.fixture("material/availability.json")
      .then((result) => {
        cy.intercept("GET", "**/availability/v3?recordid=**", result);
      })
      .as("Availability service");

    // Intercept like button
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");

    cy.visit("/iframe.html?args=&id=apps-material--material");
  });
});

export {};

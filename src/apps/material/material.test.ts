import {
  // aliasMutation,
  aliasQuery,
  hasOperationName
} from "../../../cypress/utils/graphql-test-utils";

const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Material", () => {
  it("Does the Material have title?", () => {
    cy.interceptGraphql("getMaterial", "material/fbi-api.json");
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.get(".text-header-h1").should("be.visible");
  });

  it("Check that cover has a src", () => {
    cy.interceptGraphql("getMaterial", "material/fbi-api.json");
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.get("img").should("have.attr", "src").and("match", coverUrlPattern);
  });

  it("Does the material have favourite buttons?", () => {
    cy.interceptGraphql("getMaterial", "material/fbi-api.json");
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.get(".button-favourite").should(
      "have.attr",
      "aria-label",
      "Add to favorites"
    );
  });

  it("Does the material have horizontal lines?", () => {
    cy.interceptGraphql("getMaterial", "material/fbi-api.json");
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.contains("Nr. 1 in series");
    cy.contains("De syv søstre-serien");
  });

  it("Does the material have authors?", () => {
    cy.interceptGraphql("getMaterial", "material/fbi-api.json");
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.contains("Lucinda Riley");
  });

  it("Does a material have a availibility label", () => {
    cy.interceptGraphql("getMaterial", "material/fbi-api.json");
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.contains("bog");
    cy.contains("unavailable");
  });

  it("Open material details", () => {
    cy.interceptGraphql("getMaterial", "material/fbi-api.json");
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.get("details").last().click();
  });

  it("Does the material have a editions with a buttton to reserved", () => {
    cy.interceptGraphql("getMaterial", "material/fbi-api.json");
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.scrollTo("bottom");
    cy.contains("Editions (7)").click();
    cy.contains("Reserve");
  });

  it("Opens modal by clicking on reserver button (reserve book) and close it with the x bottom", () => {
    cy.interceptGraphql("getMaterial", "material/fbi-api.json");
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.contains("button:visible", "Reserve bog").click();
    cy.contains("Pick up at");
    cy.contains("Hovedbiblioteket");
    cy.contains("12345678");
    cy.contains("test@test.com");
    cy.get(`[aria-label="Luk reservation modal"]`).click({
      multiple: true,
      force: true
    });
  });

  it("Clicking on Aprove resevation (Godkend reservation and close modal with Ok button)", () => {
    cy.interceptGraphql("getMaterial", "material/fbi-api.json");
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.contains("button:visible", "Reserve bog").click();
    cy.contains("button:visible", "Approve reservation").click();
    cy.contains("Material is available and reserved for you!");
    cy.contains("You are number 3 in queue");
    cy.contains("button:visible", "Ok").click();
  });

  //  periodical test.
  it("Render periodical + change to 2021, nr. 13 + Aprove resevation", () => {
    cy.fixture("material/periodical-holdings.json")
      .then((result) => {
        cy.intercept("GET", "**/agencyid/catalog/holdings/**", result);
      })
      .as("periodical holdings");

    cy.interceptGraphql("getMaterial", "material/periodical-fbi-api.json");
    cy.visit(
      "/iframe.html?id=apps-material--periodical&viewMode=story&type=periodikum"
    );
    cy.get("#year").select("2021");
    cy.get("#editions").should("have.value", "5258703091");
    cy.contains("button:visible", "Reserve periodikum").click();
    cy.contains("h2", "2021, nr. 13");
    cy.contains("button:visible", "Approve reservation").click();
    cy.contains("Material is available and reserved for you!");
    cy.contains("You are number 3 in queue");
    cy.contains("button:visible", "Ok").click();
  });

  //  infomedia test.
  it("Render infomedia + Read article + Close modal", () => {
    cy.interceptGraphql("getMaterial", "material/infomedia-fbi-api.json");
    cy.interceptGraphql("getInfomedia", "material/infomedia-article.json");
    cy.visit("/iframe.html?id=apps-material--infomedia&viewMode=story");
    cy.contains("button:visible", "Read article").click();
    cy.contains("h2", "BUTLERENS UTROLIGE HISTORIE");
    cy.get(`[aria-label="Luk infomedia modal"]`).click();
  });

  beforeEach(() => {
    cy.intercept("POST", "**/opac/graphql", (req) => {
      // Queries
      aliasQuery(req, "getMaterial");
      aliasQuery(req, "getInfomedia");
      // Mutations (not used in this test but it can be used in the future)
      // aliasMutation(req, "Login");
      // aliasMutation(req, "BookTrips");
    });

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
  });
});

export {};

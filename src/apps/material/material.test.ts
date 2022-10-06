import {
  // aliasMutation,
  aliasQuery
} from "../../../cypress/utils/graphql-test-utils";

const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Material", () => {
  it("Does the Material have title?", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixture: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.get(".text-header-h1").should("be.visible");
  });

  it("Check that cover has a src", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixture: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.get("img").should("have.attr", "src").and("match", coverUrlPattern);
  });

  it("Does the material have favourite buttons?", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixture: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.get(".button-favourite").should(
      "have.attr",
      "aria-label",
      "Add to favorites"
    );
  });

  it("Does the material have horizontal lines?", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixture: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.contains("Nr. 1 in series");
    cy.contains("De syv søstre-serien");
  });

  it("Does the material have authors?", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixture: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.contains("Lucinda Riley");
  });

  it("Does a material have a availibility label", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixture: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.contains("bog");
    cy.contains("unavailable");
  });

  it("Open material details", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixture: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.get("details").last().click();
  });

  it("Does the material have a editions with a buttton to reserved", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixture: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.scrollTo("bottom");
    cy.contains("Editions (7)").click();
    cy.contains("Reserve");
  });

  it("Opens modal by clicking on reserver button (reserve book) and close it with the x bottom", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixture: "material/fbi-api.json"
    });
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
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixture: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.contains("button:visible", "Reserve bog").click();
    cy.contains("button:visible", "Approve reservation").click();
    cy.contains("Material is available and reserved for you!");
    cy.contains("You are number 3 in queue");
    cy.contains("button:visible", "Ok").click();
  });

  //  periodical test.
  it("Render periodical + change to 2021, nr. 13 + Aprove resevation", () => {
    cy.interceptRest({
      name: "periodical holdings",
      url: "**/agencyid/catalog/holdings/**",
      fixture: "material/periodical-holdings.json"
    });

    cy.interceptGraphql({
      operationName: "getMaterial",
      fixture: "material/periodical-fbi-api.json"
    });
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
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixture: "material/infomedia-fbi-api.json"
    });
    cy.interceptGraphql({
      operationName: "getInfomedia",
      fixture: "material/infomedia-article.json"
    });

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

    cy.interceptRest({
      method: "POST",
      name: "reservations",
      url: "**/patrons/patronid/reservations/**",
      fixture: "material/reservations.json"
    });

    cy.interceptRest({
      name: "holdings",
      url: "**/agencyid/catalog/holdings/**",
      fixture: "material/holdings.json"
    });

    cy.interceptRest({
      name: "branches",
      url: "**/agencyid/branches",
      fixture: "material/branches.json"
    });

    cy.interceptRest({
      name: "user",
      url: "**/agencyid/patrons/patronid/v2",
      fixture: "material/user.json"
    });

    cy.interceptRest({
      name: "Cover",
      url: "**/api/v2/covers?**",
      fixture: "cover.json"
    });

    cy.interceptRest({
      name: "Availability",
      url: "**/availability/v3?recordid=**",
      fixture: "material/availability.json"
    });

    // Intercept like button
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");

    // Intercept covers.
    cy.intercept(
      {
        url: coverUrlPattern
      },
      {
        fixture: "images/cover.jpg"
      }
    );
  });
});

export {};

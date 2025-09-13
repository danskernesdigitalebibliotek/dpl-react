import { MaterialPage } from "../../../cypress/page-objects/material/MaterialPage";
import { buildGetMaterialResponse } from "../../../cypress/factories/material/material.factory";
import { musicMaterial } from "../../../cypress/factories/material/variants/musicMaterial";
import { interceptFbsCalls } from "../../../cypress/factories/fbs/interceptFbsCalls";

describe("Material Page Object Test", () => {
  let materialPage: MaterialPage;

  beforeEach(() => {
    // FBS service calls with realistic factory data
    interceptFbsCalls();

    // Intercept all external API calls that could cause issues

    // DBC Gateway GraphQL calls (both main and present)
    cy.intercept("POST", "**/next/graphql", {
      statusCode: 200,
      body: { data: null }
    }).as("dbcGatewayMain");

    cy.intercept("POST", "**/next-present/graphql", {
      statusCode: 200,
      body: { data: null }
    }).as("dbcGatewayPresent");

    // Material List Service calls
    cy.intercept("HEAD", "**/materiallist.dandigbib.org/list/**", {
      statusCode: 200
    }).as("materialListHead");

    cy.intercept("GET", "**/materiallist.dandigbib.org/list/**", {
      statusCode: 200,
      body: []
    }).as("materialListGet");

    // Cover service
    cy.intercept("GET", "**/api/cover", {
      statusCode: 200,
      body: []
    }).as("coverService");

    // Publizon calls
    cy.intercept("GET", "**/publizon/**", {
      statusCode: 200,
      body: {}
    }).as("publizon");
  });

  it("Should display expected content from the factory data", () => {
    // Create page with default book type
    materialPage = new MaterialPage();

    // Intercept the getMaterial GraphQL call with factory data
    cy.interceptGraphql({
      operationName: "getMaterial",
      body: buildGetMaterialResponse()
    });

    // Visit the page
    materialPage.visit([]);

    // Validate that the title element exists and contains the factory data
    materialPage.elements
      .title()
      .should("be.visible")
      .and("contain.text", "De syv søstre");

    // Check that there are 3 availability labels in the material header
    materialPage.elements.headerAvailabilityLabels().should("have.length", 3);

    // check if manifestations are rendered in material-editions-disclosure
    materialPage.components.Editions((editions) => {
      editions.open();

      editions.elements.manifestationItems().should("have.length", 4);

      // Check availability labels for each manifestation
      editions
        .getAvailabilityLabelForManifestation(0)
        .should("contain.text", "bog");
      editions
        .getAvailabilityLabelForManifestation(1)
        .should("contain.text", "bog");
      editions
        .getAvailabilityLabelForManifestation(2)
        .should("contain.text", "e-bog");
      editions
        .getAvailabilityLabelForManifestation(3)
        .should("contain.text", "lydbog");
    });
  });

  it("Should demonstrate factory flexibility with different material types", () => {
    // Create page with music/audiobook type
    materialPage = new MaterialPage("lydbog+%28cd-mp3%29");

    // Intercept the getMaterial GraphQL call with music data
    cy.interceptGraphql({
      operationName: "getMaterial",
      body: buildGetMaterialResponse(musicMaterial)
    });

    // Visit the page
    materialPage.visit([]);

    // Validate that the title shows the music album title
    materialPage.elements
      .title()
      .should("be.visible")
      .and("contain.text", "Test Music Album");
  });
});

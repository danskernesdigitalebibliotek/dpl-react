import { MaterialPage } from "../../../cypress/page-objects/material/MaterialPage";
import { interceptFbsCalls } from "../../../cypress/intercepts/fbs/interceptFbsCalls";
import {
  givenAMaterial,
  givenAMaterialMusic
} from "../../../cypress/fixtures/material";

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

    // Mock user info for authenticated user
    cy.interceptRest({
      aliasName: "UserInfo",
      url: "**/userinfo",
      fixtureFilePath: "material/userinfo.json"
    });

    // Mock FBS patron endpoint
    cy.interceptRest({
      aliasName: "FBSPatron",
      url: "**/fbs-openplatform.dbc.dk/external/agencyid/patrons/patronid/v4",
      fixtureFilePath: "material/user.json"
    });
  });

  it("Should demonstrate factory flexibility with different material types", () => {
    // Given: A material page with music factory data
    materialPage = new MaterialPage();
    givenAMaterialMusic();

    // When: The user visits the material page
    materialPage.visit([]);

    // Then: The page should display the music album title
    materialPage.elements
      .title()
      .should("be.visible")
      .and("contain.text", "Test Music Album");
  });

  it("Should display material page with correct title and availability labels", () => {
    // Given: A material page with default book type
    materialPage = new MaterialPage();
    givenAMaterial();

    // When: The user visits the material page
    materialPage.visit([]);

    // Then: The page should display the correct title
    materialPage.elements
      .title()
      .should("be.visible")
      .and("contain.text", "De syv søstre");

    // And: The header should show 3 availability labels
    materialPage.elements.headerAvailabilityLabels().should("have.length", 3);
  });

  it("Should display correct number of manifestations in editions", () => {
    // Given: A material page with default book type
    materialPage = new MaterialPage();
    givenAMaterial();

    // When: The user visits the material page
    materialPage.visit([]);

    // Then: The editions component should display 4 manifestations
    materialPage.components.DisclosureEditions((editions) => {
      editions.open();
      editions.elements.manifestationItems().should("have.length", 4);
    });
  });

  it("Should display correct availability labels for each manifestation in editions", () => {
    // Given: A material page with default book type
    materialPage = new MaterialPage();
    givenAMaterial();

    // When: The user visits the material page
    materialPage.visit([]);

    // Then: The editions component should display correct labels for each manifestation
    materialPage.components.DisclosureEditions((editions) => {
      editions.open();

      // And: First manifestation should show "bog"
      editions
        .getAvailabilityLabelForManifestation(0)
        .should("be.visible")
        .and("contain.text", "bog");
      // And: Second manifestation should show "bog"
      editions
        .getAvailabilityLabelForManifestation(1)
        .should("be.visible")
        .and("contain.text", "bog");
      // And: Third manifestation should show "e-bog"
      editions
        .getAvailabilityLabelForManifestation(2)
        .should("be.visible")
        .and("contain.text", "e-bog");
      // And: Fourth manifestation should show "lydbog"
      editions
        .getAvailabilityLabelForManifestation(3)
        .should("be.visible")
        .and("contain.text", "lydbog");
    });
  });

  it("Should display FindOnShelf with library information and availability", () => {
    // Given: A material page with default book type
    materialPage = new MaterialPage();
    givenAMaterial();

    // When: The user visits the material page
    materialPage.visit([]);
    // And: Opens FindOnShelf
    materialPage.openFindOnShelf();

    // Then: The FindOnShelf component should display the headline
    materialPage.components.ModalFindOnShelf((findOnShelf) => {
      findOnShelf.elements
        .headline()
        .should("be.visible")
        .and("contain.text", "De syv søstre : Maias historie / Lucinda Riley");

      // And: Should show at least one library disclosure
      findOnShelf.elements
        .libraryDisclosures()
        .should("have.length.at.least", 1);

      // And: The first library disclosure should show its headline and availability
      findOnShelf.getLibraryDisclosure(0).within(() => {
        cy.get(".disclosure__headline").should("be.visible");
        cy.get(".availability-label").should("be.visible");
      });
    });
  });

  it("Should allow changing edition from reservation modal", () => {
    // Given: A material page with default book type and authentication
    materialPage = new MaterialPage();
    givenAMaterial();

    // When: The user visits the material page
    materialPage.visit([]);
    // And: Creates an authenticated session
    cy.createFakeAuthenticatedSession();
    // And: Opens the reservation modal
    materialPage.openModalReservation();

    // Then: The reservation modal should show "(All editions)"
    materialPage.components.ModalReservation((modalReservation) => {
      modalReservation.elements
        .title()
        .should("contain.text", "(All editions)");
      // And: Should show "First available edition"
      modalReservation.elements
        .editionText()
        .should("be.visible")
        .and("contain.text", "Edition")
        .and("contain.text", "First available edition");
    });

    // Then: The user can change the edition
    materialPage.components.ModalReservation((modalReservation) => {
      modalReservation.changeEdition();
    });

    // Then: The editions switch modal should display with correct title
    materialPage.components.ModalEditionsSwitch((editionsSwitch) => {
      editionsSwitch.elements
        .title()
        .should("be.visible")
        .and("contain.text", "Choose Edition");
      // And: Should display multiple manifestation options
      editionsSwitch.elements
        .manifestationItems()
        .should("have.length.at.least", 2);
      // When: The user clicks choose button for a different edition (e-book from 2025)
      editionsSwitch.clickChooseButton();
    });

    // Then: The reservation modal should reflect the newly selected edition
    materialPage.components.ModalReservation((modalReservation) => {
      modalReservation.elements
        .editionText()
        .should("be.visible")
        .and("contain.text", "Edition")
        .and("contain.text", "2017 (2. udgave)");
    });
  });
});

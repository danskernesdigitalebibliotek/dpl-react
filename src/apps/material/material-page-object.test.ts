import { MaterialPage } from "../../../cypress/page-objects/material/MaterialPage";
import { interceptFbsCalls } from "../../../cypress/intercepts/fbs/interceptFbsCalls";
import { interceptPublizonCalls } from "../../../cypress/intercepts/publizon/interceptPublizonCalls";
import {
  givenAMaterial,
  givenAMaterialMusic
} from "../../../cypress/intercepts/fbi/material";
import { givenUserHasLoanedEbook } from "../../../cypress/intercepts/publizon/publizon";

describe("Material Page Object Test", () => {
  let materialPage: MaterialPage;

  beforeEach(() => {
    // FBS service calls with realistic factory data
    interceptFbsCalls();

    // Publizon service calls with factory data
    interceptPublizonCalls();

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

  describe("Material Page Content", () => {
    it("Should display title and description", () => {
      // Given: A material page
      materialPage = new MaterialPage();
      givenAMaterial();

      // When: The user visits the material page
      materialPage.visit([]);

      // Then: Title should be visible
      materialPage.elements
        .title()
        .should("be.visible")
        .and("contain.text", "De syv søstre");

      // And: Description should be visible
      materialPage.elements.descriptionSection().should("be.visible");
      materialPage.elements
        .descriptionSection()
        .should("contain.text", "Pa Salt");
    });

    it("Should display availability labels", () => {
      // Given: A material page
      materialPage = new MaterialPage();
      givenAMaterial();

      // When: The user visits the material page
      materialPage.visit([]);

      // Then: Availability labels should be visible
      materialPage.elements.headerAvailabilityLabels().should("have.length", 3);
    });

    it("Should display stock information", () => {
      // Given: A material page
      materialPage = new MaterialPage();
      givenAMaterial();

      // When: The user visits the material page
      materialPage.visit([]);

      // Then: Stock information should be visible
      materialPage.elements.stockInfo().should("be.visible");
      materialPage.elements
        .stockInfo()
        .should("contain.text", "We have 11 copies of the material in stock.");
    });

    it("Should display series information", () => {
      // Given: A material page
      materialPage = new MaterialPage();
      givenAMaterial();

      // When: The user visits the material page
      materialPage.visit([]);

      // Then: Series information should be visible
      materialPage.elements.seriesInfo().should("be.visible");
      materialPage.elements.seriesInfo().should("contain.text", "Del");
      materialPage.elements.seriesInfo().should("contain.text", "serien");

      // And: Related series materials should be shown
      materialPage.elements.seriesMembers().should("be.visible");
      materialPage.elements
        .seriesMembers()
        .should("contain.text", "De syv søstre");
      materialPage.elements
        .seriesMembers()
        .should("contain.text", "Stormsøsteren");
      materialPage.elements
        .seriesMembers()
        .should("contain.text", "Skyggesøsteren");
    });

    it("Should display tags and categories", () => {
      // Given: A material page
      materialPage = new MaterialPage();
      givenAMaterial();

      // When: The user visits the material page
      materialPage.visit([]);

      // Then: Tags should be visible
      materialPage.elements.identifierTags().should("be.visible");
      materialPage.elements.identifierTags().should("contain.text", "Tags");
      materialPage.elements
        .identifierTags()
        .should("contain.text", "kærlighed");
      materialPage.elements.identifierTags().should("contain.text", "adoption");
      materialPage.elements.identifierTags().should("contain.text", "familien");

      // And: Fictional category should be shown
      materialPage.elements.fictionNonfiction().should("be.visible");
      materialPage.elements
        .fictionNonfiction()
        .should("contain.text", "skønlitteratur");
    });
  });

  describe("Disclosures", () => {
    describe("Details Disclosure", () => {
      it("Should display material details with correct values", () => {
        // Given: A material page
        materialPage = new MaterialPage();
        givenAMaterial();

        // When: The user visits the material page
        materialPage.visit([]);

        // Then: Details disclosure should be visible
        materialPage.elements.detailsDisclosure().should("be.visible");

        // When: Opening the details disclosure
        materialPage.components.DisclosureDetails((details) => {
          // Then: Summary should show "Details"
          details.elements.summary().should("contain.text", "Details");

          details.open();

          // Then: Should display multiple detail items
          details.elements.listItems().should("have.length.at.least", 5);
          details.elements.listDescription().should("be.visible");

          // And: Should display Language
          details
            .getValueByKey("Language")
            .should("be.visible")
            .and("contain.text", "dansk");

          // And: Should display Edition
          details
            .getValueByKey("Edition")
            .should("be.visible")
            .and("contain.text", "2017 (2. udgave)");

          // And: Should display Genre
          details
            .getValueByKey("Genre")
            .should("be.visible")
            .and("contain.text", "romaner");

          // And: Should display Original title
          details
            .getValueByKey("Original title")
            .should("be.visible")
            .and("contain.text", "The seven sisters");

          // And: Should display Publisher
          details
            .getValueByKey("Publisher")
            .should("be.visible")
            .and("contain.text", "Cicero");

          // And: Should display Type
          details
            .getValueByKey("Type")
            .should("be.visible")
            .and("contain.text", "bog");

          // And: First item should have key and value
          details.getListItem(0).should("be.visible");
          details.getKeyByIndex(0).should("be.visible");
          details.getValueByIndex(0).should("be.visible");
        });
      });
    });

    describe("Editions Disclosure", () => {
      it("Should display manifestations with correct availability labels and action buttons", () => {
        // Given: A material page with default book type
        materialPage = new MaterialPage();
        givenAMaterial();

        // When: The user visits the material page and opens editions
        materialPage.visit([]);
        materialPage.components.DisclosureEditions((editions) => {
          // Then: Summary should show "Editions (4)"
          editions.elements
            .summary()
            .should("contain.text", "Editions")
            .and("contain.text", "(4)");

          editions.open();

          // Then: Should display 4 manifestations
          editions.elements.manifestationItems().should("have.length", 4);

          // And: First manifestation (physical book) should have correct availability and buttons
          editions.getManifestationItem(0).within(() => {
            cy.contains("bog").should("be.visible");
            cy.contains("Available").should("be.visible");
            cy.contains("button", "Reserve").should("be.visible");
            cy.contains("button", "Find on shelf").should("be.visible");
          });

          // And: Second manifestation (physical book unavailable) should have correct availability
          editions.getManifestationItem(1).within(() => {
            cy.contains("bog").should("be.visible");
            cy.contains("Unavailable").should("be.visible");
            cy.contains("button", "Reserve").should("be.visible");
            cy.contains("button", "Find on shelf").should("be.visible");
          });

          // And: Third manifestation (e-book) should have correct availability and button
          editions.getManifestationItem(2).within(() => {
            cy.contains("e-bog").should("be.visible");
            cy.contains("Available").should("be.visible");
            cy.contains("button", "Loan e-bog").should("be.visible");
            cy.contains("Try e-bog").should("be.visible");
          });

          // And: Fourth manifestation (audiobook) should have correct availability and buttons
          editions.getManifestationItem(3).within(() => {
            cy.contains("lydbog").should("be.visible");
            cy.contains("Unavailable").should("be.visible");
            cy.contains("button", "Can't be reserved").should("be.visible");
            cy.contains("button", "Find on shelf").should("be.visible");
          });
        });
      });

      it("Should show Read button when e-book is already loaned", () => {
        // Given: A material page with authentication and book already loaned
        materialPage = new MaterialPage();
        givenAMaterial();
        givenUserHasLoanedEbook();
        cy.createFakeAuthenticatedSession();

        // When: The user visits the material page and opens editions
        materialPage.visit([]);
        materialPage.components.DisclosureEditions((editions) => {
          editions.open();

          // Then: E-book manifestation should show Read button (because it's in loans)
          editions.getManifestationItem(2).within(() => {
            cy.contains("button", "Read e-bog").should("be.visible");
          });
        });
      });
    });
  });

  describe("Modals", () => {
    describe("Reservation Modal", () => {
      it("Should display all reservation form fields with correct values", () => {
        // Given: A material page with authentication
        materialPage = new MaterialPage();
        givenAMaterial();
        cy.createFakeAuthenticatedSession();
        materialPage.visit([]);

        // When: Opening the reservation modal
        materialPage.openModalReservation();

        materialPage.components.ModalReservation((reservation) => {
          // Then: Should display 5 list items
          reservation.elements.listItems().should("have.length", 5);

          // And: Edition item
          reservation.getListItem(0).within(() => {
            cy.contains("Edition");
            cy.contains("First available edition");
            cy.contains("button", "Change");
          });

          // And: Interest period item
          reservation.getListItem(1).within(() => {
            cy.contains("Have no interest after");
            cy.contains("14 days");
            cy.contains("button", "Change");
          });

          // And: Pickup location item
          reservation.getListItem(2).within(() => {
            cy.contains("Pick up at");
            cy.contains("Hovedbiblioteket");
            cy.contains("button", "Change");
          });

          // And: SMS item
          reservation.getListItem(3).within(() => {
            cy.contains("You will receive an SMS");
            cy.contains("12345678");
            cy.contains("button", "Change");
          });

          // And: Email item
          reservation.getListItem(4).within(() => {
            cy.contains("You will receive an email");
            cy.contains("test@test.com");
            cy.contains("button", "Change");
          });

          // And: Submit button should be visible
          reservation.elements
            .submitButton()
            .should("be.visible")
            .and("contain.text", "Approve reservation");
        });
      });
    });

    describe("Reservation + Editions Modal", () => {
      it("Should allow changing edition from reservation modal", () => {
        // Given: A material page with authentication
        materialPage = new MaterialPage();
        givenAMaterial();
        cy.createFakeAuthenticatedSession();
        materialPage.visit([]);

        // When: Opening the reservation modal
        materialPage.openModalReservation();

        materialPage.components.ModalReservation((reservation) => {
          // Then: Should show "All editions" and "First available edition"
          reservation.elements
            .subtitle()
            .should("contain.text", "(All editions)");
          reservation
            .getListItemValue(0)
            .should("contain.text", "First available edition");

          // When: Changing the edition
          reservation.changeEdition();
        });

        // Then: Editions switch modal displays with options
        materialPage.components.ModalEditionsSwitch((editionsSwitch) => {
          editionsSwitch.elements
            .title()
            .should("contain.text", "Choose Edition");
          editionsSwitch.elements.manifestationItems().should("have.length", 4);

          // When: Choosing the first available manifestation (2017 edition)
          editionsSwitch.clickChooseForManifestation(0);
        });

        // Then: Reservation modal reflects the selected edition
        materialPage.components.ModalReservation((reservation) => {
          reservation
            .getListItemValue(0)
            .should("contain.text", "2017 (2. udgave)");
        });
      });
    });

    describe("FindOnShelf Modal", () => {
      it("Should display library information and allow expanding library details", () => {
        // Given: A material page
        materialPage = new MaterialPage();
        givenAMaterial();

        // When: The user opens FindOnShelf
        materialPage.visit([]);
        materialPage.openFindOnShelf();

        materialPage.components.ModalFindOnShelf((findOnShelf) => {
          // Then: Should display the headline with material title
          findOnShelf.elements
            .headline()
            .should("be.visible")
            .and(
              "contain.text",
              "De syv søstre : Maias historie / Lucinda Riley"
            );

          // And: Should show multiple library disclosures
          findOnShelf.elements
            .libraryDisclosures()
            .should("have.length.at.least", 3);

          // And: Should show specific libraries with availability
          cy.contains("Hovedbiblioteket").should("be.visible");
          cy.contains("Islands Brygge").should("be.visible");

          // And: First library disclosure should show headline and availability
          findOnShelf.getLibraryDisclosure(0).within(() => {
            cy.contains("Hovedbiblioteket").should("be.visible");
            cy.contains("Available").should("be.visible");
          });

          // When: Expanding a library disclosure
          findOnShelf.getLibraryDisclosure(1).click();

          // Then: Should show detailed placement information
          findOnShelf.getLibraryDisclosure(1).within(() => {
            cy.contains("De syv søstre (2017)").should("be.visible");
            cy.contains("Voksen").should("be.visible");
            cy.contains("Skønlitteratur").should("be.visible");
            cy.contains("Riley, Lucinda").should("be.visible");
          });
        });
      });
    });
  });
});

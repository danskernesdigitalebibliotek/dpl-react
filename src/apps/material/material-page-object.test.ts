import { MaterialPage } from "../../../cypress/page-objects/material/MaterialPage";
import { interceptPublizonCalls } from "../../../cypress/intercepts/publizon/interceptPublizonCalls";
import {
  givenAMaterial,
  givenAMaterialMusic
} from "../../../cypress/intercepts/fbi/material";
import { givenUserHasLoanedEbook } from "../../../cypress/intercepts/publizon/publizon";
import {
  givenReservationWillSucceed,
  interceptFbsCalls
} from "../../../cypress/intercepts/fbs/fbs";

describe("Material Page Object Test", () => {
  let materialPage: MaterialPage;

  beforeEach(() => {
    cy.viewport(1280, 720);
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
    materialPage.elements.title().shouldContainAll(["Test Music Album"]);
  });

  describe("Material Page Content", () => {
    it("Should display title and description", () => {
      // Given: A material page
      materialPage = new MaterialPage();
      givenAMaterial();

      // When: The user visits the material page
      materialPage.visit([]);

      // Then: Title should be visible
      materialPage.elements.title().shouldContainAll(["De syv søstre"]);

      // And: Description should be visible
      materialPage.elements.descriptionSection().shouldContainAll(["Pa Salt"]);
    });

    it("Should display availability labels", () => {
      // Given: A material page
      materialPage = new MaterialPage();
      givenAMaterial();

      // When: The user visits the material page
      materialPage.visit([]);

      // Then: Should display 3 availability labels
      materialPage.elements.headerAvailabilityLabels().should("have.length", 3);

      // And: First label (e-bog) should show type and availability
      materialPage
        .getHeaderAvailabilityLabel(0)
        .shouldContainAll(["e-bog", "Available"]);

      // And: Second label (bog) should show type and availability
      materialPage
        .getHeaderAvailabilityLabel(1)
        .shouldContainAll(["bog", "Available"]);

      // And: Third label (lydbog) should show type and availability
      materialPage
        .getHeaderAvailabilityLabel(2)
        .shouldContainAll(["lydbog (cd-mp3)", "Unavailable"]);
    });

    it("Should display series information", () => {
      // Given: A material page
      materialPage = new MaterialPage();
      givenAMaterial();

      // When: The user visits the material page
      materialPage.visit([]);

      // Then: Series information should be visible
      materialPage.elements.seriesInfo().shouldContainAll(["Del", "serien"]);

      // And: Related series materials should be shown
      materialPage.elements
        .seriesMembers()
        .shouldContainAll(["De syv søstre", "Stormsøsteren", "Skyggesøsteren"]);
    });

    it("Should display tags and categories", () => {
      // Given: A material page
      materialPage = new MaterialPage();
      givenAMaterial();

      // When: The user visits the material page
      materialPage.visit([]);

      // Then: Tags should be visible
      materialPage.elements
        .identifierTags()
        .shouldContainAll(["Tags", "kærlighed", "adoption", "familien"]);

      // And: Fictional category should be shown
      materialPage.elements
        .fictionNonfiction()
        .shouldContainAll(["skønlitteratur"]);
    });

    describe("Header Buttons", () => {
      it("Should show Reserve and Find on shelf buttons for physical books", () => {
        // Given: A material page
        materialPage = new MaterialPage();
        givenAMaterial();

        // When: The user visits the material page
        materialPage.visit([]);

        // Then: Material header should show Reserve and Find on shelf buttons
        materialPage.elements
          .headerButtons()
          .shouldContainAll(["Reserve bog", "Find on shelf"]);

        // And: Should show stock information
        materialPage.elements
          .materialHeaderContent()
          .shouldContainAll(["We have 13 copies of the material in stock."]);
      });

      it("Should show Loan and Try buttons when e-book is available", () => {
        // Given: A material page with authentication
        materialPage = new MaterialPage();
        givenAMaterial();
        cy.createFakeAuthenticatedSession();

        // When: The user visits the material page
        materialPage.visit([]);

        // And: Clicking on the e-book availability label
        materialPage
          .getHeaderAvailabilityLabel(0)
          .shouldContainAll(["e-bog", "Available"])
          .click();

        // Then: Material header should show Loan and Try buttons
        materialPage.elements
          .headerButtons()
          .shouldContainAll(["Loan e-bog", "Try e-bog"]);

        // And: Should show loan limit information with actual numbers
        materialPage.elements
          .materialHeaderContent()
          .shouldContainAll([
            "You have borrowed 0 out of 5 possible e-books this month"
          ]);

        // And: E-book manifestation in editions should also show Loan button
        materialPage.components.DisclosureEditions((editions) => {
          editions.open();

          editions
            .getManifestationItem(2)
            .shouldContainAll(["Loan e-bog", "Try e-bog"]);
        });
      });

      it("Should show Read button when e-book is already loaned", () => {
        // Given: A material page with authentication and book already loaned
        materialPage = new MaterialPage();
        givenAMaterial();
        givenUserHasLoanedEbook();
        cy.createFakeAuthenticatedSession();

        // When: The user visits the material page
        materialPage.visit([]);

        // And: Clicking on the e-book availability label
        materialPage
          .getHeaderAvailabilityLabel(0)
          .shouldContainAll(["e-bog"])
          .click();

        // Then: Material header should show Read button
        materialPage.elements.headerButtons().shouldContainAll(["Read e-bog"]);

        // And: Should show loan limit information with actual numbers
        materialPage.elements
          .materialHeaderContent()
          .shouldContainAll([
            "You have borrowed 1 out of 5 possible e-books this month"
          ]);

        // And: E-book manifestation in editions should also show Read button
        materialPage.components.DisclosureEditions((editions) => {
          editions.open();

          editions.getManifestationItem(2).within(() => {
            cy.contains("button", "Read e-bog").should("be.visible");
          });
        });
      });
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
          details.elements.summary().shouldContainAll(["Details"]);

          details.open();

          // Then: Should display multiple detail items
          details.elements.listItems().should("have.length", 9);
          details.elements.listDescription().should("be.visible");

          // And: Should display Language
          details.getValueByKey("Language").shouldContainAll(["dansk"]);

          // And: Should display Edition
          details
            .getValueByKey("Edition")
            .shouldContainAll(["2017 (2. udgave)"]);

          // And: Should display Genre
          details.getValueByKey("Genre").shouldContainAll(["romaner"]);

          // And: Should display Original title
          details
            .getValueByKey("Original title")
            .shouldContainAll(["The seven sisters"]);

          // And: Should display Publisher
          details.getValueByKey("Publisher").shouldContainAll(["Cicero"]);

          // And: Should display Type
          details.getValueByKey("Type").shouldContainAll(["bog"]);
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
          editions
            .getManifestationItem(0)
            .shouldContainAll(["bog", "Available", "Reserve", "Find on shelf"]);

          // And: Second manifestation (physical book unavailable) should have correct availability
          editions
            .getManifestationItem(1)
            .shouldContainAll([
              "bog",
              "Unavailable",
              "Reserve",
              "Find on shelf"
            ]);

          // And: Third manifestation (e-book) should have correct availability and button
          editions
            .getManifestationItem(2)
            .shouldContainAll([
              "e-bog",
              "Available",
              "Loan e-bog",
              "Try e-bog"
            ]);

          // And: Fourth manifestation (audiobook) should have correct availability and buttons
          editions
            .getManifestationItem(3)
            .shouldContainAll([
              "lydbog",
              "Unavailable",
              "Can't be reserved",
              "Find on shelf"
            ]);
        });
      });
    });
  });

  describe("Modals", () => {
    describe("Reservation Modal", () => {
      it("Should display reservation form fields, stock information, and submit button", () => {
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
          reservation
            .getListItem(0)
            .shouldContainAll(["Edition", "First available edition", "Change"]);

          // And: Interest period item
          reservation
            .getListItem(1)
            .shouldContainAll(["Have no interest after", "14 days", "Change"]);

          // And: Pickup location item
          reservation
            .getListItem(2)
            .shouldContainAll(["Pick up at", "Hovedbiblioteket", "Change"]);

          // And: SMS item
          reservation
            .getListItem(3)
            .shouldContainAll([
              "You will receive an SMS",
              "12345678",
              "Change"
            ]);

          // And: Email item
          reservation
            .getListItem(4)
            .shouldContainAll([
              "You will receive an email",
              "test@test.com",
              "Change"
            ]);

          // And: Should display stock information
          reservation.elements
            .submitSection()
            .shouldContainAll(["We have 13 copies of the material in stock."]);

          // And: Submit button should be visible
          reservation.elements
            .submitButton()
            .shouldContainAll(["Approve reservation"]);
        });
      });

      it("Should submit reservation and display success message", () => {
        // Given: A material page with authentication and successful reservation setup
        materialPage = new MaterialPage();
        givenAMaterial();
        cy.createFakeAuthenticatedSession();
        givenReservationWillSucceed();

        materialPage.visit([]);

        // When: Opening the reservation modal and submitting
        materialPage.openModalReservation();

        materialPage.components.ModalReservation((reservation) => {
          reservation.elements.submitButton().click();
        });

        // Wait for the reservation API call to complete
        cy.wait("@createReservation");

        // Then: Should show success modal with all expected information
        materialPage.components.ModalReservationSuccess((success) => {
          // Title message
          success.elements
            .titleText()
            .shouldContainAll(["Material is available and reserved for you!"]);

          // Material title confirmation
          success.elements
            .reservedForYouText()
            .shouldContainAll(["De syv søstre is reserved for you"]);

          // Queue position and stock count
          success.elements
            .numberInQueueText()
            .shouldContainAll([
              "You are number 3 in the queue",
              "We have 13 copies of the material in stock"
            ]);

          // Pickup branch information
          success.elements
            .pickupBranchText()
            .shouldContainAll([
              "Material is available",
              "pickup at Hovedbiblioteket"
            ]);

          // Close button
          success.elements.closeButton().shouldContainAll(["Ok"]);
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
          reservation.elements.subtitle().shouldContainAll(["(All editions)"]);

          reservation
            .getListItemValue(0)
            .shouldContainAll(["Edition", "First available edition", "Change"]);

          // When: Changing the edition
          reservation.changeEdition();
        });

        // Then: Editions switch modal displays with options
        materialPage.components.ModalEditionsSwitch((editionsSwitch) => {
          editionsSwitch.elements.title().shouldContainAll(["Choose Edition"]);
          editionsSwitch.elements.manifestationItems().should("have.length", 4);

          // When: Choosing the first available manifestation (2017 edition)
          editionsSwitch.clickChooseForManifestation(0);
        });

        // Then: Reservation modal reflects the selected edition
        materialPage.components.ModalReservation((reservation) => {
          reservation
            .getListItemValue(0)
            .shouldContainAll(["2017 (2. udgave)"]);
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
            .shouldContainAll([
              "De syv søstre : Maias historie / Lucinda Riley"
            ]);

          // And: Should show caption with library count (only counts available libraries)
          findOnShelf.elements
            .caption()
            .shouldContainAll(["3 libraries have material"]);

          // And: Should show 4 library disclosures (including unavailable ones)
          findOnShelf.elements.libraryDisclosures().should("have.length", 4);

          // First library: Hovedbiblioteket (Available) - open disclosure
          findOnShelf
            .getLibraryDisclosure(0)
            .shouldContainAll(["Hovedbiblioteket", "Available"])
            .click();

          // Then: Should show detailed holdings
          findOnShelf
            .getLibraryDisclosure(0)
            .shouldContainAll([
              "De syv søstre (2017)",
              "Voksen · Skønlitteratur · Riley, Lucinda",
              "2",
              "De syv søstre (2016)",
              "0"
            ]);

          // Second library: Fjernlager (Available) - open disclosure
          findOnShelf
            .getLibraryDisclosure(1)
            .shouldContainAll(["Fjernlager", "Available"])
            .click();

          // Then: Should show 1 available copy of 2017 edition
          findOnShelf
            .getLibraryDisclosure(1)
            .shouldContainAll([
              "De syv søstre (2017)",
              "Voksen",
              "Skønlitteratur",
              "Riley, Lucinda",
              "1"
            ]);

          // Third library: Islands Brygge (Available) - open disclosure
          findOnShelf
            .getLibraryDisclosure(2)
            .shouldContainAll(["Islands Brygge", "Available"])
            .click();

          // Then: Should show 3 available copies of 2017 edition
          findOnShelf
            .getLibraryDisclosure(2)
            .shouldContainAll([
              "De syv søstre (2017)",
              "Voksen · Skønlitteratur · Riley, Lucinda",
              "3"
            ]);

          // Fourth library: Vesterbro (Unavailable - all checked out) - open disclosure
          findOnShelf
            .getLibraryDisclosure(3)
            .shouldContainAll(["Vesterbro", "Unavailable"])
            .click();

          // Then: Should show 0 available copies of 2017 edition
          findOnShelf
            .getLibraryDisclosure(3)
            .shouldContainAll([
              "De syv søstre (2017)",
              "Voksen · Skønlitteratur · Riley, Lucinda",
              "0"
            ]);
        });
      });
    });
  });
});

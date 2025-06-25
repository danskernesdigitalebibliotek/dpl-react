import { MaterialPage } from "../../../cypress/pages/material";

describe("Material", () => {
  let materialPage: MaterialPage;

  beforeEach(() => {
    materialPage = new MaterialPage();

    // Setup all the necessary interceptors using the page object
    materialPage
      .interceptDefaultRest()
      .interceptDefaultGraphql()
      .interceptDefault();
    materialPage.visitDefaultMaterial();
  });

  it("Renders a title", () => {
    materialPage.elements
      .title()
      .should("contain", "De syv søstre : Maias historie");
  });

  it("Renders a cover with a source", () => {
    materialPage.shouldHaveCoverWithSource();
  });

  it("Renders favorite buttons", () => {
    materialPage.elements
      .favouriteButton()
      .should(
        "have.attr",
        "aria-label",
        "Add De syv søstre : Maias historie to favorites list"
      );
  });

  it("Renders series horizontal lines", () => {
    materialPage.scrollToToMaterialTDescription();

    materialPage.elements
      .seriesDescription(0)
      .should("be.visible")
      .and("contain.text", "Del 1  in seriesDe syv søstre-serien");
  });

  it("Renders only first 3 horizontal lines items", () => {
    materialPage.scrollToToMaterialTDescription();

    materialPage.elements
      .seriesMembers()
      .should("be.visible")
      .find("span")
      .should("have.length", 3);
  });

  it("Renders additional horizontal lines items after button click", () => {
    materialPage.scrollToToMaterialTDescription();
    materialPage.clickSeriesMembersButton();

    materialPage.elements
      .seriesMembers()
      .should("be.visible")
      .find("span")
      .should("have.length", 8);
  });

  it("Renders authors", () => {
    materialPage.elements
      .authorText()
      .should("be.visible")
      .and("contain", "Lucinda Riley");
  });

  it("Renders exactly 1 availability label per material type", () => {
    materialPage.elements
      .availabilityLabels()
      .find('[data-cy="availability-label-type"]')
      .contains("bog")
      .should("have.length", 1);
  });

  it("Shows the book availability as available", () => {
    materialPage.shouldShowAvailabilityStatus("bog", "Available");
  });

  it("Can open material details", () => {
    materialPage.openMaterialDetails();
  });

  it("Renders the correct details for books", () => {
    materialPage.openMaterialDetails();

    materialPage.elements.listDescription().within(() => {
      // Verify various fields
      cy.get(".list-description__item")
        .contains("Language")
        .next()
        .should("contain.text", "dansk");

      cy.get(".list-description__item")
        .contains("Edition")
        .next()
        .should("contain.text", "2. udgave, 2017");

      cy.get(".list-description__item")
        .contains("Genre")
        .next()
        .should("contain.text", "romaner / slægtsromaner");

      cy.get(".list-description__item")
        .contains("Original title")
        .next()
        .should("contain.text", "The seven sisters");

      cy.get(".list-description__item")
        .contains("Publisher")
        .next()
        .should("contain.text", "Cicero");

      cy.get(".list-description__item")
        .contains("Type")
        .next()
        .should("contain.text", "bog");

      cy.get(".list-description__item")
        .contains("Contributors")
        .next()
        .should("contain.text", "Ulla Lauridsen (oversætter)");

      cy.get(".list-description__item")
        .contains("Scope")
        .next()
        .should("contain.text", "523");

      cy.get(".list-description__item")
        .contains("Dimensions")
        .next()
        .should("contain.text", "523 sider");
    });

    materialPage.openMaterialEditions();

    materialPage.expandFirstManifestationDetails();

    materialPage.elements.listDescription().within(() => {
      // Verify "Type" field and its value
      cy.get(".list-description__item")
        .contains("Type")
        .next()
        .should("contain.text", "bog");

      // Verify "Language" field and its value
      cy.get(".list-description__item")
        .contains("Language")
        .next()
        .should("contain.text", "dansk");

      // Verify "Genre" field and its value
      cy.get(".list-description__item")
        .contains("Genre")
        .next()
        .should("contain.text", "romaner / slægtsromaner");

      // Verify "Contributors" field and its value
      cy.get(".list-description__item")
        .contains("Contributors")
        .next()
        .should("contain.text", "Ulla Lauridsen (oversætter)");

      // Verify "Original title" field and its value
      cy.get(".list-description__item")
        .contains("Original title")
        .next()
        .should("contain.text", "The seven sisters");

      // Verify "ISBN" field and its value
      cy.get(".list-description__item")
        .contains("ISBN")
        .next()
        .should("contain.text", "9788763849630");

      // Verify "Edition" field and its value
      cy.get(".list-description__item")
        .contains("Edition")
        .next()
        .should("contain.text", "2. udgave, 2017");

      // Verify "Scope" field and its value
      cy.get(".list-description__item")
        .contains("Scope")
        .next()
        .should("contain.text", "523");

      // Verify "Publisher" field and its value
      cy.get(".list-description__item")
        .contains("Publisher")
        .next()
        .should("contain.text", "Cicero");

      // Verify "Authors" field and its value
      cy.get(".list-description__item")
        .contains("Authors")
        .next()
        .should("contain.text", "Lucinda Riley");

      // Verify "Dimensions" field and its value
      cy.get(".list-description__item")
        .contains("Dimensions")
        .next()
        .should("contain.text", "523 sider");

      // Verify "Source" field and its value
      cy.get(".list-description__item")
        .contains("Source")
        .next()
        .should("contain.text", "Bibliotekskatalog");
    });
  });

  it("Renders editions with a reservation button", () => {
    materialPage.openMaterialEditions();

    materialPage.elements
      .materialEditionsDisclosure()
      .should("contain", "Editions")
      .then((disclosure) => {
        cy.wrap(disclosure).should("contain", "Reserve");
      });
  });

  it("Opens modal by clicking on reservation button and closes it with the x button", () => {
    cy.createFakeAuthenticatedSession();

    materialPage.scrollToToMaterialTDescription();
    materialPage.clickReserveButton();

    materialPage.scrollToReservationModalList();

    materialPage.elements
      .reservationModalListItemEq(0)
      .and("contain", "Edition")
      .and("contain", "First available edition");
    materialPage.elements
      .reservationModalListItemEq(1)
      .and("contain", "Have no interest after")
      .and("contain", "14 days");
    materialPage.elements
      .reservationModalListItemEq(2)
      .and("contain", "Pick up at")
      .and("contain", "Hovedbiblioteket");
    materialPage.elements
      .reservationModalListItemEq(3)
      .and("contain", "You will receive an SMS when the material is ready")
      .and("contain", "12345678");
    materialPage.elements
      .reservationModalListItemEq(4)
      .and("contain", "You will receive an email when the material is ready")
      .and("contain", "test@test.com");

    materialPage.closeModalWithX();
  });

  it("Can open reservation modal, approve a reservation, and close the modal using buttons", () => {
    cy.createFakeAuthenticatedSession();

    materialPage.scrollToToMaterialTDescription();
    materialPage
      .clickReserveButton()
      .scrollToReservationModalList()
      .submitReservation();

    materialPage.elements
      .reservationSuccessTitle()
      .should("be.visible")
      .and("contain", "Material is available and reserved for you!");

    materialPage.elements
      .numberInQueue()
      .should("be.visible")
      .and("contain", "You are number 3 in the queue");

    materialPage.closeReservationSuccess();
  });

  it("Renders reviews", () => {
    materialPage.openMaterialReviews();

    materialPage.elements
      .materialReviews()
      .should("contain", "Dorthe Marlene Jørgensen, 2016");
  });

  it("Has a selected availability label based on url parameter", () => {
    materialPage.scrollToToMaterialTDescription();

    materialPage.elements
      .availabilityLabels()
      .find('[data-cy="availability-label-type"]')
      .contains("bog")
      .parent()
      .should("have.attr", "aria-pressed", "true");
  });

  it("Does not have selected availability labels which does not match url parameter", () => {
    materialPage.scrollToToMaterialTDescription();

    materialPage.elements
      .availabilityLabels()
      .find('[data-cy="availability-label-type"]')
      .contains("lydbog")
      .parent()
      .should("have.attr", "aria-pressed", "false");
  });

  it("Can favorite a material", () => {
    cy.createFakeAuthenticatedSession();
    materialPage.interceptFavoriteAsFilled();

    materialPage.elements
      .favouriteIcon()
      .should("not.have.class", "icon-favourite--filled");

    materialPage.clickFavouriteButton();

    materialPage.elements
      .favouriteIcon()
      .should("have.class", "icon-favourite--filled");
  });

  it("Displays 8 recommended materials in the related grid", () => {
    materialPage.elements.materialGridRelated().should("exist");
    materialPage.elements
      .materialGridRelated()
      .find("li")
      .should("have.length", 8);
  });

  it("Renders 3 filter buttons and can click author and series filters", () => {
    materialPage.elements.relatedFilterButtons().should("have.length", 3);

    materialPage.elements
      .relatedFilterButtons()
      .contains("Recommendations")
      .click();

    materialPage.elements
      .relatedFilterButtons()
      .contains("In same series")
      .click();

    materialPage.elements
      .relatedFilterButtons()
      .contains("By same author")
      .click();
  });

  it("Shows find on shelf button for physical materials", () => {
    materialPage.scrollToToMaterialTDescription();

    materialPage.elements
      .findFirstOnShelfButton()
      .should("be.visible")
      .and("contain", "Find on shelf");
  });

  it("Opens find on shelf modal when button is clicked", () => {
    materialPage.scrollToToMaterialTDescription();
    materialPage.elements.findFirstOnShelfButton().click({ force: true });

    materialPage.elements.findOnShelfModal().should("be.visible");
    materialPage.elements.findOnShelfModalHeader().should("be.visible");
  });

  it("Shows location data and availability count in find on shelf modal", () => {
    materialPage.scrollToToMaterialTDescription();
    materialPage.elements.findFirstOnShelfButton().click({ force: true });

    materialPage.elements.findOnShelfModal().should("be.visible");
    materialPage.elements.pageFoldEq(0).contains("Unavailable");
    materialPage.elements.findOnShelfModalDisclosuresEq(0).click();

    materialPage.elements.findOnShelfContainerEq(0).within(() => {
      materialPage.elements
        .findOnShelfMaterialHeader()
        .should("contain", "Material");
      materialPage.elements
        .findOnShelfLocationHeader()
        .should("contain", "Find it on shelf");
      materialPage.elements
        .findOnShelfItemCountHeader()
        .should("contain", "home");

      // Assert rows
      materialPage.elements.findOnShelfRows().should("have.length", 1);

      // Check specific contents
      materialPage.elements.findOnShelfMaterialText().each(($el) => {
        cy.wrap($el).should("contain.text", "De syv søstre (2017)");
      });

      materialPage.elements
        .findOnShelfRowEq(0)
        .should("contain.text", "Voksen · Historiske romaner · Riley, Lucinda");
      materialPage.elements
        .findOnShelfRowEq(1)
        .should("contain.text", "Voksen · Skønlitteratur · Riley, Lucinda");

      // Check that both show count 0
      materialPage.elements.findOnShelfItemCountText().each(($el) => {
        cy.wrap($el).should("contain.text", "0");
      });
    });
  });
});

export default {};

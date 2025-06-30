import { MaterialPage } from "../../../cypress/pages/material/material";

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
    materialPage.components.Details((details) => {
      details.open();
    });
  });

  it("Renders the correct details for books", () => {
    materialPage.components.Details((details) => {
      details
        .open()
        .verifyField("Language", "dansk")
        .verifyField("Edition", "2. udgave, 2017")
        .verifyField("Genre", "romaner / slægtsromaner")
        .verifyField("Original title", "The seven sisters")
        .verifyField("Publisher", "Cicero")
        .verifyField("Type", "bog")
        .verifyField("Contributors", "Ulla Lauridsen (oversætter)")
        .verifyField("Scope", "523")
        .verifyField("Dimensions", "523 sider");
    });

    materialPage.components.Editions((editions) => {
      editions
        .open()
        .expandManifestationDetails(0)
        .verifyField("Type", "bog")
        .verifyField("Language", "dansk")
        .verifyField("Genre", "romaner / slægtsromaner")
        .verifyField("Contributors", "Ulla Lauridsen (oversætter)")
        .verifyField("Original title", "The seven sisters")
        .verifyField("ISBN", "9788763849630")
        .verifyField("Edition", "2. udgave, 2017")
        .verifyField("Scope", "523")
        .verifyField("Publisher", "Cicero")
        .verifyField("Authors", "Lucinda Riley")
        .verifyField("Dimensions", "523 sider")
        .verifyField("Source", "Bibliotekskatalog");
    });
  });

  it("Renders editions with a reservation button", () => {
    materialPage.components.Editions((editions) => {
      editions.open();
      editions.getreservePhysicalButtons().should("have.length", 2);
    });
  });

  it("Opens modal by clicking on reservation button and closes it with the x button", () => {
    cy.createFakeAuthenticatedSession();

    materialPage.scrollToToMaterialTDescription();

    materialPage.components.ReservationModal((modal) => {
      modal.clickReserveButton();
      modal.scrollToList();

      modal.field("Edition").should("contain", "First available edition");
      modal.field("Have no interest after").should("contain", "14 days");
      modal.field("Pick up at").should("contain", "Hovedbiblioteket");
      modal
        .field("You will receive an SMS when the material is ready")
        .should("contain", "12345678");
      modal
        .field("You will receive an email when the material is ready")
        .should("contain", "test@test.com");

      modal.closeWithX();
    });
  });

  it("Can open reservation modal, approve a reservation, and close the modal using buttons", () => {
    cy.createFakeAuthenticatedSession();

    materialPage.scrollToToMaterialTDescription();

    materialPage.components.ReservationModal((modal) => {
      modal.clickReserveButton();
      modal.submit();

      modal.elements
        .title()
        .should("be.visible")
        .and("contain", "Material is available and reserved for you!");

      modal.elements
        .numberInQueue()
        .should("be.visible")
        .and("contain", "You are number 3 in the queue");

      modal.closeWithOk();
    });
  });

  it("Renders reviews", () => {
    materialPage.components.Reviews((reviews) => {
      reviews.open().verifyReviewContent("Dorthe Marlene Jørgensen, 2016");
    });
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
    materialPage.components.RelatedMaterials((relatedMaterials) => {
      relatedMaterials.elements.materialGrid().should("exist");
      relatedMaterials.elements.materialItems().should("have.length", 8);
    });
  });

  it("Renders 3 filter buttons and can click author and series filters", () => {
    materialPage.components.RelatedMaterials((relatedMaterials) => {
      relatedMaterials.elements.filterButtons().should("have.length", 3);
      relatedMaterials.clickFilterButton("Recommendations");
      relatedMaterials.clickFilterButton("In same series");
      relatedMaterials.clickFilterButton("By same author");
    });
  });

  it("Shows find on shelf button for physical materials", () => {
    materialPage.scrollToToMaterialTDescription();

    materialPage.components.FindOnShelf((findOnShelf) => {
      findOnShelf.elements
        .findFirstOnShelfButton()
        .should("be.visible")
        .and("contain", "Find on shelf");
    });
  });

  it("Opens find on shelf modal when button is clicked", () => {
    materialPage.scrollToToMaterialTDescription();

    materialPage.components.FindOnShelf((findOnShelf) => {
      findOnShelf.elements.findFirstOnShelfButton().click({ force: true });
      findOnShelf.elements.findOnShelfModal().should("be.visible");
      findOnShelf.elements.findOnShelfModalHeader().should("be.visible");
    });
  });

  it("Shows location data and availability count in find on shelf modal", () => {
    materialPage.scrollToToMaterialTDescription();

    materialPage.components.FindOnShelf((findOnShelf) => {
      findOnShelf.elements.findFirstOnShelfButton().click({ force: true });
      findOnShelf.elements.findOnShelfModal().should("be.visible");

      // Use pageFoldEq from MaterialPage as it's a general page element
      materialPage.elements.pageFoldEq(0).contains("Unavailable");
      findOnShelf.elements.findOnShelfModalDisclosuresEq(0).click();

      findOnShelf.elements.findOnShelfContainerEq(0).within(() => {
        findOnShelf.elements
          .findOnShelfMaterialHeader()
          .should("contain", "Material");
        findOnShelf.elements
          .findOnShelfLocationHeader()
          .should("contain", "Find it on shelf");
        findOnShelf.elements
          .findOnShelfItemCountHeader()
          .should("contain", "home");

        // Assert rows
        findOnShelf.elements.findOnShelfRows().should("have.length", 1);

        // Check specific contents
        findOnShelf.elements
          .findOnShelfMaterialText()
          .each(($el: JQuery<HTMLElement>) => {
            cy.wrap($el).should("contain.text", "De syv søstre (2017)");
          });

        findOnShelf.elements
          .findOnShelfRowEq(0)
          .should(
            "contain.text",
            "Voksen · Historiske romaner · Riley, Lucinda"
          );
        findOnShelf.elements
          .findOnShelfRowEq(1)
          .should("contain.text", "Voksen · Skønlitteratur · Riley, Lucinda");

        // Check that both show count 0
        findOnShelf.elements
          .findOnShelfItemCountText()
          .each(($el: JQuery<HTMLElement>) => {
            cy.wrap($el).should("contain.text", "0");
          });
      });
    });
  });
});

export default {};

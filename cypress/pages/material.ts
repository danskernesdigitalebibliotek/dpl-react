import { PageObject, Elements } from "@hammzj/cypress-page-object";
import { FbiCoverUrlPattern } from "../fixtures/fixture.types";

export class MaterialPage extends PageObject {
  public elements!: Elements;

  constructor() {
    super({
      path: "/iframe.html?id=apps-material--default&viewMode=story&type=bog"
    });
    this.elements = {
      // Header elements
      title: () => cy.get(".text-header-h1").scrollIntoView({ duration: 100 }),
      authorText: () =>
        cy
          .getBySel("material-header-author-text")
          .scrollIntoView({ duration: 100 }),

      // Cover and images
      mainCoverImage: () =>
        cy
          .get(".cover.cover--size-xlarge.cover--aspect-xlarge")
          .find("img.cover__img.cover__img--animate.cover__img--shadow-small")
          .scrollIntoView({ duration: 100 }),

      // Buttons
      favouriteButton: () =>
        cy.get(".button-favourite").scrollIntoView({ duration: 100 }),

      favouriteIcon: () =>
        cy.get(".icon-favourite").first().scrollIntoView({ duration: 100 }),

      reservePhysicalButton: () =>
        cy
          .getBySel("material-header-buttons-physical")
          .scrollIntoView({ duration: 100 }),

      // modal elements
      reservationModalList: () =>
        cy.get(".reservation-modal-list").scrollIntoView({ duration: 300 }),

      // Material description and details
      materialDescription: () =>
        cy.getBySel("material-description").scrollIntoView({ duration: 300 }),

      materialDetailsDisclosure: () =>
        cy
          .getBySel("material-details-disclosure")
          .scrollIntoView({ duration: 100 }),

      materialEditionsDisclosure: () =>
        cy
          .getBySel("material-editions-disclosure")
          .scrollIntoView({ duration: 100 }),

      materialReviewsDisclosure: () =>
        cy
          .getBySel("material-reviews-disclosure")
          .scrollIntoView({ duration: 100 }),

      materialReviews: () =>
        cy.getBySel("material-reviews").scrollIntoView({ duration: 100 }),

      // Series elements
      seriesDescription: (index: number) =>
        cy.getBySel(`material-description-series-${index}`),

      seriesMembers: () =>
        cy
          .getBySel("material-description-series-members")
          .scrollIntoView({ duration: 100 }),

      // Availability labels
      availabilityLabels: () =>
        cy
          .get(".material-header__availability-label")
          .scrollIntoView({ duration: 100 }),

      availabilityLabelType: () =>
        cy
          .get('[data-cy="availability-label-type"]')
          .scrollIntoView({ duration: 100 }),

      availabilityLabelStatus: () =>
        cy
          .get('[data-cy="availability-label-status"]')
          .scrollIntoView({ duration: 100 }),

      // List descriptions for details
      listDescription: () =>
        cy
          .getBySel("list-description")
          .first()
          .scrollIntoView({ duration: 100 }),

      listDescriptionItem: () =>
        cy.get(".list-description__item").scrollIntoView({ duration: 100 }),

      // Manifestation items
      firstManifestationItemDetails: () =>
        cy
          .get(".material-manifestation-item__details")
          .first()
          .scrollIntoView({ duration: 100 }),

      // Modal elements
      reservationModalListItemEq: (index: number) =>
        cy
          .getBySel("reservation-modal-list-item-text")
          .eq(index)
          .scrollIntoView({
            duration: 100
          }),

      // More flexible modal content selector
      reservationModalListItems: () =>
        cy
          .getBySel("reservation-modal-list-item-text")
          .scrollIntoView({ duration: 100 }),

      reservationModalSubmitButton: () =>
        cy
          .getBySel("reservation-modal-submit-button")
          .scrollIntoView({ duration: 100 }),

      reservationSuccessTitle: () =>
        cy
          .getBySel("reservation-success-title-text")
          .scrollIntoView({ duration: 100 }),

      numberInQueue: () =>
        cy.getBySel("number-in-queue-text").scrollIntoView({ duration: 100 }),

      reservationSuccessCloseButton: () =>
        cy
          .getBySel("reservation-success-close-button")
          .scrollIntoView({ duration: 100 }),

      // Related materials
      materialGridRelated: () =>
        cy.getBySel("material-grid-related").scrollIntoView({ duration: 100 }),

      relatedFilterButtons: () =>
        cy.getBySel("material-grid-related-filter-button"),

      // Find on shelf elements
      findFirstOnShelfButton: () =>
        cy
          .getBySel("material-buttons-find-on-shelf")
          .first()
          .scrollIntoView({ duration: 100 }),

      findOnShelfModal: () =>
        cy
          .get(".modal-find-on-shelf")
          .first()
          .scrollIntoView({ duration: 100 }),

      findOnShelfModalHeader: () =>
        cy
          .get(".modal-find-on-shelf__headline")
          .first()
          .scrollIntoView({ duration: 100 }),

      findOnShelfModalDisclosuresEq: (index: number) =>
        cy
          .getBySel("find-on-shelf-modal-body-disclosure")
          .eq(index)
          .scrollIntoView({ duration: 100 }),

      findOnShelfModalListContentEq: (index: number) =>
        cy.get("find-on-shelf").eq(index).scrollIntoView({ duration: 100 }),

      // Page fold elements for availability status
      pageFoldEq: (index: number) =>
        cy
          .get('[data-cy="page-fold"]')
          .eq(index)
          .scrollIntoView({ duration: 100 }),

      // Find on shelf container elements
      findOnShelfContainer: () =>
        cy.get(".find-on-shelf").scrollIntoView({ duration: 100 }),

      findOnShelfContainerEq: (index: number) =>
        cy.get(".find-on-shelf").eq(index).scrollIntoView({ duration: 100 }),

      // Find on shelf header elements
      findOnShelfMaterialHeader: () =>
        cy
          .get(".find-on-shelf__material-header")
          .scrollIntoView({ duration: 100 }),

      findOnShelfLocationHeader: () =>
        cy
          .get(".find-on-shelf__location-header")
          .scrollIntoView({ duration: 100 }),

      findOnShelfItemCountHeader: () =>
        cy
          .get(".find-on-shelf__item-count-header")
          .scrollIntoView({ duration: 100 }),

      // Find on shelf content elements
      findOnShelfRows: () =>
        cy.get(".find-on-shelf__row").first().scrollIntoView({ duration: 100 }),

      findOnShelfRowEq: (index: number) =>
        cy
          .get(".find-on-shelf__row")
          .eq(index)
          .scrollIntoView({ duration: 100 }),

      findOnShelfMaterialText: () =>
        cy
          .get(".find-on-shelf__material-text")
          .first()
          .scrollIntoView({ duration: 100 }),

      findOnShelfItemCountText: () =>
        cy
          .get(".find-on-shelf__item-count-text")
          .first()
          .scrollIntoView({ duration: 100 }),

      findOnShelfItemCountTextFirst: () =>
        cy
          .get(".find-on-shelf__item-count-text")
          .first()
          .scrollIntoView({ duration: 100 })
    };
  }

  // Navigation methods
  visitDefaultMaterial() {
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    return this;
  }

  visitInfomediaMaterial() {
    cy.visit(
      "/iframe.html?args=&id=apps-material--infomedia&viewMode=story&type=artikel"
    );
    return this;
  }

  visitMusicMaterial() {
    cy.visit(
      "/iframe.html?args=&id=apps-material--default&viewMode=story&type=musik+(cd)"
    );
    return this;
  }

  // visitPeriodicalMaterial() {
  //   cy.visit(
  //     "/iframe.html?globals=&args=&id=apps-material--periodical&viewMode=story"
  //   );
  //   return this;
  // }

  setupMusicInterceptions() {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/music-fbi-api.json"
    });
    return this;
  }

  // Setup all necessary REST and GraphQL interceptors
  interceptDefaultRest() {
    // Reservations
    cy.interceptRest({
      httpMethod: "POST",
      aliasName: "reservations",
      url: "**/patrons/patronid/reservations/**",
      fixtureFilePath: "material/reservations.json"
    });

    // Holdings
    cy.interceptRest({
      aliasName: "holdings 1",
      url: "**/agencyid/catalog/holdingsLogistics/v1?recordid=53292968&recordid=52557240&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101007&exclude=FBS-101010&exclude=FBS-101017",
      fixtureFilePath: "material/default/holdings/1.json"
    });

    cy.interceptRest({
      aliasName: "holdings 2",
      url: "**/agencyid/catalog/holdingsLogistics/v1?recordid=53292968&recordid=52557240&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101007&exclude=FBS-101010&exclude=FBS-101017&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101006&exclude=FBS-101007&exclude=FBS-101008&exclude=FBS-101009&exclude=FBS-101010&exclude=FBS-101011&exclude=FBS-101012&exclude=FBS-101017",
      fixtureFilePath: "material/default/holdings/2.json"
    });

    cy.interceptRest({
      aliasName: "holdings 3",
      url: "**/agencyid/catalog/holdingsLogistics/v1?recordid=52557240&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101007&exclude=FBS-101010&exclude=FBS-101017&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101006&exclude=FBS-101007&exclude=FBS-101008&exclude=FBS-101009&exclude=FBS-101010&exclude=FBS-101011&exclude=FBS-101012&exclude=FBS-101017",
      fixtureFilePath: "material/default/holdings/3.json"
    });

    cy.interceptRest({
      aliasName: "holdings 4",
      url: "**/agencyid/catalog/holdingsLogistics/v1?recordid=52590302&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101007&exclude=FBS-101010&exclude=FBS-101017&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101006&exclude=FBS-101007&exclude=FBS-101008&exclude=FBS-101009&exclude=FBS-101010&exclude=FBS-101011&exclude=FBS-101012&exclude=FBS-101017",
      fixtureFilePath: "material/default/holdings/4.json"
    });

    cy.interceptRest({
      aliasName: "holdings 5",
      url: "**/agencyid/catalog/holdingsLogistics/v1?recordid=52643414&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101007&exclude=FBS-101010&exclude=FBS-101017&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101006&exclude=FBS-101007&exclude=FBS-101008&exclude=FBS-101009&exclude=FBS-101010&exclude=FBS-101011&exclude=FBS-101012&exclude=FBS-101017",
      fixtureFilePath: "material/default/holdings/5.json"
    });

    cy.interceptRest({
      aliasName: "holdings 6",
      url: "**/agencyid/catalog/holdingsLogistics/v1?recordid=53292968&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101007&exclude=FBS-101010&exclude=FBS-101017",
      fixtureFilePath: "material/default/holdings/6.json"
    });

    // Branches
    cy.interceptRest({
      aliasName: "branches",
      url: "**/agencyid/branches",
      fixtureFilePath: "material/branches.json"
    });

    // User
    cy.interceptRest({
      aliasName: "user",
      url: "**/agencyid/patrons/patronid/v4",
      fixtureFilePath: "material/user.json"
    });

    // Availability
    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/default/availability.json"
    });

    // URL Proxy
    cy.interceptRest({
      aliasName: "UrlProxy",
      url: "**/dpl-url-proxy?url=**",
      fixtureFilePath: "material/dpl-url-proxy.json"
    });

    return this;
  }

  interceptDefaultGraphql() {
    // Get Material
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/default/fbi-api.json"
    });

    // Cover
    cy.interceptGraphql({
      operationName: "GetCoversByPids",
      fixtureFilePath: "cover/cover.json"
    });

    // Work Recommendations
    cy.interceptGraphql({
      operationName: "WorkRecommendations",
      fixtureFilePath: "material/material-grid-related-recommendations.json"
    });

    // Work reviews
    cy.interceptGraphql({
      operationName: "getReviewManifestations",
      fixtureFilePath: "material/reviews.json"
    });

    // Complex Search with Pagination
    cy.interceptGraphql({
      operationName: "complexSearchWithPagination",
      fixtureFilePath:
        "material/material-grid-related-author-recommendations.json"
    });

    return this;
  }

  interceptDefault() {
    // Intercept like button to show it as unfilled
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");
  }

  interceptInfomediaGraphql() {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/infomedia-fbi-api.json"
    });
    return this;
  }

  interceptFavoriteAsFilled() {
    // Intercept like button to show it as filled
    cy.intercept("PUT", "**/list/default/**", {
      statusCode: 200
    }).as("Favorite list service");
    return this;
  }

  // Assertion methods

  scrollToToMaterialTDescription() {
    this.elements.materialDescription();
    return this;
  }

  shouldHaveCoverWithSource() {
    this.elements
      .mainCoverImage()
      .should("have.attr", "src")
      .and("match", FbiCoverUrlPattern);
    return this;
  }

  shouldShowAvailabilityStatus(materialType: string, status: string) {
    this.elements
      .availabilityLabels()
      .find('[data-cy="availability-label-type"]')
      .contains(materialType)
      .parent()
      .find('[data-cy="availability-label-status"]')
      .should("have.text", status);
    return this;
  }

  // Action methods
  clickSeriesMembersButton() {
    this.elements.seriesMembers().find("button").click();
    return this;
  }

  openMaterialDetails() {
    this.elements.materialDetailsDisclosure().click();
    return this;
  }

  openMaterialEditions() {
    this.elements.materialEditionsDisclosure().click();
    return this;
  }

  openMaterialReviews() {
    this.elements.materialReviewsDisclosure().should("be.visible").click();
    return this;
  }

  clickReserveButton() {
    this.elements
      .reservePhysicalButton()
      .should("be.visible")
      .and("contain", "Reserve bog")
      .click();
    return this;
  }

  clickFavouriteButton() {
    this.elements.favouriteButton().click();
    return this;
  }

  expandFirstManifestationDetails() {
    this.elements.firstManifestationItemDetails().click();
    return this;
  }

  // Modal interaction methods
  scrollToReservationModalList() {
    this.elements.reservationModalList();
    return this;
  }

  closeModalWithX() {
    cy.getBySelStartEnd(
      "modal-reservation-modal-",
      "-close-button",
      true
    ).click();
    return this;
  }

  submitReservation() {
    this.elements
      .reservationModalSubmitButton()
      .should("be.visible")
      .and("contain", "Approve reservation");
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500); // Wait as mentioned in original test
    this.elements.reservationModalSubmitButton().click();
    return this;
  }

  closeReservationSuccess() {
    this.elements
      .reservationSuccessCloseButton()
      .should("be.visible")
      .and("contain", "Ok")
      .click();
    return this;
  }
}

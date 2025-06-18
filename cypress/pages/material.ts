import { PageObject, Elements } from "@hammzj/cypress-page-object";

export class MaterialPage extends PageObject {
  public elements!: Elements;

  constructor() {
    super({
      path: "/iframe.html?id=apps-material--default&viewMode=story&type=bog"
    });
    this.elements = {
      // Header elements
      title: () => cy.get(".text-header-h1"),
      authorText: () => cy.getBySel("material-header-author-text"),
      headerContent: () => cy.getBySel("material-header-content"),

      // Cover and images
      coverImage: () => cy.get("img"),

      // Buttons
      favouriteButton: () => cy.get(".button-favourite"),
      favouriteIcon: () => cy.get(".icon-favourite"),
      reservePhysicalButton: () =>
        cy.getBySel("material-header-buttons-physical"),

      // Material description and details
      materialDescription: () => cy.getBySel("material-description"),
      materialDetailsDisclosure: () =>
        cy.getBySel("material-details-disclosure"),
      materialEditionsDisclosure: () =>
        cy.getBySel("material-editions-disclosure"),
      materialReviewsDisclosure: () =>
        cy.getBySel("material-reviews-disclosure"),
      materialReviews: () => cy.getBySel("material-reviews"),

      // Series elements
      seriesDescription: (index: number) =>
        cy.getBySel(`material-description-series-${index}`),
      seriesMembers: () => cy.getBySel("material-description-series-members"),

      // Availability labels
      availabilityLabel: () => cy.getBySel("availability-label"),
      availabilityLabelType: () =>
        cy.get('[data-cy="availability-label-type"]'),
      availabilityLabelStatus: () =>
        cy.get('[data-cy="availability-label-status"]'),

      // List descriptions for details
      listDescription: () => cy.get('[data-cy="list-description"]'),
      listDescriptionItem: () => cy.get(".list-description__item"),

      // Manifestation items
      manifestationItemDetails: () =>
        cy.get(".material-manifestation-item__details"),

      // Modal elements
      reservationModalListItem: () =>
        cy.getBySel("reservation-modal-list-item-text"),
      reservationModalSubmitButton: () =>
        cy.getBySel("reservation-modal-submit-button"),
      reservationSuccessTitle: () =>
        cy.getBySel("reservation-success-title-text"),
      numberInQueue: () => cy.getBySel("number-in-queue-text"),
      reservationSuccessCloseButton: () =>
        cy.getBySel("reservation-success-close-button"),

      // Related materials
      materialGridRelated: () => cy.getBySel("material-grid-related"),
      relatedFilterButtons: () =>
        cy.get('[data-cy="material-grid-related-filter-button"]')
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

  setupInfomediaInterceptions() {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/infomedia-fbi-api.json"
    });
    return this;
  }

  setupMusicInterceptions() {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/music-fbi-api.json"
    });
    return this;
  }

  setupReviewsInterceptions() {
    cy.interceptGraphql({
      operationName: "getReviewManifestations",
      fixtureFilePath: "material/reviews.json"
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
      aliasName: "holdings",
      url: "**/agencyid/catalog/holdingsLogistics/**",
      fixtureFilePath: "material/holdings.json"
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

    // Cover
    cy.interceptRest({
      aliasName: "Cover",
      url: "**/api/v2/covers?**",
      fixtureFilePath: "cover.json"
    });

    // Availability
    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability.json"
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
      fixtureFilePath: "material/fbi-api.json"
    });

    // Work Recommendations
    cy.interceptGraphql({
      operationName: "WorkRecommendations",
      fixtureFilePath: "material/material-grid-related-recommendations.json"
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
    const coverUrlPattern =
      /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

    // Intercept like button to show it as unfilled
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");

    // Intercept covers
    cy.intercept(
      {
        url: coverUrlPattern
      },
      {
        fixture: "images/cover.jpg"
      }
    );

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
  shouldHaveTitle(title: string) {
    this.elements
      .title()
      .scrollIntoView({ duration: 100 })
      .should("be.visible")
      .and("contain", title);
    return this;
  }

  shouldHaveCoverWithSource() {
    const coverUrlPattern =
      /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;
    this.elements.coverImage().first().scrollIntoView({ duration: 100 });

    // Break the chain to avoid DOM detachment issues
    this.elements
      .coverImage()
      .first()
      .should("have.attr", "src")
      .and("match", coverUrlPattern);
    return this;
  }

  shouldHaveFavouriteButton(expectedLabel: string) {
    this.elements
      .favouriteButton()
      .scrollIntoView({ duration: 100 })
      .should("have.attr", "aria-label", expectedLabel);
    return this;
  }

  shouldHaveAuthor(authorName: string) {
    this.elements
      .authorText()
      .scrollIntoView({ duration: 100 })
      .should("be.visible")
      .and("contain", authorName);
    return this;
  }

  shouldHaveSeriesDescription(index: number, expectedText: string) {
    this.elements.headerContent().scrollIntoView({ duration: 100 });
    this.elements
      .seriesDescription(index)
      .should("be.visible")
      .and("contain.text", expectedText);
    return this;
  }

  shouldHaveSeriesMembersCount(count: number) {
    this.elements
      .seriesMembers()
      .scrollIntoView({ duration: 100 })
      .should("be.visible")
      .find("span")
      .should("have.length", count);
    return this;
  }

  shouldHaveAvailabilityLabelForType(materialType: string) {
    this.elements.headerContent().scrollIntoView({ duration: 100 });
    this.elements
      .availabilityLabel()
      .find('[data-cy="availability-label-type"]')
      .contains(materialType)
      .should("have.length", 1);
    return this;
  }

  shouldShowAvailabilityStatus(materialType: string, status: string) {
    this.elements.materialDescription().scrollIntoView({ duration: 100 });
    this.elements
      .availabilityLabel()
      .find('[data-cy="availability-label-type"]')
      .contains(materialType)
      .parent()
      .find('[data-cy="availability-label-status"]')
      .should("have.text", status);
    return this;
  }

  shouldHaveSelectedAvailabilityLabel(materialType: string) {
    this.elements.materialDescription().scrollIntoView({ duration: 500 });
    this.elements
      .availabilityLabel()
      .find('[data-cy="availability-label-type"]')
      .contains(materialType)
      .parent()
      .should("have.attr", "aria-pressed", "true");
    return this;
  }

  shouldNotHaveSelectedAvailabilityLabel(materialType: string) {
    this.elements.materialDescription().scrollIntoView({ duration: 500 });
    this.elements
      .availabilityLabel()
      .find('[data-cy="availability-label-type"]')
      .contains(materialType)
      .parent()
      .should("have.attr", "aria-pressed", "false");
    return this;
  }

  shouldHaveRelatedMaterialsCount(count: number) {
    this.elements
      .materialGridRelated()
      .scrollIntoView({ duration: 100 })
      .should("exist");
    cy.get('[data-cy="material-grid-related"] li').should("have.length", count);
    return this;
  }

  shouldHaveFilterButtonsCount(count: number) {
    this.elements
      .relatedFilterButtons()
      .first()
      .scrollIntoView({ duration: 100 });
    this.elements.relatedFilterButtons().should("have.length", count);
    return this;
  }

  // Action methods
  clickSeriesMembersButton() {
    this.elements
      .seriesMembers()
      .scrollIntoView({ duration: 100 })
      .find("button")
      .click();
    return this;
  }

  openMaterialDetails() {
    this.elements
      .materialDetailsDisclosure()
      .scrollIntoView({ duration: 100 })
      .click();
    return this;
  }

  openMaterialEditions() {
    this.elements
      .materialEditionsDisclosure()
      .scrollIntoView({ duration: 100 })
      .click();
    return this;
  }

  openMaterialReviews() {
    this.elements
      .materialReviewsDisclosure()
      .scrollIntoView({ duration: 100 })
      .should("be.visible")
      .click();
    return this;
  }

  clickReserveButton() {
    this.elements.materialDescription().scrollIntoView({ duration: 500 });
    this.elements
      .reservePhysicalButton()
      .should("be.visible")
      .and("contain", "Reserve bog")
      .click();
    return this;
  }

  clickFavouriteButton() {
    this.elements.favouriteButton().scrollIntoView({ duration: 100 }).click();
    return this;
  }

  expandFirstManifestationDetails() {
    this.elements
      .manifestationItemDetails()
      .first()
      .scrollIntoView({ duration: 100 })
      .click();
    return this;
  }

  clickAuthorFilter() {
    cy.contains(
      '[data-cy="material-grid-related-filter-button"]',
      "By same author"
    ).click();
    return this;
  }

  clickSeriesFilter() {
    cy.contains(
      '[data-cy="material-grid-related-filter-button"]',
      "In same series"
    ).click();
    return this;
  }

  // Modal interaction methods
  shouldShowReservationModal() {
    this.elements.materialDescription().scrollIntoView({ duration: 500 });
    this.elements
      .reservationModalListItem()
      .should("be.visible")
      .and("contain", "Pick up at")
      .and("contain", "Hovedbiblioteket")
      .and("contain", "12345678")
      .and("contain", "test@test.com");
    return this;
  }

  closeModalWithX() {
    cy.getBySelStartEnd("modal-reservation-modal-", "-close-button", true)

      .click();
    return this;
  }

  submitReservation() {
    this.elements
      .reservationModalSubmitButton()
      .scrollIntoView({ duration: 100 })
      .should("be.visible")
      .and("contain", "Approve reservation");
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500); // Wait as mentioned in original test
    this.elements
      .reservationModalSubmitButton()
      .scrollIntoView({ duration: 100 })
      .click();
    return this;
  }

  shouldShowReservationSuccess() {
    this.elements
      .reservationSuccessTitle()
      .scrollIntoView({ duration: 100 })
      .should("be.visible")
      .and("contain", "Material is available and reserved for you!");
    this.elements
      .numberInQueue()
      .scrollIntoView({ duration: 100 })
      .should("be.visible")
      .and("contain", "You are number 3 in the queue");
    return this;
  }

  closeReservationSuccess() {
    this.elements
      .reservationSuccessCloseButton()
      .scrollIntoView({ duration: 100 })
      .should("be.visible")
      .and("contain", "Ok")
      .click();
    return this;
  }

  // Favourite state methods
  shouldShowFavoriteAsUnfilled() {
    this.elements
      .favouriteIcon()
      .first()
      .scrollIntoView({ duration: 100 })
      .should("not.have.class", "icon-favourite--filled");
    return this;
  }

  shouldShowFavoriteAsFilled() {
    this.elements
      .favouriteIcon()
      .first()
      .scrollIntoView({ duration: 100 })
      .should("have.class", "icon-favourite--filled");
    return this;
  }

  // Detail verification methods
  verifyMainMaterialDetails() {
    this.openMaterialDetails();

    this.elements
      .listDescription()
      .scrollIntoView({ duration: 100 })
      .first()
      .within(() => {
        // Verify various fields
        cy.get(".list-description__item")
          .contains("Language")
          .next()
          .should("contain.text", "dansk");

        cy.get(".list-description__item")
          .contains("Edition")
          .next()
          .should("contain.text", "1. udgave, 2016");

        cy.get(".list-description__item")
          .contains("Genre")
          .next()
          .should("contain.text", "roman / slægtsromaner");

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
    return this;
  }

  verifyManifestationDetails() {
    this.elements
      .listDescription()
      .first()
      .within(() => {
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
          .should("contain.text", "roman / slægtsromaner");

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
          .should("contain.text", "9788763844116");

        // Verify "Edition" field and its value
        cy.get(".list-description__item")
          .contains("Edition")
          .next()
          .should("contain.text", "1. udgave, 2016");

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
    return this;
  }

  verifyInfomediaDetails() {
    cy.wait("@getMaterial GraphQL operation");
    this.openMaterialDetails();

    this.elements
      .listDescription()
      .scrollIntoView({ duration: 100 })
      .first()
      .within(() => {
        // Verify various fields - each starting fresh from cy.
        cy.get(".list-description__item")
          .contains("Language")
          .next()
          .should("contain.text", "dansk");

        cy.get(".list-description__item")
          .contains("Edition")
          .next()
          .should("contain.text", "2013");

        cy.get(".list-description__item")
          .contains("Type")
          .next()
          .should("contain.text", "artikel");

        cy.get(".list-description__item")
          .contains("Scope")
          .next()
          .should("contain.text", "2");

        cy.get(".list-description__item")
          .contains("Dimensions")
          .next()
          .should("contain.text", "Sektion 3, s. 6-7: ill.");

        cy.get(".list-description__item")
          .contains("Host Publication")
          .next()
          .should("contain.text", "Politiken, 2013-09-19");
      });
    return this;
  }

  verifyMusicDetails() {
    cy.wait("@getMaterial GraphQL operation");
    this.openMaterialDetails();

    this.elements
      .listDescription()
      .scrollIntoView({ duration: 100 })
      .within(() => {
        cy.get(".list-description__item")
          .contains("Publisher")
          .next()
          .should("contain.text", "Warner Bros.");

        cy.get(".list-description__item")
          .contains("Type")
          .next()
          .should("contain.text", "musik (cd)");

        cy.get(".list-description__item")
          .contains("Contributors")
          .next()
          .should(
            "contain.text",
            "Michael Bruce / Dennis Dunaway / Neal Smith / Glen Buxton"
          );

        cy.get(".list-description__item")
          .contains("Dimensions")
          .next()
          .should("contain.text", "Stereo");

        // Verify Contents list
        cy.get(".list-description__item")
          .contains("Contents")
          .next()
          .within(() => {
            const contents = [
              "Hello hooray",
              "Raped and freezin'",
              "Elected",
              "Billion dollar babies",
              "Unfinished sweet",
              "No more Mr. Nice Guy",
              "Generation landslide",
              "Sick things",
              "Mary Ann",
              "I love the dead"
            ];

            contents.forEach((item, index) => {
              cy.get(".list-description__value--list li")
                .eq(index)
                .should("have.text", item);
            });
          });
      });
    return this;
  }

  shouldShowReviews(expectedText: string) {
    this.elements
      .materialReviews()
      .scrollIntoView({ duration: 100 })
      .should("contain", expectedText);
    return this;
  }

  shouldHaveEditionsWithReserveButton() {
    this.elements
      .materialEditionsDisclosure()
      .scrollIntoView({ duration: 100 })
      .should("contain", "Editions")
      .then((disclosure) => {
        cy.wrap(disclosure).should("contain", "Reserve");
      });
    return this;
  }
}

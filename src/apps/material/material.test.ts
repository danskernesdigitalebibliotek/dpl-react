import { FbiCoverUrlPattern } from "../../../cypress/fixtures/fixture.types";

describe("Material", () => {
  it("Renders a title", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.get(".text-header-h1").should("be.visible");
  });

  it("Renders a cover with a source", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.get("img").should("have.attr", "src").and("match", FbiCoverUrlPattern);
  });

  it("Renders favorite buttons", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.get(".button-favourite").should(
      "have.attr",
      "aria-label",
      "Add De syv søstre : Maias historie to favorites list"
    );
  });

  it("Renders series horizontal lines", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-header-content").scrollIntoView({ duration: 100 });

    cy.getBySel("material-description-series-0")
      .should("be.visible")
      .and("contain.text", "Del 1  in seriesDe syv søstre-serien");
  });

  it("Renders only first 3 horizontal lines items", () => {
    cy.getBySel("material-description-series-members")
      .should("be.visible")
      .find("span")
      .should("have.length", 3);
  });

  it("Renders additional horizontal lines items after button click", () => {
    cy.getBySel("material-description-series-members").find("button").click();

    cy.getBySel("material-description-series-members")
      .should("be.visible")
      .find("span")
      .should("have.length", 8);
  });

  it("Renders authors", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-header-author-text")
      .should("be.visible")
      .and("contain", "Lucinda Riley");
  });

  it("Renders exactly 1 availability label per material type", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-header-content").scrollIntoView({ duration: 100 });

    cy.getBySel("availability-label")
      .find('[data-cy="availability-label-type"]')
      .contains("bog")
      .should("have.length", 1);
  });

  it("Shows the book availability as available", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-description").scrollIntoView({ duration: 100 });

    cy.getBySel("availability-label")
      .find('[data-cy="availability-label-type"]')
      .contains("bog")
      .parent()
      .find('[data-cy="availability-label-status"]')
      .should("have.text", "Available");
  });

  it("Can open material details", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-details-disclosure").click();
  });

  it("Renders the correct details for books", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.wait("@getMaterial GraphQL operation");

    cy.scrollTo("bottom");
    cy.getBySel("material-details-disclosure").click();

    cy.get('[data-cy="list-description"]')
      .first()
      .within(() => {
        // Verify "Language" field and its value
        cy.get(".list-description__item")
          .contains("Language")
          .next()
          .should("contain.text", "dansk");

        // Verify "Edition" field and its value
        cy.get(".list-description__item")
          .contains("Edition")
          .next()
          .should("contain.text", "1. udgave, 2016 (manifest: all)");

        // Verify "Genre" field and its value
        cy.get(".list-description__item")
          .contains("Genre")
          .next()
          .should("contain.text", "roman (manifest: all)");

        // Verify "Original title" field and its value
        cy.get(".list-description__item")
          .contains("Original title")
          .next()
          .should("contain.text", "The seven sisters");

        // Verify "Publisher" field and its value
        cy.get(".list-description__item")
          .contains("Publisher")
          .next()
          .should("contain.text", "Cicero (manifest: all)");

        // Verify "Type" field and its value
        cy.get(".list-description__item")
          .contains("Type")
          .next()
          .should("contain.text", "bog");

        // Verify "Contributors" field and its value
        cy.get(".list-description__item")
          .contains("Contributors")
          .next()
          .should("contain.text", "Ulla Lauridsen (oversætter)");

        // Verify "Scope" field and its value
        cy.get(".list-description__item")
          .contains("Scope")
          .next()
          .should("contain.text", "523");

        // Verify "Dimensions" field and its value
        cy.get(".list-description__item")
          .contains("Dimensions")
          .next()
          .should("contain.text", "523 sider");
      });

    cy.getBySel("material-editions-disclosure").click();
    cy.get(".material-manifestation-item__details").first().click();

    cy.get('[data-cy="list-description"]')
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
          .should(
            "contain.text",
            "roman (manifest: all) / slægtsromaner (manifest: all)"
          );

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
  });

  it("Renders the correct details for infomedia", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/infomedia-fbi-api.json"
    });

    cy.interceptRest({
      aliasName: "UserInfo",
      url: "**/userinfo",
      fixtureFilePath: "material/userinfo.json"
    });

    cy.createFakeAuthenticatedSession();

    cy.visit(
      "/iframe.html?args=&id=apps-material--infomedia&viewMode=story&type=artikel"
    );
    cy.wait("@getMaterial GraphQL operation");

    cy.scrollTo("bottom");
    cy.getBySel("material-details-disclosure").click();

    cy.get('[data-cy="list-description"]')
      .first()
      .within(() => {
        // Verify "Language" field and its value
        cy.get(".list-description__item")
          .contains("Language")
          .next()
          .should("contain.text", "dansk");

        // Verify "Edition" field and its value
        cy.get(".list-description__item")
          .contains("Edition")
          .next()
          .should("contain.text", "2013");

        // Verify "Type" field and its value
        cy.get(".list-description__item")
          .contains("Type")
          .next()
          .should("contain.text", "artikel");

        // Verify "Scope" field and its value
        cy.get(".list-description__item")
          .contains("Scope")
          .next()
          .should("contain.text", "2");

        // Verify "Dimensions" field and its value
        cy.get(".list-description__item")
          .contains("Dimensions")
          .next()
          .should("contain.text", "Sektion 3, s. 6-7: ill.");

        // Verify "Host Publication" field and its value
        cy.get(".list-description__item")
          .contains("Host Publication")
          .next()
          .should("contain.text", "Politiken, 2013-09-19");
      });
  });

  it("Renders the correct details for music", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/music-fbi-api.json"
    });

    cy.visit(
      "/iframe.html?args=&id=apps-material--default&viewMode=story&type=musik+%28cd%29"
    );
    cy.wait("@getMaterial GraphQL operation");

    cy.scrollTo("bottom");
    cy.getBySel("material-details-disclosure").click();
    cy.get('[data-cy="list-description"]').within(() => {
      // Verify "Publisher" field and its value
      cy.get(".list-description__item")
        .contains("Publisher")
        .next()
        .should("contain.text", "Warner Bros.");

      // Verify "Type" field and its value
      cy.get(".list-description__item")
        .contains("Type")
        .next()
        .should("contain.text", "musik (cd)");

      // Verify "Contributors" field and its value
      cy.get(".list-description__item")
        .contains("Contributors")
        .next()
        .should(
          "contain.text",
          "Michael Bruce / Dennis Dunaway / Neal Smith / Glen Buxton"
        );

      // Verify "Dimensions" field and its value
      cy.get(".list-description__item")
        .contains("Dimensions")
        .next()
        .should("contain.text", "Stereo");

      // Verify "Contents" field and its list values
      cy.get(".list-description__item")
        .contains("Contents")
        .next()
        .within(() => {
          // Validate each list item in "Contents"
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
  });

  it("Renders editions with a reservation button", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.scrollTo("bottom");

    cy.getBySel("material-editions-disclosure").click();
    cy.getBySel("material-editions-disclosure")
      .should("contain", "Editions")
      .then((disclosure) => {
        cy.wrap(disclosure).should("contain", "Reserve");
      });
  });

  it("Opens modal by clicking on reservation button and closes it with the x button", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.createFakeAuthenticatedSession();
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-description").scrollIntoView({ duration: 500 });

    cy.getBySel("material-header-buttons-physical")
      .should("be.visible")
      .and("contain", "Reserve bog")
      .click();

    cy.getBySel("material-description").scrollIntoView({ duration: 500 });

    cy.getBySel("reservation-modal-list-item-text")
      .should("be.visible")
      .and("contain", "Pick up at")
      .and("contain", "Hovedbiblioteket")
      .and("contain", "12345678")
      .and("contain", "test@test.com");

    cy.getBySelStartEnd(
      "modal-reservation-modal-",
      "-close-button",
      true
    ).click();
  });

  it("Can open reservation modal, approve a reservation, and close the modal using buttons", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });
    cy.createFakeAuthenticatedSession();
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-description").scrollIntoView({ duration: 500 });

    cy.getBySel("material-header-buttons-physical")
      .should("be.visible")
      .and("contain", "Reserve bog")
      .click();

    cy.getBySel("material-description").scrollIntoView({ duration: 500 });

    cy.getBySel("reservation-modal-submit-button", true)
      .should("be.visible")
      .and("contain", "Approve reservation");
    // We need to wait here because no other fixes work.
    // eslint-disable-next-line
    cy.wait(500);
    cy.getBySel("reservation-modal-submit-button").click();

    cy.getBySel("reservation-success-title-text")
      .should("be.visible")
      .and("contain", "Material is available and reserved for you!");

    cy.getBySel("number-in-queue-text")
      .should("be.visible")
      .and("contain", "You are number 3 in the queue");

    cy.getBySel("reservation-success-close-button")
      .should("be.visible")
      .and("contain", "Ok")
      .click();
  });

  it("Renders reviews", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });
    cy.interceptGraphql({
      operationName: "getReviewManifestations",
      fixtureFilePath: "material/reviews.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.scrollTo("bottom");
    cy.getBySel("material-reviews-disclosure").should("be.visible").click();
    cy.getBySel("material-reviews").should(
      "contain",
      "Dorthe Marlene Jørgensen - Library assessment, 2016"
    );
  });

  it("Has a selected availability label based on url parameter", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-description").scrollIntoView({ duration: 500 });

    cy.getBySel("availability-label")
      .find('[data-cy="availability-label-type"]')
      .contains("bog")
      .parent()
      .should("have.attr", "aria-pressed", "true");
  });

  it("Does not have selected availability labels which does not match url parameter", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-description").scrollIntoView({ duration: 500 });

    cy.getBySel("availability-label")
      .find('[data-cy="availability-label-type"]')
      .contains("lydbog")
      .parent()
      .should("have.attr", "aria-pressed", "false");
  });

  it("Can favorite a material", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    // Intercept like button to show it as filled
    cy.intercept("PUT", "**/list/default/**", {
      statusCode: 200
    }).as("Favorite list service");

    cy.createFakeAuthenticatedSession();

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    // Material should show an unfilled heart icon
    cy.get(".icon-favourite").should(
      "not.have.class",
      "icon-favourite--filled"
    );

    // Favorite the material
    cy.get(".button-favourite").click();

    // Material should show a filled heart icon
    cy.get(".icon-favourite").should("have.class", "icon-favourite--filled");
  });

  it("Displays 8 recommended materials in the related grid", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-grid-related").should("exist");

    cy.get('[data-cy="material-grid-related"] li').should("have.length", 8);
  });

  it("Renders 3 filter buttons and can click author and series filters", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.interceptGraphql({
      operationName: "WorkRecommendations",
      fixtureFilePath: "material/material-grid-related-recommendations.json"
    });

    cy.interceptGraphql({
      operationName: "complexSearchWithPagination",
      fixtureFilePath:
        "material/material-grid-related-author-recommendations.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    // Check if there are 3 filters render
    cy.get('[data-cy="material-grid-related-filter-button"]').should(
      "have.length",
      3
    );

    cy.contains(
      '[data-cy="material-grid-related-filter-button"]',
      "By same author"
    ).click();

    cy.contains(
      '[data-cy="material-grid-related-filter-button"]',
      "In same series"
    ).click();
  });

  beforeEach(() => {
    cy.interceptRest({
      httpMethod: "POST",
      aliasName: "reservations",
      url: "**/patrons/patronid/reservations/**",
      fixtureFilePath: "material/reservations.json"
    });

    cy.interceptRest({
      aliasName: "holdings",
      url: "**/agencyid/catalog/holdingsLogistics/**",
      fixtureFilePath: "material/holdings.json"
    });

    cy.interceptRest({
      aliasName: "branches",
      url: "**/agencyid/branches",
      fixtureFilePath: "material/branches.json"
    });

    cy.interceptRest({
      aliasName: "user",
      url: "**/agencyid/patrons/patronid/v4",
      fixtureFilePath: "material/user.json"
    });

    cy.interceptGraphql({
      operationName: "WorkRecommendations",
      fixtureFilePath: "material/material-grid-related-recommendations.json"
    });

    cy.interceptGraphql({
      operationName: "complexSearchWithPagination",
      fixtureFilePath:
        "material/material-grid-related-author-recommendations.json"
    });

    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability.json"
    });

    // Intercept like button to show it as unfilled
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");

    // Intercept url "translation".
    cy.interceptRest({
      aliasName: "UrlProxy",
      url: "**/dpl-url-proxy?url=**",
      fixtureFilePath: "material/dpl-url-proxy.json"
    });
    // Intercept covers
    cy.interceptGraphql({
      operationName: "GetCoversByPids",
      fixtureFilePath: "cover/cover.json"
    });
  });
});

export default {};

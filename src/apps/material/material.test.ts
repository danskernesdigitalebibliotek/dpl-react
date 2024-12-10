const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

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

    cy.get("img").should("have.attr", "src").and("match", coverUrlPattern);
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

    cy.getBySel("material-header-content").scrollIntoView();

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

    cy.getBySel("material-header-content").scrollIntoView();

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

    cy.getBySel("material-description").scrollIntoView();

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
          .should("contain.text", "1. udgave, 2016");

        // Verify "Genre" field and its value
        cy.get(".list-description__item")
          .contains("Genre")
          .next()
          .should("contain.text", "roman / slægtsromaner");

        // Verify "Original title" field and its value
        cy.get(".list-description__item")
          .contains("Original title")
          .next()
          .should("contain.text", "The seven sisters");

        // Verify "Publisher" field and its value
        cy.get(".list-description__item")
          .contains("Publisher")
          .next()
          .should("contain.text", "Cicero");

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
  });

  it("Renders the correct details for infomedia", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/infomedia-fbi-api.json"
    });

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

    cy.getBySel("material-editions-disclosure")
      .should("contain", "Editions")
      .click()
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

    cy.getBySel("material-description").scrollIntoView();

    cy.getBySel("material-header-buttons-physical")
      .should("be.visible")
      .and("contain", "Reserve bog")
      .click();

    cy.getBySel("material-description").scrollIntoView();

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
    cy.visit(
      "/iframe.html?id=apps-material--default&viewMode=story&type=bog"
    ).scrollTo("bottom");

    cy.getBySel("material-description").scrollIntoView();

    cy.getBySel("material-header-buttons-physical")
      .should("be.visible")
      .and("contain", "Reserve bog")
      .click();

    cy.getBySel("material-description").scrollIntoView();

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
      "Dorthe Marlene Jørgensen, 2016"
    );
  });

  it("Has a selected availability label based on url parameter", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-description").scrollIntoView();

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

    cy.getBySel("material-description").scrollIntoView();

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
      url: "**/agencyid/patrons/patronid/v2",
      fixtureFilePath: "material/user.json"
    });

    cy.interceptRest({
      aliasName: "Cover",
      url: "**/api/v2/covers?**",
      fixtureFilePath: "cover.json"
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

    // Intercept covers.
    cy.intercept(
      {
        url: coverUrlPattern
      },
      {
        fixture: "images/cover.jpg"
      }
    );
    // Intercept url "translation".
    cy.interceptRest({
      aliasName: "UrlProxy",
      url: "**/dpl-url-proxy?url=**",
      fixtureFilePath: "material/dpl-url-proxy.json"
    });
  });
});

export default {};

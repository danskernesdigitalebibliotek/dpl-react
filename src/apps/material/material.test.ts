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
      .and("contain.text", "Nr. 1  in seriesDe syv søstre-serien");
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

  beforeEach(() => {
    cy.interceptRest({
      httpMethod: "POST",
      aliasName: "reservations",
      url: "**/patrons/patronid/reservations/**",
      fixtureFilePath: "material/reservations.json"
    });

    cy.interceptRest({
      aliasName: "holdings",
      url: "**/agencyid/catalog/holdings/**",
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

    // Intercept like button
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

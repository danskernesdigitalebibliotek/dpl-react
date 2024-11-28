const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Material - Order digital copy", () => {
  beforeEach(() => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/order-digital-copy/order-digital-fbi-api"
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

    cy.intercept(
      {
        url: coverUrlPattern
      },
      {
        fixture: "images/cover.jpg"
      }
    );

    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability.json"
    });

    cy.interceptRest({
      aliasName: "holdings",
      url: "**/agencyid/catalog/holdingsLogistics/**",
      fixtureFilePath: "material/holdings.json"
    });

    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");

    cy.visit("/iframe.html?id=apps-material--digital&viewMode=story");
    cy.createFakeAuthenticatedSession();
    cy.scrollTo("bottom");
  });

  it("Render a material that can be ordered as a digital copy", () => {
    cy.get("h1")
      .should("be.visible")
      .and("contain", "Faglig formidling er ikke kun skriveteknik");

    cy.getBySel("material-header-buttons-online-digital-article").should(
      "be.visible"
    );
  });

  it("Render modal to order digital copy", () => {
    cy.getBySel("material-header-buttons-online-digital-article")
      .should("be.visible")
      .click();

    cy.getBySel("email-order-digital-copy").should("be.visible");

    cy.getBySel("order-digital-button")
      .should("be.visible")
      .and("contain", "Order digital copy");
  });

  it("Uses the patron email adress by default", () => {
    cy.getBySel("material-header-buttons-online-digital-article")
      .should("be.visible")
      .click();

    cy.getBySel("email-order-digital-copy")
      .should("be.visible")
      .and("have.value", "test@test.com");
  });

  it("Shows a receipt message when the response return status: OK", () => {
    cy.getBySel("material-header-buttons-online-digital-article")
      .should("be.visible")
      .click();

    cy.getBySel("email-order-digital-copy")
      .should("be.visible")
      .clear()
      .type("new-mail.test.com");

    cy.interceptGraphql({
      operationName: "placeCopy",
      fixtureFilePath: "material/order-digital-copy/feedback-ok"
    });

    cy.getBySel("order-digital-button").should("be.visible").click();

    cy.contains(
      "The digital copy has been ordered. You will receive an email when the digital copy is ready."
    );
    cy.getBySel("order-digital-feedback-button")
      .should("be.visible")
      .and("contain", "Close")
      .click();
  });

  it("Shows a receipt message when the response return status: ERROR_AGENCY_NOT_SUBSCRIBED", () => {
    cy.getBySel("material-header-buttons-online-digital-article")
      .should("be.visible")
      .click();

    cy.getBySel("email-order-digital-copy")
      .should("be.visible")
      .clear()
      .type("new-mail.test.com");

    cy.interceptGraphql({
      operationName: "placeCopy",
      fixtureFilePath:
        "material/order-digital-copy/feedback-error-agency-not-subscribed"
    });

    cy.getBySel("order-digital-button").should("be.visible").click();

    cy.contains(
      "The agency is not subscribed to the service. You can order the digital copy by contacting the agency."
    );
    cy.getBySel("order-digital-feedback-button")
      .should("be.visible")
      .and("contain", "Close")
      .click();
  });

  it("Shows a receipt message when the response return status: ERROR_INVALID_PICKUP_BRANCH", () => {
    cy.getBySel("material-header-buttons-online-digital-article")
      .should("be.visible")
      .click();

    cy.getBySel("email-order-digital-copy")
      .should("be.visible")
      .clear()
      .type("new-mail.test.com");

    cy.interceptGraphql({
      operationName: "placeCopy",
      fixtureFilePath:
        "material/order-digital-copy/feedback-error-invalid-pickup-branch"
    });

    cy.getBySel("order-digital-button").should("be.visible").click();

    cy.contains(
      "The pickup branch is not valid. You can order the digital copy by contacting the agency."
    );
    cy.getBySel("order-digital-feedback-button")
      .should("be.visible")
      .and("contain", "Close")
      .click();
  });

  it("Shows a receipt message when the response return status: ERROR_MISSING_CLIENT_CONFIGURATION", () => {
    cy.getBySel("material-header-buttons-online-digital-article")
      .should("be.visible")
      .click();

    cy.getBySel("email-order-digital-copy")
      .should("be.visible")
      .clear()
      .type("new-mail.test.com");

    cy.interceptGraphql({
      operationName: "placeCopy",
      fixtureFilePath:
        "material/order-digital-copy/feedback-error-missing-client-configuration"
    });

    cy.getBySel("order-digital-button").should("be.visible").click();

    cy.contains(
      "The client configuration is missing. You can order the digital copy by contacting the agency."
    );
    cy.getBySel("order-digital-feedback-button")
      .should("be.visible")
      .and("contain", "Close")
      .click();
  });

  it("Shows a receipt message when the response return status: ERROR_PID_NOT_RESERVABLE", () => {
    cy.getBySel("material-header-buttons-online-digital-article")
      .should("be.visible")
      .click();

    cy.getBySel("email-order-digital-copy")
      .should("be.visible")
      .clear()
      .type("new-mail.test.com");

    cy.interceptGraphql({
      operationName: "placeCopy",
      fixtureFilePath:
        "material/order-digital-copy/feedback-error-pid-not-reservable"
    });

    cy.getBySel("order-digital-button").should("be.visible").click();

    cy.contains(
      "The material is not reservable. You can order the digital copy by contacting the agency."
    );
    cy.getBySel("order-digital-feedback-button")
      .should("be.visible")
      .and("contain", "Close")
      .click();
  });

  it("Shows a receipt message when the response return status: ERROR_UNAUTHENTICATED_USER", () => {
    cy.getBySel("material-header-buttons-online-digital-article")
      .should("be.visible")
      .click();

    cy.getBySel("email-order-digital-copy")
      .should("be.visible")
      .clear()
      .type("new-mail.test.com");

    cy.interceptGraphql({
      operationName: "placeCopy",
      fixtureFilePath:
        "material/order-digital-copy/feedback-error-unauthenticated-user"
    });

    cy.getBySel("order-digital-button").should("be.visible").click();

    cy.contains(
      "You are not logged in. You can order the digital copy by contacting the agency."
    );
    cy.getBySel("order-digital-feedback-button")
      .should("be.visible")
      .and("contain", "Close")
      .click();
  });
});

export default {};

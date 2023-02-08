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
      url: "**/agencyid/catalog/holdings/**",
      fixtureFilePath: "material/holdings.json"
    });

    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");

    cy.visit(
      "/iframe.html?id=apps-material--digital&viewMode=story&type=tidsskriftsartikel"
    );
    cy.createFakeAuthenticatedSession();
  });

  it("render a material that can be ordered as a digital copy", () => {
    cy.getBySel("material-description")
      .scrollIntoView()
      .get("h1")
      .should("be.visible")
      .and("contain", "Faglig formidling er ikke kun skriveteknik");

    cy.getBySel("material-header-buttons-online-digital-article").should(
      "be.visible"
    );
  });

  it("render modal to order digital copy", () => {
    cy.getBySel("material-description")
      .scrollIntoView()
      .getBySel("material-header-buttons-online-digital-article")
      .should("be.visible")
      .click();

    cy.getBySel("email-order-digital-copy").should("be.visible");

    cy.getBySel("order-digital-button")
      .should("be.visible")
      .and("contain", "Order digital copy");
  });

  it("shows an error message if ordering fails", () => {
    cy.getBySel("material-description")
      .scrollIntoView()
      .getBySel("material-header-buttons-online-digital-article")
      .should("be.visible")
      .click();

    cy.intercept("POST", "**/dpl_das/order", {
      statusCode: 500,
      body: {
        pid: "870971-tsart:34310815",
        email: "test@test.com"
      }
    });

    cy.getBySel("order-digital-button").should("be.visible").click();

    cy.getBySel("order-digital-feedback-title").should(
      "contain",
      "Error ordering digital copy"
    );

    cy.getBySel("order-digital-feedback-button")
      .should("be.visible")
      .and("contain", "Close")
      .click();
  });

  it("uses the patron email adress by default", () => {
    cy.getBySel("material-description")
      .scrollIntoView()
      .getBySel("material-header-buttons-online-digital-article")
      .should("be.visible")
      .click();

    cy.getBySel("email-order-digital-copy")
      .should("be.visible")
      .and("have.value", "test@test.com");
  });

  it("shows a confirmation message when an order is completed", () => {
    cy.getBySel("material-description")
      .scrollIntoView()
      .getBySel("material-header-buttons-online-digital-article")
      .should("be.visible")
      .click();

    cy.getBySel("email-order-digital-copy")
      .should("be.visible")
      .clear()
      .type("new-mail.test.com");

    cy.intercept("POST", "**/dpl_das/order", {
      statusCode: 201,
      body: {
        pid: "870971-tsart:34310815",
        email: "new-mail.test.com"
      }
    });

    cy.getBySel("order-digital-button").should("be.visible").click();

    cy.contains("Digital copy ordered");
    cy.getBySel("order-digital-feedback-button")
      .should("be.visible")
      .and("contain", "Close")
      .click();
  });

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
      url: "**/agencyid/catalog/holdings/**",
      fixtureFilePath: "material/holdings.json"
    });

    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");

    cy.visit(
      "/iframe.html?id=apps-material--digital&viewMode=story&type=tidsskriftsartikel"
    );
    cy.createFakeAuthenticatedSession();
  });
});

export default {};

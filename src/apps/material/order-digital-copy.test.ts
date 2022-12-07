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
  });

  it("render a material that can be ordered as a digital copy", () => {
    cy.get("h1")
      .should("be.visible")
      .and("contain", "Faglig formidling er ikke kun skriveteknik");

    cy.getBySel("material-header-buttons-find-on-shelf-digital-article").should(
      "be.visible"
    );
  });

  it("render modal to order digital copy", () => {
    cy.getBySel("material-header-buttons-find-on-shelf-digital-article")
      .should("be.visible")
      .click();

    cy.getBySel("email-order-digital-copy")
      .should("be.visible")
      .and("have.value", "test@test.com");

    cy.getBySel("button")
      .should("be.visible")
      .and("contain", "Order digital copy");
  });

  it("order digital copy with fail", () => {
    cy.getBySel("material-header-buttons-find-on-shelf-digital-article")
      .should("be.visible")
      .click();

    cy.getBySel("email-order-digital-copy")
      .should("be.visible")
      .and("have.value", "test@test.com");

    cy.intercept("POST", "**/dpl_das/order", {
      statusCode: 500,
      body: {
        pid: "870971-tsart:34310815",
        email: "test@test.com"
      }
    });

    cy.getBySel("button").should("be.visible").click();

    cy.contains("Error ordering digital copy");
    cy.getBySel("button").should("be.visible").and("contain", "Close").click();
  });

  it("order digital copy with succes", () => {
    cy.getBySel("material-header-buttons-find-on-shelf-digital-article")
      .should("be.visible")
      .click();

    cy.getBySel("email-order-digital-copy")
      .should("be.visible")
      .and("have.value", "test@test.com");

    cy.intercept("POST", "**/dpl_das/order", {
      statusCode: 200,
      body: {
        pid: "870971-tsart:34310815",
        email: "test@test.com"
      }
    });

    cy.getBySel("button").should("be.visible").click();

    cy.contains("Digital copy ordered");
    cy.getBySel("button").should("be.visible").and("contain", "Close").click();
  });
});

export default {};

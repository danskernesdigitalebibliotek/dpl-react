const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Material - Periodical", () => {
  beforeEach(() => {
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
      fixtureFilePath: "material/availability-periodical.json"
    });

    cy.interceptRest({
      aliasName: "user",
      url: "**/agencyid/patrons/patronid/v2",
      fixtureFilePath: "material/user.json"
    });

    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");

    cy.interceptRest({
      aliasName: "periodical holdings",
      url: "**/agencyid/catalog/holdingsLogistics/**",
      fixtureFilePath: "material/periodical-holdings.json"
    });

    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/periodical-fbi-api.json"
    });

    cy.createFakeAuthenticatedSession();
    cy.visit(
      "/iframe.html?id=apps-material--periodical&viewMode=story&type=tidsskrift"
    );
  });

  it("Render periodical + change to 2021, 32 + Aprove resevation", () => {
    cy.getBySel("material-description").scrollIntoView();
    cy.get("#year").select("2021");
    cy.get("#editions").should("have.value", "32");
    cy.getBySel("material-header-buttons-physical")
      .should("be.visible")
      .and("contain", "Reserve tidsskrift")
      .click();

    cy.get("h2").should("contain", "2021, 32");

    cy.interceptRest({
      httpMethod: "POST",
      aliasName: "reservations",
      url: "**/patrons/patronid/reservations/**",
      fixtureFilePath: "material/reservations.json"
    });

    cy.getBySel("reservation-modal-submit-button", true).click();

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
});

export default {};

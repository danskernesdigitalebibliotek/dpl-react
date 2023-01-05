const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Material", () => {
  it("Does the Material have title?", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.get(".text-header-h1").should("be.visible");
  });

  it("Check that cover has a src", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.get("img").should("have.attr", "src").and("match", coverUrlPattern);
  });

  it("Does the material have favourite buttons?", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    cy.get(".button-favourite").should(
      "have.attr",
      "aria-label",
      "Add to favorites"
    );
  });

  it("Does the material have horizontal lines?", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-description-series-1")
      .should("be.visible")
      .and("contain.text", "Nr. 1  in seriesDe syv søstre-serien");
  });

  it("Does the material have authors?", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-header-author-text")
      .should("be.visible")
      .and("contain", "Lucinda Riley");
  });

  it("Does a material have an availability label", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("availability-label")
      .find('[data-cy="availability-label-type"]')
      .contains("bog")
      .eq(0)
      .parent()
      .find('[data-cy="availability-label-status"]')
      .should("have.text", "unavailable");
  });

  it("Open material details", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-details-disclosure").click();
  });

  it("Does the material have a editions with a buttton to reserved", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.scrollTo("bottom");

    cy.getBySel("material-editions-disclosure")
      .should("contain", "Editions (7)")
      .click()
      .then((disclosure) => {
        cy.wrap(disclosure).should("contain", "Reserve");
      });
  });

  it("Opens modal by clicking on reserver button (reserve book) and close it with the x bottom", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-header-buttons-physical")
      .should("be.visible")
      .and("contain", "Reserve bog")
      .click();

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

  it("Clicking on Aprove resevation (Godkend reservation and close modal with Ok button)", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");

    cy.getBySel("material-header-buttons-physical")
      .should("be.visible")
      .and("contain", "Reserve bog")
      .click();

    cy.getBySel("reservation-modal-submit-button", true)
      .and("contain", "Approve reservation")
      .click();

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

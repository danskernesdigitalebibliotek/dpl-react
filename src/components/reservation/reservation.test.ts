const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Reservation", () => {
  beforeEach(() => {
    cy.interceptRest({
      aliasName: "user",
      url: "**/agencyid/patrons/patronid/v2",
      fixtureFilePath: "material/user.json"
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
    // Intercept covers.
    cy.intercept(
      {
        url: coverUrlPattern
      },
      {
        fixture: "images/cover.jpg"
      }
    );
    cy.interceptRest({
      aliasName: "Cover",
      url: "**/api/v2/covers?**",
      fixtureFilePath: "cover.json"
    });
    // Intercept like button
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");
    // Intercept url "translation".
    cy.interceptRest({
      aliasName: "UrlProxy",
      url: "**/dpl-url-proxy?url=**",
      fixtureFilePath: "material/dpl-url-proxy.json"
    });
  });

  it("Renders a reservation modal for fiction", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });

    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability-reservation.json"
    });

    // We simulate that the user is logged in so that we can open the modal.
    cy.createFakeAuthenticatedSession();
    cy.visit("/iframe.html?id=apps-material--default&type=bog");

    cy.scrollTo("bottom");
    // eslint-disable-next-line
    cy.wait(10000);
    cy.getBySel("material-header-buttons-physical")
      .should("be.visible")
      .and("contain", "Reserve bog")
      .click();

    cy.getBySel("reservation-modal-list-item-text").should(
      "contain",
      "First available edition"
    );
  });

  it("Renders a reservation modal for nonfiction", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api-nonfiction.json"
    });

    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability-nonfiction.json"
    });

    // We simulate that the user is logged in so that we can open the modal.
    cy.createFakeAuthenticatedSession();
    cy.visit("/iframe.html?id=apps-material--turen-gar-til-rom&type=bog");

    cy.scrollTo("bottom");
    // eslint-disable-next-line
    cy.wait(10000);
    cy.getBySel("material-header-buttons-physical")
      .should("be.visible")
      .and("contain", "Reserve bog")
      .click();

    cy.getBySel("reservation-modal-list-item-text").should("contain", "udgave");
  });
});

export default {};

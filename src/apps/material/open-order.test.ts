const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

const navigateToMaterial = () => {
  cy.createFakeAuthenticatedSession();
  cy.visit(
    "/iframe.html?args=&id=apps-material--overbygnings-matriale"
  ).scrollTo("bottom");
  cy.getBySel("material-description").scrollIntoView();
  cy.getBySel("material-button-reservable-on-another-library")
    .first()
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
  // We need to wait here because no other fixes work.
  // eslint-disable-next-line
  cy.wait(500);
  cy.getBySel("message-title")
    .should("be.visible")
    .and("contain", "Order from another library");
};

const closeModal = () => {
  cy.getBySel("reservation-success-close-button")
    .should("be.visible")
    .and("contain", "Ok")
    .click();
};

describe("Open Order Functionality", () => {
  it("successfully processes an order from another library", () => {
    cy.interceptGraphql({
      operationName: "openOrder",
      fixtureFilePath: "material/open-order/open-order-accepted.json"
    });

    navigateToMaterial();

    cy.getBySel("open-oprder-response-status-text")
      .should("be.visible")
      .and("contain", "Your material has been ordered from another library");

    closeModal();
  });

  it("displays an error when user verification fails", () => {
    cy.interceptGraphql({
      operationName: "openOrder",
      fixtureFilePath: "material/open-order/open-order-unverified-user.json"
    });

    navigateToMaterial();

    cy.getBySel("open-oprder-response-status-text")
      .should("be.visible")
      .and("contain", "User not found");

    closeModal();
  });

  it("displays an error when the service is unavailable", () => {
    cy.interceptGraphql({
      operationName: "openOrder",
      fixtureFilePath: "material/open-order/open-order-service-unavailable.json"
    });

    navigateToMaterial();

    cy.getBySel("open-oprder-response-status-text")
      .should("be.visible")
      .and("contain", "Service is currently unavailable");

    closeModal();
  });

  beforeEach(() => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/open-order/fbi-api.json"
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
      fixtureFilePath: "material/open-order/availability.json"
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

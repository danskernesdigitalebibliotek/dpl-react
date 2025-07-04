describe("Material", () => {
  it("Redirects to login & opens reservation modal on subsequent land-in", () => {
    window.sessionStorage.removeItem("user");

    cy.visit("/iframe.html?id=apps-material--default&type=bog&");

    cy.wait("@getMaterial GraphQL operation");

    // Activate lazy loading
    cy.getBySel("material-description").scrollIntoView({ duration: 500 });

    cy.getBySel("material-header-buttons-physical").scrollIntoView();
    cy.getBySel("material-header-buttons-physical")
      .should("be.visible")
      .and("contain", "Reserve bog")
      .click();

    // The only thing we can test is that the current-path are appended to the url.
    // This will only happen if the user is not logged in.
    cy.url().should("include", "&current-path=");
  });

  it("Shouldn't redirect logged in users", () => {
    cy.createFakeAuthenticatedSession();

    cy.interceptRest({
      aliasName: "holdings",
      url: "**/agencyid/catalog/holdingsLogistics/**",
      fixtureFilePath: "material/holdings.json"
    });

    cy.visit("/iframe.html?id=apps-material--default&type=bog");
    cy.wait("@getMaterial GraphQL operation");

    // Activate lazy loading
    cy.getBySel("material-description").scrollIntoView({ duration: 500 });

    cy.getBySel("material-header-buttons-physical").scrollIntoView({
      duration: 500
    });
    cy.getBySel("material-header-buttons-physical")
      .should("be.visible")
      .and("contain", "Reserve bog")
      .click();

    cy.getBySel("reservation-modal").should("be.visible");
  });

  beforeEach(() => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
    });
    cy.interceptGraphql({
      operationName: "WorkRecommendations",
      fixtureFilePath: "material/material-grid-related-recommendations.json"
    });
    cy.interceptGraphql({
      operationName: "GetCoversByPids",
      fixtureFilePath: "cover/cover.json"
    });
    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability.json"
    });

    cy.interceptRest({
      aliasName: "user",
      url: "**/agencyid/patrons/patronid/v4",
      fixtureFilePath: "material/user.json"
    });

    cy.interceptRest({
      aliasName: "holdings",
      url: "**/agencyid/catalog/holdingsLogistics/**",
      fixtureFilePath: "material/holdings.json"
    });
  });
});

export default {};

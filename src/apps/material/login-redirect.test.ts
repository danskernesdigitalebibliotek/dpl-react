const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Material", () => {
  it("Redirects to login & opens reservation modal on subsequent land-in", () => {
    window.sessionStorage.removeItem("user");

    cy.visit("/iframe.html?id=apps-material--default&type=bog&")
      .getBySel("material-description")
      .scrollIntoView()
      .getBySel("material-header-buttons-physical")
      .click();

    cy.getBySel("material-description")
      .scrollIntoView()
      .url()
      .should("include", "modal=reservation-modal-46615743")
      .then(() => {
        // We simulate that the user has sucessfully logged in
        window.sessionStorage.setItem("user", "fake-token");
      });

    cy.getBySel("modal").should("be.visible");
  });

  it("Shouldn't redirect logged in users", () => {
    cy.interceptRest({
      aliasName: "holdings",
      url: "**/agencyid/catalog/holdings/**",
      fixtureFilePath: "material/holdings.json"
    });
    window.sessionStorage.setItem("user", "fake-token");

    cy.visit("/iframe.html?id=apps-material--default&type=bog")
      .getBySel("material-description")
      .scrollIntoView()
      .getBySel("material-header-buttons-physical")
      .click()
      .url()
      .should("not.include", "modal=reservation-modal");
    cy.getBySel("modal").should("be.visible");
  });

  beforeEach(() => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/fbi-api.json"
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
    cy.intercept(
      {
        url: coverUrlPattern
      },
      {
        fixture: "images/cover.jpg"
      }
    );
    cy.interceptRest({
      aliasName: "user",
      url: "**/agencyid/patrons/patronid/v2",
      fixtureFilePath: "material/user.json"
    });

    cy.interceptRest({
      aliasName: "holdings",
      url: "**/agencyid/catalog/holdings/**",
      fixtureFilePath: "material/holdings.json"
    });
  });
});

export default {};

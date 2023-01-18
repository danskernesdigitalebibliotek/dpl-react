const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Material", () => {
  it("Redirects to login & opens reservation modal on subsequent land-in", () => {
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

    cy.visit("/iframe.html?id=apps-material--default&type=bog")
      .getBySel("material-header-buttons-physical")
      .click();

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

    cy.url().should("include", "modal=reservation-modal-46615743");
    cy.getBySel("modal").should("be.visible");
  });
});

export default {};

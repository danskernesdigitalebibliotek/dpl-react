const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Material - Infomedia", () => {
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
      fixtureFilePath: "material/availability.json"
    });

    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");

    cy.interceptRest({
      aliasName: "periodical holdings",
      url: "**/agencyid/catalog/holdingsLogistics/**",
      // I'm not sure why the test is being skipped, but when we decide to fix it, the material/periodical-holdings.json should be updated as well.
      fixtureFilePath: "material/periodical-holdings.json"
    });

    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/infomedia-fbi-api.json"
    });

    cy.interceptGraphql({
      operationName: "getInfomedia",
      fixtureFilePath: "material/infomedia-article.json"
    });

    cy.visit("/iframe.html?id=apps-material--infomedia&viewMode=story");
  });

  it.skip("Render infomedia + Read article + Close modal", () => {
    cy.getBySel("material-header-buttons-online-infomedia-article")
      .should("be.visible")
      .and("contain", "Read article")
      .click();

    cy.get("h2")
      .should("be.visible")
      .and("contain", "BUTLERENS UTROLIGE HISTORIE");

    cy.getBySelStartEnd("modal-infomedia-modal-", "-close-button")
      .should("be.visible")
      .click();
  });
});

export default {};

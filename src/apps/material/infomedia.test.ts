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
      url: "**/agencyid/catalog/holdings/**",
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

  it("Render infomedia + Read article + Close modal", () => {
    cy.getBySel("material-header-buttons-online-infomedia-article")
      .should("be.visible")
      .and("contain", "Read article")
      .click();

    cy.getBySel("infomedia-modal")
      .find("h2")
      .should("be.visible")
      .and("contain", "BUTLERENS UTROLIGE HISTORIE");

    cy.getBySelStartEnd("modal-infomedia-modal-", "-close-button")
      .should("be.visible")
      .click();
  });
});

export default {};

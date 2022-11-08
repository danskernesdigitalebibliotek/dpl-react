const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("The infomedia material", () => {
  it("Render infomedia + Read article + Close modal", () => {
    cy.contains("button:visible", "Read article").click();
    cy.contains("h2", "BUTLERENS UTROLIGE HISTORIE");
    cy.get(`[aria-label="Close infomedia modal"]`).click();
  });

  beforeEach(() => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/infomedia-fbi-api.json"
    });
    cy.interceptGraphql({
      operationName: "getInfomedia",
      fixtureFilePath: "material/infomedia-article.json"
    });
    cy.interceptRest({
      aliasName: "holdings",
      url: "**/agencyid/catalog/holdings/**",
      fixtureFilePath: "material/holdings.json"
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
      aliasName: "user",
      url: "**/agencyid/patrons/patronid/v2",
      fixtureFilePath: "material/user.json"
    });
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");

    cy.visit("/iframe.html?id=apps-material--infomedia&viewMode=story");
  });
});

export {};

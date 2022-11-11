const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("The periodical material", () => {
  it("Render periodical + Change to 2021, nr. 52 + Approve reservation", () => {
    cy.wait([
      "@getMaterial GraphQL operation",
      "@Periodical holdings",
      "@Availability",
      "@Cover"
    ]);
    cy.get("#year").select("2021");
    cy.get("#editions").should("have.value", "52");
    cy.contains("button:visible", "Reserve tidsskrift").click();
    cy.contains("h2", "2021, nr. 52");
    cy.wait("@user");
    cy.contains("button:visible", "Approve reservation").click();
    cy.contains("Material is available and reserved for you!");
    cy.contains("You are number 3 in queue");
    cy.contains("button:visible", "Ok").click();
  });

  beforeEach(() => {
    cy.interceptRest({
      aliasName: "Periodical holdings",
      url: "**/agencyid/catalog/holdings/**",
      fixtureFilePath: "material/periodical-holdings.json"
    });
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/periodical-fbi-api.json"
    });
    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability.json"
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
      aliasName: "user",
      url: "**/agencyid/patrons/patronid/v2",
      fixtureFilePath: "material/user.json"
    });
    cy.interceptRest({
      httpMethod: "POST",
      aliasName: "reservations",
      url: "**/patrons/patronid/reservations/**",
      fixtureFilePath: "material/reservations.json"
    });

    cy.visit(
      "/iframe.html?id=apps-material--periodical&viewMode=story&type=tidsskrift"
    );
  });
});

export {};

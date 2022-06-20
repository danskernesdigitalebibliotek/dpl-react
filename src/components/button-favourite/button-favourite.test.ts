describe("Favorite button", () => {
  it("Material id is not on user's favorites list", () => {
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404,
      body: {}
    });
    cy.visit(
      "/iframe.html?args=&id=components-button-favourite--favourite&viewMode=story"
    );
    cy.get('[aria-label="Tilføj til favoritter"]');
  });

  it("Material id is on user's favorites list", () => {
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 200,
      body: {}
    });
    cy.visit(
      "/iframe.html?args=&id=components-button-favourite--favourite&viewMode=story"
    );
    cy.get('[aria-label="Fjern fra favoritter"]');
  });

  it("User can add and remove material id from favorite list", () => {
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404,
      body: {}
    });
    cy.intercept("PUT", "**/list/default/**", {
      statusCode: 201,
      body: {}
    });
    cy.intercept("DELETE", "**/list/default/**", {
      statusCode: 204,
      body: {}
    });
    cy.visit(
      "/iframe.html?args=&id=components-button-favourite--favourite&viewMode=story"
    );
    cy.get('[aria-label="Tilføj til favoritter"]').click();
    cy.get('[aria-label="Fjern fra favoritter"]').click();
    cy.get('[aria-label="Tilføj til favoritter"]').click();
  });
});

export {};

describe("Favorite button", () => {
  it("Shows that the user does not have the material on the list", () => {
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404,
      body: {}
    });
    cy.visit(
      "/iframe.html?args=&id=components-button-favourite--favourite&viewMode=story"
    );
    cy.get(".button-favourite").should(
      "have.attr",
      "aria-label",
      "Add title to favorites list"
    );
  });

  it("Shows that the user has the material on the list", () => {
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 200,
      body: {}
    });
    cy.visit(
      "/iframe.html?args=&id=components-button-favourite--favourite&viewMode=story"
    );
    cy.get(".button-favourite").should(
      "have.attr",
      "aria-label",
      "Remove title from favorites list"
    );
  });

  it("Adds or remove a material to the favorites list when clicked", () => {
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
    cy.get(".button-favourite")
      .should("have.attr", "aria-label", "Add title to favorites list")
      .click();
    cy.get(".button-favourite")
      .should("have.attr", "aria-label", "Remove title from favorites list")
      .click();
    cy.get(".button-favourite")
      .should("have.attr", "aria-label", "Add title to favorites list")
      .click();
  });
});

export {};

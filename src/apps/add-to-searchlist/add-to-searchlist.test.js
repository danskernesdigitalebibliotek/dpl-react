describe("Add to Searchlist", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "https://stage.followsearches.dandigbib.org/list/default/add",
      status: 201,
      response: {}
    });
  });
  it("Submit", () => {
    cy.visit("/iframe.html?id=apps-add-to-searchlist--entry");
    cy.contains("Tilføj til mine søgninger").click();
    cy.get("form")
      .find("input")
      .first()
      .type("Min søgning");
    cy.contains("button", "Gem").click();
    cy.contains("Tilføjet til dine gemte søgninger.");
    cy.get(".ddb-dialog__close").click();
    cy.contains("Tilføj til mine søgninger");
  });

  it("Submit with errors", () => {
    cy.visit("/iframe.html?id=apps-add-to-searchlist--entry");
    cy.contains("Tilføj til mine søgninger").click();
    cy.contains("button", "Gem").click();
    cy.contains("En titel er påkrævet.");
    cy.get("form")
      .find("input")
      .first()
      .type("Min søgning");
    cy.contains("button", "Gem").click();
    cy.contains("Tilføjet til dine gemte søgninger.");
    cy.get(".ddb-dialog__close").click();
    cy.contains("Tilføj til mine søgninger");
  });
});

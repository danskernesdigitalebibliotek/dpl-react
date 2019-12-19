describe("Add to Checklist", () => {
  it("Add material to checklist", () => {
    cy.server();
    cy.route({
      method: "PUT",
      url: "https://test.materiallist.dandigbib.org/list/default/*",
      status: 201,
      response: {}
    });
    cy.visit("/iframe.html?id=apps-add-to-checklist--entry");
    cy.contains("Tilføj til din huskeliste").click();
    cy.contains("Tilføjet");
  });
  it("Fails adding material to checklist", () => {
    cy.server();
    cy.route({
      method: "PUT",
      url: "https://test.materiallist.dandigbib.org/list/default/*",
      status: 500,
      response: {}
    });
    cy.visit("/iframe.html?id=apps-add-to-checklist--entry");
    cy.contains("Tilføj til din huskeliste").click();
    cy.contains("Der opstod en fejl");
    cy.contains("Tilføj til din huskeliste");
  });
});

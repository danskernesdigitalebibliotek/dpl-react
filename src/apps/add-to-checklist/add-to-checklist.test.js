describe("Add to checklist", function() {
  it("successfully loads", function() {
    cy.visit("/");
    cy.get("#explorerapps-add-to-checklist--entry").click();
    cy.get("#storybook-preview-iframe")
      .iframe()
      .find("Tilføj til min huskeliste");
  });
});

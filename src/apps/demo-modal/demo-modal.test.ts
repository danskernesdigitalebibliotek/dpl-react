describe("Opens demo modal", () => {
  it("Opens and closes modal", () => {
    cy.visit("/iframe.html?path=/story/apps-demo-modal--app");
    // Url parameters are passed in, so we expect the first modal to be open on navigation to the url
    cy.get(".modal").find("h1").should("contain", "demo-modal-one");
    cy.get(".modal")
      .find("button#demo-modal-two-button")
      .should("contain", "Show Modal 2");
    // We expect second modal _not_ to be open
    cy.get(".modal").find("h1#demo-modal-two-header").should("not.exist");
    // Open second modal
    cy.get(".modal").find("button#demo-modal-two-button").click();
    // We expect second modal to be open
    cy.get(".modal").find("h1#demo-modal-two-header").should("exist");
    cy.get(".modal")
      .find("h1#demo-modal-two-header")
      .should("contain", "demo-modal-two");
    cy.get(".modal").find("button.modal-btn-close").should("exist");
    // Close the second modal again
    cy.get(".modal").find("button.modal-btn-close").first().click();
    // We expect it to be closed
    cy.get(".modal").find("h1#demo-modal-two-header").should("not.exist");
    cy.get(".modal").find("button#demo-modal-two-button").should("be.visible");
  });
});

export default {};

describe("Hello World", () => {
  it("Renders hello-world with expected output", () => {
    cy.server();
    cy.visit("/iframe.html?path=/story/hello-world--app");
    cy.get("h2").should("contain", "Greetings");
    cy.get("article p")
      .first()
      .should("contain", "We warmly welcome everybody by saying:");
    cy.get("article p").last().should("contain", "Hello world!");
  });
});

// We add a default export to prevent following error:
// 'hello-world.test.ts' cannot be compiled under '--isolatedModules'
export default {};

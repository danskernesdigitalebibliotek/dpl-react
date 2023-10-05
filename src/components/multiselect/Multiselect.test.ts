describe("Multiselect", () => {
  beforeEach(() => {
    cy.visit(
      "/iframe.html?args=&id=components-multiselect--default&viewMode=story"
    );
  });

  it("Has a title", () => {
    cy.contains("Title");
  });

  it("Shows options and checkboxes when opened", () => {
    cy.get("button:visible").should("contain", "All").click();
    cy.get("[role=option]")
      .should("contain", "All")
      .should("contain", "First item")
      .should("contain", "2. item")
      .should("contain", "III");
    cy.get("[type=checkbox]").should("have.length", 4);
  });

  it("Has the all option selected by default", () => {
    cy.get("button:visible").should("contain", "All").click();
    cy.get("[role=option]")
      .contains("All")
      .find("[type=checkbox]")
      .should("be.checked");
  });

  it("Allows selection of single value", () => {
    cy.get("button:visible").click();
    cy.get("[role=option]")
      .contains("First item")
      .click()
      .find("input[type=checkbox]")
      .should("be.checked");
    cy.get("[role=option]")
      .contains("All")
      .find("[type=checkbox]")
      .should("not.be.checked");
  });

  it("Allows selection of multiple values", () => {
    cy.get("button:visible").click();
    cy.get("[role=option]")
      .contains("First item")
      .click()
      .find("[type=checkbox]")
      .should("be.checked");
    cy.get("[role=option]")
      .contains("2. item")
      .click()
      .find("[type=checkbox]")
      .should("be.checked");
    cy.get("[role=option]")
      .contains("All")
      .find("[type=checkbox]")
      .should("not.be.checked");
  });

  it("Selects the all option if all values are selected", () => {
    cy.get("button:visible").click();
    cy.get("[role=option]").click({ multiple: true });
    cy.get("[role=option]")
      .contains("All")
      .find("[type=checkbox]")
      .should("be.checked");
  });

  it("Supports single default value preselected", () => {
    cy.visit("/iframe.html?args=&id=components-multiselect--single-selected");
    cy.contains("First item");
    cy.get("button:visible").click();
    cy.get("[role=option]")
      .contains("First item")
      .find("[type=checkbox]")
      .should("be.checked");
  });

  it("Supports multiple default values preselected", () => {
    cy.visit("/iframe.html?args=&id=components-multiselect--multiple-selected");
    cy.contains("First item");
    cy.contains("2. item");
    cy.get("button:visible").click();
    cy.get("[role=option]")
      .contains("First item")
      .find("[type=checkbox]")
      .should("be.checked");
    cy.get("[role=option]")
      .contains("2. item")
      .find("[type=checkbox]")
      .should("be.checked");
  });
});

export {};

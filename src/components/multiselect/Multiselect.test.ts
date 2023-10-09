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
    cy.get("button:visible")
      .should("contain", "advancedSearchFilterAllText")
      .click();
    cy.get("[role=option]")
      .eq(0)
      .should("contain", "advancedSearchFilterAllText")
      .and("have.attr", "aria-selected", "true");
  });

  it("Allows selection of single value", () => {
    cy.get("button:visible").click();
    cy.get("[role=option]").contains("First item").click();
    cy.get("[role=option]")
      .eq(1)
      .should("contain", "First item")
      .and("have.attr", "aria-selected", "true");
    cy.get("[role=option]")
      .eq(0)
      .should("contain", "advancedSearchFilterAllText")
      .and("have.attr", "aria-selected", "false");
  });

  it("Allows selection of multiple values", () => {
    cy.get("button:visible").click();
    cy.get("[role=option]")
      .eq(1)
      .click()
      .should("contain", "First item")
      .and("have.attr", "aria-selected", "true");
    cy.get("[role=option]")
      .eq(2)
      .click()
      .should("contain", "2. item")
      .and("have.attr", "aria-selected", "true");
    cy.get("[role=option]")
      .eq(0)
      .should("contain", "advancedSearchFilterAllText")
      .and("have.attr", "aria-selected", "false");
  });

  it("Selects the all option if all values are selected", () => {
    cy.get("button:visible").click();
    cy.get("[role=option]").click({ multiple: true });
    cy.get("[role=option]")
      .eq(0)
      .should("contain", "advancedSearchFilterAllText")
      .and("have.attr", "aria-selected", "true");
  });

  it("Supports single default value preselected", () => {
    cy.visit("/iframe.html?args=&id=components-multiselect--single-selected");
    cy.contains("First item");
    cy.get("button:visible").click();
    cy.get("[role=option]")
      .eq(1)
      .click()
      .should("contain", "First item")
      .and("have.attr", "aria-selected", "true");
  });

  it("Supports multiple default values preselected", () => {
    cy.visit("/iframe.html?args=&id=components-multiselect--multiple-selected");
    cy.contains("First item");
    cy.contains("2. item");
    cy.get("button:visible").click();
    cy.get("[role=option]")
      .eq(1)
      .should("contain", "First item")
      .and("have.attr", "aria-selected", "true");
    cy.get("[role=option]")
      .eq(2)
      .should("contain", "2. item")
      .and("have.attr", "aria-selected", "true");
  });
});

export {};

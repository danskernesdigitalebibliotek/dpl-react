describe("Multiselect", () => {
  beforeEach(() => {
    cy.visit(
      "/iframe.html?args=&id=components-multiselect--primary&viewMode=story"
    );
  });

  it("Has a title", () => {
    cy.contains("Title");
  });

  it("Shows options and checkboxes when opened", () => {
    cy.get("button:visible").should("contain", "All").click();
    cy.get("[role=option]")
      .should("contain", "All")
      .should("contain", "An error occurred")
      .should("contain", "Available")
      .should("contain", "Unavailable");
    cy.get("[type=checkbox]").should("have.length", 4);
  });

  it("Has the all option selected by default", () => {
    cy.get("button:visible").should("contain", "All").click();
    cy.get("[role=option]")
      .eq(0)
      .should("contain", "All")
      .and("have.attr", "aria-selected", "true");
  });

  it("Allows selection of single value", () => {
    cy.get("button:visible").click();
    cy.get("[role=option]").contains("An error occurred").click();
    cy.get("[role=option]")
      .eq(1)
      .should("contain", "An error occurred")
      .and("have.attr", "aria-selected", "true");
    cy.get("[role=option]")
      .eq(0)
      .should("contain", "All")
      .and("have.attr", "aria-selected", "false");
  });

  it("Allows selection of multiple values", () => {
    cy.get("button:visible").click();
    cy.get("[role=option]").eq(1).click();
    cy.get("[role=option]")
      .eq(1)
      .should("contain", "An error occurred")
      .and("have.attr", "aria-selected", "true");
    cy.get("[role=option]").eq(2).click();
    cy.get("[role=option]")
      .eq(2)
      .should("contain", "Available")
      .and("have.attr", "aria-selected", "true");
    cy.get("[role=option]")
      .eq(0)
      .should("contain", "All")
      .and("have.attr", "aria-selected", "false");
  });

  it("Allows to remove an item", () => {
    cy.getBySel("multiselect").should("contain", "All").click();
    cy.get("[role=option]")
      .eq(1)
      .should("contain", "An error occurred")
      .click();
    cy.get("[role=option]").eq(2).should("contain", "Available").click();
    cy.get("[role=option]")
      .eq(1)
      .should("contain", "An error occurred")
      .and("have.attr", "aria-selected", "true");
    cy.get("[role=option]")
      .eq(2)
      .should("contain", "Available")
      .and("have.attr", "aria-selected", "true");
    cy.get("[role=option]")
      .eq(3)
      .should("contain", "Unavailable")
      .and("have.attr", "aria-selected", "false");
    // Now we click the An error occurred to deselect it..
    cy.get("[role=option]")
      .eq(1)
      .should("contain", "An error occurred")
      .click();
    // ..and the only selected one should be the second item.
    cy.get("[role=option]")
      .eq(1)
      .should("contain", "An error occurred")
      .and("have.attr", "aria-selected", "false");
    cy.get("[role=option]")
      .eq(2)
      .should("contain", "Available")
      .and("have.attr", "aria-selected", "true");
  });

  it("Doesn't allow to remove an item if it's the only selected", () => {
    cy.getBySel("multiselect").should("contain", "All").click();
    cy.get("[role=option]")
      .eq(1)
      .should("contain", "An error occurred")
      .click();
    cy.get("[role=option]")
      .eq(1)
      .should("contain", "An error occurred")
      .and("have.attr", "aria-selected", "true");
    cy.get("[role=option]")
      .eq(1)
      .should("contain", "An error occurred")
      .click();
    cy.get("[role=option]")
      .eq(1)
      .should("contain", "An error occurred")
      .and("have.attr", "aria-selected", "true");
  });

  it("Selects the all option if all values are selected", () => {
    cy.get("button:visible").click();
    cy.get("[role=option]").click({ multiple: true });
    cy.get("[role=option]")
      .eq(0)
      .should("contain", "All")
      .and("have.attr", "aria-selected", "true");
  });

  it("Supports single default value preselected", () => {
    cy.visit("/iframe.html?args=&id=components-multiselect--single-selected");
    cy.contains("An error occurred");
    cy.get("button:visible").click();
    cy.get("[role=option]").eq(1).click();
    cy.get("[role=option]")
      .eq(1)
      .should("contain", "An error occurred")
      .and("have.attr", "aria-selected", "true");
  });

  it("Supports multiple default values preselected", () => {
    cy.visit("/iframe.html?args=&id=components-multiselect--multiple-selected");
    cy.contains("An error occurred");
    cy.contains("Available");
    cy.get("button:visible").click();
    cy.get("[role=option]")
      .eq(1)
      .should("contain", "An error occurred")
      .and("have.attr", "aria-selected", "true");
    cy.get("[role=option]")
      .eq(2)
      .should("contain", "Available")
      .and("have.attr", "aria-selected", "true");
  });
});

export {};

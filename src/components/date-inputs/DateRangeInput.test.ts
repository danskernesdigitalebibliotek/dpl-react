describe("DateRangeInput", () => {
  it("Opens calendar at current month when empty", () => {
    cy.visit(
      "/iframe.html?args=&id=components-date-range-input--default&viewMode=story"
    );

    cy.get(".date-range__input .input").click();
    // Click on the visible Flatpickr input
    cy.getBySel("date-range").find(".active").click();

    // Get current month and year
    const now = new Date();
    const currentMonth = now.toLocaleDateString("da-DK", { month: "long" });
    const currentYear = now.getFullYear();

    // Verify the calendar shows current month
    cy.get(".flatpickr-calendar").should("be.visible");
    cy.get(".flatpickr-current-month").should("contain", currentMonth);
    cy.get(".cur-year").should("have.value", currentYear.toString());
  });

  it("Opens calendar at current month when default dates are expired", () => {
    cy.visit(
      "/iframe.html?args=&id=components-date-range-input--with-expired-dates&viewMode=story"
    );

    cy.get(".date-range__input .input").click();
    // Click on the visible Flatpickr input
    cy.getBySel("date-range").find(".active").click();

    // Get current month and year
    const now = new Date();
    const currentMonth = now.toLocaleDateString("da-DK", { month: "long" });
    const currentYear = now.getFullYear();

    // Verify the calendar shows current month
    cy.get(".flatpickr-calendar").should("be.visible");
    cy.get(".flatpickr-current-month").should("contain", currentMonth);
    cy.get(".cur-year").should("have.value", currentYear.toString());
  });

  it("Opens calendar at selected dates, when defaults are valid", () => {
    cy.visit(
      "/iframe.html?args=&id=components-date-range-input--with-selected-range&viewMode=story"
    );

    cy.get(".date-range__input .input").click();
    // Click on the visible Flatpickr input
    cy.getBySel("date-range").find(".active").click();

    cy.get(".flatpickr-calendar").should("be.visible");
    cy.get(".flatpickr-current-month").should("contain", "marts");
    cy.get(".cur-year").should("have.value", "2035");
  });
});

export {};

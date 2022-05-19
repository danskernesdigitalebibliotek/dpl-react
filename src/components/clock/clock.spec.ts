describe("Clock tests", () => {
  it("Renders clock eleven thirty", () => {
    const ElevenThirty = new Date(
      "Mon May 16 2022 11:30:00 GMT+0200 (Central European Summer Time)"
    );

    cy.clock(ElevenThirty);
    cy.visit("/iframe.html?path=/story/components-clock--clock-now");

    cy.get(".dpl-clock-container__needle")
      .first()
      .should(
        "have.css",
        "transform",
        "matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)"
      );

    cy.get(".dpl-clock-container__capitalize-text").should(
      "contain",
      "mandag, maj 16"
    );

    cy.get(".dpl-clock-container__needle")
      .last()
      .should(
        "have.css",
        "transform",
        "matrix(-0.258819, -0.965926, 0.965926, -0.258819, 0, 0)"
      );
  });

  it("Renders clock fifteen fifteen", () => {
    const FifteenFifteen = new Date(
      "Tue May 17 2022 15:15:00 GMT+0200 (Central European Summer Time)"
    );
    cy.clock(FifteenFifteen);
    cy.visit("/iframe.html?path=/story/components-clock--clock-now");

    cy.get(".dpl-clock-container__capitalize-text").should(
      "contain",
      "tirsdag, maj 17"
    );

    cy.get(".dpl-clock-container__needle")
      .first()
      .should("have.css", "transform", "matrix(1, 0, 0, 1, 0, 0)");

    cy.get(".dpl-clock-container__needle")
      .last()
      .should(
        "have.css",
        "transform",
        "matrix(0.991445, 0.130526, -0.130526, 0.991445, 0, 0)"
      );
  });
});

export default {};

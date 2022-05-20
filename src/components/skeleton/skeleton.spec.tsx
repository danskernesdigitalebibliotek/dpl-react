describe("Skeleton tests", () => {
  it("Renders skeleton", () => {
    cy.visit("/iframe.html?path=/story/atoms-skeleton--skeleton-demo");

    cy.get(".dpl-skeleton")
      .first()
      .should(
        "have.css",
        "animation",
        "2s cubic-bezier(0.4, 0.14, 0.3, 1) 0s infinite normal none running dpl-skeleton"
      )
      .and("have.css", "height", "100px")
      .and("have.css", "width", "100px")
      .and("have.css", "border-radius", "5px")
      .and("have.css", "margin", "5px");
  });
});

export default {};

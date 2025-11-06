describe("Recommendation Component", () => {
  beforeEach(() => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "recommendation/fbi-api.json"
    });
    cy.interceptGraphql({
      operationName: "GetCoversByPids",
      fixtureFilePath: "cover/cover.json"
    });
    // To fill the heart
    cy.intercept("HEAD", "**list/default/work-of**", {
      statusCode: 200
    });
  });
  it("displays material title and description after loading", () => {
    cy.visit("/iframe.html?id=apps-recommendation--default&viewMode=story");
    cy.getBySel("recommendation-title")
      .should("be.visible")
      .and("contain", "Brillebjørn");
    cy.getBySel("recommendation-description")
      .should("be.visible")
      .and(
        "contain",
        "Let fagbog om brillebjørnen, som også bliver kaldt Andes-bjørnen, fordi den lever i Andes-bjergene i Sydamerika. Til nysgerrige børn mellem 7 og 9 år."
      );
  });
  it("disappears if material cannot be found", () => {
    cy.visit(
      "/iframe.html?id=apps-recommendation--default&viewMode=story&args=wid:fake"
    );
    cy.getBySel("recommendation").should("not.exist");
  });
  it("respects manual title and description", () => {
    cy.visit(
      "/iframe.html?id=apps-recommendation--default&viewMode=story&args=title:Title;description:Description"
    );
    cy.getBySel("recommendation-title")
      .should("be.visible")
      .and("not.contain", "Brillebjørn")
      .and("contain", "Title");
    cy.getBySel("recommendation-description")
      .should("be.visible")
      .and("not.contain", "brillebjørn")
      .and("contain", "Description");
  });
  it("renders in the correct orientation based on positionImageRight prop", () => {
    cy.visit(
      "/iframe.html?args=positionImageRight:true&id=apps-recommendation--default&viewMode=story"
    );
    cy.getBySel("recommendation").should(
      "have.class",
      "recommendation--reversed"
    );
  });
  it("link navigates to the correct material page", () => {
    cy.visit("/iframe.html?id=apps-recommendation--default&viewMode=story");
    cy.get(".recommendation__texts")
      .should("have.attr", "href")
      .should("match", /\/work\/work-of:\d+-basis:\d+/);
  });
});

export {};

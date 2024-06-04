describe("Recommendation Component", () => {
  beforeEach(() => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "recommendation/fbi-api.json"
    });
    cy.interceptRest({
      aliasName: "Cover",
      url: "**/api/v2/covers?**",
      fixtureFilePath: "cover.json"
    });
    // To fill the heart
    cy.intercept("HEAD", "**list/default/work-of**", {
      statusCode: 200
    });
  });
  it("displays material title and description after loading", () => {
    cy.visit("/iframe.html?id=apps-recommendation--app&viewMode=story");
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
  it("renders in the correct orientation based on positionImageRight prop", () => {
    cy.visit(
      "/iframe.html?args=positionImageRight:true&id=apps-recommendation--app&viewMode=story"
    );
    cy.getBySel("recommendation").should(
      "have.class",
      "recommendation--reversed"
    );
  });
  it("link navigates to the correct material page", () => {
    cy.visit("/iframe.html?id=apps-recommendation--app&viewMode=story");
    cy.get(".recommendation__texts")
      .should("have.attr", "href")
      .should("match", /\/work\/work-of:\d+-basis:\d+/);
  });
});

export {};

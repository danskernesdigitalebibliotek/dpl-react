import { FbiCoverUrlPattern } from "../../../cypress/fixtures/fixture.types";

describe("Recommended Material", () => {
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
  it("displays material author and description after loading", () => {
    cy.visit(
      "/iframe.html?id=apps-recommended-material--default&viewMode=story"
    );
    cy.getBySel("recommended-description")
      .should("be.visible")
      .and("contain", "Brillebjørn");
    cy.getBySel("recommended-author")
      .should("be.visible")
      .and("contain", "Per Østergaard (f. 1950)");
  });

  it("loads and displays the cover image correctly", () => {
    cy.visit(
      "/iframe.html?id=apps-recommended-material--default&viewMode=story"
    );
    cy.get(".cover__img")
      .should("have.attr", "src")
      .should("match", FbiCoverUrlPattern);
  });
  it("link navigates to the correct material page", () => {
    cy.visit(
      "/iframe.html?id=apps-recommended-material--default&viewMode=story"
    );
    cy.get(".recommended-material a")
      .should("have.attr", "href")
      .should("match", /\/work\/work-of:\d+-basis:\d+/);
  });
});

export {};

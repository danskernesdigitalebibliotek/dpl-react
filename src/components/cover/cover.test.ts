import { coverImageUrls } from "./helper";

describe("Cover", () => {
  beforeEach(() => {
    cy.interceptGraphql({
      operationName: "GetCoverByPid",
      fixtureFilePath: "material/cover.json"
    });
  });

  it("loads a cover (default is xSmall)", () => {
    cy.visit("/iframe.html?args=&id=components-cover--item&viewMode=story");
    cy.get("img").should("have.attr", "src", coverImageUrls.large);
  });

  it("shows alt text if alt prop is provided", () => {
    cy.visit("/iframe.html?args=&id=components-cover--item&viewMode=story");
    cy.get("img").should("have.attr", "alt", "alt text for the image");
  });

  it("wraps the image in a link if `url` is provided", () => {
    cy.visit(
      "/iframe.html?args=url:%2F&id=components-cover--item&viewMode=story"
    );
    cy.get("a").should("exist");
    cy.get("a > img").should("exist");
  });

  it("falls back to another image size if requested size is missing", () => {
    cy.interceptGraphql({
      operationName: "GetCoverByPid",
      fixtureFilePath: "material/cover-fallback.json"
    });

    cy.visit(
      "/iframe.html?args=size:small&id=components-cover--item&viewMode=story"
    );

    cy.get("img").should("have.attr", "src", coverImageUrls.medium);
  });

  it("renders nothing if no cover is provided", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/cover-null.json"
    });

    cy.visit(
      "/iframe.html?args=size:small&id=components-cover--item&viewMode=story"
    );

    cy.get("img").should("not.exist");
  });

  it("applies the correct background tint class", () => {
    cy.visit(
      "/iframe.html?args=tint:80&id=components-cover--item&viewMode=story"
    );
    cy.get(".cover").should("have.class", "bg-identity-tint-80");
  });
});

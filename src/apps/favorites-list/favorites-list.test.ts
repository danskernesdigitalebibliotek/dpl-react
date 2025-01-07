import { TOKEN_LIBRARY_KEY } from "../../core/token";

describe("Favorites list", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });

    // To get the list of favorites
    cy.intercept("GET", "**list/default**", {
      statusCode: 200,
      body: {
        id: "default",
        collections: [
          "870970-basis:53063403",
          "870970-basis:51363035",
          "870970-basis:29630364"
        ]
      }
    }).as("Favorites");

    // To mark materials as favorites
    cy.intercept("HEAD", "**list/default/**", {
      statusCode: 200
    }).as("Favorite list service");

    // To delete a material from favorites
    cy.intercept("DELETE", "**list/default/**", {
      statusCode: 200
    }).as("Favorite list service");

    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability.json"
    });

    cy.interceptRest({
      url: "**/next*/**",
      httpMethod: "POST",
      fixtureFilePath: "favorites-list/work.json",
      aliasName: "work"
    });

    cy.interceptRest({
      aliasName: "Cover",
      url: "**/api/v2/covers?**",
      fixtureFilePath: "cover.json"
    });

    cy.visit("/iframe.html?id=apps-favorite-list--primary&viewMode=story");
  });

  // Test that the list of favorites is displayed with materials correctly
  it("Favorites list render as expected", () => {
    // Wait for element not in skeleton screen to prevent testing prematurely.
    cy.get(".cover").should("be.visible");

    // Header has "Favorites"
    cy.get(".content-list-page").find("h1").should("have.text", "Favorites");

    // Sub header shows correct number of materials
    cy.get(".content-list-page")
      .find("p")
      .eq(0)
      .should("have.text", "3 materials");

    // Material links to correct material
    cy.get(".content-list-page")
      .find(".card-list-item")
      .eq(0)
      .find("a")
      .should("have.attr", "href")
      .should("include", "/work/work-of:870970-basis:20636866");

    // Material has filled heart icon
    cy.get(".content-list-page")
      .find(".card-list-item")
      .eq(0)
      .find(".icon-favourite")
      .should("have.class", "icon-favourite--filled");
  });

  it("Favorites list paginates", () => {
    // 2.h it paginates
    cy.visit(
      "/iframe.html?id=apps-favorite-list--primary&args=pageSizeDesktop:2;pageSizeMobile:2"
    );
    // Content list should only contain 2 materials
    cy.get(".content-list-page")
      .find(".card-list-item")
      .should("have.length", 2);
    // Show more materials
    cy.get(".result-pager").find(".btn-primary").click();
    // Content list should now contain 3 materials
    cy.get(".content-list-page")
      .find(".card-list-item")
      .should("have.length", 3);
  });

  // Test that we can remove a material from the list of favorites
  it("Remove favourite", () => {
    // To get the list of favorites after removing one
    cy.intercept("GET", "**list/default**", {
      statusCode: 200,
      body: {
        id: "default",
        collections: ["870970-basis:51363035", "870970-basis:29630364"]
      }
    }).as("favorites");

    // Wait for element not in skeleton screen to prevent testing prematurely.
    cy.get(".cover").should("be.visible");

    // Find the first material in the list and click the heart icon
    cy.get(".content-list-page")
      .find(".card-list-item")
      .eq(0)
      .find(".button-favourite")
      .click();

    // Material list should now contain 2 materials
    cy.get(".content-list-page")
      .find(".card-list-item")
      .should("have.length", 2);
  });
});

export {};

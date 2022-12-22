import { TOKEN_LIBRARY_KEY } from "../../core/token";

describe("Favorites list", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });

    cy.intercept("GET", "**list/default**", {
      statusCode: 200,
      body: {
        id: "default",
        materials: [
          "870970-basis:53063403",
          "870970-basis:51363035",
          "870970-basis:29630364"
        ]
      }
    }).as("favorites");

    // To fill the heart
    cy.intercept("HEAD", "**list/default/work-of**", {
      statusCode: 200
    });

    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability.json"
    });

    cy.interceptRest({
      url: "**/opac/**",
      httpMethod: "POST",
      fixtureFilePath: "favorites-list/work.json",
      aliasName: "work"
    });

    cy.interceptRest({
      aliasName: "Cover",
      url: "**/api/v2/covers?**",
      fixtureFilePath: "cover.json"
    });

    cy.visit("/iframe.html?path=/story/apps-favorite-list--favorites-list");
    cy.wait(["@favorites", "@work", "@work", "@work"]);
  });

  it("Favorites list basics", () => {
    // 2.a. Header "Favorites"
    cy.get(".search-result-page").find("h1").should("have.text", "Favorites");
    // Number of materials on list
    cy.get(".search-result-page")
      .find("p")
      .eq(0)
      .should("have.text", "3 materials");

    // 2.d. Metadata for de enkelte materialer som beskrevet i “Simpel værkvisning - Liste” i bilaget “Begrebsoversigt”
    // 2.e. accessibility on material type
    cy.get(".search-result-page")
      .find(".search-result-item")
      .eq(0)
      .find(".search-result-item__availability")
      .should(
        "have.text",
        "billedbogunavailablelydbog (net)unavailablelydbog (cd)unavailablebilledbogunavailablebilledbog (net)unavailable"
      );

    // 2.f. Link on material to work page
    cy.get(".search-result-page")
      .find(".search-result-item")
      .eq(0)
      .find("a")
      .should("have.attr", "href")
      .should("include", "/work/work-of:870970-basis:51363035");

    // 2.g. Filled heart icon
    cy.get(".search-result-page")
      .find(".search-result-item")
      .eq(0)
      .find("svg")
      .should("have.attr", "fill")
      .should("include", "#000");
  });
  it("Favorites list paginates", () => {
    // 2.h it paginates
    cy.visit(
      "/iframe.html?id=apps-favorite-list--favorites-list&args=pageSizeDesktop:2;pageSizeMobile:2"
    );
    cy.get(".search-result-page")
      .find(".search-result-item")
      .should("have.length", 2);
  });
});

export {};

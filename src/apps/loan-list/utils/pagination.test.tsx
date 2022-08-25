import { TOKEN_LIBRARY_KEY } from "../../../core/token";

describe("Loan list", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });
  });

  it("Pagination list view", () => {
    cy.intercept("POST", "**/opac/**", {
      statusCode: 200,
      body: {
        data: {
          manifestation: {
            pid: "870970-basis:27215815",
            titles: { main: ["Dummy Some Title"] },
            abstract: ["Dummy Some abstract ..."],
            hostPublication: { year: { year: 2006 } },
            materialTypes: [{ specific: "Dummy bog" }],
            creators: [
              { display: "Dummy Jens Jensen" },
              { display: "Dummy Some Corporation" }
            ]
          }
        }
      }
    }).as("work");
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.wait(["@work"]);
    cy.get(".list-reservation").should("have.length", 25);
    cy.get("body").scrollTo("bottom", {
      duration: 50,
      ensureScrollable: false
    });
    cy.get(".result-pager__title").contains("25");
    cy.get(".result-pager__title").contains("42");
    cy.get(".result-pager").find("button").click();
    cy.get("body").scrollTo("bottom", {
      duration: 50,
      ensureScrollable: false
    });
    cy.wait(["@work"]);
    cy.get(".result-pager__title").contains("42");
    cy.get(".result-pager__title").contains("25").should("not.exist");
    cy.get(".list-reservation").should("have.length", 42);
  });

  it("Pagination stack view", () => {
    cy.intercept("POST", "**/opac/**", {
      statusCode: 200,
      body: {
        data: {
          manifestation: {
            pid: "870970-basis:27215815",
            titles: { main: ["Dummy Some Title"] },
            abstract: ["Dummy Some abstract ..."],
            hostPublication: { year: { year: 2006 } },
            materialTypes: [{ specific: "Dummy bog" }],
            creators: [
              { display: "Dummy Jens Jensen" },
              { display: "Dummy Some Corporation" }
            ]
          }
        }
      }
    }).as("work");
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.wait(["@work"]);
    cy.get("body").scrollTo("bottom", {
      duration: 50,
      ensureScrollable: false
    });
    cy.get("#test-stack").click();
    cy.get(".result-pager__title").contains("41");
    cy.get(".result-pager__title").contains("42");
    cy.get(".list-reservation").should("have.length", 25);
    cy.get(".list-reservation")
      .eq(0)
      .should("have.class", "list-reservation--stacked")
      .contains("+ 2 andre materialer");

    cy.get("body").scrollTo("bottom", {
      duration: 50,
      ensureScrollable: false
    });
    cy.get(".result-pager").find("button").click();
    cy.get("body").scrollTo("bottom", {
      duration: 50,
      ensureScrollable: false
    });
    cy.wait(["@work"]);
    cy.get(".result-pager__title").contains("42");
    cy.get(".result-pager__title").contains("41").should("not.exist");
  });
});
export {};

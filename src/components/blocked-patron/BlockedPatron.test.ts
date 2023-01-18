import { TOKEN_LIBRARY_KEY } from "../../core/token";

describe("Patron page", () => {
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });
  });

  it("Patron not blocked", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/v2**", {
      authenticateStatus: "VALID",
      patron: {
        blockStatus: null
      }
    });
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.get(".modal").should("not.exist");
  });

  it("Patron blocked E", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/v2**", {
      authenticateStatus: "VALID",
      patron: {
        blockStatus: [
          {
            blockedReason: "E",
            blockedSince: "",
            message: ""
          }
        ]
      }
    });
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.get('[data-cy="modal"]').should("exist");
    cy.get('[data-cy="modal"]').get("h1").should("exist");
    cy.get('[data-cy="modal"]').get("p").should("exist");
    cy.get('[data-cy="modal"]').get("a").should("exist");
  });
  it("Patron blocked W", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/v2**", {
      authenticateStatus: "VALID",
      patron: {
        blockStatus: [
          {
            blockedReason: "W",
            blockedSince: "",
            message: ""
          }
        ]
      }
    });
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.get('[data-cy="modal"]').should("exist");
    cy.get('[data-cy="modal"]').get("h1").should("exist");
    cy.get('[data-cy="modal"]').get("p").should("exist");
    cy.get('[data-cy="modal"]').get("a").should("not.exist");
  });
  it("Patron blocked U", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/v2**", {
      patron: {
        blockStatus: [
          {
            blockedReason: "U",
            blockedSince: "",
            message: ""
          }
        ]
      }
    });
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.get('[data-cy="modal"]').should("exist");
    cy.get('[data-cy="modal"]').get("h1").should("exist");
    cy.get('[data-cy="modal"]').get("p").should("exist");
    cy.get('[data-cy="modal"]').get("a").should("not.exist");
  });
});

export {};

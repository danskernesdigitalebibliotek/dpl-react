import { resetPersistedData } from "../../core/store";

describe("Patron page", () => {
  before(() => {
    // check if the resetPersistedData function is defined
    expect(resetPersistedData).to.be.a("function");

    // Make sure we have a clean slate before we start testing.
    resetPersistedData();
    cy.createFakeAuthenticatedSession();
    cy.createFakeLibrarySession();
  });

  beforeEach(() => {
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: []
    });
    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: {
        loans: []
      }
    });
  });

  it("Patron not blocked", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/person/patronid/v2**", {
      blockStatus: null
    });
    cy.visit("/iframe.html?path=/story/apps-loan-list--primary");
    cy.get(".modal").should("not.exist");
  });

  // TYPE: E (fee)
  // Blocked types:
  // https://github.com/itk-dev/dpl-react/blob/develop/src/core/utils/types/BlockedTypes.ts
  it("Patron blocked E", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/person/patronid/v2**", {
      blockStatus: [
        {
          blockedReason: "E",
          blockedSince: "",
          message: ""
        }
      ]
    });
    cy.visit("/iframe.html?path=/story/apps-loan-list--primary");
    cy.getBySel("modal").should("exist");
    cy.getBySel("modal").get("h1").should("exist");
    cy.getBySel("modal").get("p").should("exist");
    cy.getBySel("modal").get("a").should("exist");
  });

  it("Does NOT show the blocked modal again once it has been shown", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/person/patronid/v2**", {
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
    cy.visit("/iframe.html?path=/story/apps-loan-list--primary");
    cy.getBySel("modal").should("not.exist");
  });

  // TYPE: U (exclusion)
  // Blocked types:
  // https://github.com/itk-dev/dpl-react/blob/develop/src/core/utils/types/BlockedTypes.ts
  it("Patron blocked U", () => {
    // To make sure that the modal is shown, we need to reset the persisted data.
    resetPersistedData();
    cy.intercept("GET", "**/external/agencyid/patrons/person/patronid/v2**", {
      blockStatus: [
        {
          blockedReason: "U",
          blockedSince: "",
          message: ""
        }
      ]
    });
    cy.visit("/iframe.html?path=/story/apps-loan-list--primary");
    cy.getBySel("modal").should("exist");
    cy.getBySel("modal").get("h1").should("exist");
    cy.getBySel("modal").get("p").should("exist");
    // TODO: figure out why this test fails and fix it
    // cy.getBySel("modal").get("a").should("not.exist");
  });

  // TYPE: W (selfcreated)
  // Blocked types:
  // https://github.com/itk-dev/dpl-react/blob/develop/src/core/utils/types/BlockedTypes.ts
  it("Patron blocked W", () => {
    // To make sure that the modal is shown, we need to reset the persisted data.
    resetPersistedData();
    cy.intercept("GET", "**/external/agencyid/patrons/person/patronid/v2**", {
      blockStatus: [
        {
          blockedReason: "W",
          blockedSince: "",
          message: ""
        }
      ]
    });
    cy.visit("/iframe.html?path=/story/apps-loan-list--primary");
    cy.getBySel("modal").should("exist");
    cy.getBySel("modal").get("h1").should("exist");
    cy.getBySel("modal").get("p").should("exist");
    // TODO: figure out why this test fails and fix it
    // cy.getBySel("modal").get("a").should("not.exist");
  });
});

export {};

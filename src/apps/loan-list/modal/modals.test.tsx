import { TOKEN_LIBRARY_KEY } from "../../../core/token";

describe("Modals", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });
  });

  it("It opens material details modal with query params", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: [
        {
          isRenewable: false,
          renewalStatusList: ["deniedMaxRenewalsReached"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-06-10T16:43:25.325",
            dueDate: "2022-07-10",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        }
      ]
    }).as("loans");

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

    cy.intercept("GET", "**covers**", {
      statusCode: 200,
      body: []
    }).as("cover");
    cy.visit(
      "/iframe.html?path=/story/apps-loan-list--loan-list-details-modal"
    );
    cy.wait(["@loans", "@work", "@cover"]);

    cy.get(".modal-details__container").should("exist");
  });

  it("It opens due date modal with query params", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: [
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-06-13T16:43:25.325",
            dueDate: "2022-09-16",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-06-13T16:43:25.325",
            dueDate: "2022-09-16",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        }
      ]
    }).as("loans");

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

    cy.visit(
      "/iframe.html?path=/story/apps-loan-list--loan-list-due-date-modal"
    );
    cy.wait(["@loans", "@work"]);
    // TODO Figure out why :visible is needed
    // There are two additional hidden materials in the DOM when testing.
    cy.get(".modal").find(".list-materials").should("have.length", 2);
    cy.get(".modal").find(".list-materials").eq(0).should("exist");
  });
});

export {};

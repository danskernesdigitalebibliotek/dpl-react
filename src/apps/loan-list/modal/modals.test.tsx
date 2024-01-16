import { TOKEN_LIBRARY_KEY } from "../../../core/token";

describe("Modals", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });

    cy.intercept("GET", "**/external/agencyid/patrons/patronid/v2**", {
      patron: {
        blockStatus: null
      }
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
            loanId: 9562505082,
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

    cy.intercept("POST", "**/next*/**", {
      statusCode: 200,
      body: {
        data: {
          manifestation: {
            pid: "870970-basis:27215815",
            titles: { full: ["Dummy Some Title"] },
            abstract: ["Dummy Some abstract ..."],
            edition: {
              summary: "3. udgave, 1. oplag (2019)",
              publicationYear: {
                display: "2006"
              }
            },
            materialTypes: [{ materialTypeSpecific: { display: "Dummy bog" } }],
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
});

export {};

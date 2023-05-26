import { TOKEN_LIBRARY_KEY } from "../../core/token";

describe("Dashboard", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      const wednesday20220603 = new Date("2023-01-09T10:00:00.000").getTime();

      // Sets time to a specific date
      // https://github.com/cypress-io/cypress/issues/7577
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cy.clock(wednesday20220603).then((clock: any) => clock.bind(window));
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });

    cy.intercept("GET", "**/external/agencyid/patron/patronid/fees/v2**", {
      statusCode: 200,
      body: [
        {
          feeId: 434536,
          type: "fee",
          reasonMessage: "Gebyr (for sent)",
          amount: 70,
          dueDate: "2022-05-08",
          creationDate: "2022-04-06",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "5237124059",
              recordId: "48724566",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            },
            {
              materialItemNumber: "5119382558",
              recordId: "52518563",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            },
            {
              materialItemNumber: "5324175956",
              recordId: "38540335",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        },
        {
          feeId: 434537,
          type: "fee",
          reasonMessage: "Gebyr (for sent)",
          amount: 70,
          dueDate: "2022-05-08",
          creationDate: "2022-04-06",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "3275348197",
              recordId: "23790823",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            },
            {
              materialItemNumber: "5218297864",
              recordId: "45951685",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        },
        {
          feeId: 434538,
          type: "fee",
          reasonMessage: "Gebyr (for sent)",
          amount: 120,
          dueDate: "2022-05-08",
          creationDate: "2022-04-06",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "5136106556",
              recordId: "53067034",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            },
            {
              materialItemNumber: "5232011841",
              recordId: "54058969",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        },
        {
          feeId: 306404,
          type: "fee",
          reasonMessage: "Gebyr (for sent)",
          amount: 2.56,
          dueDate: "2020-04-15",
          creationDate: "2019-10-18",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "3839631447",
              recordId: "26285283",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        },
        {
          feeId: 377242,
          type: "compensation",
          reasonMessage: "Erstatning (test)",
          amount: 1,
          dueDate: "2021-08-10",
          creationDate: "2021-02-11",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "271358741",
              recordId: "01484524",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        },
        {
          feeId: 411199,
          type: "compensation",
          reasonMessage: "Gebyr (for sent)",
          amount: 1.5,
          dueDate: "2021-12-24",
          creationDate: "2021-11-24",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "262088571",
              recordId: "06964206",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        }
      ]
    }).as("fees");

    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: [
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956251161,
            materialItemNumber: "5122407464",
            recordId: "53387152",
            periodical: null,
            loanDate: "2023-01-09 08:15:11+0000",
            dueDate: "2023-01-16",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedMaxRenewalsReached"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250902,
            materialItemNumber: "5355351922",
            recordId: "61343164",
            periodical: null,
            loanDate: "2022-12-07 08:15:11+0000",
            dueDate: "2023-01-02",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "14dag-",
              description: "14 dages lån - bogligt (kan ikke reserveres)"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250955,
            materialItemNumber: "3842702665",
            recordId: "27002889",
            periodical: null,
            loanDate: "2023-01-02 08:15:11+0000",
            dueDate: "2023-01-09",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        }
      ]
    }).as("loans");

    cy.intercept(
      "GET",
      "**/external/v1/agencyid/patrons/patronid/reservations/v2**",
      {
        statusCode: 200,
        body: [
          {
            reservationId: 67804976,
            recordId: "46985591",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-09-21",
            dateOfReservation: "2022-06-14T09:00:50.059",
            numberInQueue: 1,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "c6742151-f4a7-4655-a94f-7bd6a0009431",
            reservationType: "normal"
          },
          {
            reservationId: 67789642,
            recordId: "48991963",
            state: "readyForPickup",
            pickupBranch: "DK-775100",
            pickupDeadline: "2022-06-21",
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-13T17:08:58.505",
            numberInQueue: null,
            periodical: null,
            pickupNumber: "Reserveringshylde 74",
            ilBibliographicRecord: null,
            transactionId: "480fc2fe-5b19-49bc-a206-6e306c2a2a56",
            reservationType: "normal"
          }
        ]
      }
    ).as("reservations");

    cy.intercept("POST", "**/opac/**", {
      statusCode: 200,
      body: {
        data: {
          manifestation: {
            pid: "870970-basis:22629344",
            titles: { main: ["Dummy Some Title"] },
            abstract: ["Dummy Some abstract ..."],
            edition: {
              summary: "3. udgave, 1. oplag (2019)",
              publicationYear: {
                display: "2006"
              }
            },
            materialTypes: [{ specific: "Dummy bog" }],
            creators: [
              { display: "Dummy Jens Jensen" },
              { display: "Dummy Some Corporation" }
            ]
          }
        }
      }
    }).as("work");

    cy.visit("/iframe.html?id=apps-dashboard--dashboard-entry&viewMode=story");
    cy.wait(["@fees", "@loans", "@reservations"]);
  });

  it("Dashboard general", () => {
    // System shows header "your profile"
    cy.getBySel("dashboard-header").should("have.text", "Your profile");

    // Header "Fees" with a link to fees list
    cy.getBySel("dashboard-fees-header")
      .should("have.text", "Fees6")
      .find("a")
      .should("have.attr", "href")
      .should("include", "https://unsplash.com/photos/7LzKELgdzzI");

    // Text "You owe in total"
    cy.getBySel("warning-bar-text").should("have.text", "You owe in total");

    // The amount the patron ows
    cy.getBySel("warning-bar-right-text").should("have.text", "265.06,-");

    // A pay button that links to fees page
    cy.getBySel("warning-bar-right-link")
      .should("have.text", "Pay")
      .should("have.attr", "href")
      .should("include", "https://unsplash.com/photos/wd6YQy0PJt8");

    // Header "Loans" with link to loans page
    cy.getBySel("dashboard-loans-header")
      .should("have.text", "Loans3")
      .find("a")
      .should("have.attr", "href")
      .should("include", "https://unsplash.com/photos/7LzKELgdzzI");

    // Notification - handed in too later
    // Red icon
    cy.getBySel("physical-loans-overdue")
      .should("have.text", "1Returned too lateExpired")
      .find(".list-dashboard__dot")
      .should("exist");

    // Notification - hand in soon.
    // Red icon
    cy.getBySel("physical-loans-soon-overdue")
      .should("have.text", "1To be returned soonExpires soon")
      .find(".list-dashboard__dot")
      .should("exist");

    // Notification - hand in in a long time.
    cy.getBySel("loans-not-overdue")
      .should("have.text", "1Longer return time")
      .find(".list-dashboard__dot")
      .should("not.exist");

    // Header "Reservations" with link to loans page
    cy.getBySel("dashboard-reservations-header")
      .should("have.text", "Reservations2")
      .find("a")
      .should("have.attr", "href")
      .should("include", "https://unsplash.com/photos/7LzKELgdzzI");

    // Notification - reservations ready
    // Red icon
    cy.getBySel("reservations-ready")
      .should("have.text", "1Ready for youReady for pickup")
      .find(".list-dashboard__dot")
      .should("exist");

    // Notification - reservations queued
    // Red icon
    cy.getBySel("reservations-queued")
      .should("have.text", "1Still in queue")
      .find(".list-dashboard__dot")
      .should("not.exist");
  });

  it("Dashboard modals (details)", () => {
    // One element: details modal
    cy.getBySel("physical-loans-overdue").click();
    cy.getBySel("modal-loan-details-956250902-close-button")
      .should("exist")
      .click();

    cy.getBySel("modal-loan-details-956250902-close-button").should(
      "not.exist"
    );

    cy.getBySel("physical-loans-soon-overdue").click();
    cy.getBySel("modal-loan-details-956250955-close-button")
      .should("exist")
      .click();

    cy.getBySel("modal-loan-details-956250955-close-button").should(
      "not.exist"
    );

    cy.getBySel("loans-not-overdue").click();
    cy.getBySel("modal-loan-details-956251161-close-button")
      .should("exist")
      .click();

    cy.getBySel("modal-loan-details-956251161-close-button").should(
      "not.exist"
    );

    cy.getBySel("reservations-ready").click();
    cy.getBySel("modal-reservation-details-48991963-close-button")
      .should("exist")
      .click();

    cy.getBySel("modal-reservation-details-48991963-close-button").should(
      "not.exist"
    );
    cy.getBySel("reservations-queued").click();
    cy.getBySel("modal-reservation-details-46985591-close-button")
      .should("exist")
      .click();

    cy.getBySel("modal-reservation-details-46985591-close-button").should(
      "not.exist"
    );
  });

  it("Dashboard modals (group)", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: [
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956251161,
            materialItemNumber: "5122407464",
            recordId: "53387152",
            periodical: null,
            loanDate: "2023-01-09 08:15:11+0000",
            dueDate: "2023-01-16",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedMaxRenewalsReached"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250902,
            materialItemNumber: "5355351922",
            recordId: "61343164",
            periodical: null,
            loanDate: "2022-12-07 08:15:11+0000",
            dueDate: "2023-01-02",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "14dag-",
              description: "14 dages lån - bogligt (kan ikke reserveres)"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250955,
            materialItemNumber: "3842702665",
            recordId: "27002889",
            periodical: null,
            loanDate: "2023-01-02 08:15:11+0000",
            dueDate: "2023-01-09",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956251161,
            materialItemNumber: "5122407464",
            recordId: "53387152",
            periodical: null,
            loanDate: "2023-01-09 08:15:11+0000",
            dueDate: "2023-01-16",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedMaxRenewalsReached"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250902,
            materialItemNumber: "5355351922",
            recordId: "61343164",
            periodical: null,
            loanDate: "2022-12-07 08:15:11+0000",
            dueDate: "2023-01-02",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "14dag-",
              description: "14 dages lån - bogligt (kan ikke reserveres)"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250955,
            materialItemNumber: "3842702665",
            recordId: "27002889",
            periodical: null,
            loanDate: "2023-01-02 08:15:11+0000",
            dueDate: "2023-01-09",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        }
      ]
    }).as("loans");

    cy.intercept(
      "GET",
      "**/external/v1/agencyid/patrons/patronid/reservations/v2**",
      {
        statusCode: 200,
        body: [
          {
            reservationId: 67804976,
            recordId: "46985591",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-09-21",
            dateOfReservation: "2022-06-14T09:00:50.059",
            numberInQueue: 1,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "c6742151-f4a7-4655-a94f-7bd6a0009431",
            reservationType: "normal"
          },
          {
            reservationId: 67789642,
            recordId: "48991963",
            state: "readyForPickup",
            pickupBranch: "DK-775100",
            pickupDeadline: "2022-06-21",
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-13T17:08:58.505",
            numberInQueue: null,
            periodical: null,
            pickupNumber: "Reserveringshylde 74",
            ilBibliographicRecord: null,
            transactionId: "480fc2fe-5b19-49bc-a206-6e306c2a2a56",
            reservationType: "normal"
          },
          {
            reservationId: 67804976,
            recordId: "46985591",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-09-21",
            dateOfReservation: "2022-06-14T09:00:50.059",
            numberInQueue: 1,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "c6742151-f4a7-4655-a94f-7bd6a0009431",
            reservationType: "normal"
          },
          {
            reservationId: 67789642,
            recordId: "48991963",
            state: "readyForPickup",
            pickupBranch: "DK-775100",
            pickupDeadline: "2022-06-21",
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-13T17:08:58.505",
            numberInQueue: null,
            periodical: null,
            pickupNumber: "Reserveringshylde 74",
            ilBibliographicRecord: null,
            transactionId: "480fc2fe-5b19-49bc-a206-6e306c2a2a56",
            reservationType: "normal"
          }
        ]
      }
    ).as("reservations");

    cy.visit("/iframe.html?id=apps-dashboard--dashboard-entry&viewMode=story");
    cy.wait(["@loans", "@reservations"]);

    // More than one element: group modal
    cy.getBySel("physical-loans-overdue").click();
    cy.getBySel("modal-due-date--2023-01-08-close-button")
      .should("exist")
      .click();

    cy.getBySel("modal-due-date--2023-01-08-close-button").should("not.exist");

    cy.getBySel("physical-loans-soon-overdue").click();
    cy.getBySel("modal-due-date--2023-01-16-close-button")
      .should("exist")
      .click();

    cy.getBySel("modal-due-date--2023-01-16-close-button").should("not.exist");

    cy.getBySel("loans-not-overdue").click();
    cy.getBySel("modal-due-date--2024-01-09-close-button")
      .should("exist")
      .click();

    cy.getBySel("modal-due-date--2024-01-09-close-button").should("not.exist");

    cy.getBySel("reservations-ready").click();
    cy.getBySel("modal-reservations-ready-close-button")
      .should("exist")
      .click();

    cy.getBySel("modal-reservations-ready-close-button").should("not.exist");
    cy.getBySel("reservations-queued").click();

    cy.getBySel("modal-reservations-queued-close-button")
      .should("exist")
      .click();

    cy.getBySel("modal-reservations-queued-close-button").should("not.exist");
  });
});

export {};

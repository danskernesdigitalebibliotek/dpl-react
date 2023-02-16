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

    cy.visit("/iframe.html?id=apps-dashboard--dash-board-entry&viewMode=story");
    cy.wait(["@fees", "@loans", "@reservations"]);
  });

  it("Dashboard general", () => {
    cy.get("#root")
      .find("h1")
      .eq(0)
      .should("exist")
      .should("have.text", "Your profile");

    // Fees
    cy.get("#root")
      .find(".fee-container")
      .find("div")
      .find(".link-filters")
      .find(".link-filters__tag-wrapper")
      .find("a")
      .should("exist")
      .should("have.text", "Intermediates");

    cy.get("#root")
      .find(".fee-container")
      .find("div")
      .find(".link-filters")
      .find(".link-filters__tag-wrapper")
      .find(".link-filters__counter")
      .should("exist")
      .should("have.text", "6");

    cy.get("#root")
      .find(".fee-container")
      .find("div")
      .find(".status-userprofile__column")
      .find(".warning-bar")
      .find(".warning-bar__left")
      .find(".warning-bar__icon")
      .find("img")
      .should("exist");

    // Physical loans
    // header
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(0)
      .should("exist");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(0)
      .should("exist")
      .find(".link-filters")
      .find(".link-filters__tag-wrapper")
      .find("a")
      .should("exist")
      .should("have.text", "Physical loans");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(0)
      .should("exist")
      .find(".link-filters")
      .find(".link-filters__tag-wrapper")
      .find("span")
      .should("exist")
      .should("have.text", "3");

    // Returned too late
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .should("exist")
      .find(".m-24")
      .eq(0)
      .find(".list-dashboard")
      .find(".number")
      .should("exist")
      .should("have.text", "1");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .should("exist")
      .find(".m-24")
      .eq(0)
      .find(".list-dashboard")
      .find(".list-dashboard__title")
      .should("exist")
      .should("have.text", "Returned too late");

    // To be returned soon
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .should("exist")
      .find(".m-24")
      .eq(1)
      .find(".list-dashboard")
      .find(".number")
      .should("exist")
      .should("have.text", "1");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .should("exist")
      .find(".m-24")
      .eq(1)
      .find(".list-dashboard")
      .find(".list-dashboard__title")
      .should("exist")
      .should("have.text", "To be returned soon");

    // Some time until has to be returned
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .should("exist")
      .find(".m-24")
      .eq(2)
      .find(".list-dashboard")
      .find(".number")
      .should("exist")
      .should("have.text", "1");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .should("exist")
      .find(".m-24")
      .eq(2)
      .find(".list-dashboard")
      .find(".list-dashboard__title")
      .should("exist")
      .should("have.text", "Longer return time");

    // Reservations loans
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist")
      .find(".link-filters")
      .find(".link-filters__tag-wrapper")
      .find("a")
      .should("exist")
      .should("have.text", "Reservations");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist")
      .find(".link-filters")
      .find(".link-filters__tag-wrapper")
      .find("span")
      .should("exist")
      .should("have.text", "2");

    // Returned too late
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist")
      .find(".m-24")
      .eq(0)
      .find(".list-dashboard")
      .find(".number")
      .should("exist")
      .should("have.text", "1");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist")
      .find(".m-24")
      .eq(0)
      .find(".list-dashboard")
      .find(".list-dashboard__title")
      .should("exist")
      .should("have.text", "Ready for you");

    // To be returned soon
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist")
      .find(".m-24")
      .eq(1)
      .find(".list-dashboard")
      .find(".number")
      .should("exist")
      .should("have.text", "1");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist")
      .find(".m-24")
      .eq(1)
      .find(".list-dashboard")
      .find(".list-dashboard__title")
      .should("exist")
      .should("have.text", "Still in queue");
  });

  it("Intermediate notification", () => {
    cy.get("#root")
      .find(".fee-container")
      .find("div")
      .find(".status-userprofile__column")
      .find(".warning-bar")
      .find(".warning-bar__left")
      .find("div")
      .eq(1)
      .find("a")
      .should("exist")
      .should("have.text", "You owe in total");

    cy.get("#root")
      .find(".fee-container")
      .find("div")
      .find(".status-userprofile__column")
      .find(".warning-bar")
      .find(".warning-bar__right")
      .find(".warning-bar__owes")
      .should("exist")
      .should("have.text", "265.06,-");

    cy.get("#root")
      .find(".fee-container")
      .find("div")
      .find(".status-userprofile__column")
      .find(".warning-bar")
      .find(".warning-bar__right")
      .find("button")
      .should("exist")
      .should("have.text", "Read more");
  });

  it("returned-too-late-modal", () => {
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .should("exist")
      .find(".m-24")
      .eq(0)
      .click();

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__header")
      .find(".modal-loan__title")
      .should("exist")
      .should("have.text", "Returned too late");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-details__warning")
      .find(".warning-bar__icon")
      .should("exist")
      .should("have.attr", "src")
      .should("not.be.empty");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-details__warning")
      .find(".warning-bar")
      .find(".text-body-medium-regular")
      .should("exist")
      .should(
        "have.text",
        "The due date of return is exceeded, therefore you will be charged a fee, when the item is returnedRead more about fees"
      );
    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__buttons")
      .find(".checkbox__text")
      .should("exist")
      .should("have.text", "Choose all renewable");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__buttons")
      .find("[data-cy='button']")
      .should("exist")
      .should("have.text", "Renewable (0)");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__list")
      .find(".modal-loan__list-materials")
      .find(".list-materials")
      .eq(0)
      .find(".list-materials__content")
      .find(".status-label")
      .should("exist")
      .should("have.text", "Dummy bog");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__list")
      .find(".modal-loan__list-materials")
      .find(".list-materials")
      .eq(0)
      .find(".list-materials__content")
      .find(".text-header-h5")
      .should("exist")
      .should("have.text", "Dummy Some Title");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__list")
      .find(".modal-loan__list-materials")
      .find(".list-materials")
      .eq(0)
      .find(".list-materials__content")
      .find(".text-small-caption")
      .should("exist")
      .should(
        "have.text",
        "undefined Dummy Jens Jensen undefined Dummy Some Corporation (2006)"
      );
  });

  it("to-be-returned-soon-modal", () => {
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .should("exist")
      .find(".m-24")
      .eq(1)
      .click();

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__header")
      .find(".modal-loan__title")
      .should("exist")
      .should("have.text", "To be returned soon");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__buttons")
      .find(".checkbox__text")
      .eq(0)
      .should("exist")
      .should("have.text", "Choose all renewable");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__buttons")
      .find("[data-cy='button']")
      .should("exist")
      .should("have.text", "Renewable (0)");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__list")
      .find(".modal-loan__list-materials")
      .find(".list-materials")
      .eq(0)
      .find(".list-materials__content")
      .find(".status-label")
      .should("exist")
      .should("have.text", "Dummy bog");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__list")
      .find(".modal-loan__list-materials")
      .find(".list-materials")
      .eq(0)
      .find(".list-materials__content")
      .find(".text-header-h5")
      .should("exist")
      .should("have.text", "Dummy Some Title");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__list")
      .find(".modal-loan__list-materials")
      .find(".list-materials")
      .eq(0)
      .find(".list-materials__content")
      .find(".text-small-caption")
      .should("exist")
      .should(
        "have.text",
        "undefined Dummy Jens Jensen undefined Dummy Some Corporation (2006)"
      );
  });

  it("longer-return-time-modal", () => {
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .should("exist")
      .find(".m-24")
      .eq(2)
      .click();

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__header")
      .find(".modal-loan__title")
      .should("exist")
      .should("have.text", "Longer return time");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__buttons")
      .find(".checkbox__text")
      .should("exist")
      .should("have.text", "Choose all renewable");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__buttons")
      .find("[data-cy='button']")
      .should("exist")
      .should("have.text", "Renewable (0)");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__list")
      .find(".modal-loan__list-materials")
      .find(".list-materials")
      .eq(0)
      .find(".list-materials__content")
      .find(".status-label")
      .should("exist")
      .should("have.text", "Dummy bog");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__list")
      .find(".modal-loan__list-materials")
      .find(".list-materials")
      .eq(0)
      .find(".list-materials__content")
      .find(".text-header-h5")
      .should("exist")
      .should("have.text", "Dummy Some Title");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__list")
      .find(".modal-loan__list-materials")
      .find(".list-materials")
      .eq(0)
      .find(".list-materials__content")
      .find(".text-small-caption")
      .should("exist")
      .should(
        "have.text",
        "undefined Dummy Jens Jensen undefined Dummy Some Corporation (2006)"
      );
  });

  it("ready-for-you-modal", () => {
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist")
      .find(".m-24")
      .eq(0)
      .click();

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__header")
      .find(".modal-loan__title")
      .should("exist")
      .should("have.text", "Ready for loan");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__buttons")
      .find(".checkbox__text")
      .should("exist")
      .should("have.text", "Select all");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__buttons")
      .find("button")
      .should("exist")
      .should("have.text", "Remove reservations (0)");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__list")
      .find(".modal-loan__list-materials")
      .find(".list-materials")
      .eq(0)
      .find(".list-materials__content")
      .find(".status-label")
      .should("exist");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__list")
      .find(".modal-loan__list-materials")
      .find(".list-materials")
      .eq(0)
      .find(".list-materials__content")
      .find(".text-header-h5")
      .should("exist");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__list")
      .find(".modal-loan__list-materials")
      .find(".list-materials")
      .eq(0)
      .find(".list-materials__content")
      .find(".text-small-caption")
      .should("exist");
  });

  it("still-in-queue-modal", () => {
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist")
      .find(".m-24")
      .eq(1)
      .click();

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__header")
      .find(".modal-loan__title")
      .should("exist")
      .should("have.text", "Still in queue");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__buttons")
      .find(".checkbox__text")
      .should("exist")
      .should("have.text", "Select all");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__buttons")
      .find("button")
      .should("exist")
      .should("have.text", "Remove reservations (0) ");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__list")
      .find(".modal-loan__list-materials")
      .find(".list-materials")
      .eq(0)
      .find(".list-materials__content")
      .find(".status-label")
      .should("exist");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__list")
      .find(".modal-loan__list-materials")
      .find(".list-materials")
      .eq(0)
      .find(".list-materials__content")
      .find(".text-header-h5")
      .should("exist");

    cy.get("#root")
      .find(".modal")
      .find(".modal-loan__container")
      .find(".modal-loan__list")
      .find(".modal-loan__list-materials")
      .find(".list-materials")
      .eq(0)
      .find(".list-materials__content")
      .find(".text-small-caption")
      .should("exist");
  });
});

export {};

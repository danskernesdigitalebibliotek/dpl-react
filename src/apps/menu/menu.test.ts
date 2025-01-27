import { TOKEN_LIBRARY_KEY } from "../../core/token";

describe("Menu (authenticated))", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
      cy.createFakeAuthenticatedSession();
    });
    const testdate = new Date("2022-11-11T12:30:00.000Z");

    // Sets time to a specific date
    cy.clock(testdate);

    cy.intercept(
      "GET",
      "**/external/v1/agencyid/patrons/patronid/reservations/v2**",
      {
        statusCode: 200,
        body: []
      }
    ).as("physical_reservations");

    cy.intercept("GET", "**/external/agencyid/patrons/patronid/v2**", {
      statusCode: 200,
      body: {
        authenticateStatus: "VALID",
        patron: {
          address: {
            coName: null,
            street: "Hack Kampmanns Plads 2",
            postalCode: "8000",
            city: "Aarhus C",
            country: "DK"
          },
          allowBookings: false,
          birthday: "1990-05-07",
          blockStatus: null,
          defaultInterestPeriod: 180,
          emailAddress: "itkdev@mkb.aarhus.dk",
          name: "Testkort ITK CMS Merkur",
          notificationProtocols: ["DIGITAL_POST"],
          onHold: null,
          patronId: 10101010,
          phoneNumber: null,
          preferredLanguage: "da",
          preferredPickupBranch: "DK-775100",
          receiveEmail: true,
          receivePostalMail: false,
          receiveSms: false,
          resident: true,
          secondaryAddress: null
        }
      }
    }).as("patron");

    cy.intercept("GET", "**/v1/agencyid/patrons/patronid/reservations/v2**", {
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
          reservationType: "parallel"
        },
        {
          reservationId: 67804977,
          recordId: "46985592",
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
          reservationType: "parallel"
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
    }).as("reservations");

    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: [
        {
          isRenewable: true,
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-10-09 09:54:26+0000",
            dueDate: "2022-11-12",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        },
        {
          isRenewable: true,
          renewalStatusList: [],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250682,
            materialItemNumber: "5169457737",
            recordId: "53667546",
            periodical: null,
            loanDate: "2022-10-09 09:54:26+0000",
            dueDate: "2022-11-16",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "7dvd",
              description: "7 dages lån (DVD) - må fjernlånes"
            }
          }
        },
        {
          isRenewable: true,
          renewalStatusList: [],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250682,
            materialItemNumber: "5169457737",
            recordId: "53667546",
            periodical: null,
            loanDate: "2022-10-09 09:54:26+0000",
            dueDate: "2022-11-10",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "7dvd",
              description: "7 dages lån (DVD) - må fjernlånes"
            }
          }
        }
      ]
    }).as("physical_loans");

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
        }
      ]
    }).as("fees");

    cy.visit("/iframe.html?id=apps-header--user-menu&viewMode=story");
  });

  it("Menu", () => {
    cy.getBySel("header-menu-profile-button").should("exist").click();
    cy.wait(["@reservations", "@physical_loans", "@fees"]);
    cy.getBySel("modal").scrollTo("bottom");
    // 2. Systemet viser Lånerstatusmenuen med
    // 2.a. Brugerens navn
    cy.get(".modal-header__name")
      .should("exist")
      .and("have.text", "Testkort ITK CMS Merkur");

    // 2.b. Linket “Se din profil”, som linker til Lånerstatus Dashboard. Engelsk tekst: "My account"
    cy.get(".modal-header__link")
      .should("exist")
      .and("have.text", "My Account")
      .and("have.attr", "href")
      .and("include", "/");

    // 2.c.i. “x lån overskredet -- x loans expired"”
    cy.getBySel("physical-loans-overdue")
      .find(".number")
      .should("exist")
      .and("have.text", "1");
    cy.getBySel("physical-loans-overdue")
      .find(".list-dashboard__title")
      .should("exist")
      .and("have.text", "Returned too late");

    // 2.c.ii. “x lån udløber snart -- x loans expiring soon”
    cy.getBySel("physical-loans-soon-overdue")
      .find(".number")
      .should("exist")
      .and("have.text", "2");
    cy.getBySel("physical-loans-soon-overdue")
      .find(".list-dashboard__title")
      .should("exist")
      .and("have.text", "To be returned soon");

    // 2.c.iii. “x reservering klar” eller “x reserveringer klar”. Engelsk: "x reservation ready for pickup" eller "x reservations ready for pickup"
    cy.getBySel("reservations-ready")
      .find(".number")
      .should("exist")
      .and("have.text", "1");
    cy.getBySel("reservations-ready")
      .find(".list-dashboard__title")
      .should("exist")
      .and("have.text", "Ready for you");

    // 2.d. Menupunkterne
    // 2.d.i. “Lån” viser det samlede antal lån, og linker til Udlånsoversigten. Engelsk tekst: "Loans"
    cy.getBySel("menu-navigation-item-loans")
      .should("be.visible")
      .and("contain", "Loans")
      .find(".link-filters__counter")
      .should("exist")
      .and("have.text", "3");

    // 2.d.ii. “Reserveringer” linker til Reserveringsoversigten, og viser det samlede antal reserveringer. Engelsk: "Reservations"
    cy.getBySel("menu-navigation-item-reservations")
      .should("be.visible")
      .and("contain", "Reservations")
      .find(".link-filters__counter")
      .should("exist")
      .and("have.text", "2");

    // 2.d.iii. “Huskeliste” linker til Huskelisten, og viser det samlede antal materialer på huskelisten. Engelsk tekst: "My list"
    cy.getBySel("menu-navigation-item-my list")
      .should("exist")
      .and("contain", "My list");

    // 2.d.iv. “Gebyrer & Erstatninger” linker til Gebyrer og erstatninger, og viser det samlede antal af gebyrer og erstatninger. Engelsk: "Fees & Replacement costs"
    cy.getBySel("menu-navigation-item-fees & replacement costs")
      .should("be.visible")
      .and("contain", "Fees & Replacement costs")
      .find(".link-filters__counter")
      .should("exist")
      .and("have.text", "2");

    // 2.e. “Log ud” knappen. Engelsk tekst: "Log out"
    cy.getBySel(".menu-logout-button")
      .should("exist")
      .and("have.text", "Log out");
  });
});

// TODO: Create test for unauthenticated access

export {};

import { TOKEN_LIBRARY_KEY } from "../../../../core/token";

describe("Pause reservation modal test", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });
    const clockDate = new Date(
      "Sat Oct 08 2022 20:10:25 GMT+0200 (Central European Summer Time)"
    );

    // Sets time to a specific date
    cy.clock(clockDate);
  });

  it("It shows pause modal", () => {
    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: {
        reservations: [],
        code: 101,
        message: "OK"
      }
    });

    cy.intercept("PUT", "**/agencyid/patrons/patronid/**", {
      code: 101,
      message: "OK"
    }).as("update-user");

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
          birthday: "1990-03-14",
          blockStatus: null,
          defaultInterestPeriod: 180,
          emailAddress: "test@test.dk",
          name: "Testkort ITK CMS Merkur",
          notificationProtocols: ["DIGITAL_POST"],
          onHold: { from: "", to: "2022-07-30" },
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
    }).as("user");

    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-pause-modal"
    );

    cy.wait("@user");
    // ID 12 1 The system opens a pause modal
    cy.get(".modal.modal-cta").should("exist");

    // ID 12 2.b. text:  The system opens a pause modal "Pause your reservations early, since reservations that are already being processed, will not be paused.
    cy.get(".modal.modal-cta p")
      .eq(0)
      .should(
        "have.text",
        "Pause your reservations early, since reservations that are already being processed, will not be paused."
      );
    // ID 12 2.c. datepicker: start date
    cy.get(".modal.modal-cta [data-cy='start-date']")
      .should("exist")
      .should("have.attr", "value")
      // ID 12 2.c.i Start day should be configurable
      .should("include", "2022-06-30");

    // ID 12 2.e. datepicker: end date
    cy.get(".modal.modal-cta [data-cy='end-date']").should("exist");

    // ID 12 2.b. text: link "read more"
    cy.get(".modal")
      .find("[data-cy='pause-reservation-info-link']")
      .should("have.attr", "href")
      .should(
        "include",
        "https://images.unsplash.com/photo-1571043733612-d5444ff7d4ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80"
      );

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
          birthday: "1990-03-14",
          blockStatus: null,
          defaultInterestPeriod: 180,
          emailAddress: "test@test.dk",
          name: "Testkort ITK CMS Merkur",
          notificationProtocols: ["DIGITAL_POST"],
          onHold: { from: "some-date", to: "some-date" },
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
    }).as("user");

    cy.get(".modal.modal-cta .modal-pause__button button")
      .should("exist")
      .click();

    // ID 12 4.b. closes modal, updates reservation overview with badge
    cy.get(".modal.modal-cta").should("not.exist");

    cy.get(".reservation-list-page")
      .find(".dpl-pause-reservation-component__flex__badge")
      .should("exist");

    cy.get(".reservation-list-page")
      .find(".dpl-toggle-button--active")
      .should("exist");
  });
});

export {};

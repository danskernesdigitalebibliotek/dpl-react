describe("Pause reservation modal test", () => {
  beforeEach(() => {
    cy.createFakeAuthenticatedSession();
    cy.createFakeLibrarySession();

    const clockDate = new Date(
      "Sat Oct 08 2022 20:10:25 GMT+0200 (Central European Summer Time)"
    );

    // Sets time to a specific date
    cy.clock(clockDate);

    cy.intercept("GET", "**/external/agencyid/patrons/person/patronid/v2**", {
      blockStatus: null
    });
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

    cy.intercept("GET", "**/external/agencyid/patrons/person/patronid/v2**", {
      statusCode: 200,
      body: {
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
        emailAddresses: [
          {
            emailAddress: "test@test.dk",
            receiveNotification: true
          }
        ],
        name: "Testkort ITK CMS Merkur",
        notificationProtocols: ["DIGITAL_POST"],
        onHold: { from: "", to: "2022-07-30" },
        patronId: 10101010,
        phoneNumber: [],
        preferredLanguage: "da",
        preferredPickupBranch: "DK-775100",
        receivePostalMail: false,
        resident: true,
        secondaryAddress: null
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

    // There should be a date range component for choosing a pause period.
    cy.getBySel("date-range").should("exist");

    // ID 12 2.b. text: link "read more"
    cy.get(".modal")
      .find("[data-cy='pause-reservation-info-link']")
      .should("have.attr", "href")
      .should(
        "include",
        "https://images.unsplash.com/photo-1571043733612-d5444ff7d4ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80"
      );

    cy.intercept("GET", "**/external/agencyid/patrons/person/patronid/v2**", {
      statusCode: 200,
      body: {
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
        emailAddresses: [
          {
            emailAddress: "test@test.dk",
            receiveNotification: true
          }
        ],
        name: "Testkort ITK CMS Merkur",
        notificationProtocols: ["DIGITAL_POST"],
        onHold: { from: "some-date", to: "some-date" },
        patronId: 10101010,
        phoneNumbers: [],
        preferredLanguage: "da",
        preferredPickupBranch: "DK-775100",
        receivePostalMail: false,
        resident: true,
        secondaryAddress: null
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

    cy.get(".dpl-pause-reservation-component")
      .find(".dpl-pause-reservation-component__flex__text")
      .should("have.text", "Your reservations are paused");
  });
});

export {};

import { TOKEN_LIBRARY_KEY } from "../../core/token";

describe("Patron page", () => {
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });

    cy.intercept({
      method: "PUT",
      url: "**/external/agencyid/patrons/patronid/v5"
    }).as("PUT-patron");

    cy.intercept("GET", "**/external/agencyid/patrons/patronid/v2**", {
      patron: {
        blockStatus: null
      }
    });

    cy.intercept("GET", "**/v1/library/profile", {
      id: 816,
      name: "Aarhus Bibliotek",
      isilNumber: "DK-775100",
      ebookLoanDurationInDays: 30,
      maxEbookAmountPerMonth: 300001,
      maxEbookAmountPerMonthNotificationThreshold: 200001,
      maxConcurrentEbookLoansPerBorrower: 7,
      maxConcurrentEbookReservationsPerBorrower: 3,
      maxEbookCancellationsPerMonth: 20,
      audioLoanDurationInDays: 30,
      maxAudioAmountPerMonth: 300002,
      maxAudioAmountPerMonthNotificationThreshold: 200002,
      maxConcurrentAudioLoansPerBorrower: 8,
      maxConcurrentAudioReservationsPerBorrower: 3,
      maxAudioCancellationsPerMonth: 10,
      testCards: [
        {
          testCardNumber: "3200000001"
        },
        {
          testCardNumber: "3200000002"
        },
        {
          testCardNumber: "3200000003"
        },
        {
          testCardNumber: "3200000004"
        }
      ]
    }).as("LibraryProfile");
    cy.intercept("GET", "**/v1/user/loans", {
      loans: [],
      libraryData: {
        loanDurationDays: 0,
        maxConcurrentEbookLoansPerBorrower: 0,
        maxConcurrentAudiobookLoansPerBorrower: 0,
        maxAmountPerMonth: 0
      },
      userData: {
        totalLoans: 2,
        totalEbookLoans: 1,
        totalAudioLoans: 1,
        ebookLoansRemaining: -2,
        audiobookLoansRemaining: -2,
        ebookLoanAvailableUtc: "2022-08-16T10:04:44.2734375Z",
        audioLoanAvailableUtc: "2022-08-16T10:04:44.2734375Z",
        friendlyCardNumber: "8R9W59"
      },
      code: 101,
      message: "OK"
    }).as("Loans");

    cy.intercept("GET", "**/external/agencyid/patrons/patronid/v2**", {
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
        onHold: {
          from: "2022-10-21",
          to: "2022-10-23"
        },
        patronId: 10101010,
        phoneNumber: "1234567890",
        preferredLanguage: "da",
        preferredPickupBranch: "DK-775100",
        receiveEmail: true,
        receivePostalMail: false,
        receiveSms: false,
        resident: true,
        secondaryAddress: null
      }
    }).as("User");
    cy.visit("/iframe.html?path=/story/apps-patron-page--patron-page-entry");
    cy.wait(["@LibraryProfile", "@Loans", "@User"]);
  });

  it("Patron page", () => {
    // ID 36 2. The system shows
    // ID 36 2.a. Header
    cy.get(".dpl-patron-page")
      .find("h1")
      .should("have.text", "Patron profile page");

    // ID 36 2.b. Digital loans - quota
    cy.get(".dpl-patron-page .dpl-status-loans")
      .find("h2")
      .should("have.text", "Digital loans (eReolen)");

    // ID 36 2.b.i. Number of digital loans (ebook - audiobooks) the patron has left in "this" month
    cy.get(".dpl-patron-page .dpl-status-loans")
      .find(".text-label")
      .eq(1)
      .should("have.text", "2 out of 7");
    cy.get(".dpl-patron-page .dpl-status-loans")
      .find(".text-label")
      .eq(3)
      .should("have.text", "2 out of 8");

    // ID 36 2.c. basic information
    // ID 36 2.c.i. Name
    cy.get(".dpl-patron-page .dpl-patron-info")
      .find(".dpl-patron-info__label")
      .eq(0)
      .should("have.text", "Name");
    cy.get(".dpl-patron-page .dpl-patron-info")
      .find(".dpl-patron-info__text")
      .eq(0)
      .should("have.text", "Testkort ITK CMS Merkur");
    // ID 36 2.c.ii. Address
    cy.get(".dpl-patron-page .dpl-patron-info")
      .find(".dpl-patron-info__label")
      .eq(1)
      .should("have.text", "Address");
    cy.get(".dpl-patron-page .dpl-patron-info")
      .find(".dpl-patron-info__text")
      .eq(1)
      .should("have.text", "Hack Kampmanns Plads 28000Aarhus CDK");

    // ID 36 2.d. Contact info
    cy.get("[data-cy='patron-page-contact-info']")
      .find("h2")
      .should("have.text", "Contact information");

    // ID 36 2.d.i. Tilføj, skift eller slet telefonnummer
    cy.get("[data-cy='phone-input']").should("have.value", "1234567890");

    // ID 37 2. user adds/changes email/phone
    cy.get("[data-cy='phone-input']").type("21");

    // ID 36 2.d.i.a. Til- eller fravælg notifikationer via SMS
    cy.get("[data-cy='phone-messages']").should("not.be.checked");

    // ID 37 2.a. User activates/deactivates notification checkboxes
    cy.get("[data-cy='phone-messages']").check({ force: true });

    // ID 36 2.d.ii. Tilføj skift eller slet e-mailadresse
    cy.get("[data-cy='email-address-input']").should(
      "have.value",
      "itkdev@mkb.aarhus.dk"
    );

    // ID 37 2. user adds/changes email/phone
    cy.get("[data-cy='email-address-input']").type("dd");

    // ID 36 2.d.ii.a. Til- eller fravælg notifikationer via email
    cy.get("[data-cy='email-messages']").should("be.checked");

    // ID 37 2.a. User activates/deactivates notification checkboxes
    cy.get("[data-cy='email-messages']").uncheck({ force: true });

    // ID 36 2.f. reservations
    cy.get("[data-cy='pickup-reservations-section']")
      .find("h2")
      .should("have.text", "Reservations");

    // ID 36 2.f.i. change pickup library
    // ID 36 2.f.i.a. options with possible pickup libraries (not blacklisted)
    cy.get("[data-cy='pickup-reservations-section']")
      .find("select")
      .should(
        "have.text",
        "HøjbjergBeder-MallingGellerupLystrupHarlevSkødstrupArrestenHasleSolbjergITKSabroTranbjergRisskovHjortshøjÅbyStadsarkivetFælles undervejsFællessekretariatetBavnehøjHovedbiblioteketTrigeTilstVibyEgå"
      );
    // ID 36 2.f.ii. pause reservations
    cy.get("[data-cy='show-reservation-pause-section']").should("exist");

    // ID 36 2.f.ii.a. Checkbox with text: pause reservations
    cy.get("[data-cy='pickup-reservations-section']")
      .find("h3")
      .should("have.text", "Pause physical reservations");

    // ID 36 2.g. Change pin
    cy.get("[data-cy='pincode-section']")
      .find("h2")
      .should("have.text", "Pincode");

    // ID 36 2.g.i. Info/help text
    cy.get("[data-cy='pincode-section']")
      .find("p")
      .eq(0)
      .should(
        "have.text",
        "Change current pin by entering a new pin and saving"
      );

    // ID 36 2.g.ii. Input field: pin
    cy.get("[data-cy='pincode-input']").should("exist");

    // ID 36 2.g.iii. Input field: confirm pin
    cy.get("[data-cy='pincode-confirm-input']").should("exist");

    cy.get("[data-cy='pincode-input']").type("1234");

    cy.get("[data-cy='pincode-confirm-input']").type("1234");

    // ID 41 2. click delete your profile, 3. refered to page
    cy.get("[data-cy='delete-patron-link']")
      .should("have.attr", "href")
      .should(
        "include",
        "https://images.unsplash.com/photo-1560888126-5c13ad3f9345?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80"
      );

    // ID 37 3. The user clicks save
    cy.get("[data-cy='save-user-patron']").click();
    cy.wait("@PUT-patron").then(({ request }) => {
      assert.equal(request?.body.patron.emailAddress, "itkdev@mkb.aarhus.dkdd");
      assert.equal(request?.body.patron.phoneNumber, "123456789021");
      assert.equal(request?.body.patron.receiveEmail, false);
      assert.equal(request?.body.patron.receiveSms, true);
      assert.equal(request?.body.pincodeChange.pincode, "1234");
      assert.equal(request?.body.pincodeChange.libraryCardNumber, "10101010");
    });
  });
});

export {};

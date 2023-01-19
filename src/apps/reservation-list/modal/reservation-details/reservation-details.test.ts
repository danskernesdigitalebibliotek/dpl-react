import { TOKEN_LIBRARY_KEY } from "../../../../core/token";

describe("Reservation details modal test", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });

    // Intercept covers.
    cy.fixture("cover.json").then((result) => {
      cy.intercept("GET", "**/covers**", result);
    });

    const clockDate = new Date(
      "Sat Oct 08 2022 20:10:25 GMT+0200 (Central European Summer Time)"
    ).getTime();

    // Sets time to a specific date
    // https://github.com/cypress-io/cypress/issues/7577
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cy.clock(clockDate).then((clock: any) => clock.bind(window));

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
          emailAddress: "test@test.dk",
          name: "Testkort ITK CMS Merkur",
          notificationProtocols: ["DIGITAL_POST"],
          onHold: { from: "some date", to: "some date" },
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
  });

  it("It shows digital reservation details modal", () => {
    cy.intercept("GET", "**/v1/agencyid/patrons/patronid/reservations/**", {
      statusCode: 200,
      body: [
        {
          reservationId: 67804976,
          recordId: "46985591",
          state: "reserved",
          pickupBranch: "DK-775160",
          pickupDeadline: null,
          expiryDate: "2022-09-21",
          dateOfReservation: "2022-06-14T09:00:50.059",
          numberInQueue: 1,
          periodical: null,
          pickupNumber: null,
          ilBibliographicRecord: null,
          transactionId: "c6742151-f4a7-4655-a94f-7bd6a0009431",
          reservationType: "normal"
        }
      ]
    });
    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: {
        reservations: [
          {
            productId: "0ddd10d0-d69f-4734-8a27-ac4546f4b912",
            identifier: "9788740047905",
            createdDateUtc: "2022-08-16T10:52:39.932Z",
            status: 2,
            productTitle: "Bargums synder",
            expireDateUtc: "2023-01-27T19:37:15.63Z",
            expectedRedeemDateUtc: "2023-01-27T19:37:15.63Z"
          }
        ],
        code: 101,
        message: "OK"
      }
    });

    cy.intercept("GET", "**v1/products/**", {
      product: {
        createdUtc: "2014-11-04T12:20:19.347Z",
        updatedUtc: "2017-02-23T13:04:56.617Z",
        title: "Mordet i det blå tog",
        isActive: true,
        languageCode: "dan",
        coverUri: null,
        thumbnailUri: null,
        productType: 1,
        externalProductId: {
          idType: 15,
          id: "9788711321683"
        },
        internalProductId: "fa07f75d-5c00-4429-90c9-76e2bb5eb526",
        contributors: [
          {
            type: "A01",
            firstName: "Agatha",
            lastName: "Christie"
          },
          {
            type: "B06",
            firstName: "Jutta",
            lastName: "Larsen"
          }
        ],
        format: "epub",
        fileSizeInBytes: 899,
        durationInSeconds: null,
        publisher: "Lindhardt og Ringhof",
        publicationDate: "2014-11-07T00:00:00Z",
        description:
          'I køen på rejsebureauet får Katherine øje på en mand, som hun samme morgen har set uden for sin hoteldør. Da hun kigger sig tilbage over skulderen, ser hun, at manden står i døråbningen og stirrer på hende, og der går en kuldegysning gennem hende …<br><br>Episoden udvikler sig til en sag for den lille belgiske mesterdetektiv, der med klædelig ubeskedenhed præsenterer sig: "Mit navn er Hercule Poirot, og jeg er formentlig den største detektiv i verden."',
        productCategories: [
          {
            description: "Skønlitteratur og relaterede emner",
            code: "F"
          },
          {
            description: "Klassiske krimier",
            code: "FFC"
          }
        ],
        costFree: true
      },
      code: 101,
      message: "OK"
    });

    cy.intercept("DELETE", "**/v1/user/reservations/**", {
      code: 101,
      message: "OK"
    }).as("delete-reservation");

    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-digital-details-modal"
    );
    // ID 17 2.a. The icon "X" which closes the modal
    cy.get(".modal").find(".modal-btn-close").should("exist");

    // ID 43 2.a. Material cover (coverservice)
    cy.get(".modal")
      .find(".cover")
      .find("img")
      .should("have.attr", "src")
      .should(
        "include",
        "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_small/v1543886053/bogportalen.dk/9788700398368.jpg"
      );

    // ID 43 2.c. full title
    cy.get(".modal").find("h2").should("have.text", "Mordet i det blå tog");

    // ID 43 2.d. authors
    cy.get(".modal")
      .find("[data-cy='modal-authors']")
      .should("have.text", "By Agatha Christie and Jutta Larsen (2014)");

    // ID 43 2.b. Material types including accessibility of material
    cy.get(".modal").find(".status-label").eq(0).should("have.text", "E-book");
    // ID 43 2.b. Material types including accessibility of material
    // ID 17 2.b.ii "Ready for loan" if the reservation is ready for loan, or else it will not be shown

    // ID 17 2.c. the link "Remove your reservation"
    cy.get(".modal")
      .find("button.link-tag")
      .should("have.text", "Remove your reservation")
      .click();

    cy.get(".modal").find("[data-cy='delete-reservation-button']").click();

    // ID 17 2.d. button: go to ereolen
    cy.get(".modal")
      .find("[data-cy='go-to-ereolen-button']")
      .should("have.text", "Go to eReolen")
      .should("have.attr", "href")
      // ID 17 2.d.i. link to "ereolen.dk/user/me"
      .should("include", "ereolen.dk/user/me");

    cy.get(".modal")
      .find(".status-label")
      .eq(1)
      .should("have.text", "Ready for pickup");

    // ID 17 2.e. header "status"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(0)
      .find(".text-header-h5")
      .should("have.text", "Status");

    // ID 2.e.i.2 the text "Your reservation expires {ExpireUtc}" when the state from publizon is 2
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(0)
      .find(".text-small-caption")
      .should("have.text", "Your reservation expires 27-01-2023!");

    // ID 17 2.f. header "date of reservation"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(1)
      .find(".text-header-h5")
      .should("have.text", "Date of reservation");

    // ID 2.e.i.2 the text "{createdutc}"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(1)
      .find(".text-small-caption")
      .should("have.text", "16-08-2022");
  });

  it("It shows digital reservation details modal, material queued", () => {
    cy.intercept("GET", "**/v1/agencyid/patrons/patronid/reservations/**", {
      statusCode: 200,
      body: [
        {
          reservationId: 67804976,
          recordId: "46985591",
          state: "reserved",
          pickupBranch: "DK-775160",
          pickupDeadline: null,
          expiryDate: "2022-09-21",
          dateOfReservation: "2022-06-14T09:00:50.059",
          numberInQueue: 1,
          periodical: null,
          pickupNumber: null,
          ilBibliographicRecord: null,
          transactionId: "c6742151-f4a7-4655-a94f-7bd6a0009431",
          reservationType: "normal"
        }
      ]
    });
    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: {
        reservations: [
          {
            productId: "0ddd10d0-d69f-4734-8a27-ac4546f4b912",
            identifier: "9788740047905",
            createdDateUtc: "2022-08-16T10:52:39.932Z",
            status: 1,
            productTitle: "Bargums synder",
            expireDateUtc: "2023-01-27T19:37:15.63Z",
            expectedRedeemDateUtc: "2023-01-27T19:37:15.63Z"
          }
        ],
        code: 101,
        message: "OK"
      }
    });

    cy.intercept("GET", "**v1/products/**", {
      product: {
        createdUtc: "2014-11-04T12:20:19.347Z",
        updatedUtc: "2017-02-23T13:04:56.617Z",
        title: "Mordet i det blå tog",
        isActive: true,
        languageCode: "dan",
        coverUri: null,
        thumbnailUri: null,
        productType: 1,
        externalProductId: {
          idType: 15,
          id: "9788711321683"
        },
        internalProductId: "fa07f75d-5c00-4429-90c9-76e2bb5eb526",
        contributors: [
          {
            type: "A01",
            firstName: "Agatha",
            lastName: "Christie"
          },
          {
            type: "B06",
            firstName: "Jutta",
            lastName: "Larsen"
          }
        ],
        format: "epub",
        fileSizeInBytes: 899,
        durationInSeconds: null,
        publisher: "Lindhardt og Ringhof",
        publicationDate: "2014-11-07T00:00:00Z",
        description:
          'I køen på rejsebureauet får Katherine øje på en mand, som hun samme morgen har set uden for sin hoteldør. Da hun kigger sig tilbage over skulderen, ser hun, at manden står i døråbningen og stirrer på hende, og der går en kuldegysning gennem hende …<br><br>Episoden udvikler sig til en sag for den lille belgiske mesterdetektiv, der med klædelig ubeskedenhed præsenterer sig: "Mit navn er Hercule Poirot, og jeg er formentlig den største detektiv i verden."',
        productCategories: [
          {
            description: "Skønlitteratur og relaterede emner",
            code: "F"
          },
          {
            description: "Klassiske krimier",
            code: "FFC"
          }
        ],
        costFree: true
      },
      code: 101,
      message: "OK"
    });

    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-digital-details-modal"
    );
    // ID 2.e.i.2 the text "Borrow before {ExpectedRedeemDateTimeUtc}" when the state from publizon is 1
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(0)
      .find(".text-small-caption")
      .should("have.text", "Borrow before 27-01-2023");
  });

  it("It shows physical reservation details modal", () => {
    cy.intercept("GET", "**/v1/agencyid/patrons/patronid/reservations/**", {
      statusCode: 200,
      body: [
        {
          reservationId: 46985591,
          recordId: "46985591",
          state: "reserved",
          pickupBranch: "DK-775160",
          pickupDeadline: null,
          expiryDate: "2022-09-21",
          dateOfReservation: "2022-06-14T09:00:50.059",
          numberInQueue: 1,
          periodical: null,
          pickupNumber: null,
          ilBibliographicRecord: null,
          transactionId: "c6742151-f4a7-4655-a94f-7bd6a0009431",
          reservationType: "normal"
        }
      ]
    });
    cy.interceptRest({
      aliasName: "work",
      httpMethod: "POST",
      url: "**/opac/**",
      fixtureFilePath: "reservation-list/work.json"
    });

    cy.intercept("DELETE", "**/external/v1/agencyid/patrons/patronid/**", {
      code: 101,
      message: "OK"
    });

    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-physical-details-modal"
    );

    // ID 43 2.a. Material cover (coverservice)
    cy.get(".modal")
      .find(".cover")
      .find("img")
      .should("have.attr", "src")
      .should(
        "include",
        "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_small/v1543886053/bogportalen.dk/9788700398368.jpg"
      );

    // ID 43 2.c. full title
    cy.get(".modal").find("h2").should("have.text", "Dummy Some Title");

    // Serial title
    // Serial number
    cy.get(".modal")
      .find("[data-cy='modal-series']")
      .should("have.text", "Detektivbureau Nr. 2 1");

    // ID 43 2.d. authors
    cy.get(".modal")
      .find("[data-cy='modal-authors']")
      .should(
        "have.text",
        "By Dummy Jens Jensen and Dummy Some Corporation (2006)"
      );

    // ID 43 2.b. Material types including accessibility of material
    cy.get(".modal")
      .find(".status-label")
      .eq(0)
      .should("have.text", "Dummy bog");

    // ID 13 2.b. Text: “Others in queue” if numberInQueue > 0
    cy.get(".modal")
      .find(".modal-details__buttons")
      .eq(0)
      .find(".text-body-medium-regular")
      .should("have.text", "Others are queueing for this material");

    // ID 13 button: “Remove you reservation”
    cy.get(".modal")
      .find(".modal-details__buttons")
      .eq(0)
      .find("button")
      .should("have.text", "Remove your reservation")
      .click();

    cy.get(".modal").find("[data-cy='delete-reservation-button']").click();

    // ID 13 2.d. header "status"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(0)
      .find(".text-header-h5")
      .should("have.text", "Status");

    // ID 13 2.d.i. the text "{numberInQueue} number in queue"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(0)
      .find(".text-small-caption")
      .should("have.text", "1 queued");

    // ID 13 2.e. header "pickup branch"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(1)
      .find(".text-header-h5")
      .should("have.text", "Pickup branch");

    // ID 13 2.e.i. text "{pickupBranch}"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(1)
      .find(".text-small-caption")
      .should("have.text", "Risskov");

    // ID 13 2.e.iii. the link "apply changes"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(1)
      .find("button")
      .should("exist")
      .click();

    // ID 16 2. Dropdown with pickup libraries
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(1)
      .find(".dropdown__select")
      .find(".dropdown__option")
      .should(
        "have.text",
        "PickHøjbjergBeder-MallingGellerupLystrupHarlevSkødstrupArrestenHasleSolbjergITKSabroTranbjergRisskovHjortshøjÅbyStadsarkivetFælles undervejsFællessekretariatetBavnehøjHovedbiblioteketTrigeTilstVibyEgå"
      );

    // ID 16 3. user selects library
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(1)
      .find(".dropdown__select")
      .select("DK-775120");

    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(1)
      .find(".dropdown__select")
      .should("have.value", "DK-775120");

    // ID 13 2.f. header "Not interested after"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(2)
      .find(".text-header-h5")
      .should("have.text", "Not interested after");

    // ID 13 2.f.i. text "{expiryDate}"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(2)
      .find(".text-small-caption")
      .should("have.text", "21-09-2022");

    // ID 13 2.f.ii. the link "apply changes"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(2)
      .find("button")
      .should("exist")
      .click();

    // ID 15 2.a&b&c&d&e Dropdown with interest periods
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(2)
      .find(".dropdown__select")
      .find(".dropdown__option")
      .should("have.text", "Pick1 month2 months3 months6 months1 year");

    cy.intercept(
      "PUT",
      "**/external/v1/agencyid/patrons/patronid/reservations**",
      {
        statusCode: 201,
        body: { code: 101, message: "OK" }
      }
    ).as("put-library-branch-and-expiry-date");

    // ID 15 2.g user clicks save
    // ID 16 4. user clicks save
    cy.get(".modal-details__list")
      .find("[data-cy='save-physical-details']")
      .click();

    // ID 15 2.i still on "detaljevisning"
    // ID 16 6. user clicks save
    cy.get(".modal").should("exist");

    // ID 16 6.b user clicks save
    // ID 15 2.i.b pick up library change link
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(1)
      .find("button")
      .should("exist");

    // ID 16 6.c user clicks save
    // ID 15 2.i.c expiry date change link
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(2)
      .find("button")
      .should("exist")
      .click();

    // ID 13 2.h. header "Date of reservation"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(3)
      .find(".text-header-h5")
      .should("have.text", "Date of reservation");

    // ID 13 2.h.i. text "{dateOfReservation}"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(3)
      .find(".text-small-caption")
      .should("have.text", "14-06-2022");
  });

  it("It shows physical reservation details modal (ready for pickup)", () => {
    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: {
        reservations: [
          {
            productId: "0ddd10d0-d69f-4734-8a27-ac4546f4b912",
            identifier: "123",
            createdDateUtc: "2022-08-16T10:52:39.932Z",
            status: 1,
            productTitle: "Bargums synder",
            expireDateUtc: "2023-01-27T19:37:15.63Z",
            expectedRedeemDateUtc: "2023-01-27T19:37:15.63Z"
          }
        ],
        code: 101,
        message: "OK"
      }
    });

    cy.intercept("GET", "**/v1/agencyid/patrons/patronid/reservations/**", {
      statusCode: 200,
      body: [
        {
          reservationId: 46985591,
          recordId: "46985591",
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
    });

    cy.interceptRest({
      aliasName: "work",
      httpMethod: "POST",
      url: "**/opac/**",
      fixtureFilePath: "reservation-list/work.json"
    });

    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-physical-details-modal"
    );

    // ID 43 2.a. Material cover (coverservice)
    cy.get(".modal")
      .find(".cover")
      .find("img")
      .should("have.attr", "src")
      .should(
        "include",
        "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_small/v1543886053/bogportalen.dk/9788700398368.jpg"
      );

    //  ID 13 2.a.ii. "Ready for pickup" if reservation is ready for pickup
    cy.get(".modal")
      .find(".status-label")
      .eq(1)
      .should("have.text", "Ready for pickup");

    // ID 13 2.b. Text: “Others in queue” if numberInQueue > 0
    cy.get(".modal")
      .find(".modal-details__buttons")
      .eq(0)
      .find(".text-body-medium-regular")
      .should("not.exist");

    // ID 13 2.e.ii. text "{pickupNumber}" if reservation is ready for pickup
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(0)
      .find(".text-small-caption")
      .eq(1)
      .should("have.text", "Reserveringshylde 74");

    // ID 13 2.h. header "Pickup deadline"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(2)
      .find(".text-header-h5")
      .should("have.text", "Pickup deadline");

    // ID 13 2.h.i. text "{pickupDeadline}" if reservation is ready for pickup
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(2)
      .find(".text-small-caption")
      .should("have.text", "21-06-2022");
  });
});

export default {};

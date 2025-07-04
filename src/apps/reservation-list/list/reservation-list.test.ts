import { FbiCoverUrlPattern } from "../../../../cypress/fixtures/fixture.types";

describe("Reservation list", () => {
  beforeEach(() => {
    cy.createFakeAuthenticatedSession();
    cy.createFakeLibrarySession();

    const wednesday20220603 = new Date("2023-02-03T12:30:00.000Z").getTime();

    // Sets time to a specific date
    // https://github.com/cypress-io/cypress/issues/7577
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cy.clock(wednesday20220603).then((clock: any) => clock.bind(window));

    cy.interceptRest({
      aliasName: "work",
      httpMethod: "POST",
      url: "**/next*/**",
      fixtureFilePath: "reservation-list/work.json"
    });

    cy.intercept("GET", "**/external/agencyid/patrons/patronid/v4**", {
      patron: {
        blockStatus: null
      }
    });

    cy.interceptRest({
      aliasName: "product",
      httpMethod: "GET",
      url: "**v1/products/**",
      fixtureFilePath: "reservation-list/product.json"
    });

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
            reservationId: 67805006,
            recordId: "39429977",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-11",
            dateOfReservation: "2022-06-14T09:01:36.523",
            numberInQueue: 2,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "13c3f730-b71c-4164-bc41-b439ce9bf115",
            reservationType: "normal"
          },
          {
            reservationId: 67807688,
            recordId: "20401206",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-11",
            dateOfReservation: "2022-06-14T10:19:23.429",
            numberInQueue: 1,
            periodical: {
              volume: null,
              volumeYear: "2018",
              displayText: "2018, nr. 9",
              volumeNumber: "9"
            },
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "634696e7-f5b2-49ae-8038-6546c5943f85",
            reservationType: "normal"
          },
          {
            reservationId: 67842154,
            recordId: "42825115",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:01:48.102",
            numberInQueue: 1,
            periodical: {
              volume: null,
              volumeYear: "2022",
              displayText: "2022, 03, April-Maj#Forårshaven",
              volumeNumber: "03, April-Maj#Forårshaven"
            },
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "b5a3f150-e45c-4cce-952e-ed6edc553eab",
            reservationType: "normal"
          },
          {
            reservationId: 67842199,
            recordId: "42825115",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:03:10.578",
            numberInQueue: 1,
            periodical: {
              volume: null,
              volumeYear: "2021",
              displayText: "2021, 5, Juni-Juli",
              volumeNumber: "5, Juni-Juli"
            },
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "76288332-23f6-4d29-8edc-8dbf9937d8fc",
            reservationType: "normal"
          },
          {
            reservationId: 67842207,
            recordId: "42825115",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:03:41.134",
            numberInQueue: 1,
            periodical: {
              volume: null,
              volumeYear: "2021",
              displayText: "2021, 5#Sommerens blomster",
              volumeNumber: "5#Sommerens blomster"
            },
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "49429a5f-f63e-4221-a96a-dc7aa27c5ec0",
            reservationType: "normal"
          },
          {
            reservationId: 67843684,
            recordId: "62448784",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:37:31.768",
            numberInQueue: 4,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "cfac37ef-564e-423d-a491-3d64f4c383d1",
            reservationType: "normal"
          },
          {
            reservationId: 67843804,
            recordId: "62623462",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:40:27.055",
            numberInQueue: 59,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "163bbc01-2a07-4f29-be98-d65ddeadb1ba",
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
            reservationId: 67789646,
            recordId: "61840974",
            state: "readyForPickup",
            pickupBranch: "DK-775100",
            pickupDeadline: "2022-06-20",
            expiryDate: "2022-10-10",
            dateOfReservation: "2022-06-13T17:09:20.695",
            numberInQueue: null,
            periodical: null,
            pickupNumber: "Reserveringshylde 115",
            ilBibliographicRecord: null,
            transactionId: "ce9673fb-0bc2-4211-b2c1-bb1a4114ed57",
            reservationType: "normal"
          },
          {
            reservationId: 67843846,
            recordId: "62485124",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:41:24.075",
            numberInQueue: 206,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "cae4db22-e267-4087-bdaa-d880bef19b52",
            reservationType: "normal"
          }
        ]
      }
    ).as("physical_reservations");

    cy.intercept("GET", "**/external/agencyid/patrons/patronid/v4**", {
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
          },
          {
            productId: "0ddd10d0-d69f-4734-8a27-ac4546f4b912",
            identifier: "456",
            createdDateUtc: "2022-08-16T10:52:39.932Z",
            status: 1,
            productTitle: "Aargums synder",
            expireDateUtc: "2023-01-27T19:37:15.63Z",
            expectedRedeemDateUtc: "2023-01-27T19:37:15.63Z"
          },
          {
            productId: "0ddd10d0-d69f-4734-8a27-ac4546f4b912",
            identifier: "23324342",
            createdDateUtc: "2022-08-16T10:52:39.932Z",
            status: 2,
            productTitle: "Bargums synder",
            expireDateUtc: "2023-01-27T19:37:15.63Z",
            expectedRedeemDateUtc: "2023-01-27T19:37:15.63Z"
          },
          {
            productId: "0ddd10d0-d69f-4734-8a27-ac4546f4b912",
            identifier: "2344564754345",
            createdDateUtc: "2022-08-16T10:52:39.932Z",
            status: 1,
            productTitle: "Bargums synder",
            expireDateUtc: "2022-12-27T19:37:15.63Z",
            expectedRedeemDateUtc: "2022-12-27T19:37:15.63Z"
          }
        ],
        code: 101,
        message: "OK"
      }
    }).as("digital_reservations");

    // Intercept covers.
    cy.interceptGraphql({
      operationName: "GetCoversByPids",
      fixtureFilePath: "cover/cover.json"
    });

    // Some reservations may not include a pid — fallback to fetching cover via ISBN
    cy.interceptGraphql({
      operationName: "GetBestRepresentationPidByIsbn",
      fixtureFilePath: "cover/cover-get-best-representation-by-isbn.json"
    });
  });

  it("Reservations list", () => {
    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-entry"
    );

    cy.wait("@user");

    // ID 11 Systemet viser reserveringsoversigten med
    // ID 11 2.a. The function: Pause physical reservations
    cy.get(".dpl-pause-reservation-component")
      // ID 11 2.a.i. Text  "Pause reservations on physical items"
      .should("exist")
      .find(".dpl-pause-reservation-component__flex__text")
      .should("have.text", "Pause your reservations");
    // ID 11 2.a.ii. Toggle switch: which show whether the users reservation is paused
    cy.get(".dpl-pause-reservation-component")
      .find(".btn-primary")
      .should("exist");

    cy.wait(["@physical_reservations", "@digital_reservations"]);

    // ID 11 2.b. The list "Ready for pickup"
    cy.get(".reservation-list-page");
    // ID 11 2.b.i. The header "Ready for pickup" and the number of reservations
    cy.getBySel("reservation-list-header")
      .eq(0)
      .should("have.text", "Ready for pickup3");

    cy.wait(["@work", "@product"]);

    // ID 11 2.b.ii. list is sorted by oldest pickup date at the top
    cy.getBySel("list-reservation-container")
      .eq(0)
      .getBySel("reservation-material")
      .eq(0)
      .find(".status-label")
      .should("exist");

    // ID 11 2.b.iii.1. Every reservation ready for pickup is shown with
    // ID 42 2.a. Material cover
    cy.getBySel("list-reservation-container")
      .find(".list-reservation .cover img")
      .should("have.attr", "src")
      .and("match", FbiCoverUrlPattern);

    // ID 42 2.b. Material types including accessibility of material
    cy.getBySel("list-reservation-container")
      .find(".list-reservation")
      .find(".status-label")
      .eq(0)
      .should("have.text", "Dummy bog");

    // ID 42 2.c. full title
    cy.getBySel("list-reservation-container")
      .find(".list-reservation")
      .eq(0)
      .find("button")
      .should("have.text", "Dummy Some Title");

    // ID 42 2.d. serial title and number
    cy.getBySel("list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(2)
      .find("[data-cy='reservation-about-series']")
      .should("have.text", "Harry Potter (bøger) Del 1");

    // ID 42 2.e. authors & ID 42 2.f. year published
    cy.getBySel("list-reservation-container")
      .find(".list-reservation")
      .eq(0)
      .find("[data-cy='reservation-about-author']")
      .eq(0)
      .should(
        "have.text",
        "By Dummy Jens Jensen and Dummy Some Corporation (2006)"
      );

    // ID 42 2.d. & 42 2.d. number and year
    cy.getBySel("list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(1)
      .find("[data-cy='reservation-about-periodical']")
      .should("have.text", "2018, nr. 9");

    // ID 11 2.b.iii.2. Pickup info
    // ID 11 2.b.iii.2.a The icon "ready"
    cy.getBySel("list-reservation-container")
      .find(".list-reservation")
      .eq(0)
      .find(".counter")
      .should("exist");

    // ID 11 2.b.iii.2.b Physical materials
    // ID 11 2.b.iii.2.b.ii The text {Afhentningsbibliotek}
    cy.getBySel("list-reservation-container")
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__deadline p")
      .eq(0)
      .should("have.text", "Hovedbiblioteket");

    // ID 11 2.b.iii.2.b.iii The text Reserveringshylde {Hyldenummer}
    cy.getBySel("list-reservation-container")
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__deadline p")
      .eq(1)
      .should("have.text", "Reserveringshylde 115");

    // ID 11 2.c The list "physical reservations"
    cy.getBySel("list-reservation-container").eq(1).should("exist");
    // ID 11 2.c.i. Header: "Physical" and number of reservations in queue
    cy.get(".dpl-list-buttons")
      .eq(1)
      .getBySel("reservation-list-header")
      .eq(1)
      .should("have.text", "Physical reservations9");
    // ID 11 2.c.ii. Reservations in queue sorted by queue number and alphabetical

    // ID 11 2.c.iii. Every material is showed with
    // ID 11 2.c.iii.2. text: "You are at the front of the queue"
    cy.getBySel("list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__deadline p")
      .should("have.text", "You are at the front of the queue");
    // ID 11 2.c.iii.2. text: There are {Kønummer -1} people in the queue before you"
    cy.getBySel("list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(5)
      .find(".list-reservation__deadline p")
      .should("have.text", "There are 1 people in the queue before you");

    // ID 11 2.d The list "digital reservations"
    cy.getBySel("list-reservation-container").eq(2).should("exist");

    // ID 11 2.d.i. Header: "Digital" and number of reservations in queue
    cy.getBySel("reservation-list-header")
      .eq(2)
      .should("have.text", "Digital reservations3");

    // ID 11 2.d.ii. List sorted by: shortest time to loan > producttitle
    cy.getBySel("list-reservation-container")
      .eq(2)
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__deadline p")
      // ID 11 2.d.iii.c. text Available in {ExpectedRedeemDateTimeUtc} days
      .should("have.text", "Available in -37 days");

    // ID 11 2.d.iii.b. the icon {ExpectedRedeemDateTimeUtc}
    cy.getBySel("list-reservation-container")
      .eq(2)
      .find(".list-reservation")
      .eq(0)
      .find(".counter")
      .should("exist");
  });

  it("should display the E-book reservation that is ready for pickup properly", () => {
    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-entry"
    );
    cy.wait("@user");

    cy.getBySel("reservation-material")
      .eq(2)
      .within(() => {
        cy.get(".status-label.status-label--outline").should(
          "have.text",
          "E-book"
        );

        cy.get(".list-reservation__header__text").should(
          "have.text",
          "Mordet i det blå tog"
        );

        cy.getBySel("reservation-about-author").should(
          "have.text",
          "By Agatha Christie and Jutta Larsen (2014)"
        );

        cy.get(".counter__label").should("have.text", "Ready");

        cy.getBySel("info-label").should(
          "have.text",
          "Borrow before 27-01-2023 20:37"
        );

        cy.get(".list-reservation__deadline .text-small-caption").should(
          "have.text",
          "Online access"
        );
      });
  });

  it("Reservations list ready for pickup empty", () => {
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
            reservationId: 67805006,
            recordId: "39429977",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-11",
            dateOfReservation: "2022-06-14T09:01:36.523",
            numberInQueue: 2,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "13c3f730-b71c-4164-bc41-b439ce9bf115",
            reservationType: "normal"
          },
          {
            reservationId: 67807688,
            recordId: "20401206",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-11",
            dateOfReservation: "2022-06-14T10:19:23.429",
            numberInQueue: 1,
            periodical: {
              volume: null,
              volumeYear: "2018",
              displayText: "2018, nr. 9",
              volumeNumber: "9"
            },
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "634696e7-f5b2-49ae-8038-6546c5943f85",
            reservationType: "normal"
          },
          {
            reservationId: 67842154,
            recordId: "42825115",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:01:48.102",
            numberInQueue: 1,
            periodical: {
              volume: null,
              volumeYear: "2022",
              displayText: "2022, 03, April-Maj#Forårshaven",
              volumeNumber: "03, April-Maj#Forårshaven"
            },
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "b5a3f150-e45c-4cce-952e-ed6edc553eab",
            reservationType: "normal"
          },
          {
            reservationId: 67842199,
            recordId: "42825115",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:03:10.578",
            numberInQueue: 1,
            periodical: {
              volume: null,
              volumeYear: "2021",
              displayText: "2021, 5, Juni-Juli",
              volumeNumber: "5, Juni-Juli"
            },
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "76288332-23f6-4d29-8edc-8dbf9937d8fc",
            reservationType: "normal"
          },
          {
            reservationId: 67842207,
            recordId: "42825115",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:03:41.134",
            numberInQueue: 1,
            periodical: {
              volume: null,
              volumeYear: "2021",
              displayText: "2021, 5#Sommerens blomster",
              volumeNumber: "5#Sommerens blomster"
            },
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "49429a5f-f63e-4221-a96a-dc7aa27c5ec0",
            reservationType: "normal"
          },
          {
            reservationId: 67843684,
            recordId: "62448784",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:37:31.768",
            numberInQueue: 4,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "cfac37ef-564e-423d-a491-3d64f4c383d1",
            reservationType: "normal"
          },
          {
            reservationId: 67843804,
            recordId: "62623462",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:40:27.055",
            numberInQueue: 59,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "163bbc01-2a07-4f29-be98-d65ddeadb1ba",
            reservationType: "normal"
          },

          {
            reservationId: 67843846,
            recordId: "62485124",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:41:24.075",
            numberInQueue: 206,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "cae4db22-e267-4087-bdaa-d880bef19b52",
            reservationType: "normal"
          }
        ]
      }
    ).as("physical_reservations");

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
          },
          {
            productId: "0ddd10d0-d69f-4734-8a27-ac4546f4b912",
            identifier: "456",
            createdDateUtc: "2022-08-16T10:52:39.932Z",
            status: 1,
            productTitle: "Aargums synder",
            expireDateUtc: "2023-01-27T19:37:15.63Z",
            expectedRedeemDateUtc: "2023-01-27T19:37:15.63Z"
          },
          {
            productId: "0ddd10d0-d69f-4734-8a27-ac4546f4b912",
            identifier: "2344564754345",
            createdDateUtc: "2022-08-16T10:52:39.932Z",
            status: 1,
            productTitle: "Bargums synder",
            expireDateUtc: "2022-12-27T19:37:15.63Z",
            expectedRedeemDateUtc: "2022-12-27T19:37:15.63Z"
          }
        ],
        code: 101,
        message: "OK"
      }
    }).as("digital_reservations");

    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-entry"
    );

    // ID 11 2.b.v. No ready for pickup reservations text: "At the moment you have 0 reservations ready for pickup"
    cy.get(".reservation-list-page")
      .getBySel("reservation-list-ready-for-pickup-empty-list")
      .should(
        "have.text",
        "At the moment you have 0 reservations ready for pickup"
      );

    cy.intercept(
      "GET",
      "**/external/v1/agencyid/patrons/patronid/reservations/v2**",
      {
        statusCode: 200,
        body: [
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
    ).as("physical_reservations");

    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: {
        reservations: [
          {
            productId: "0ddd10d0-d69f-4734-8a27-ac4546f4b912",
            identifier: "23324342",
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
    }).as("digital_reservations");

    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-entry"
    );

    // ID 11 2.c.v. No physical reservations text: "At the moment you have 0 reservations on physical items"
    cy.get(".reservation-list-page")
      .getBySel("reservation-list-physical-reservations-empty-list")
      .should("exist")
      .should("have.text", "At the moment you have 0 physical reservations");

    // ID 11 2.d.v. No digital reservations text: "At the moment you have 0 reservations on digital items"
    cy.get(".reservation-list-page")
      .getBySel("reservation-list-digital-reservations-empty-list")
      .should(
        "have.text",
        "At the moment you have 0 reservations on digital items"
      );

    cy.intercept(
      "GET",
      "**/external/v1/agencyid/patrons/patronid/reservations/v2**",
      {
        statusCode: 200,
        body: []
      }
    ).as("physical_reservations");

    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: {
        reservations: [],
        code: 101,
        message: "OK"
      }
    }).as("digital_reservations");

    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-entry"
    );

    // ID 11 2: user has no reservations
    // ID 11 2.a. header "Your reservations"
    cy.get(".reservation-list-page")
      .find("h1")
      .should("have.text", "Your reservations");

    // ID 11 2.b. Text: "At the moment you have 0 reservations"
    cy.get(".dpl-list-empty")
      .should("exist")
      .should("have.text", "At the moment you have 0 reservations");
  });

  it("Reservations list shows parallel reservation", () => {
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
            // We have two reservations with the same transactionId which makes
            // it a parallel reservation.
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
          }
        ]
      }
    ).as("physical_reservations");

    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: {
        reservations: [],
        code: 101,
        message: "OK"
      }
    }).as("digital_reservations");

    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-entry"
    );

    cy.interceptGraphql({
      operationName: "getManifestationViaBestRepresentationByFaust",
      fixtureFilePath: "reservation-list/work-bestrepresentation.json"
    });

    cy.getBySel("list-reservation-container")
      .find(".list-reservation")
      // Even though we return multiple reservations they are parallel and
      // should be represented as one.
      .should("have.length", 1)
      .get(".list-reservation__header")
      // The title should be the one returned by the best representation
      // fixture.
      .should("contain", "Best representation of dummy title")
      // Open the modal to see the details.
      .click();

    cy.getBySel("modal")
      // Modal should be open.
      .should("exist")
      .find(".modal-details__title")
      // Details should also contain the best representation title.
      .should("contain", "Best representation of dummy title");
    cy.getBySel("modal-details__header")
      .find("img")
      .should("have.attr", "src")
      .and("match", FbiCoverUrlPattern);
  });

  it("Reservations list falls back on interlibrary record when work is not found", () => {
    cy.intercept(
      "GET",
      "**/external/v1/agencyid/patrons/patronid/reservations/v2**",
      {
        statusCode: 200,
        body: [
          {
            reservationId: 67804976,
            recordId: "2449448",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-09-21",
            dateOfReservation: "2022-06-14T09:00:50.059",
            numberInQueue: 1,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: {
              author: "Thorpe, D.R.",
              bibliographicCategory: "mono",
              edition: null,
              isbn: "9781844135417",
              issn: null,
              language: "eng",
              mediumType: "a xx",
              periodicalNumber: null,
              periodicalVolume: null,
              placeOfPublication: "London",
              publicationDate: "2011",
              publicationDateOfComponent: null,
              publisher: "Pimlico",
              recordId: "2449448",
              title: "Supermac : the life of Harold Macmillan"
            },
            transactionId: "c6742151-f4a7-4655-a94f-7bd6a0009431",
            reservationType: "normal"
          }
        ]
      }
    ).as("physical_reservations");

    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: {
        reservations: [],
        code: 101,
        message: "OK"
      }
    }).as("digital_reservations");

    // No works are found. This should make the reservation use data from the
    // ilBibliographicRecord property.
    cy.interceptGraphql({
      operationName: "getManifestationViaMaterialByFaust",
      fixtureFilePath: "cover/empty.json"
    });

    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-entry"
    );

    cy.getBySel("list-reservation-container")
      .find(".list-reservation")
      .get(".list-reservation__header")
      // The title should be the one returned by ilBibliographicRecord property
      // on the reservation.
      .should("contain", "Supermac : the life of Harold Macmillan")
      // Open the modal to see the details.
      .click();

    cy.getBySel("modal")
      // Modal should be open.
      .should("exist")
      .find(".modal-details__title")
      // Details should also contain the ilBibliographicRecord title.
      .should("contain", "Supermac : the life of Harold Macmillan");

    cy.getBySel("modal-details__header")
      .find("img")
      .should("have.attr", "src")
      .and("match", FbiCoverUrlPattern);
  });
});

export default {};

import { TOKEN_LIBRARY_KEY } from "../../../core/token";

describe("Reservation list pagination", () => {
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });

    const wednesday20220603 = new Date("2022-06-03T12:30:00.000Z").getTime();

    // Sets time to a specific date
    // https://github.com/cypress-io/cypress/issues/7577
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cy.clock(wednesday20220603).then((clock: any) => clock.bind(window));

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
        ]
      }
    }).as("digital_reservations");

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

    cy.intercept("GET", "**v1/products/**", {
      body: {
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
        }
      }
    }).as("product");
  });

  it("Paginates reservation list", () => {
    cy.visit(
      "/iframe.html?id=apps-reservation-list--reservation-list-entry&args=pageSizeDesktop:2;pageSizeMobile:2"
    );
    cy.wait([
      "@physical_reservations",
      "@digital_reservations",
      "@product",
      "@work",
      "@user"
    ]);

    // ID 11 2.b.iv more than "ready for pickup" 10 reservations the items paginate (here 2, because of config in cy.visit)
    cy.getBySel("list-reservation-container")
      .eq(0)
      .find(".list-reservation")
      .should("have.length", 2);

    cy.getBySel("list-reservation-container")
      .eq(0)
      .find(".result-pager")
      .should("exist");

    // ID 11 2.c.iv more than 10 physical reservations the items paginate (here 2, because of config in cy.visit)
    cy.getBySel("list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .should("have.length", 2);
    cy.getBySel("list-reservation-container")
      .eq(2)
      .find(".result-pager")
      .should("exist");

    // ID 11 2.d.iv more than 10 digital reservations the items paginate (here 2, because of config in cy.visit)
    cy.getBySel("list-reservation-container")
      .eq(2)
      .find(".list-reservation")
      .should("have.length", 2);
    cy.getBySel("list-reservation-container")
      .eq(2)
      .find(".result-pager")
      .should("exist");
  });
});

export default {};

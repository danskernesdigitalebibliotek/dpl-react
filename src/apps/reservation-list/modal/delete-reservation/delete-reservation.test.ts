import { TOKEN_LIBRARY_KEY } from "../../../../core/token";

describe("Delete reservation modal test", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });
    const clockDate = new Date(
      "Sat Oct 08 2022 20:10:25 GMT+0200 (Central European Summer Time)"
    );

    // Sets time to a specific date
    cy.clock(clockDate);

    cy.intercept("GET", "**/external/agencyid/patrons/patronid/v2**", {
      patron: {
        blockStatus: null
      }
    });
  });

  // todo figure out weird fbs exception
  it.skip("It shows delete digital material modal", () => {
    cy.intercept("DELETE", "**/v1/user/reservations/**", {
      code: 101,
      message: "OK"
    }).as("delete-digital-reservation");

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
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-entry"
    );

    cy.get(".list-reservation__about").find("button").click();
    cy.get(".modal-details__buttons").eq(0).find("button").click();

    // ID 14 1 The system opens a modal
    cy.get("#root").find(".modal.modal-cta").should("exist");

    // ID 14 1.a. header "cancel reservation"
    cy.get(".modal.modal-cta")
      .find("h2")
      .should("have.text", "Cancel reservation");

    // ID 14 1.b. text "Do you want to cancel your reservation?"
    cy.get(".modal.modal-cta")
      .find("p")
      .eq(0)
      .should("have.text", "Do you want to cancel your reservation?");

    // ID 14 1.c. text "You cannot regret this action"
    cy.get(".modal.modal-cta")
      .find("p")
      .eq(1)
      .should("have.text", "You cannot regret this action");

    // ID 14 1.d. button "Cancel reservation"
    // ID 14 2 user clicks "Cancel reservation"
    cy.get(".modal.modal-cta")
      .getBySel("delete-reservation-button")
      .should("have.text", "Cancel reservation")
      .click();

    // ID 14 4 system closes modal
    cy.get(".modal.modal-cta").should("not.exist");
  });

  it("It shows delete physical material modal", () => {
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
    }).as("get-reservations");

    cy.intercept("POST", "**/next/**", {
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
            materialTypes: [{ specific: "Dummy bog" }],
            creators: [
              { display: "Dummy Jens Jensen" },
              { display: "Dummy Some Corporation" }
            ]
          }
        }
      }
    }).as("get-manifestation");

    cy.intercept(
      "DELETE",
      "**/external/v1/agencyid/patrons/patronid/reservations?reservationid=46985591",
      {
        code: 101,
        message: "OK"
      }
    ).as("delete-physical-reservation");

    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-entry"
    );

    cy.wait(["@get-reservations"]);
    cy.wait(["@get-manifestation"]);

    cy.get(".list-reservation__about").find("button").click();
    cy.get(".modal-details__buttons").eq(0).find("button").click();

    // ID 18 1 The system opens a modal
    cy.get(".modal.modal-cta").should("exist");

    // ID 18 1.a. header "cancel reservation"
    cy.get(".modal.modal-cta")
      .find("h2")
      .should("have.text", "Cancel reservation");

    // ID 18 1.b. text "Do you want to cancel your reservation?"
    cy.get(".modal.modal-cta")
      .find("p")
      .eq(0)
      .should("have.text", "Do you want to cancel your reservation?");

    // ID 18 1.c. text "You cannot regret this action"
    cy.get(".modal.modal-cta")
      .find("p")
      .eq(1)
      .should("have.text", "You cannot regret this action");

    // ID 18 1.d. button "Cancel reservation"
    // ID 18 2 user clicks "Cancel reservation"
    cy.get("#root")
      .getBySel("delete-reservation-button")
      .should("have.text", "Cancel reservation")
      .click();

    // ID 18 4 system closes modal
    cy.get(".modal.modal-cta").should("not.exist");
  });

  it("It supports deleting parallel physical reservations", () => {
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
          // The reservations have different ids but use the same transaction id
          // (and have the type parallel) to signal that they are part of
          // parallel reservation.
          transactionId: "c6742151-f4a7-4655-a94f-7bd6a0009431",
          reservationType: "parallel"
        },
        {
          reservationId: 46985592,
          recordId: "46985592",
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
          reservationType: "parallel"
        }
      ]
    }).as("get-reservations");

    cy.intercept("POST", "**/next/**", {
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
            materialTypes: [{ specific: "Dummy bog" }],
            creators: [
              { display: "Dummy Jens Jensen" },
              { display: "Dummy Some Corporation" }
            ]
          }
        }
      }
    }).as("get-manifestation");

    cy.intercept(
      "DELETE",
      // It is important that the path contains both reservation ids to ensure
      // that all parts of the parallel reservation are deleted.
      "**/external/v1/agencyid/patrons/patronid/reservations?reservationid=46985591&reservationid=46985592",
      {
        code: 101,
        message: "OK"
      }
    ).as("delete-parallel-reservation");

    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-entry"
    );

    // Ensure that the UI has loaded and the reservations are visible.
    cy.wait(["@get-reservations"]);
    cy.wait(["@get-manifestation"]);

    // Click on the only reservation in the list to open the details modal.
    cy.get(".list-reservation__about").find("button").click();
    // The first button in the modal is the delete button.
    cy.get(".modal-details__buttons").eq(0).find("button").click();
    // Confirm the deletion.
    cy.getBySel("delete-reservation-button").click();
    // Ensure that call to delete the parallel reservation has been issued.
    cy.wait("@delete-parallel-reservation");
  });
});

export {};

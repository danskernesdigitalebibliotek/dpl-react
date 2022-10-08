import { TOKEN_LIBRARY_KEY } from "../../../core/token";

describe("Physical reservation details modal test", () => {
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

  it("It shows digital reservation details modal", () => {
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
    }).as("digital_reservations");

    // Intercept covers.
    cy.fixture("cover.json")
      .then((result) => {
        cy.intercept("GET", "**/covers**", result);
      })
      .as("cover");

    cy.intercept("GET", "**v1/products**", {
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
    }).as("product");

    cy.intercept("DELETE", "**/v1/user/reservations/**", {
      code: 101,
      message: "OK"
    }).as("delete-reservation");

    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-details-modal"
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
    cy.get(".modal")
      .find("h2")
      .should("have.text", "Mitfordmordene første bog");

    // ID 43 2.d. authors
    cy.get(".modal")
      .find("#test-authors")
      .should("have.text", "Af Jessica  Fellowes og Kirsten Heltner (2018)");

    // Todo serial title
    // Todo serial number

    // ID 43 2.b. Material types including accessibility of material
    cy.get(".modal").find(".status-label").eq(0).should("have.text", "E-bog");
    // ID 43 2.b. Material types including accessibility of material
    // ID 17 2.b.ii "Ready for loan" if the reservation is ready for loan, or else it will not be shown

    // ID 17 2.c. the link "Remove your reservation"
    cy.get(".modal")
      .find("button.link-tag")
      .should("have.text", "Fjern din reservering");

    cy.get(".modal").find("button.link-tag").click();

    cy.get("@delete-reservation").should((response) => {
      expect(response).to.have.property("response");
    });
    // ID 17 2.d. button: go to ereolen
    cy.get(".modal")
      .find("#test-ereolen-button")
      .should("have.text", "Gå til ereolen")
      .should("have.attr", "href")
      // ID 17 2.d.i. link to "ereolen.dk/user/me"
      .should("include", "ereolen.dk/user/me");

    cy.get(".modal")
      .find(".status-label")
      .eq(1)
      .should("have.text", "Klar til lån");

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
      .should("have.text", "Reserveringen udløber 27-01-2023");

    // ID 17 2.f. header "date of reservation"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(1)
      .find(".text-header-h5")
      .should("have.text", "Reserveringsdato");

    // ID 2.e.i.2 the text "{createdutc}"
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(1)
      .find(".text-small-caption")
      .should("have.text", "16-08-2022");
  });

  it("It shows digital reservation details modal, material queued", () => {
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
    }).as("digital_reservations");

    cy.intercept("GET", "**v1/products**", {
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
    }).as("product");

    cy.visit(
      "/iframe.html?path=/story/apps-reservation-list--reservation-list-details-modal"
    );

    // ID 2.e.i.2 the text "Borrow before {ExpectedRedeemDateTimeUtc}" when the state from publizon is 1
    cy.get(".modal-details__list")
      .find(".list-details")
      .eq(0)
      .find(".text-small-caption")
      .should("have.text", "Lånes inden 27-01-2023");
  });
});

export {};

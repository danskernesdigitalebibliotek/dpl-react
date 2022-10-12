import { TOKEN_LIBRARY_KEY } from "../../../core/token";

describe("Loan list", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });
    const wednesday20220713 = new Date("2022-06-03T12:30:00.000Z");

    // Sets time to a specific date
    cy.clock(wednesday20220713);

    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: [
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-06-02T16:43:25.325",
            dueDate: "2022-07-15",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442515,
            materialItemNumber: "3841518429",
            recordId: "27215815",
            periodical: null,
            loanDate: "2022-06-01T16:43:25.325",
            dueDate: "2022-06-03",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "lydbog",
              description: "Lydbog"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442399,
            materialItemNumber: "5043689640",
            recordId: "49421257",
            periodical: {
              volume: null,
              volumeYear: "2015",
              displayText: "Nr. , år 2015",
              volumeNumber: null
            },
            loanDate: "2022-06-03T16:43:25.325",
            dueDate: "2022-07-15",
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
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250509,
            materialItemNumber: "3846990827",
            recordId: "28843238",
            periodical: null,
            loanDate: "2022-06-03T16:43:25.325",
            dueDate: "2022-06-04",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        }
      ]
    }).as("physical_loans");

    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: {
        loans: [
          {
            orderId: "082bb01a-8979-424b-93a6-7cc7081f8a45",
            orderNumber: "0c5a287f-be96-4a68-a85a-453864b330cd",
            orderDateUtc: "2022-06-02T06:32:30Z",
            loanExpireDateUtc: "2022-07-15T06:32:30Z",
            isSubscriptionLoan: false,
            libraryBook: {
              identifier: "9788771076940",
              identifierType: 15,
              title: "Tættere end man tror",
              publishersName: "Jentas"
            },
            fileExtensionType: 3
          },
          {
            orderId: "58058e94-a03f-4018-bec1-816ee7894ab8",
            orderNumber: "3c060277-3218-4ad2-98fe-a57bce1cf1e6",
            orderDateUtc: "2022-06-01T06:32:30Z",
            loanExpireDateUtc: "2022-06-03T06:32:30Z",
            isSubscriptionLoan: false,
            libraryBook: {
              identifier: "9788711524245",
              identifierType: 3,
              title: "Fuldmåne i oktober",
              publishersName: "Lindhardt og Ringhof"
            },
            fileExtensionType: 1
          },
          {
            orderId: "082bb01a-8979-424b-93a6-7cc7081f8a45",
            orderNumber: "0c5a287f-be96-4a68-a85a-453864b330cd",
            orderDateUtc: "2022-06-03T06:32:30Z",
            loanExpireDateUtc: "2022-07-15T06:32:30Z",
            isSubscriptionLoan: false,
            libraryBook: {
              identifier: "9788771076951",
              identifierType: 15,
              title: "Tættere end man tror",
              publishersName: "Jentas"
            },
            fileExtensionType: 3
          },
          {
            orderId: "082bb01a-8979-424b-93a6-7cc7081f8a45",
            orderNumber: "0c5a287f-be96-4a68-a85a-453864b330cd",
            orderDateUtc: "2022-06-03T06:32:30Z",
            loanExpireDateUtc: "2022-06-04T06:32:30Z",
            isSubscriptionLoan: false,
            libraryBook: {
              identifier: "9788771076950",
              identifierType: 15,
              title: "Tættere end man tror",
              publishersName: "Jentas"
            },
            fileExtensionType: 3
          }
        ]
      }
    }).as("digital_loans");

    // Intercept covers.
    cy.fixture("cover.json")
      .then((result) => {
        cy.intercept("GET", "**/covers**", result);
      })
      .as("cover");

    cy.intercept("POST", "**/opac/**", {
      statusCode: 200,
      body: {
        data: {
          manifestation: {
            pid: "870970-basis:22629344",
            titles: { main: ["Dummy Some Title"] },
            abstract: ["Dummy Some abstract ..."],
            hostPublication: { year: { year: 2006 } },
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

    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.wait([
      "@physical_loans",
      "@digital_loans",
      "@work",
      "@cover",
      "@product"
    ]);
  });

  it("Loan list basics (physical loans)", () => {
    // Renew button disabled on no renewable loans
    cy.get("#test-renew-button").should("have.attr", "disabled");

    // The header visible
    cy.get(".text-header-h1").should("have.text", "Dine lånte materialer");

    // The list physical loans visible
    cy.get(".dpl-list-buttons__header").eq(0).contains("Fysiske lån");

    // Sort icons visible
    cy.get(".dpl-icon-button").should("have.length", 2);

    // List selected by default
    cy.get("#test-list").should(
      "have.class",
      "dpl-icon-button dpl-icon-button--selected"
    );

    // Renew button visible
    cy.get("#test-renew-button").should("be.visible");

    // should have "soon to expire" in status label
    cy.get(".list-reservation")
      .eq(3)
      .find(".status-label--warning")
      .should("have.text", "Udløber snart");

    // should contain "icon"
    cy.get(".list-reservation")
      .eq(0)
      .find(".list-reservation__counter")
      .should("have.text", "0dage");

    cy.get(".list-reservation")
      .eq(1)
      .find(".list-reservation__counter")
      .should("have.text", "42dage");

    cy.get(".list-reservation")
      .eq(2)
      .find(".list-reservation__counter")
      .should("have.text", "42dage");

    cy.get(".list-reservation")
      .eq(3)
      .find(".list-reservation__counter")
      .should("have.text", "1dage");

    // should have "expired" in status label
    cy.get(".list-reservation")
      .eq(0)
      .find(".status-label--danger")
      .should("have.text", "Overskredet");

    cy.get(".list-reservation")
      .eq(1)
      .find(".status-label--danger")
      .should("not.exist");

    cy.get(".list-reservation")
      .eq(1)
      .find(".status-label--warning")
      .should("not.exist");

    // Has a cover
    cy.get(".cover")
      .find("img")
      .should("have.attr", "src")
      .should(
        "include",
        "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_small/v1543886053/bogportalen.dk/9788700398368.jpg"
      );

    // Sorted by oldest loan date first
    cy.get(".list-reservation")
      .eq(0)
      .find("#due-date")
      .should("have.text", "Afleveres 03-06-2022");

    // fee link on expired loan
    // Not mobile version on desktop view
    cy.get(".list-reservation")
      .eq(0)
      .find("#test-material-overdue-mobile")
      .should("not.be.visible");

    // Desktop version on desktop view
    cy.get(".list-reservation")
      .eq(0)
      .find("#test-material-overdue-desktop")
      .should("be.visible")
      .should("have.text", "Du pålægges et gebyr, når materialet afleveres")
      .should("have.attr", "href");

    // Desktop version on desktop view, not on loan not expired
    cy.get(".list-reservation")
      .eq(1)
      .find("#test-material-overdue-desktop")
      .should("not.exist");

    // As loans are not stacked, the stacked button should not exist
    cy.get(".list-reservation")
      .eq(0)
      .find("#test-additional-materials-desktop")
      .should("not.exist");

    cy.get(".list-reservation")
      .eq(0)
      .find("#test-additional-materials-mobile")
      .should("not.exist");

    // Stack loans
    cy.get("#test-stack").click();

    // now that loans are stacked, the stacked button should exist
    cy.get(".list-reservation")
      .eq(0)
      .find("#test-additional-materials-desktop")
      .should("be.visible")
      .should("have.text", "+ 1 andre materialer")
      .should("have.attr", "type")
      .should("include", "button");

    cy.get(".list-reservation")
      .eq(0)
      .find("#test-additional-materials-mobile")
      .should("not.be.visible");

    // ^not on unstacked loans though
    cy.get(".list-reservation")
      .eq(1)
      .find("#test-additional-materials-desktop")
      .should("not.exist");

    // The mobile specifics
    cy.viewport(320, 1480);

    // Expire link on mobile
    cy.get(".list-reservation")
      .eq(1)
      .find("#test-material-overdue-mobile")
      .should("be.visible")
      .should("have.text", "Du pålægges et gebyr, når materialet afleveres")
      .should("have.attr", "href");

    cy.get(".list-reservation")
      .eq(0)
      .find("#test-material-overdue-desktop")
      .should("not.exist");

    cy.get(".list-reservation")
      .eq(0)
      .find("#test-material-overdue-mobile")
      .should("not.exist");

    // Renew button not visible on mobile
    cy.get("#test-renew-button").should("not.be.visible");

    cy.get(".list-reservation")
      .eq(0)
      .find("#test-additional-materials-mobile")
      .should("be.visible")
      .should("have.text", "+ 1 andre materialer")
      .should("have.attr", "type")
      .should("include", "button");

    cy.get(".list-reservation")
      .eq(0)
      .find("#test-additional-materials-desktop")
      .should("not.be.visible");
  });

  it("Loan list basics (digital loans)", () => {
    // The list physical loans visible
    cy.get(".dpl-list-buttons__header").eq(1).contains("Digitale lån");

    // should have "soon to expire" in status label
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(3)
      .find(".status-label--warning")
      .should("have.text", "Udløber snart");

    // should contain "icon"
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__counter")
      .should("have.text", "0dage");

    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(1)
      .find(".list-reservation__counter")
      .should("have.text", "42dage");

    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(2)
      .find(".list-reservation__counter")
      .should("have.text", "42dage");

    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(3)
      .find(".list-reservation__counter")
      .should("have.text", "1dage");

    // should have "expired" in status label
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find(".status-label--danger")
      .should("have.text", "Overskredet");

    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(1)
      .find(".status-label--danger")
      .should("not.exist");

    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(1)
      .find(".status-label--warning")
      .should("not.exist");

    // Has a cover
    cy.get(".cover")
      .find("img")
      .should("have.attr", "src")
      .should(
        "include",
        "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_small/v1543886053/bogportalen.dk/9788700398368.jpg"
      );

    // Sorted by oldest loan date first
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find("#due-date")
      .should("have.text", "Udløber 03-06-2022");

    // fee link on expired loan
    // Not mobile version on desktop view
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find("#test-material-overdue-mobile")
      .should("not.be.visible");

    // Desktop version on desktop view
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find("#test-material-overdue-desktop")
      .should("be.visible")
      .should("have.text", "Du pålægges et gebyr, når materialet afleveres")
      .should("have.attr", "href");

    // Desktop version on desktop view, not on loan not expired
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(1)
      .find("#test-material-overdue-desktop")
      .should("not.exist");

    // As loans are not stacked, the stacked button should not exist
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find("#test-additional-materials-desktop")
      .should("not.exist");

    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find("#test-additional-materials-mobile")
      .should("not.exist");

    // Stack loans
    cy.get("#test-stack").click();

    // now that loans are stacked, the stacked button should exist
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(1)
      .find("#test-additional-materials-desktop")
      .should("be.visible")
      .should("have.text", "+ 1 andre materialer")
      .should("have.attr", "type")
      .should("include", "button");

    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(1)
      .find("#test-additional-materials-mobile")
      .should("not.be.visible");

    // ^not on unstacked loans though
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find("#test-additional-materials-desktop")
      .should("not.exist");

    // The mobile specifics
    cy.viewport(320, 1480);

    // Expire link on mobile
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find("#test-material-overdue-mobile")
      .should("be.visible")
      .should("have.text", "Du pålægges et gebyr, når materialet afleveres")
      .should("have.attr", "href");

    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find("#test-material-overdue-desktop")
      .should("not.be.visible");

    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(1)
      .find("#test-material-overdue-mobile")
      .should("not.exist");

    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(1)
      .find("#test-additional-materials-mobile")
      .should("be.visible")
      .should("have.text", "+ 1 andre materialer")
      .should("have.attr", "type")
      .should("include", "button");

    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(1)
      .find("#test-additional-materials-desktop")
      .should("not.be.visible");
  });

  it("It opens details modal (digital loans)", () => {
    cy.get(".modal-detail").should("not.exist");
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .click();
    cy.get(".modal-details").should("be.visible");
  });

  it("It opens group modal (digital loans)", () => {
    cy.get("#test-stack").click();
    cy.get(".modal-loan").should("not.exist");
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(1)
      .find("#test-additional-materials-desktop")
      .click();
    cy.get(".modal-loan").should("be.visible");
  });

  it("Empty phyiscal and digital loan list", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: []
    });
    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: []
    });
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.get(".dpl-list-empty").should("have.text", "Du har i øjeblikket 0 lån");
  });

  it("It opens details modal", () => {
    cy.get(".modal-detail").should("not.exist");
    cy.get(".list-reservation").eq(0).click();
    cy.get(".modal-details").should("be.visible");
  });

  it("It opens group modal", () => {
    cy.get("#test-stack").click();
    cy.get(".modal-loan").should("not.exist");
    cy.get(".list-reservation")
      .eq(0)
      .find("#test-additional-materials-desktop")
      .click();
    cy.get(".modal-loan").should("be.visible");
  });

  it("Empty phyiscal loan list", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: []
    });
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.get(".dpl-list-empty").should(
      "have.text",
      "Du har i øjeblikket ingen fysiske lån"
    );
  });

  it("Empty digital loan list", () => {
    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: []
    });
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.get(".dpl-list-empty").should(
      "have.text",
      "Du har i øjeblikket ingen digitale lån"
    );
  });

  it("Pagination is shown", () => {
    const physicalLoans: {
      isRenewable: false;
      renewalStatusList: string[];
      isLongtermLoan: boolean;
      loanDetails: {
        loanId: number;
        materialItemNumber: string;
        recordId: string;
        periodical: null;
        loanDate: string;
        dueDate: string;
        loanType: string;
        ilBibliographicRecord: null;
        materialGroup: { name: string; description: string };
      };
    }[] = [];
    const arrayOf52 = Array.from(Array(52).keys());
    arrayOf52.forEach(() => {
      physicalLoans.push({
        isRenewable: false,
        renewalStatusList: ["deniedOtherReason"],
        isLongtermLoan: false,
        loanDetails: {
          loanId: 956250508,
          materialItemNumber: "3846990827",
          recordId: "28847238",
          periodical: null,
          loanDate: "2022-06-02T16:43:25.325",
          dueDate: "2022-07-15",
          loanType: "loan",
          ilBibliographicRecord: null,
          materialGroup: {
            name: "fon2",
            description: "Flere CD-plader"
          }
        }
      });
    });

    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: physicalLoans
    }).as("physical_loans");

    const digitalLoans: {
      orderId: string;
      orderNumber: string;
      orderDateUtc: string;
      loanExpireDateUtc: string;
      isSubscriptionLoan: boolean;
      libraryBook: {
        identifier: string;
        identifierType: number;
        title: string;
        publishersName: string;
      };
      fileExtensionType: number;
    }[] = [];
    const arrayOf51 = Array.from(Array(51).keys());
    arrayOf51.forEach(() => {
      digitalLoans.push({
        orderId: "082bb01a-8979-424b-93a6-7cc7081f8a45",
        orderNumber: "0c5a287f-be96-4a68-a85a-453864b330cd",
        orderDateUtc: "2022-06-02T06:32:30Z",
        loanExpireDateUtc: "2022-07-15T06:32:30Z",
        isSubscriptionLoan: false,
        libraryBook: {
          identifier: "9788771076940",
          identifierType: 15,
          title: "Tættere end man tror",
          publishersName: "Jentas"
        },
        fileExtensionType: 3
      });
    });

    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: {
        loans: digitalLoans
      }
    }).as("digital_loans");

    // Intercept covers.
    cy.fixture("cover.json")
      .then((result) => {
        cy.intercept("GET", "**/covers**", result);
      })
      .as("cover");

    cy.intercept("POST", "**/opac/**", {
      statusCode: 200,
      body: {
        data: {
          manifestation: {
            pid: "870970-basis:22629344",
            titles: { main: ["Dummy Some Title"] },
            abstract: ["Dummy Some abstract ..."],
            hostPublication: { year: { year: 2006 } },
            materialTypes: [{ specific: "Dummy bog" }],
            creators: [
              { display: "Dummy Jens Jensen" },
              { display: "Dummy Some Corporation" }
            ]
          }
        }
      }
    }).as("work");

    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.wait(["@physical_loans", "@digital_loans", "@work", "@cover"]);
    cy.get("#test-paginate-button").should("have.length", 1);
  });
});

export {};

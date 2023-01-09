import { TOKEN_LIBRARY_KEY } from "../../../core/token";

describe("Loan list", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      const wednesday20220603 = new Date("2022-10-21T10:00:00.000").getTime();

      // Sets time to a specific date
      // https://github.com/cypress-io/cypress/issues/7577
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cy.clock(wednesday20220603).then((clock: any) => clock.bind(window));
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });

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
            loanDate: "2022-10-16T16:43:25.325",
            // Should have been handed in yesterday, renders a overdue-warning
            dueDate: "2022-10-20",
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
            loanId: 956442399,
            materialItemNumber: "5043689640",
            recordId: "49421257",
            periodical: {
              volume: null,
              volumeYear: "2015",
              displayText: "Nr. , år 2015",
              volumeNumber: null
            },
            loanDate: "2022-10-15T16:43:25.325",
            // To be handed in today, renders a warning
            dueDate: "2022-10-21",
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
            // Should be at the top of the list (the list is sorted by loandate)
            loanDate: "2022-10-14T16:43:25.325",
            // 2022-10-21 + 7 should not render a warning
            dueDate: "2022-10-28",
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
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250509,
            materialItemNumber: "3846990827",
            recordId: "28843238",
            periodical: null,
            loanDate: "2022-10-16T16:43:25.325",
            // 2022-10-21 + 6 should render a warning
            dueDate: "2022-10-27",
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
            orderDateUtc: "2022-10-20T06:32:30Z",
            loanExpireDateUtc: "2022-10-24T06:32:30Z",
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
            orderId: "082bb01a-8979-424b-93a6-7cc7081f8a45",
            orderNumber: "0c5a287f-be96-4a68-a85a-453864b330cd",
            orderDateUtc: "2022-10-19T06:32:30Z",
            // No warning badge
            loanExpireDateUtc: "2022-10-28T06:32:30Z",
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
            // Should be top of the list
            orderDateUtc: "2022-10-18T06:32:30Z",
            // Warning badge
            loanExpireDateUtc: "2022-10-27T06:32:30Z",
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
    cy.wait(["@physical_loans", "@digital_loans", "@work", "@cover"]);
  });

  it("Loan list basics (physical loans)", () => {
    // 2.a. header: Your loans
    cy.get(".loan-list-page")
      .find(".text-header-h1")
      .should("have.text", "Your loans");

    // 2.b. header: physical loans
    cy.get(".loan-list-page")
      .find("h2")
      .eq(0)
      .should("have.text", "Physical loans4");

    // 2.b.i: Toggle: two icons that changes the list view
    cy.get(".loan-list-page")
      .find(".dpl-list-buttons__buttons")
      .find("#test-list")
      .should("exist")
      // 2.b.i.1. List is chosen as default
      .should("have.class", "dpl-icon-button--selected");

    cy.get(".loan-list-page")
      .find(".dpl-list-buttons__buttons")
      .find("[data-cy='stack']")
      .should("exist");

    // 2.b.ii. Button: renew several
    cy.get(".loan-list-page")
      .find("#test-renew-button")
      .should("exist")
      // disabled on no renewable
      .should("have.attr", "disabled");

    // 2.b.iii. Loans sorted by oldest loandate on top
    cy.get(".list-reservation-container")
      .eq(0)
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__deadline p")
      .should("have.text", "Due date 28-10-2022");

    // 2.b.iv. Loans have...
    // ID 42 2.a. Material cover
    cy.get(".list-reservation-container")
      .find(".list-reservation .cover img")
      .should("have.attr", "src")
      .should(
        "include",
        "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_small/v1543886053/bogportalen.dk/9788700398368.jpg"
      );

    // ID 42 2.b. Material types including accessibility of material
    cy.get(".list-reservation-container")
      .find(".list-reservation")
      .find(".status-label")
      .eq(0)
      .should("have.text", "Dummy bog");

    // ID 42 2.c. full title
    cy.get(".list-reservation-container")
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__header")
      .should("have.text", "Dummy Some Title");

    // ID 42 2.d. authors & ID 42 2.f. year published
    cy.get(".list-reservation-container")
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__about p")
      .should(
        "have.text",
        "By Dummy Jens Jensen and Dummy Some Corporation (2006)"
      );

    // Todo serial title
    // Todo serial number
    // todo Nummer
    // todo Årgang

    // 2.b.iv.3. Link
    // 2.b.iv.3.a. text: You will be charged a fee, when the item is returned
    cy.get(".list-reservation-container")
      .find(".list-reservation")
      .eq(2)
      .find(".list-reservation__information a")
      .should("be.visible")
      .should(
        "have.text",
        "You will be charged a fee, when the item is returned"
      )
      .should("have.attr", "href")
      .should("include", "https://unsplash.com/photos/wd6YQy0PJt8");
    // 2.b.iv.3.c. Only shown if loan is overdue
    cy.get(".list-reservation-container")
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__information a")
      .should("not.exist");

    // 2.b.iv.3.c. Only shown if loan is overdue
    cy.get(".list-reservation-container")
      .find(".list-reservation")
      .eq(1)
      .find(".list-reservation__information a")
      .should("not.exist");

    // 2.b.iv.5. Icon: “{X} days"
    cy.get(".list-reservation-container")
      .find(".list-reservation")
      .eq(0)
      .find(".counter")
      .should("have.text", "7 days");
    cy.get(".list-reservation-container")
      .find(".list-reservation")
      .eq(1)
      .find(".counter")
      .should("have.text", "0 days");
    cy.get(".list-reservation-container")
      .find(".list-reservation")
      .eq(2)
      .find(".counter")
      .should("have.text", "0 days");
    cy.get(".list-reservation-container")
      .find(".list-reservation")
      .eq(3)
      .find(".counter")
      .should("have.text", "6 days");
    // 2.b.iv.6. Label:
    // 2.b.iv.6.a. Expired with red background, if loan is overdue
    cy.get(".list-reservation-container")
      .eq(0)
      .find(".list-reservation")
      .eq(2)
      .find(".status-label--danger")
      .should("have.text", "Expired")
      .should("have.css", "background-color")
      .should("include", "rgb(213, 54, 74)");

    // 2.b.iv.6.b. “Expiring soon” with yellow background, if _less than_ 7 days to hand in
    cy.get(".list-reservation-container")
      .eq(0)
      .find(".list-reservation")
      .eq(1)
      .find(".status-label--warning")
      .should("have.text", "Expiring soon")
      .should("have.css", "background")
      .should("include", "rgb(247, 191, 66)");

    cy.get(".list-reservation-container")
      .eq(0)
      .find(".list-reservation")
      .eq(3)
      .find(".status-label--warning")
      .should("have.text", "Expiring soon")
      .should("have.css", "background")
      .should("include", "rgb(247, 191, 66)");

    // 2.b.iv.6.c. No label if _more than 7_ days to hand in
    // So the spec sort of doesnt say what happens _on_ 7 days to hand in, but right now there is no warning
    cy.get(".list-reservation-container")
      .eq(0)
      .find(".list-reservation")
      .eq(0)
      .find(".status-label--warning")
      .should("not.exist");

    cy.get(".list-reservation-container")
      .eq(0)
      .find(".list-reservation")
      .eq(0)
      .find(".status-label--danger")
      .should("not.exist");

    // 2.b.iv.7. Text: "Due date dd.mm.yyyy"
    cy.get(".list-reservation-container")
      .eq(0)
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__deadline p")
      .should("have.text", "Due date 28-10-2022");
    cy.get(".list-reservation-container")
      .eq(0)
      .find(".list-reservation")
      .eq(1)
      .find(".list-reservation__deadline p")
      .should("have.text", "Due date 21-10-2022");
    cy.get(".list-reservation-container")
      .eq(0)
      .find(".list-reservation")
      .eq(2)
      .find(".list-reservation__deadline p")
      .should("have.text", "Due date 20-10-2022");
    cy.get(".list-reservation-container")
      .eq(0)
      .find(".list-reservation")
      .eq(3)
      .find(".list-reservation__deadline p")
      .should("have.text", "Due date 27-10-2022");

    // // The mobile specifics
    cy.viewport(320, 1480);
    // 2.b.ii.1. renew button not showed on mobile
    cy.get(".loan-list-page")
      .find("#test-renew-button")
      .should("not.be.visible");
  });

  it("Loan list basics (digital loans)", () => {
    // 2.c. List: “Digitale loans" and number of digital loans
    cy.get(".loan-list-page")
      .find("h2")
      .eq(1)
      .should("have.text", "Digital loans3");

    //   // 2.c.i. Loans sorted by oldest loandate on top
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__deadline p")
      .should("have.text", "Due date 27-10-2022");

    // 2.c.ii. Loans have...
    // ID 42 2.a. Material cover
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation .cover img")
      .should("have.attr", "src")
      .should(
        "include",
        "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_small/v1543886053/bogportalen.dk/9788700398368.jpg"
      );

    // ID 42 2.b. Material types including accessibility of material
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .find(".status-label")
      .eq(0)
      .should("have.text", "E-book");

    // ID 42 2.c. full title
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__header")
      .should("have.text", "Mordet i det blå tog");

    // ID 42 2.d. authors & ID 42 2.f. year published
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__about p")
      .should("have.text", "By Agatha Christie and Jutta Larsen (2014)");

    // Todo serial title
    // Todo serial number
    // todo Nummer
    // todo Årgang
    // 2.c.ii.3 Icon: “{X} days"
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find(".counter")
      .should("have.text", "6 days");

    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(1)
      .find(".counter")
      .should("have.text", "7 days");

    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(2)
      .find(".counter")
      .should("have.text", "3 days");

    // 2.c.ii.4. Text: "Due date dd.mm.yyyy”
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__deadline p")
      .should("have.text", "Due date 27-10-2022");

    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(2)
      .find(".list-reservation__deadline p")
      .should("have.text", "Due date 24-10-2022");

    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(2)
      .find(".list-reservation__deadline p")
      .should("have.text", "Due date 24-10-2022");
  });

  it("It opens loans group modal (physical)", () => {
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
            loanDate: "2022-10-16T16:43:25.325",
            // Should have been handed in yesterday, renders a overdue-warning
            dueDate: "2022-10-20",
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
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-10-16T16:43:25.325",
            // Should have been handed in yesterday, renders a overdue-warning
            dueDate: "2022-10-20",
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
  });

  it("It opens details modal (digital loans)", () => {
    // 2.c.ii.6. Link: Click on loan in list opens loan details modal
    cy.get(".modal-detail").should("not.exist");
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__header")
      .click();
    cy.get(".modal-details").should("be.visible");
  });

  it("Empty physical and digital loan list", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: []
    });
    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: []
    });
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.get(".dpl-list-empty").should(
      "have.text",
      "You have 0 loans at the moment"
    );
  });

  it("It opens details modal (physical loans)", () => {
    // 2.b.iv.8. Link:
    // 2.b.iv.8.a. Click on loan in list opens loan details modal
    cy.get(".modal-detail").should("not.exist");
    cy.get(".list-reservation-container")
      .eq(0)
      .find(".list-reservation")
      .eq(0)
      .find(".list-reservation__header")
      .click();
    cy.get(".modal-details").should("be.visible");
  });

  it("Empty physical loan list", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: []
    });
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");

    // 2.b.iv.9. No physical loans, the text: "You have no physical loans at the moment"
    cy.get(".dpl-list-empty").should(
      "have.text",
      "You have no physical loans at the moment"
    );
  });

  it("Empty digital loan list", () => {
    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: []
    });
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    // 2.d No digital loans, the text: "You have 0 loans at the moment"
    cy.get(".dpl-list-empty").should(
      "have.text",
      "You have no digital loans at the moment"
    );
  });

  it("Pagination is shown", () => {
    cy.visit(
      "/iframe.html?id=apps-loan-list--loan-list-entry&args=pageSizeDesktop:2;pageSizeMobile:2"
    );

    cy.wait(["@physical_loans", "@digital_loans", "@work", "@cover"]);

    // 2.b.iv.9.v. If more than 25 loans -> pagination (because of pageSizeDesktop/pageSizeMobile the limit is 2 not 25)
    cy.get(".loan-list-page").find(".result-pager").should("have.length", 2);
    cy.get(".list-reservation-container")
      .eq(0)
      .find(".list-reservation")
      .should("have.length", 2);

    // 2.c.iv. If more than 10 loans -> pagination (because of pageSizeDesktop/pageSizeMobile the limit is 2 not 25)
    cy.get(".loan-list-page").find(".result-pager").should("have.length", 2);
    cy.get(".list-reservation-container")
      .eq(1)
      .find(".list-reservation")
      .should("have.length", 2);
  });
});

export {};

import { TOKEN_LIBRARY_KEY } from "../../core/token";

describe("Fee list", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      const wednesday20220603 = new Date("2022-10-21T10:00:00.000").getTime();

      // Sets time to a specific date
      // https://github.com/cypress-io/cypress/issues/7577
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cy.clock(wednesday20220603).then((clock: any) => clock.bind(window));
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");

      cy.intercept("GET", "**/external/agencyid/patrons/patronid/v2**", {
        patron: {
          blockStatus: null
        }
      });
    });

    cy.intercept("GET", "**/external/agencyid/patron/patronid/fees/v2**", {
      statusCode: 200,
      body: [
        {
          feeId: 434536,
          type: "fee",
          reasonMessage: "Gebyr (for sent)",
          amount: 70,
          dueDate: "2022-05-08",
          creationDate: "2022-04-06",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "5237124059",
              recordId: "48724566",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            },
            {
              materialItemNumber: "5119382558",
              recordId: "52518563",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            },
            {
              materialItemNumber: "5324175956",
              recordId: "38540335",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        },
        {
          feeId: 306404,
          type: "fee",
          reasonMessage: "Gebyr (for sent)",
          amount: 2.56,
          dueDate: "2020-04-15",
          creationDate: "2019-10-18",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "3839631447",
              recordId: "26285283",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        }
      ]
    }).as("fees");

    cy.intercept("POST", "**/next/**", {
      statusCode: 200,
      body: {
        data: {
          manifestation: {
            pid: "870970-basis:22629344",
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
    }).as("work");

    cy.visit("/iframe.html?path=/story/apps-fee-list--fee-list-entry");
    cy.wait(["@fees"]);
  });

  it("Fee list basics (physical loans)", () => {
    // 2. System shows:
    // 2.a. Headline "Fees & Replacement costs"
    cy.get(".fee-list-page")
      .getBySel("fee-list-headline")
      .should("exist")
      .should("have.text", "Fees & Replacement costs");

    // 2.b text "Overdue fees and replacement costs that were created before dd/mm/åååå can still be paid on this page. See our fees and replacement costs"
    cy.get(".fee-list-page")
      .find("[data-cy='fee-list-body']")
      .should("exist")
      .should(
        "have.text",
        "Overdue fees and replacement costs that were created before 27/10/2020 can still be paid on this page. See our fees and replacement costs"
      );

    // 2.c // 2.e subheadline "Unsettled debt - BEFORE 27/10 2020"
    cy.get(".dpl-list-buttons__header")
      .first()
      .should("exist")
      .should("contain.text", "Unsettled debt");

    // 2.d link “See our fees and replacement costs”
    cy.get(".fee-list-page")
      .find("[data-cy='fee-list-body']")
      .find(".link-tag")
      .should("exist")
      .should("not.have.attr", "href", "")
      .should("have.text", "See our fees and replacement costs");

    // 3.b list of intermediates
    cy.get(".fee-list-page").find(".list-reservation").eq(0).should("exist");

    // 3.c metadata
    // 3.c.a material type
    cy.get(".fee-list-page")
      .find(".list-reservation")
      .eq(0)
      .should("exist")
      .find(".list-reservation__material")
      .find(".list-reservation__information")
      .find("div")
      .find(".status-label")
      .should("exist")
      .should("have.text", "Dummy bog");

    // 3.c.b title
    cy.get("[data-cy='fee-list-before']")
      .find(".list-reservation")
      .eq(0)
      .should("exist")
      .find(".text-header-h4")
      .should("exist")
      .should("have.text", "Dummy Some Title");

    // 3.c.c author
    cy.get(".fee-list-page")
      .find(".list-reservation")
      .eq(0)
      .should("exist")
      .find(".list-reservation__material")
      .find(".list-reservation__information")
      .find(".list-reservation__about")
      .find(".text-small-caption")
      .should("exist")
      .should(
        "have.text",
        "By Dummy Jens Jensen and Dummy Some Corporation (2006)"
      );

    // 3. d fees charged dd.mm.yyyy
    cy.get(".fee-list-page")
      .find(".list-reservation")
      .eq(0)
      .should("exist")
      .find(".list-reservation__status")
      .find("div")
      .find(".list-reservation__deadline")
      .find(".text-small-caption")
      .should("exist")
      .should("have.text", "Fees charged 18. 10. 2019");

    // 3. e Label: reason
    cy.get(".fee-list-page")
      .find(".list-reservation")
      .eq(0)
      .should("exist")
      .find(".list-reservation__status")
      .find("div")
      .find(".list-reservation__deadline")
      .find(".status-label")
      .should("exist")
      .should("have.text", "Gebyr (for sent)");

    // 3. e Label: fee amount
    cy.get(".fee-list-page")
      .find(".list-reservation")
      .eq(0)
      .should("exist")
      .find(".list-reservation__status")
      .find(".list-reservation__fee")
      .find(".text-body-medium-regular")
      .should("exist")
      .should("have.text", "Fee 2.56,-");

    // 4. a List after date
    // Title
    cy.get("[data-cy='fee-list-after']")
      .find(".list-reservation")
      .eq(0)
      .should("exist")
      .find(".text-header-h4")
      .should("exist")
      .should("have.text", "Dummy Some Title");

    // Author && year
    cy.get(".fee-list-page")
      .find(".list-reservation")
      .eq(1)
      .should("exist")
      .find(".list-reservation__material")
      .find(".list-reservation__information")
      .find(".list-reservation__about")
      .find(".text-small-caption")
      .should("exist")
      .should(
        "have.text",
        "By Dummy Jens Jensen and Dummy Some Corporation (2006)"
      );

    // 4.b +x other materials
    cy.get(".fee-list-page")
      .find(".list-reservation")
      .eq(1)
      .should("exist")
      .getBySel("stack-size")
      .should("exist")
      .should("have.text", "+ 2 other materials");

    cy.get(".fee-list-page")
      .find(".list-reservation")
      .eq(1)
      .should("exist")
      .click();

    // 5. modal
    // counter number
    cy.get("div.modal-loan__header")
      .find("div")
      .find(".counter")
      .find(".counter__value")
      .should("have.text", "32");

    // counter text
    cy.get("div.modal-loan__header")
      .find("div")
      .find(".counter")
      .find(".counter__label")
      .should("exist")
      .should("have.text", "Days");

    // header
    cy.get("div.modal-loan__header")
      .find("div")
      .find(".modal-loan__title")
      .should("exist")
      .should("have.text", "Turned in 6. April 2022");

    // "i accept the Terms of trade*"
    cy.getBySel("checkbox_id__fee_details").should("exist");

    cy.get(".modal")
      .find(".checkbox__label")
      .should("have.text", "I accept the Terms of trade*");

    // pay button
    cy.get(".button-box")
      .find("button")
      .should("exist")
      .should("have.text", "Pay");

    // book list
    cy.get(".modal-loan__list-materials")
      .find("li")
      .find(".list-materials")
      .should("exist");
  });
});

export {};

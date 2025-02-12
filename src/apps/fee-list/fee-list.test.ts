import { TOKEN_LIBRARY_KEY } from "../../core/token";
import {
  digitalLoansData,
  feesData,
  physicalLoansDataNoOverdue,
  physicalLoansDataWithOverdue,
  workData
} from "./test-mappings";

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
      }).as("patronInfo");
    });

    cy.intercept("GET", "**/external/agencyid/patron/patronid/fees/v2**", {
      statusCode: 200,
      body: feesData
    }).as("fees");

    cy.intercept("POST", "**/next*/**", {
      statusCode: 200,
      body: workData
    }).as("work");

    cy.intercept("GET", "**/v1/user/**", {
      statusCode: 200,
      body: digitalLoansData
    }).as("digital_loans");
  });

  it("Fee list basics (physical loans)", () => {
    cy.visit("/iframe.html?path=/story/apps-fee-list--primary");
    cy.wait(["@fees", "@digital_loans"]);

    // Wait for element not in skeleton screen to prevent testing prematurely.
    cy.get(".status-label").should("be.visible");

    // 2. System shows:
    // 2.a. Headline "Fees & Replacement costs"
    cy.getBySel("fee-list-page")
      .getBySel("fee-list-headline")
      .should("exist")
      .should("have.text", "Fees & Replacement costs");

    // 2.b text "Overdue fees and replacement costs that were created before dd/mm/åååå can still be paid on this page. See our fees and replacement costs"
    cy.getBySel("fee-list-body").should(
      "have.text",
      "Overdue fees and replacement costs that were created before 27/10/2020 can still be paid on this page.See our fees and replacement costs"
    );

    // 2.c // 2.e subheadline "Unsettled debt 1"
    cy.getBySel("list-header").should("contain.text", "Unsettled debt");

    // 2.d link “See our fees and replacement costs”
    cy.getBySel("fee-list-page")
      .find("[data-cy='fee-list-body']")
      .find(".link-tag")
      .should("exist")
      .should("not.have.attr", "href", "")
      .should("have.text", "See our fees and replacement costs");

    // 3.b list of intermediates
    cy.getBySel("fee-list-page")
      .find(".list-reservation")
      .eq(0)
      .should("exist");

    // 3.c metadata
    // 3.c.a material type
    cy.getBySel("fee-list-page")
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
    cy.getBySel("fee-list")
      .find(".list-reservation")
      .eq(0)
      .should("exist")
      .find(".text-header-h4")
      .should("exist")
      .should("have.text", "Dummy Some Title");

    // 3.c.c author
    cy.getBySel("fee-list-page")
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
    cy.getBySel("fee-list-page")
      .find(".list-reservation")
      .eq(0)
      .should("exist")
      .find(".list-reservation__status")
      .find("div")
      .find(".list-reservation__deadline")
      .find(".text-small-caption")
      .should("exist")
      .should("have.text", "Fees charged 6. april 2022");

    // 3. e Label: reason
    cy.getBySel("fee-list-page")
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
    cy.getBySel("fee-list-page")
      .find(".list-reservation")
      .eq(0)
      .should("exist")
      .find(".list-reservation__status")
      .find(".list-reservation__fee")
      .find(".text-body-medium-regular")
      .should("exist")
      .should("have.text", "Fee 70,00\u00A0kr.");

    // 4.b +x other materials
    cy.getBySel("fee-list-page")
      .find(".list-reservation")
      .eq(1)
      .should("exist")
      .getBySel("stack-size")
      .should("exist")
      .should("have.text", "+ 2 other materials");

    cy.getBySel("fee-list-page")
      .find(".list-reservation")
      .eq(1)
      .should("exist")
      .click();

    // 5. modal
    // header
    cy.get("div.modal-loan__header")
      .find("div")
      .find(".modal-loan__title")
      .should("exist")
      .should("have.text", "Turned in 18. oktober 2019");

    // book list
    cy.get(".modal-loan__list-materials")
      .find("li")
      .find(".list-materials")
      .should("exist");
  });

  it("Should show a warning bar if user has overdue loans", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2", {
      statusCode: 200,
      body: physicalLoansDataWithOverdue
    }).as("physical loans with overdue");
    cy.visit("/iframe.html?path=/story/apps-fee-list--primary");
    cy.wait(["@digital_loans"]);
    cy.wait(["@physical loans with overdue"]);

    cy.getBySel("warning-bar").should("be.visible");
  });

  it("Shouldn't render warning bar if user has no overdue loans", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2", {
      statusCode: 200,
      body: physicalLoansDataNoOverdue
    }).as("physical_loans_no_overdue");
    cy.visit("/iframe.html?path=/story/apps-fee-list--primary");
    cy.wait(["@digital_loans"]);
    cy.wait(["@physical_loans_no_overdue"]);

    cy.getBySel("warning-bar").should("not.exist");
  });
});

export {};

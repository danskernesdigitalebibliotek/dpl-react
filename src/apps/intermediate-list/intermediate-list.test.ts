import { TOKEN_LIBRARY_KEY } from "../../core/token";

describe("Intermediate list", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      const wednesday20220603 = new Date("2022-10-21T10:00:00.000").getTime();

      // Sets time to a specific date
      // https://github.com/cypress-io/cypress/issues/7577
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cy.clock(wednesday20220603).then((clock: any) => clock.bind(window));
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
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
          feeId: 434537,
          type: "fee",
          reasonMessage: "Gebyr (for sent)",
          amount: 70,
          dueDate: "2022-05-08",
          creationDate: "2022-04-06",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "3275348197",
              recordId: "23790823",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            },
            {
              materialItemNumber: "5218297864",
              recordId: "45951685",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        },
        {
          feeId: 434538,
          type: "fee",
          reasonMessage: "Gebyr (for sent)",
          amount: 120,
          dueDate: "2022-05-08",
          creationDate: "2022-04-06",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "5136106556",
              recordId: "53067034",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            },
            {
              materialItemNumber: "5232011841",
              recordId: "54058969",
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
        },
        {
          feeId: 377242,
          type: "compensation",
          reasonMessage: "Erstatning (test)",
          amount: 1,
          dueDate: "2021-08-10",
          creationDate: "2021-02-11",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "271358741",
              recordId: "01484524",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        },
        {
          feeId: 411199,
          type: "compensation",
          reasonMessage: "Gebyr (for sent)",
          amount: 1.5,
          dueDate: "2021-12-24",
          creationDate: "2021-11-24",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "262088571",
              recordId: "06964206",
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

    cy.visit(
      "/iframe.html?path=/story/apps-intermediate-list--intermediate-list-entry"
    );
    cy.wait(["@fees"]);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
  });

  it("Intermediate list basics (physical loans)", () => {
    // 2. System shows:
    // 2.a. Headline "Fees & Replacement costs"
    cy.get(".intermediate-list-page")
      .find(".intermediate-list-headline")
      .should("exist")
      .should("have.text", "Fees & Replacement costs");

    // 2.b text "Overdue fees and replacement costs that were created before dd/mm/åååå can still be paid on this page. See our fees and replacement costs"
    cy.get(".intermediate-list-page")
      .find(".intermediate-list-body")
      .should("exist")
      .should(
        "have.text",
        "Overdue fees and replacement costs that were created before 27/10/2020 can still be paid on this page. See our fees and replacement costs"
      );

    // 2.c // 2.e subheadline "Unsettled debt - BEFORE 27/10 2020"
    cy.get(".dpl-list-buttons__header")
      .eq(0)
      .should("exist")
      .should("have.text", "Unsettled debt - BEFORE 27/10 2020");

    // 2.d link “See our fees and replacement costs”
    cy.get(".intermediate-list-page")
      .find(".intermediate-list-body")
      .find(".link-tag")
      .should("exist")
      .should("not.have.attr", "href", "")
      .should("have.text", "See our fees and replacement costs");

    // 2.e "I accept the Terms of trade*"
    cy.get(".intermediate-list-bottom__actions")
      .eq(0)
      .find(".checkbox")
      .find(".checkbox__label")
      .find(".checkbox__text")
      .should("exist")
      .should("have.text", "I accept the Terms of trade*");

    // 2.f subheadline "Unsettled debt - AFTER 27/10 2020"
    cy.get(".dpl-list-buttons__header")
      .eq(1)
      .should("exist")
      .should("have.text", "Unsettled debt - AFTER 27/10 2020");

    // 3.a text "Please note that paid fees are not registered up until 72 hours after your payment after which your debt is updated and your user unblocked if it has been blocked."
    cy.get(".intermediate-list-bottom__paymenttypes")
      .eq(1)
      .find("span")
      .should("exist")
      .should(
        "have.text",
        "Please note that paid fees are not registered up until 72 hours after your payment after which your debt is updated and your user unblocked if it has been blocked."
      );
    // 3.b list of intermediates
    cy.get(".intermediate-list-page")
      .find("div")
      .find("div")
      .find(".list-reservation")
      .eq(0)
      .should("exist");

    // 3.c metadata
    // 3.c.a material type
    cy.get(".intermediate-list-page")
      .find("div")
      .find("div")
      .find(".list-reservation")
      .should("exist")
      .eq(0)
      .find(".list-reservation__material")
      .find(".list-reservation__information")
      .find("div")
      .find(".status-label")
      .should("exist")
      .should("have.text", "bog");

    // 3.c.b title
    cy.get(".intermediate-list-page")
      .find("div")
      .find("div")
      .find(".list-reservation")
      .eq(0)
      .should("exist")
      .find(".list-reservation__material")
      .find(".list-reservation__information")
      .find(".list-reservation__about")
      .find(".text-header-h4")
      .should("exist")
      .should("have.text", "Den som blinker er bange for døden");

    // 3.c.c author
    cy.get(".intermediate-list-page")
      .find("div")
      .find("div")
      .find(".list-reservation")
      .should("exist")
      .eq(0)
      .find(".list-reservation__material")
      .find(".list-reservation__information")
      .find(".list-reservation__about")
      .find(".text-small-caption")
      .should("exist")
      .should("have.text", "By Knud Romer (2006)");

    // 3.c.c author
    cy.get(".intermediate-list-page")
      .find("div")
      .find("div")
      .find(".list-reservation")
      .should("exist")
      .eq(0)
      .find(".list-reservation__material")
      .find(".list-reservation__information")
      .find(".list-reservation__about")
      .find(".text-small-caption")
      .should("exist")
      .should("have.text", "By Knud Romer (2006)");

    // 3. d fees charged dd.mm.yyyy
    cy.get(".intermediate-list-page")
      .find("div")
      .find("div")
      .find(".list-reservation")
      .should("exist")
      .eq(0)
      .find(".list-reservation__status")
      .find("div")
      .find(".list-reservation__deadline")
      .find(".text-small-caption")
      .should("exist")
      .should("have.text", "Fees charged 18. 10. 2019");

    // 3. e Label: reason
    cy.get(".intermediate-list-page")
      .find("div")
      .find("div")
      .find(".list-reservation")
      .should("exist")
      .eq(0)
      .find(".list-reservation__status")
      .find("div")
      .find(".list-reservation__deadline")
      .find(".status-label")
      .should("exist")
      .should("have.text", "Gebyr (for sent)");

    // 3. e Label: fee amount
    cy.get(".intermediate-list-page")
      .find("div")
      .find("div")
      .find(".list-reservation")
      .should("exist")
      .eq(0)
      .find(".list-reservation__status")
      .find(".list-reservation__fee")
      .find(".text-body-medium-medium")
      .should("exist")
      .should("have.text", "Fee 2.56,-");

    // 3. f List of accepted payment cards
    cy.get(".intermediate-list-page")
      .find("div")
      .find("div")
      .find(".intermediate-list-bottom")
      .eq(0)
      .find(".intermediate-list-bottom__paymenttypes")
      .find("img")
      .should("exist");

    // 3. f Button pay
    cy.get(".intermediate-list-bottom__actions")
      .eq(0)
      .find("button")
      .should("exist")
      .should("have.text", "Pay");

    // 4. a List after date
    // Title
    cy.get(".intermediate-list-page")
      .find("div")
      .find("div")
      .find(".list-reservation")
      .should("exist")
      .eq(2)
      .find(".list-reservation__material")
      .find(".list-reservation__information")
      .find(".list-reservation__about")
      .find(".text-header-h4")
      .should("exist")
      .should("have.text", "Den kreative løgn");

    // Author && year
    cy.get(".intermediate-list-page")
      .find("div")
      .find("div")
      .find(".list-reservation")
      .should("exist")
      .eq(2)
      .find(".list-reservation__material")
      .find(".list-reservation__information")
      .find(".list-reservation__about")
      .find(".text-small-caption")
      .should("exist")
      .should("have.text", "By Karl Aage Rasmussen (f. 1947) (2002)");

    // 4.b +x other materials
    cy.get(".intermediate-list-page")
      .find("div")
      .find("div")
      .find(".list-reservation")
      .should("exist")
      .eq(2)
      .find(".list-reservation__material")
      .find(".list-reservation__information")
      .find(".stack-size-text")
      .should("exist")
      .should("have.text", "+ 1 other materials");

    cy.get(".intermediate-list-page")
      .find("div")
      .find("div")
      .find(".list-reservation")
      .should("exist")
      .eq(0)
      .click();

    // 5. modal
    // counter number
    cy.get("div.modal-loan__header")
      .find("div")
      .find(".counter")
      .find(".counter__value")
      .should("have.text", "180");

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
      .should("have.text", "Turned in 18. October 2019");

    // "i accept the Terms of trade*"
    cy.get(".modal-loan__buttons")
      .find(".checkbox")
      .find(".checkbox__label")
      .find(".checkbox__text")
      .should("exist")
      .should("have.text", "I accept the Terms of trade*");

    // pay button
    cy.get(".modal-loan__buttons")
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

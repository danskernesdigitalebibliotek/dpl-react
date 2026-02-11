import { FbiCoverUrlPattern } from "../../../cypress/fixtures/fixture.types";

describe("Search Result", () => {
  it("Should render the site", () => {
    cy.visit(
      "/iframe.html?id=apps-search-result--primary&args=pageSizeDesktop:2;pageSizeMobile:2"
    );
  });

  it("Renders search title", () => {
    cy.getBySel("search-result-header")
      .should("be.visible")
      .and("contain", "Showing results for “harry” (3537)");
  });

  it("Renders all the search results", () => {
    cy.get(".content-list").find("li").should("have.length", 2);
  });

  it("Renders the images", () => {
    cy.get(".content-list .card-list-item img")
      .should("have.attr", "src")
      .and("match", FbiCoverUrlPattern);
  });

  it("Renders the favorite buttons", () => {
    cy.get(".content-list .card-list-item .button-favourite").should(
      "have.attr",
      "aria-label",
      "Add Harry : samtaler med prinsen to favorites list"
    );
  });

  it("Renders the titles", () => {
    cy.getBySel("card-list-item-title")
      .first()
      .should("be.visible")
      .and("contain", "Harry : samtaler med prinsen");
  });

  it("Renders the authors", () => {
    cy.getBySel("card-list-item-author")
      .first()
      .should("be.visible")
      .and("contain.text", "By Angela Levin");
  });

  it("Renders one availability labels per material type", () => {
    cy.getBySel("card-list-item-availability")
      .eq(1)
      .find("a")
      .should("be.visible")
      .and("have.length", 6);
  });

  it("Renders the pager", () => {
    cy.get(".result-pager__title").should(
      "contain.text",
      "Showing 2 out of 3537 results"
    );
  });

  it("Renders show more button", () => {
    cy.get(".result-pager button").should("contain.text", "show more");
  });

  it("Loads more search result items after clicking show more results", () => {
    cy.get(".result-pager button").click();
    cy.getBySel("search-result-list")
      .find(".content-list__item")
      .not(".content-list__item--info-box")
      .should("have.length", 4);
  });

  it("Loads more search result items will show an info box", () => {
    cy.getBySel("search-result-list")
      .find(".content-list__item--info-box")
      .should("be.visible");
  });

  it("Updates the pager info after clicking show more results", () => {
    cy.get(".result-pager__title").should(
      "contain.text",
      "Showing 4 out of 3537 results"
    );
  });

  it("Renders the correct release year for fictional works", () => {
    cy.getBySel("card-list-item").eq(1).should("contain", "2003");
  });

  it("Renders the correct release year for non-fictional works", () => {
    cy.getBySel("card-list-item").first().should("contain", "2018");
  });

  beforeEach(() => {
    // Intercept graphql search query.
    cy.fixture("search-result/fbi-api.json")
      .then((result) => {
        cy.intercept("POST", "**/next*/graphql**", result);
      })
      .as("Graphql search query");
    // Intercept all images from Cloudinary.
    cy.interceptGraphql({
      operationName: "GetCoversByPids",
      fixtureFilePath: "cover/cover.json"
    });
    // Intercept availability service.
    cy.intercept("GET", "**/availability/v3**", {
      statusCode: 200,
      body: [
        {
          recordId: "99999999",
          reservable: true,
          available: true,
          reservations: 5
        }
      ]
    }).as("Availability service");

    // Intercept campaign query.
    cy.fixture("search-result/campaign.json")
      .then((result) => {
        cy.intercept("**/dpl_campaign/match", result);
      })
      .as("Campaign service - full campaign");
  });
});

export {};

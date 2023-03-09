const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Search Result", () => {
  it("Should render the site", () => {
    cy.visit(
      "/iframe.html?id=apps-search-result--search-result&args=pageSizeDesktop:2;pageSizeMobile:2"
    );
  });

  it("Renders search title", () => {
    cy.getBySel("search-result-title")
      .should("be.visible")
      .and("contain", "Showing results for “harry” (722)");
  });

  it("Renders all the search results", () => {
    cy.get(".search-result-page__list").find("li").should("have.length", 2);
  });

  it("Renders the images", () => {
    cy.get(".search-result-page__list .search-result-item img")
      .should("have.attr", "src")
      .and("match", coverUrlPattern);
  });

  it("Renders the favorite buttons", () => {
    cy.get(
      ".search-result-page__list .search-result-item .button-favourite"
    ).should("have.attr", "aria-label", "Add element to favorites list");
  });

  it("Renders the titles", () => {
    cy.getBySel("search-result-item-title")
      .first()
      .should("be.visible")
      .and("contain", "Harry : samtaler med prinsen");
  });

  it("Renders the authors", () => {
    cy.getBySel("search-result-item-author")
      .first()
      .should("be.visible")
      .and("contain.text", "By Angela Levin");
  });

  it("Renders one availability labels per material type", () => {
    cy.getBySel("search-result-item-availability")
      .eq(1)
      .find("a")
      .should("be.visible")
      .and("have.length", 6);
  });

  // TODO: When the pager bug has been solved, this test can be re-enabled.
  it("Renders the pager", () => {
    cy.get(".result-pager__title").should(
      "contain.text",
      "Showing 2 out of 722 results"
    );
  });

  it("Renders show more button", () => {
    cy.get(".result-pager button").should("contain.text", "SHOW MORE");
  });

  it("Loads more search result items after clicking show more results", () => {
    cy.get(".result-pager button").click();
    cy.get(".search-result-page__list").find("li").should("have.length", 4);
  });

  it("Updates the pager info after clicking show more results", () => {
    cy.get(".result-pager__title").should(
      "contain.text",
      "Showing 4 out of 722 results"
    );
  });

  it("Renders the correct release year for fictional works", () => {
    cy.getBySel("search-result-list-item").eq(1).should("contain", "1997");
  });

  it("Renders the correct release year for non-fictional works", () => {
    cy.getBySel("search-result-list-item").first().should("contain", "2018");
  });

  beforeEach(() => {
    // Intercept graphql search query.
    cy.fixture("search-result/fbi-api.json")
      .then((result) => {
        cy.intercept("POST", "**/opac/graphql**", result);
      })
      .as("Graphql search query");
    // Intercept all images from Cloudinary.
    cy.intercept(
      {
        url: coverUrlPattern
      },
      {
        fixture: "images/cover.jpg"
      }
    ).as("Harry Potter cover");
    // Intercept covers.
    cy.fixture("cover.json")
      .then((result) => {
        cy.intercept("GET", "**/covers**", result);
      })
      .as("Cover service");
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

    // Intercept material list service.
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404,
      body: {}
    }).as("Material list service");

    // Intercept campaign query.
    cy.fixture("search-result/campaign.json")
      .then((result) => {
        cy.intercept("**/dpl_campaign/match", result);
      })
      .as("Campaign service - full campaign");
  });
});

export {};

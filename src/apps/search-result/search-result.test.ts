const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Search Result", () => {
  it("should render the site", () => {
    cy.visit(
      "/iframe.html?id=apps-search-result--search-result&args=pageSizeDesktop:2;pageSizeMobile:2"
    );
  });

  it("Check search title", () => {
    cy.contains("Viser resultater for “harry” (9486)");
  });

  it("Check length of search result list", () => {
    cy.get(".search-result-page__list").find("li").should("have.length", 2);
  });

  it("Do the search results have images?", () => {
    cy.get(".search-result-page__list .search-result-item img")
      .should("have.attr", "src")
      .and("match", coverUrlPattern);
  });

  it("Does the search result have favourite buttons?", () => {
    cy.get(
      ".search-result-page__list .search-result-item .button-favourite"
    ).should("have.attr", "aria-label", "Add to favorites");
  });

  it("Does the search result have a series line?", () => {
    cy.get(
      ".search-result-page__list .search-result-item .horizontal-term-line"
    ).should(
      "contain.text",
      // TODO: The series string being rendered makes no sense with the dummy data given
      // and the (lack) of knowledge of which properties to use and how to combine them.
      // Therefor when data is in place we can revisit this part of the test.
      "Nr. 1  i serienDummy Some SeriesNr. 1  i serienDummy Some Series"
    );
  });

  it("Does the search result have titles?", () => {
    cy.get(".search-result-page__list .search-result-item h2").should(
      "contain.text",
      "Dummy Some Title: Full"
    );
  });

  it("Does the search result have authors?", () => {
    cy.get(".search-result-page__list .search-result-item").should(
      "contain.text",
      "Af Dummy Jens Jensen (Dummy 1839)"
    );
  });

  it("Does a search result have the expected number of availibility labels?", () => {
    cy.get(
      ".search-result-page__list :nth-child(1) .search-result-item .search-result-item__availability"
    )
      .find("a")
      .should("have.length", 20);
  });

  it("Do we have a pager?", () => {
    cy.get(".search-result-pager__title").should(
      "contain.text",
      "Viser 2 ud af 9486 resultater"
    );
  });

  it("Do we have some pager info?", () => {
    cy.get(".search-result-pager button").should("contain.text", "VIS FLERE");
  });

  it("Show more results.", () => {
    cy.get(".search-result-pager button").click();
  });

  it("Check length of search result list since it should be twice as long.", () => {
    cy.get(".search-result-page__list").find("li").should("have.length", 4);
  });

  it("The pager info should also have been updated.", () => {
    cy.get(".search-result-pager__title").should(
      "contain.text",
      "Viser 4 ud af 9486 resultater"
    );
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
  });
});

export {};

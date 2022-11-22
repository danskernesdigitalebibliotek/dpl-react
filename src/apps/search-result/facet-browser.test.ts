const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("The Facet Browser", () => {
  beforeEach(() => {
    cy.interceptGraphql({
      operationName: "searchFacet",
      fixtureFilePath: "search-result/facet-browser/searchFacet"
    });

    cy.interceptGraphql({
      operationName: "searchWithPagination",
      fixtureFilePath: "search-result/facet-browser/searchWithPagination"
    });

    cy.interceptGraphql({
      operationName: "intelligentFacets",
      fixtureFilePath: "search-result/facet-browser/intelligentFacets.json"
    });

    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability.json"
    });

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

    // Intercept material list service.
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404,
      body: {}
    }).as("Material list service");

    cy.visit("/iframe.html?id=apps-search-result--search-result");
    cy.getBySel("facet-line-open-browser").click();
  });

  it("renders all facets", () => {
    cy.get('[aria-controls="facet-mainLanguages"]')
      .scrollIntoView()
      .should("be.visible");
    cy.get('[aria-controls="facet-accessTypes"]')
      .scrollIntoView()
      .should("be.visible");
    cy.get('[aria-controls="facet-childrenOrAdults"]')
      .scrollIntoView()
      .should("be.visible");
    cy.get('[aria-controls="facet-creators"]')
      .scrollIntoView()
      .should("be.visible");
    cy.get('[aria-controls="facet-fictionNonfiction"]')
      .scrollIntoView()
      .should("be.visible");
    cy.get('[aria-controls="facet-genreAndForm"]')
      .scrollIntoView()
      .should("be.visible");
    cy.get('[aria-controls="facet-materialTypes"]')
      .scrollIntoView()
      .should("be.visible");
    cy.get('[aria-controls="facet-subjects"]')
      .scrollIntoView()
      .should("be.visible");
    cy.get('[aria-controls="facet-workTypes"]')
      .scrollIntoView()
      .should("be.visible");
  });

  it("renders all terms in a facet when clicked", () => {
    cy.get('[aria-controls="facet-mainLanguages"]')
      .should("be.visible")
      .and("have.attr", "aria-expanded", "false")
      .click();

    cy.getBySel("facet-browser-mainLanguages-Engelsk").should("be.visible");
    cy.getBySel("facet-browser-mainLanguages-Dansk").should("be.visible");
    cy.getBySel("facet-browser-mainLanguages-flere sprog").should("be.visible");
    cy.getBySel("facet-browser-mainLanguages-Tysk").should("be.visible");
    cy.getBySel("facet-browser-mainLanguages-Svensk").should("be.visible");
    cy.getBySel(
      "facet-browser-mainLanguages-Sproget kan ikke bestemmes"
    ).should("be.visible");
    cy.getBySel("facet-browser-mainLanguages-Fransk").should("be.visible");
    cy.getBySel("facet-browser-mainLanguages-Italiensk").should("be.visible");
    cy.getBySel("facet-browser-mainLanguages-Spansk").should("be.visible");
    cy.getBySel("facet-browser-mainLanguages-Latin").should("be.visible");

    cy.get('[aria-controls="facet-mainLanguages"]')
      .should("be.visible")
      .and("have.attr", "aria-expanded", "true")
      .click();
    cy.get(`[aria-label="Close facet browser modal"]`).click();
  });

  it("renders the logic of selected terms and open facets", () => {
    cy.log("renders all results");
    cy.contains("h1", "“harry” (843)");

    cy.log("updates result after it select Joanne K. Rowling inside Creators");

    cy.get('[aria-controls="facet-creators"]').click();
    cy.interceptGraphql({
      operationName: "searchFacet",
      fixtureFilePath:
        "search-result/facet-browser/searchFacet_terms_joanne-k-rowling"
    });
    cy.interceptGraphql({
      operationName: "searchWithPagination",
      fixtureFilePath:
        "search-result/facet-browser/searchWithPagination_terms_joanne-k-rowling"
    });
    cy.getBySel("facet-browser-creators-Joanne K. Rowling")
      .should("be.visible")
      .and("have.attr", "aria-pressed", "false")
      .click();

    cy.get(`[aria-label="Close facet browser modal"]`).click();
    cy.contains("h1", "“harry” (36)");

    cy.log(
      "Open the modal and check if creators are opened and Joanne K. Rowling is selected"
    );
    cy.getBySel("facet-line-open-browser").click();
    cy.get(`[aria-controls="facet-creators"]`)
      .should("be.visible")
      .and("have.attr", "aria-expanded", "true");

    cy.getBySel("facet-browser-creators-Joanne K. Rowling")
      .should("be.visible")
      .and("have.attr", "aria-pressed", "true");

    cy.log(
      "Remove Joanne K. Rowling facet, close facet browser and check if result is change back"
    );

    cy.interceptGraphql({
      operationName: "searchFacet",
      fixtureFilePath: "search-result/facet-browser/searchFacet"
    });

    cy.interceptGraphql({
      operationName: "searchWithPagination",
      fixtureFilePath: "search-result/facet-browser/searchWithPagination"
    });

    cy.getBySel("facet-browser-creators-Joanne K. Rowling")
      .should("be.visible")
      .and("have.attr", "aria-pressed", "true")
      .click()
      .should("have.attr", "aria-pressed", "false");

    cy.get(`[aria-label="Close facet browser modal"]`).click();

    cy.contains("h1", "“harry” (843)");
  });
});

export {};

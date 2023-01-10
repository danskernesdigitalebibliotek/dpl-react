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
      fixtureFilePath: "search-result/facet-line/intelligentFacets"
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
    cy.getBySel("facet-browser-mainLanguages")
      .scrollIntoView()
      .should("be.visible");

    cy.getBySel("facet-browser-accessTypes")
      .scrollIntoView()
      .should("be.visible");

    cy.getBySel("facet-browser-childrenOrAdults")
      .scrollIntoView()
      .should("be.visible");

    cy.getBySel("facet-browser-creators").scrollIntoView().should("be.visible");

    cy.getBySel("facet-browser-fictionNonfiction")
      .scrollIntoView()
      .should("be.visible");

    cy.getBySel("facet-browser-fictionNonfiction")
      .scrollIntoView()
      .should("be.visible");

    cy.getBySel("facet-browser-genreAndForm")
      .scrollIntoView()
      .should("be.visible");

    cy.getBySel("facet-browser-materialTypes")
      .scrollIntoView()
      .should("be.visible");

    cy.getBySel("facet-browser-subjects").scrollIntoView().should("be.visible");

    cy.getBySel("facet-browser-workTypes")
      .scrollIntoView()
      .should("be.visible");
  });

  it("renders all terms in a facet when clicked", () => {
    cy.getBySel("facet-browser-mainLanguages")
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

    cy.getBySel("facet-browser-mainLanguages")
      .should("be.visible")
      .and("have.attr", "aria-expanded", "true")
      .click();
    cy.getBySel("modal-facet-browser-modal-close-button").click();
  });

  it("renders the logic of selected terms and open facets", () => {
    cy.log("renders all results");
    cy.contains("h1", "“harry” (843)");

    cy.log("updates result after it select Joanne K. Rowling inside Creators");

    cy.getBySel("facet-browser-creators").click();
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

    cy.getBySel("modal-facet-browser-modal-close-button").click();
    cy.contains("h1", "“harry” (36)");

    cy.log(
      "Open the modal and check if creators are opened and Joanne K. Rowling is selected"
    );
    cy.getBySel("facet-line-open-browser").click();
    cy.getBySel("facet-browser-creators")
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

    cy.getBySel("modal-facet-browser-modal-close-button").click();

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

    // Intercept campaign query.
    cy.fixture("search-result/campaign.json")
      .then((result) => {
        cy.intercept("**/dpl_campaign/match", result);
      })
      .as("Campaign service - full campaign");

    cy.visit("/iframe.html?id=apps-search-result--search-result");
    cy.contains("button", "+ more filters").click();
  });
});

export default {};

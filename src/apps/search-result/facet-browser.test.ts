const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("The Facet Browser", () => {
  it("renders all facets", () => {
    cy.contains("Main languages");
    cy.contains("Access types");
    cy.contains("Children or adults");
    cy.contains("Creators");
    cy.contains("Fiction or nonfiction");
    cy.contains("Genre and form");
    cy.contains("Material types");
    cy.contains("Subjects");
    cy.contains("Work types");
  });

  it("renders all terms in a facet when clicked", () => {
    cy.contains("Main languages").click();
    cy.contains("button", "Engelsk");
    cy.contains("button", "flere sprog");
    cy.contains("button", "Tysk");
    cy.contains("button", "Svensk");
    cy.contains("button", "Dansk");
    cy.contains("button", "Sproget kan ikke bestemmes");
    cy.contains("button", "Fransk");
    cy.contains("button", "Latin");
    cy.contains("Main languages").click();
    cy.get(`[aria-label="Close facet browser modal"]`).click();
  });

  it("renders the logic of selected terms and open facets", () => {
    cy.log("renders all results");
    cy.contains("h1", "“harry” (848)");

    cy.log("updates result after it select Joanne K. Rowling inside Creators");

    cy.contains("Creators").click();
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
    cy.contains("button", "Joanne K. Rowling").click();

    cy.get(`[aria-label="Close facet browser modal"]`).click();
    cy.contains("h1", "“harry” (36)");

    cy.log(
      "Open the modal and check if creators are opened and Joanne K. Rowling is selected"
    );
    cy.contains("button", "+ more filters").click();
    cy.get(`[aria-controls="facet-creators"]`).should(
      "have.attr",
      "aria-expanded",
      "true"
    );
    cy.contains("button", "Joanne K. Rowling").should(
      "have.attr",
      "aria-pressed",
      "true"
    );

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

    cy.contains(".modal button", "Joanne K. Rowling")
      .click()
      .should("have.attr", "aria-pressed", "false");

    cy.get(`[aria-label="Close facet browser modal"]`).click();

    cy.contains("h1", "“harry” (848)");
  });

  beforeEach(() => {
    cy.interceptGraphql({
      operationName: "searchFacet",
      fixtureFilePath: "search-result/facet-browser/searchFacet"
    });

    cy.interceptGraphql({
      operationName: "searchWithPagination",
      fixtureFilePath: "search-result/facet-browser/searchWithPagination"
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
    cy.contains("button", "+ more filters").click();
  });
});

export {};

const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Search Result", () => {
  it("Should show two query-index inputs on load", () => {
    cy.getBySel("advanced-search-header-row").should("have.length", 2);
  });

  it("Shouldn't show a translation when no fields are filled in", () => {
    cy.getBySel("advanced-search-header-row").each(($row) => {
      cy.wrap($row).find("input").should("have.value", "");
    });
  });

  it("Should translate typed in query-index into valid CQL", () => {
    cy.getBySel("advanced-search-header-row").first().click().type("Harry");
    cy.getBySel("advanced-search-header-row").eq(1).click().type("Prince");
    cy.getBySel("preview-section")
      .first()
      .should("contain", "'Harry' AND 'Prince'");
  });

  it("Should reflect operator changes in the translated CQL", () => {
    cy.getBySel("advanced-search-header-row").first().click().type("Harry");
    cy.getBySel("advanced-search-header-row").eq(1).click().type("Prince");
    cy.getBySel("advanced-search-header-row")
      .eq(1)
      .getBySel("clauses")
      .getBySel("clause-NOT")
      .click();
    cy.getBySel("preview-section")
      .first()
      .should("contain", "'Harry' NOT 'Prince'");
  });

  it("Should translate filters into CQL", () => {
    cy.getBySel("advanced-search-header-row").first().click().type("Harry");
    cy.getBySel("advanced-search-header-row").eq(1).click().type("Prince");
    cy.getBySel("advanced-search-material-types")
      .first()
      .click()
      .find("li")
      .eq(1)
      .should("contain", "Bog")
      .click();
    cy.getBySel("advanced-search-material-types").first().click();
    cy.getBySel("preview-section", true).should(
      "contain",
      "'Harry' AND 'Prince' AND generalmaterialtype='bøger'"
    );
  });

  it("Should reset the form upon reset button click", () => {
    // TODO
  });

  it("Should disable the search button if all inputs are empty", () => {
    cy.getBySel("advanced-search-header-row").each(($row) => {
      cy.wrap($row).should("have.value", "");
    });
    cy.getBySel("search-button").should("be.disabled");
  });

  it("Should enable the search button if at least one input is filled out", () => {
    cy.getBySel("advanced-search-header-row").first().click().type("Harry");
    cy.getBySel("search-button").should("be.enabled");
  });

  beforeEach(() => {
    cy.visit(
      "/iframe.html?id=apps-advanced-search--advanced-search&viewMode=story"
    );

    // Intercept graphql search query.
    cy.interceptGraphql({
      operationName: "complexSearch",
      fixtureFilePath: "search-result/fbi-api.json"
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

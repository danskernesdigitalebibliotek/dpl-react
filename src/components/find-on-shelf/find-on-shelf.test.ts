describe("Find on shelf modal - default", () => {
  beforeEach(() => {
    // Intercept holdings data call.
    cy.fixture("material/find-on-shelf-holdings.json")
      .then((result) => {
        cy.intercept(
          "GET",
          "**/external/agencyid/catalog/holdingsLogistics/**",
          {
            statusCode: 200,
            body: result
          }
        );
      })
      .as("Find on shelf holdings");
    // Intercept availability data call.
    cy.fixture("material/find-on-shelf-holdings.json")
      .then(() => {
        cy.intercept("GET", "**/external/agencyid/catalog/availability/**", {
          statusCode: 200,
          body: [
            {
              recordId: "06373674",
              reservable: true,
              available: true,
              reservations: 48
            }
          ]
        });
      })
      .as("Find on shelf availability");
    cy.visit("/iframe.html?id=components-find-on-shelf-modal--primary");
    cy.contains("button:visible", "Find on shelf").click();
  });

  it("Doesn't contain two dropdowns when it's not a periodical", () => {
    cy.get("select").should("not.exist");
  });
});

describe("Find on shelf modal - periodical", () => {
  beforeEach(() => {
    // Intercept holdings data call.
    cy.fixture("material/find-on-shelf-holdings.json")
      .then((result) => {
        cy.intercept(
          "GET",
          "**/external/agencyid/catalog/holdingsLogistics/**",
          {
            statusCode: 200,
            body: result
          }
        );
      })
      .as("Find on shelf holdings");
    // Intercept availability data call.
    cy.fixture("material/find-on-shelf-holdings.json")
      .then(() => {
        cy.intercept("GET", "**/external/agencyid/catalog/availability/**", {
          statusCode: 200,
          body: [
            {
              recordId: "06373674",
              reservable: true,
              available: true,
              reservations: 48
            }
          ]
        });
      })
      .as("Find on shelf availability");
    cy.visit("/iframe.html?id=components-find-on-shelf-modal--periodical");
    cy.contains("button:visible", "Find on shelf").click();
  });

  it("Contains headline with the title and authors", () => {
    cy.contains("Title 1, Title 2 / author 1, author 2 et al.");
  });

  it("Contains two dropdowns when it's a periodical", () => {
    cy.get("select").contains("2022");
    cy.get("select").contains("29");
  });

  it("Contains text with the sum of all available branches", () => {
    cy.contains("1 libraries have material");
  });

  it("Shows the main branch first", () => {
    cy.getBySel("disclosure-summary").eq(0).contains("Hovedbiblioteket");
  });

  it("Contains a summary for the main branch with no available speciments", () => {
    cy.getBySel("disclosure-summary")
      .contains("Hovedbiblioteket")
      .parent()
      .contains("Unavailable");
  });

  it("Updates branches upon selecting a different volume", () => {
    cy.getBySel("disclosure-summary")
      .contains("Beder-Malling")
      .parent()
      .contains("Available");

    cy.get("select").eq(1).select("35");
    cy.getBySel("disclosure-summary")
      .contains("Tranbjerg")
      .parent()
      .contains("Unavailable");
  });
});

export {};

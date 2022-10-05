describe("Find on shelf modal", () => {
  beforeEach(() => {
    // Intercept holdings data call.
    cy.fixture("material/find-on-shelf-holdings.json")
      .then((result) => {
        cy.intercept("GET", "**/external/agencyid/catalog/holdings/**", {
          statusCode: 200,
          body: result
        });
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
    cy.contains("button:visible", "FIND PÅ HYLDEN").click();
  });

  it("Contains headline with the title and authors", () => {
    cy.contains("Title 1, Title 2 / author 1, author 2 et al.");
  });

  it("Contains two dropdowns when it's a periodical", () => {
    cy.get("select").contains("2022");
    cy.get("select").contains("29");
  });

  it("Doesn't contain two dropdowns when it's not a periodical", () => {
    cy.visit("/iframe.html?id=components-find-on-shelf-modal--default");
    cy.contains("button:visible", "FIND PÅ HYLDEN").click();
    cy.get("select").should("not.exist");
  });

  it("Contains text with the sum of all available branches", () => {
    cy.contains("biblioteker har materialet");
  });

  it("Contains a summary for the main branch with no available speciments", () => {
    cy.get("summary").contains("Hovedbiblioteket");
    cy.get("summary").contains("unavailable");
  });

  it("Updates branches upon selecting a different volume", () => {
    cy.get("summary").contains("Beder-Malling").parent().contains("available");
    cy.get("select").eq(1).select("35");
    cy.get("summary")
      .contains("Beder-Malling")
      .parent()
      .contains("unavailable");
  });
});

export {};

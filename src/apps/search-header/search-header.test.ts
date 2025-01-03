const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Search header app", () => {
  beforeEach(() => {
    cy.fixture("search-header-data.json")
      .then((result) => {
        cy.intercept("POST", "**/next*/graphql", {
          statusCode: 200,
          body: result
        });
      })
      .as("Autosuggest service");

    cy.intercept(
      {
        url: coverUrlPattern
      },
      {
        fixture: "images/cover.jpg"
      }
    ).as("Harry Potter cover");

    cy.fixture("search-header-cover.json")
      .then((result) => {
        cy.intercept("GET", "**/covers**", result);
      })
      .as("Cover service");

    cy.visit("/iframe.html?args=viewMode=story&id=apps-header--search");
  });

  it("Allows user to write into the search field", () => {
    cy.getBySel("search-header-input").focus();
    cy.getBySel("search-header-input").should("be.visible").type("ad");
  });

  it("Doesn't show suggestions before 3 characters are typed", () => {
    cy.getBySel("search-header-input").focus();
    cy.getBySel("search-header-input").type("ha");
    cy.getBySel("autosuggest").should("not.be.visible");
    cy.getBySel("search-header-input").focus();
    cy.getBySel("search-header-input").type("r");
    cy.getBySel("autosuggest-text-item").should("be.visible");
  });

  it("Allows use of arrow keys to navigate autosuggest", () => {
    cy.getBySel("search-header-input").focus();
    cy.getBySel("search-header-input").type("harry");
    cy.getBySel("autosuggest").should("contain.text", "Harry");
    cy.getBySel("search-header-input").focus();
    cy.getBySel("search-header-input").type("{downArrow}");
    cy.getBySel("autosuggest-text-item")
      .first()
      .should("have.attr", "aria-selected", "true");
  });

  it("Matches text in the search field with highlighted item", () => {
    cy.getBySel("search-header-input").focus();
    cy.getBySel("search-header-input").type("har");
    cy.getBySel("autosuggest").should("contain.text", "Harry");
    cy.getBySel("search-header-input").focus();
    cy.getBySel("search-header-input").type("{downArrow}");
    cy.getBySel("search-header-input").should(
      "have.attr",
      "value",
      "Harry Potter"
    );
  });

  it("Shows both parts of the autosuggest", () => {
    cy.getBySel("search-header-input").focus();
    cy.getBySel("search-header-input").type("har");
    cy.getBySel("autosuggest").should("contain.text", "Harry");
    cy.contains("Harry Potter (topic)");
    cy.contains("Harry Potter og de vises sten");
  });

  it("Shows cover pictures for the material suggestions", () => {
    cy.getBySel("search-header-input").focus();
    cy.getBySel("search-header-input").type("har");
    cy.getBySel("autosuggest-material-item")
      .first()
      .find("img")
      .should(
        "have.attr",
        "src",
        "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_small/v1543886150/bogportalen.dk/9788702029444.jpg"
      );
  });
});

export {};

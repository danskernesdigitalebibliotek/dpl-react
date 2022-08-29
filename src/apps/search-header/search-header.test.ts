const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Search header app", () => {
  beforeEach(() => {
    cy.fixture("search-header-data.json")
      .then((result) => {
        cy.intercept("POST", "**/opac/graphql", {
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

    cy.visit("/iframe.html?args=viewMode=story&id=apps-search-header--default");
  });

  it("Allows user to write into the search field", () => {
    cy.get(".header__menu-search-input")
      .should("be.visible")
      .focus()
      .type("ad");
  });

  it("Doesn't show suggestions before 3 characters are typed", () => {
    cy.get(".header__menu-search-input").focus().type("ha");
    cy.get(".autosuggest").should("not.exist");
    cy.get(".header__menu-search-input").focus().type("r");
    cy.get(".autosuggest").should("be.visible");
  });

  it("Allows use of arrow keys to navigate autosuggest", () => {
    cy.get(".header__menu-search-input").focus().type("harry");
    cy.get(".autosuggest").should("contain.text", "Harry");
    cy.get(".header__menu-search-input").focus().type("{downArrow}");
    cy.get("#downshift-0-item-0").should("have.attr", "aria-selected", "true");
  });

  it("Matches text in the search field with highlighted item", () => {
    cy.get(".header__menu-search-input").focus().type("har");
    cy.get(".autosuggest").should("contain.text", "Harry");
    cy.get(".header__menu-search-input")
      .focus()
      .type("{downArrow}")
      .should("have.attr", "value", "Harry Potter");
  });

  it("Shows both parts of the autosuggest", () => {
    cy.get(".header__menu-search-input").focus().type("har");
    cy.get(".autosuggest").should("contain.text", "Harry");
    cy.contains("Harry Potter (emne)");
    cy.contains("Harry Potter og De Vises Sten");
  });

  it("Shows cover pictures for the material suggestions", () => {
    cy.get(".header__menu-search-input").focus().type("har");
    cy.get(".autosuggest__cover>div>span>img").should(
      "have.attr",
      "src",
      "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_small/v1543886150/bogportalen.dk/9788702029444.jpg"
    );
  });
});

export {};

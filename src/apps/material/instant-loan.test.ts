const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Instant Loan", () => {
  beforeEach(() => {
    cy.interceptRest({
      aliasName: "holdings",
      url: "**/agencyid/catalog/holdingsLogistics/**",
      fixtureFilePath: "material/instant-loan/holdings.json"
    });

    cy.interceptRest({
      aliasName: "user",
      url: "**/agencyid/patrons/patronid/v2",
      fixtureFilePath: "material/user.json"
    });

    cy.interceptRest({
      aliasName: "Cover",
      url: "**/api/v2/covers?**",
      fixtureFilePath: "cover.json"
    });

    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/instant-loan/availability.json"
    });

    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");

    cy.intercept(
      {
        url: coverUrlPattern
      },
      {
        fixture: "images/cover.jpg"
      }
    );

    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/instant-loan/fbi-api.json"
    });

    cy.createFakeAuthenticatedSession();
    cy.visit(
      "/iframe.html?&id=apps-material--instant-loan&viewMode=story&type=bog"
    ).scrollTo("bottom");
    cy.getBySel("material-header-buttons-physical")
      .scrollIntoView()
      .should("be.visible")
      .and("contain", "Reserve bog")
      .click();
  });

  it("should render InstantLoan summary with title and cover", () => {
    cy.getBySel("instant-loan")
      .scrollIntoView()
      .should("have.attr", "aria-expanded", "false")
      .and("contain", "Hent bogen nu")
      .find("img")
      .should("have.attr", "src")
      .and("match", coverUrlPattern);
  });

  it("should render InstantLoan branches", () => {
    cy.getBySel("instant-loan").scrollIntoView().click();

    cy.getBySel("instant-loan")
      .scrollIntoView()
      .should("have.attr", "aria-expanded", "true");

    cy.getBySel("instant-loan-branches")
      .scrollIntoView()
      .children()
      .should("have.length", 1);
  });

  it("should render InstantLoan branch", () => {
    cy.getBySel("instant-loan").scrollIntoView().click();

    cy.getBySel("instant-loan-branches")
      .get("li")
      .contains("li", "Ørestad")
      .scrollIntoView()
      .should("contain", "Ørestad")
      .and("contain", "2 stk");
  });
});

export default {};

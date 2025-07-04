describe("The Facet Browser", () => {
  beforeEach(() => {
    // Clear the session storage to avoid previously saved facets
    cy.window().then((win) => {
      win.sessionStorage.removeItem("persist:dpl-react");
    });
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
      fixtureFilePath: "material/availability"
    });

    cy.interceptGraphql({
      operationName: "GetCoversByPids",
      fixtureFilePath: "cover/cover.json"
    });
    // Intercept material list service.
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404,
      body: {}
    }).as("Material list service");

    cy.visit("/iframe.html?id=apps-search-result--primary");
    cy.wait(["@Availability", "@Material list service"]);
    cy.getBySel("facet-line-open-browser").click();
  });

  it("Renders all facets", () => {
    cy.getBySel("facet-browser-mainLanguages").scrollIntoView();
    cy.getBySel("facet-browser-mainLanguages").should("be.visible");

    cy.getBySel("facet-browser-accessTypes").scrollIntoView();
    cy.getBySel("facet-browser-accessTypes").should("be.visible");

    cy.getBySel("facet-browser-childrenOrAdults").scrollIntoView();
    cy.getBySel("facet-browser-childrenOrAdults").should("be.visible");

    cy.getBySel("facet-browser-creators").scrollIntoView();
    cy.getBySel("facet-browser-creators").should("be.visible");

    cy.getBySel("facet-browser-fictionNonfiction").scrollIntoView();
    cy.getBySel("facet-browser-fictionNonfiction").should("be.visible");

    cy.getBySel("facet-browser-fictionNonfiction").scrollIntoView();
    cy.getBySel("facet-browser-fictionNonfiction").should("be.visible");

    cy.getBySel("facet-browser-genreAndForm").scrollIntoView();
    cy.getBySel("facet-browser-genreAndForm").should("be.visible");

    cy.getBySel("facet-browser-materialTypes").scrollIntoView();
    cy.getBySel("facet-browser-materialTypes").should("be.visible");

    cy.getBySel("facet-browser-subjects").scrollIntoView();
    cy.getBySel("facet-browser-subjects").should("be.visible");

    cy.getBySel("facet-browser-workTypes").scrollIntoView();
    cy.getBySel("facet-browser-workTypes").should("be.visible");
  });

  it("Renders all terms in a facet when clicked", () => {
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

  it("Renders the logic of selected terms and open facets", () => {
    cy.log("renders all results");
    cy.contains("h1", "harry");

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
    cy.contains("h1", "harry");

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
      .and("have.attr", "aria-pressed", "true");
    cy.getBySel("facet-browser-creators-Joanne K. Rowling").click();
    cy.getBySel("facet-browser-creators-Joanne K. Rowling").should(
      "have.attr",
      "aria-pressed",
      "false"
    );

    cy.getBySel("modal-facet-browser-modal-close-button").click();

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

    cy.wait(["@Material list service"]);

    cy.visit("/iframe.html?id=apps-search-result--primary");
    cy.contains("button", "More filters").click();
  });
});

export default {};

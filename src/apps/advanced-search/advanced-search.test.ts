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
    cy.getBySel("advanced-search-header-row").first().click();
    cy.getBySel("advanced-search-header-row").first().type("Harry");
    cy.getBySel("advanced-search-header-row").eq(1).click();
    cy.getBySel("advanced-search-header-row").eq(1).type("Prince");
    cy.getBySel("preview-section")
      .first()
      .should("contain", "'Harry' AND 'Prince'");
  });

  it("Should reflect operator changes in the translated CQL", () => {
    cy.getBySel("advanced-search-header-row").first().click();
    cy.getBySel("advanced-search-header-row").first().type("Harry");
    cy.getBySel("advanced-search-header-row").eq(1).click();
    cy.getBySel("advanced-search-header-row").eq(1).type("Prince");
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
    cy.getBySel("advanced-search-header-row").first().click();
    cy.getBySel("advanced-search-header-row").first().type("Harry");
    cy.getBySel("advanced-search-header-row").eq(1).click();
    cy.getBySel("advanced-search-header-row").eq(1).type("Prince");
    cy.getBySel("advanced-search-material-types").first().click();
    cy.getBySel("advanced-search-material-types")
      .first()
      .find("li")
      .eq(1)
      .should("contain", "Book")
      .click();
    cy.getBySel("advanced-search-material-types").first().click();
    cy.getBySel("preview-section", true).should(
      "contain",
      "'Harry' AND 'Prince' AND term.generalmaterialtype='bøger'"
    );
    cy.getBySel("advanced-search-accessibility").first().click();
    cy.getBySel("advanced-search-accessibility")
      .first()
      .find("li")
      .eq(2)
      .should("contain", "Online")
      .click();
    cy.getBySel("advanced-search-accessibility").first().click();
    cy.getBySel("preview-section", true).should(
      "contain",
      "'Harry' AND 'Prince' AND term.generalmaterialtype='bøger' AND term.accesstype='online'"
    );
  });

  it("Should reset the form upon reset button click", () => {
    // Setup the search query.
    cy.getBySel("advanced-search-header-row").first().click();
    cy.getBySel("advanced-search-header-row").first().type("Harry");
    cy.getBySel("advanced-search-header-row").eq(1).click();
    cy.getBySel("advanced-search-header-row")
      .eq(1)
      .within(() => {
        cy.get("input").type("Rowling");
        cy.get("select").select(1);
      });
    cy.getBySel("advanced-search-add-row").click();
    cy.getBySel("advanced-search-header-row").eq(2).click();
    cy.getBySel("advanced-search-header-row")
      .eq(2)
      .within(() => {
        cy.get("input").type("Magi");
        cy.get("select").select(2);
      });
    cy.getBySel("advanced-search-material-types").click();
    cy.getBySel("advanced-search-material-types").within(() => {
      cy.get("[role=option]").eq(1).click();
      cy.get("[role=option]").eq(2).click();
    });
    cy.getBySel("advanced-search-fiction").click();
    cy.getBySel("advanced-search-fiction").within(() => {
      cy.get("[role=option]").eq(1).click();
    });
    cy.getBySel("advanced-search-accessibility").click();
    cy.getBySel("advanced-search-accessibility").within(() => {
      cy.get("[role=option]").eq(1).click();
    });

    cy.getBySel("advanced-search-reset", true).click();

    // Verify that all parts of the search query have been reset.
    cy.getBySel("advanced-search-header-row").should("have.length", 2);
    cy.getBySel("advanced-search-add-row").click();
    cy.getBySel("advanced-search-header-row").each(() => {
      cy.get("input").should("have.value", "");
      cy.get("select").should("have.value", "all");
    });

    // We currently have no good way to identify selected options in the
    // multiselect so checking the text of the button is the best we can do.
    const multiSelects = ["material-types", "fiction", "accessibility"];
    multiSelects.forEach((multiSelect) => {
      cy.getBySel(`advanced-search-${multiSelect}`)
        .find("button")
        .should("contain", "All");
    });

    // The preview should be reset as well
    cy.getBySel("preview-section-preview", true).should("contain", "-");
  });

  it("Should disable the search button if all inputs are empty", () => {
    cy.getBySel("advanced-search-header-row").each(($row) => {
      cy.wrap($row).should("have.value", "");
    });
    cy.getBySel("search-button").should("be.disabled");
  });

  it("Should enable the search button if at least one input is filled out", () => {
    cy.getBySel("advanced-search-header-row").first().click();
    cy.getBySel("advanced-search-header-row").first().type("Harry");
    cy.getBySel("search-button").should("be.enabled");
  });

  it("Should persist advanced search query in url", () => {
    // Setup the search query.
    cy.getBySel("advanced-search-header-row").eq(0).click();
    cy.getBySel("advanced-search-header-row").eq(0).type("Harry");
    cy.getBySel("advanced-search-header-row").eq(1).click();
    cy.getBySel("advanced-search-header-row")
      .eq(1)
      .within(() => {
        cy.get("input").type("Rowling");
        cy.get("select").select(1);
      });
    cy.getBySel("advanced-search-material-types").click();
    cy.getBySel("advanced-search-material-types").within(() => {
      cy.get("[role=option]").eq(1).click();
      cy.get("[role=option]").eq(2).click();
    });
    cy.getBySel("advanced-search-fiction").click();
    cy.getBySel("advanced-search-fiction").within(() => {
      cy.get("[role=option]").eq(1).click();
    });
    cy.getBySel("advanced-search-accessibility").click();
    cy.getBySel("advanced-search-accessibility").within(() => {
      cy.get("[role=option]").eq(1).click();
    });

    // Perform the search to persist it in the url.
    cy.getBySel("search-button").click();

    // Do a hard reload of the page to simulate a new visit without risking
    // local storage.
    cy.reload(true);

    // Wait for the search operation to finish after the reload. Once this is
    // done we know that the search query has been transferred back from the
    // url to the component and we can make our assertions.
    cy.wait("@complexSearchWithPagination GraphQL operation");

    // Verify that all parts of the search query have been transferred.
    cy.getBySel("advanced-search-header-row").should("have.length", 2);
    cy.getBySel("advanced-search-header-row")
      .eq(0)
      .within(() => {
        cy.get("input").should("have.value", "Harry");
        cy.get("select").should("have.value", "all");
      });
    cy.getBySel("advanced-search-header-row")
      .eq(1)
      .within(() => {
        cy.get("input").should("have.value", "Rowling");
        cy.get("select").should("have.value", "term.creatorcontributor");
      });
    // We currently have no good way to identify selected options in the
    // multiselect so checking the text of the button is the best we can do.
    cy.getBySel("advanced-search-material-types")
      .should("contain", "Book")
      .should("contain", "Ebook");
    cy.getBySel("advanced-search-fiction").should("contain", "Fiction");
    cy.getBySel("advanced-search-accessibility").should("contain", "Physical");
  });

  it("Should persist CQL query in url", () => {
    // Setup the search query.
    // We have two preview elements in the form where visibility is controlled
    // through media queries. Click on the one that is visible.
    cy.getBySel("advanced-search-edit-cql", true).click();
    cy.getBySel("cql-search-header-input").type("Harry");

    // Perform the search to persist the CQL in the url.
    cy.getBySel("search-button").click();

    // Do a hard reload of the page to simulate a new visit without risking
    // local storage.
    cy.reload(true);

    // Wait for the search operation to finish after the reload. Once this is
    // done we know that the CQL query has been transferred back from the
    // url to the component and we can make our assertions.
    cy.wait("@complexSearchWithPagination GraphQL operation");

    // Verify that the CQL query have been transferred.
    cy.getBySel("cql-search-header-input").should("have.value", "Harry");
  });

  it("Should show search results upon submitting the form", () => {
    cy.getBySel("advanced-search-header-row").first().click();
    cy.getBySel("advanced-search-header-row").first().type("Harry");
    cy.getBySel("search-button").click();
    cy.wait("@complexSearchWithPagination GraphQL operation");
    cy.getBySel("search-result-list").should("exist");
    cy.scrollTo("bottom");
    cy.getBySel("card-list-item").should("have.length", 2);
  });

  it("Updates search string after initial search is executed", () => {
    cy.getBySel("advanced-search-header-row").first().click();
    cy.getBySel("advanced-search-header-row").first().type("Harry");
    cy.getBySel("preview-section").first().should("contain", "'Harry'");
    cy.getBySel("search-button").click();
    cy.wait("@complexSearchWithPagination GraphQL operation");
    cy.getBySel("search-result-list").should("exist");
    cy.getBySel("advanced-search-header-row").eq(1).click();
    cy.getBySel("advanced-search-header-row").eq(1).type("Potter");
    cy.getBySel("preview-section")
      .first()
      .should("contain", "'Harry' AND 'Potter'");
  });

  beforeEach(() => {
    cy.visit("/iframe.html?id=apps-advanced-search--primary&viewMode=story");

    // Intercept graphql search query.
    cy.interceptGraphql({
      operationName: "complexSearchWithPagination",
      fixtureFilePath: "advanced-search/fbi-api.json"
    });

    cy.interceptGraphql({
      operationName: "GetCoversByPids",
      fixtureFilePath: "cover/cover.json"
    });

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

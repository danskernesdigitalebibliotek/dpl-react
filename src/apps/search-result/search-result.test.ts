import { SearchResultPage } from "../../../cypress/page-objects/search-result/SearchResultPage";
import { givenSearchWithPaginationResponse } from "../../../cypress/intercepts/fbi/searchWithPagination";
import { givenSearchFacetResponse } from "../../../cypress/intercepts/fbi/searchFacet";

describe("Search Result", () => {
  let page: SearchResultPage;

  beforeEach(() => {
    // Use desktop viewport to ensure sidebar filters are visible
    cy.viewport(1280, 720);

    page = new SearchResultPage();

    // Test-specific intercepts - must be set up before the generic fallback
    givenSearchWithPaginationResponse();
    givenSearchFacetResponse();

    // These intercepts are not relevant to the tests but prevent 401 errors
    // from external services that would otherwise break the test environment.
    cy.intercept(
      { url: /materiallist\.dandigbib\.org/ },
      { statusCode: 200, body: [] }
    );
    cy.intercept(
      { url: /fbs-openplatform\.dbc\.dk.*availability/ },
      { statusCode: 200, body: [] }
    );

    page.visit([]);
  });

  describe("Search Results Display", () => {
    it("displays search results", () => {
      page.verifyResultsAreVisible();
    });

    it("shows hit count in results heading", () => {
      page.verifyResultsHeadingContains("3537");
    });
  });

  describe("Toggle Filters", () => {
    it("toggles 'On shelf' filter on and off", () => {
      page.components.Filters((filters) => {
        filters.verifyOnShelfIsNotChecked();
        filters.toggleOnShelf();
        filters.verifyOnShelfIsChecked();
      });

      page.verifyUrlContains("onShelf=true");

      page.components.Filters((filters) => {
        filters.toggleOnShelf();
        filters.verifyOnShelfIsNotChecked();
      });
    });

    it("toggles 'Can always be loaned' filter on and off", () => {
      page.components.Filters((filters) => {
        filters.verifyCanAlwaysBeLoanedIsNotChecked();
        filters.toggleCanAlwaysBeLoaned();
        filters.verifyCanAlwaysBeLoanedIsChecked();
      });

      page.verifyUrlContains("facets");

      page.components.Filters((filters) => {
        filters.toggleCanAlwaysBeLoaned();
        filters.verifyCanAlwaysBeLoanedIsNotChecked();
      });
    });
  });

  describe("Sidebar Filter Groups", () => {
    it("expands and collapses filter groups", () => {
      page.components.Filters((filters) => {
        // Filter groups start collapsed
        filters.verifyFilterGroupIsCollapsed("Genre and form");

        // Expand the group
        filters.toggleFilterGroup("Genre and form");
        filters.verifyFilterGroupIsExpanded("Genre and form");

        // Collapse the group
        filters.toggleFilterGroup("Genre and form");
        filters.verifyFilterGroupIsCollapsed("Genre and form");
      });
    });

    it("selects and deselects facet values via checkboxes", () => {
      page.components.Filters((filters) => {
        // Expand the Genre and form group
        filters.toggleFilterGroup("Genre and form");
        filters.verifyFilterGroupIsExpanded("Genre and form");

        // Select a facet value
        filters.selectFacetValue("Genre and form", "jazz");
        filters.verifyFacetValueIsSelected("Genre and form", "jazz");
        filters.verifyFilterGroupBadgeCount("Genre and form", 1);

        // Select another facet value
        filters.selectFacetValue("Genre and form", "rock");
        filters.verifyFacetValueIsSelected("Genre and form", "rock");
        filters.verifyFilterGroupBadgeCount("Genre and form", 2);

        // Deselect a facet value
        filters.deselectFacetValue("Genre and form", "jazz");
        filters.verifyFacetValueIsNotSelected("Genre and form", "jazz");
        filters.verifyFilterGroupBadgeCount("Genre and form", 1);
      });
    });

    it("shows only first 5 items initially with 'Show all' button", () => {
      page.components.Filters((filters) => {
        filters.toggleFilterGroup("Genre and form");
        // Genre and form has 10 items in mock data, should show 5 initially
        filters.verifyFacetItemCount("Genre and form", 5);
        filters.verifyShowAllButtonExists("Genre and form");
      });
    });

    it("expands to show all items when clicking 'Show all'", () => {
      page.components.Filters((filters) => {
        filters.toggleFilterGroup("Genre and form");
        filters.verifyFacetItemCount("Genre and form", 5);

        // Click show all
        filters.clickShowAllInGroup("Genre and form");
        filters.verifyFacetItemCount("Genre and form", 10);

        // Click show less
        filters.clickShowAllInGroup("Genre and form");
        filters.verifyFacetItemCount("Genre and form", 5);
      });
    });
  });

  describe("Radio Button Filters", () => {
    it("allows selecting and deselecting access type radio options", () => {
      page.components.Filters((filters) => {
        // Select Online
        filters.selectRadioOption("Online");
        filters.verifyRadioOptionIsSelected("Online");
      });

      page.verifyUrlContains("facets");

      page.components.Filters((filters) => {
        // Click Online again to deselect
        filters.selectRadioOption("Online");
        filters.verifyRadioOptionIsNotSelected("Online");
      });
    });

    it("allows selecting fiction type radio options", () => {
      page.components.Filters((filters) => {
        // Select Fiktion
        filters.selectRadioOption("Fiktion");
        filters.verifyRadioOptionIsSelected("Fiktion");
      });

      page.verifyUrlContains("facets");
    });

    it("allows selecting age group radio options", () => {
      page.components.Filters((filters) => {
        // Select Voksne
        filters.selectRadioOption("Voksne");
        filters.verifyRadioOptionIsSelected("Voksne");
      });

      page.verifyUrlContains("facets");
    });

    it("allows switching between radio options in same group", () => {
      page.components.Filters((filters) => {
        // Select Online
        filters.selectRadioOption("Online");
        filters.verifyRadioOptionIsSelected("Online");
      });

      page.components.Filters((filters) => {
        // Switch to Fysisk
        filters.selectRadioOption("Fysisk");

        // Verify Fysisk is selected and Online is not
        filters.verifyRadioOptionIsSelected("Fysisk");
        filters.verifyRadioOptionIsNotSelected("Online");
      });
    });

    it("allows selecting options from multiple radio groups independently", () => {
      page.components.Filters((filters) => {
        // Select from access type
        filters.selectRadioOption("Online");

        // Select from fiction type
        filters.selectRadioOption("Fiktion");

        // Select from age group
        filters.selectRadioOption("Voksne");

        // Verify all three are selected
        filters.verifyRadioOptionIsSelected("Online");
        filters.verifyRadioOptionIsSelected("Fiktion");
        filters.verifyRadioOptionIsSelected("Voksne");
      });
    });
  });

  describe("Facets URL State", () => {
    it("adds selected facets to URL", () => {
      page.components.Filters((filters) => {
        filters.toggleFilterGroup("Genre and form");
        filters.selectFacetValue("Genre and form", "jazz");
      });

      page.verifyUrlContains("facets");
    });

    it("updates URL when adding multiple facet values", () => {
      page.components.Filters((filters) => {
        filters.toggleFilterGroup("Genre and form");
        filters.selectFacetValue("Genre and form", "jazz");
        filters.selectFacetValue("Genre and form", "rock");
      });

      page.verifyUrlContains("facets");
    });

    it("removes facet from URL when all values are deselected", () => {
      page.components.Filters((filters) => {
        filters.toggleFilterGroup("Genre and form");
        filters.selectFacetValue("Genre and form", "jazz");
      });

      page.verifyUrlContains("facets");

      page.components.Filters((filters) => {
        filters.deselectFacetValue("Genre and form", "jazz");
      });

      // Facets param should be removed from URL entirely
      cy.url().then((url) => {
        const urlObj = new URL(url);
        expect(urlObj.searchParams.has("facets")).to.equal(false);
      });
    });

    it("supports selecting facets from multiple filter groups", () => {
      page.components.Filters((filters) => {
        // Select from Genre and form
        filters.toggleFilterGroup("Genre and form");
        filters.selectFacetValue("Genre and form", "jazz");

        // Select from Main languages
        filters.toggleFilterGroup("Main languages");
        filters.selectFacetValue("Main languages", "Dansk");
      });

      page.verifyUrlContains("facets");
    });
  });

  describe("Mobile Device - Filter Dialog", () => {
    beforeEach(() => {
      // Use mobile viewport
      cy.viewport(375, 667);
    });

    it("opens filter dialog when clicking filter button", () => {
      page.openFilterDialog();
      page.verifyDialogIsOpen();
    });

    it("closes filter dialog when clicking show results button", () => {
      page.openFilterDialog();
      page.verifyDialogIsOpen();

      page.clickShowResultsButton();
      page.verifyDialogIsClosed();
    });

    it("toggles 'On shelf' filter inside dialog", () => {
      page.openFilterDialog();

      page.components.DialogFilters((filters) => {
        filters.verifyOnShelfIsNotChecked();
        filters.toggleOnShelf();
        filters.verifyOnShelfIsChecked();
      });

      page.clickShowResultsButton();
      page.verifyUrlContains("onShelf=true");
    });

    it("toggles 'Can always be loaned' filter inside dialog", () => {
      page.openFilterDialog();

      page.components.DialogFilters((filters) => {
        filters.verifyCanAlwaysBeLoanedIsNotChecked();
        filters.toggleCanAlwaysBeLoaned();
        filters.verifyCanAlwaysBeLoanedIsChecked();
      });

      page.clickShowResultsButton();
      page.verifyUrlContains("facets");
    });

    it("expands and collapses filter groups inside dialog", () => {
      page.openFilterDialog();

      page.components.DialogFilters((filters) => {
        filters.verifyFilterGroupIsCollapsed("Genre and form");
        filters.toggleFilterGroup("Genre and form");
        filters.verifyFilterGroupIsExpanded("Genre and form");
        filters.toggleFilterGroup("Genre and form");
        filters.verifyFilterGroupIsCollapsed("Genre and form");
      });
    });

    it("selects facet values inside dialog and updates URL", () => {
      page.openFilterDialog();

      page.components.DialogFilters((filters) => {
        filters.toggleFilterGroup("Genre and form");
        filters.selectFacetValue("Genre and form", "jazz");
        filters.verifyFacetValueIsSelected("Genre and form", "jazz");
        filters.verifyFilterGroupBadgeCount("Genre and form", 1);
      });

      page.clickShowResultsButton();
      page.verifyUrlContains("facets");
    });

    it("selects multiple facet values inside dialog", () => {
      page.openFilterDialog();

      page.components.DialogFilters((filters) => {
        filters.toggleFilterGroup("Genre and form");
        filters.selectFacetValue("Genre and form", "jazz");
        filters.selectFacetValue("Genre and form", "rock");
        filters.verifyFacetValueIsSelected("Genre and form", "jazz");
        filters.verifyFacetValueIsSelected("Genre and form", "rock");
        filters.verifyFilterGroupBadgeCount("Genre and form", 2);
      });

      page.clickShowResultsButton();
      page.verifyUrlContains("facets");
    });

    it("deselects facet values inside dialog", () => {
      page.openFilterDialog();

      page.components.DialogFilters((filters) => {
        filters.toggleFilterGroup("Genre and form");
        filters.selectFacetValue("Genre and form", "jazz");
        filters.verifyFacetValueIsSelected("Genre and form", "jazz");

        filters.deselectFacetValue("Genre and form", "jazz");
        filters.verifyFacetValueIsNotSelected("Genre and form", "jazz");
      });
    });

    it("selects radio options inside dialog", () => {
      page.openFilterDialog();

      page.components.DialogFilters((filters) => {
        filters.selectRadioOption("Online");
        filters.verifyRadioOptionIsSelected("Online");
      });

      page.clickShowResultsButton();
      page.verifyUrlContains("facets");
    });

    it("allows selecting options from multiple radio groups inside dialog", () => {
      page.openFilterDialog();

      page.components.DialogFilters((filters) => {
        filters.selectRadioOption("Online");
        filters.selectRadioOption("Fiktion");
        filters.selectRadioOption("Voksne");

        filters.verifyRadioOptionIsSelected("Online");
        filters.verifyRadioOptionIsSelected("Fiktion");
        filters.verifyRadioOptionIsSelected("Voksne");
      });
    });

    it("shows 'Show all' button and expands facet list inside dialog", () => {
      page.openFilterDialog();

      page.components.DialogFilters((filters) => {
        filters.toggleFilterGroup("Genre and form");
        filters.verifyFacetItemCount("Genre and form", 5);
        filters.verifyShowAllButtonExists("Genre and form");

        filters.clickShowAllInGroup("Genre and form");
        filters.verifyFacetItemCount("Genre and form", 10);
      });
    });
  });
});

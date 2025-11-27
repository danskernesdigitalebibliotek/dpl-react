import { AdvancedSearchV2Page } from "../../../cypress/page-objects/advanced-search-v2/AdvancedSearchV2Page";
import { givenComplexSuggestResponse } from "../../../cypress/intercepts/fbi/complexSuggest";
import { givenComplexSearchWithPaginationResponse } from "../../../cypress/intercepts/fbi/complexSearchWithPagination";
import { givenComplexFacetSearchResponse } from "../../../cypress/intercepts/fbi/complexFacetSearch";
import { ComplexSearchFacetsEnum } from "../../core/dbc-gateway/generated/graphql";

describe("Advanced Search V2", () => {
  let page: AdvancedSearchV2Page;

  beforeEach(() => {
    page = new AdvancedSearchV2Page();

    // These intercepts are not relevant to the tests but prevent 401 errors
    // from external services that would otherwise break the test environment.
    cy.intercept("POST", "**/graphql", (req) => {
      req.reply({ statusCode: 200, body: { data: {} } });
    });
    cy.intercept(
      { url: /materiallist\.dandigbib\.org/ },
      { statusCode: 200, body: [] }
    );
    cy.intercept(
      { url: /fbs-openplatform\.dbc\.dk.*availability/ },
      { statusCode: 200, body: [] }
    );

    // Test-specific intercepts
    givenComplexSuggestResponse();
    givenComplexSearchWithPaginationResponse();
    givenComplexFacetSearchResponse();
    page.visit([]);
  });

  describe("Search Row Management", () => {
    it("starts with two empty search rows with correct defaults", () => {
      page.components.Form((form) => {
        form.verifyRowCount(2);
        form.verifySearchTermTypeIs(0, "Free text search");
        form.verifySearchInputPlaceholderIs(0, "Search in all material…");
        form.verifySearchTermValue(0, "");
        form.verifySearchTermTypeIs(1, "Free text search");
        form.verifySearchInputPlaceholderIs(1, "Search in all material…");
        form.verifySearchTermValue(1, "");
      });
    });

    it("allows adding and removing search rows", () => {
      page.components.Form((form) => {
        form.verifyRowCount(2);
        form.addSearchRow();
        form.verifyRowCount(3);
        form.removeSearchRow(1);
        form.verifyRowCount(2);
      });
    });

    it("updates type label and placeholder when search term type changes", () => {
      page.components.Form((form) => {
        form.selectSearchTermType(0, "Title");
        form.verifySearchTermTypeIs(0, "Title");
        form.verifySearchInputPlaceholderIs(0, "Enter title…");

        form.selectSearchTermType(1, "Author / Creator");
        form.verifySearchTermTypeIs(1, "Author / Creator");
        form.verifySearchInputPlaceholderIs(1, "Enter author or creator…");
      });
    });

    it("shows suggestions when typing at least 3 characters", () => {
      page.components.Form((form) => {
        form.typeSearchTerm(0, "har");
        form.verifySuggestionsAreVisible();
        form.verifySuggestionExists("Harry Potter and the Philosopher's Stone");
        form.verifySuggestionExists("Harry - a Biography");
      });
    });

    it("does not show suggestions when typing less than 3 characters", () => {
      page.components.Form((form) => {
        form.typeSearchTerm(0, "ha");
        form.verifySuggestionsAreHidden();
      });
    });

    it("allows selecting a suggestion and populates input", () => {
      page.components.Form((form) => {
        form.typeSearchTerm(0, "har");
        form.verifySuggestionsAreVisible();
        form.selectSuggestion("Harry Potter and the Philosopher's Stone");
        form.verifySearchTermValue(
          0,
          "Harry Potter and the Philosopher's Stone"
        );
      });
    });
  });

  describe("Boolean Operators", () => {
    it("defaults to AND operator in summary", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "harry");
        form.enterSearchTerm(1, "potter");
        form.clickSearch();
      });

      page.components.Summary((summary) => {
        summary.verifyIsVisible();
        summary.verifyOperatorIs(0, "AND");
      });
    });

    it("combines terms with NOT operator", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "harry");
        form.selectOperator(0, "NOT");
        form.enterSearchTerm(1, "potter");
        form.verifyActiveOperatorIs(0, "NOT");
        form.clickSearch();
      });

      page.components.Summary((summary) => {
        summary.verifyIsVisible();
        summary.verifyItemContains(0, "harry");
        summary.verifyOperatorIs(0, "NOT");
        summary.verifyItemContains(1, "potter");
      });
    });

    it("combines terms with OR operator", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "roman");
        form.selectOperator(0, "OR");
        form.enterSearchTerm(1, "novelle");
        form.verifyActiveOperatorIs(0, "OR");
        form.clickSearch();
      });

      page.components.Summary((summary) => {
        summary.verifyIsVisible();
        summary.verifyOperatorIs(0, "OR");
      });
    });

    it("defaults new rows to AND operator", () => {
      page.components.Form((form) => {
        form.verifyActiveOperatorIs(0, "AND");
        form.addSearchRow();
        form.verifyActiveOperatorIs(1, "AND");
      });
    });
  });

  describe("Multiple Search Rows", () => {
    it("allows searching with 4 rows", () => {
      page.components.Form((form) => {
        form.addSearchRow();
        form.addSearchRow();
        form.verifyRowCount(4);
        form.enterSearchTerm(0, "term1");
        form.enterSearchTerm(1, "term2");
        form.enterSearchTerm(2, "term3");
        form.enterSearchTerm(3, "term4");
        form.clickSearch();
      });

      page.components.Summary((summary) => {
        summary.verifyIsVisible();
        summary.verifyItemCount(4);
        summary.verifyItemContains(0, "term1");
        summary.verifyItemContains(1, "term2");
        summary.verifyItemContains(2, "term3");
        summary.verifyItemContains(3, "term4");
      });
    });

    it("filters out empty rows on search", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "only-this");
        form.clickSearch();
      });

      page.components.Summary((summary) => {
        summary.verifyItemCount(1);
        summary.verifyItemContains(0, "only-this");
      });
    });
  });

  describe("Material Type Filter", () => {
    it("allows selecting multiple material types", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "test");
        form.openMultiSelect("Material type");
        form.selectMultiSelectOption("Bøger");
        form.selectMultiSelectOption("E-bøger");
        form.closePopover();
        form.verifyMultiSelectBadgeCount("Material type", "2");
        form.clickSearch();
      });

      page.components.Summary((summary) => {
        summary.verifyItemContains(1, "bøger");
        summary.verifyItemContains(1, "e-bøger");
      });
    });

    it("can reset material type selection", () => {
      page.components.Form((form) => {
        form.openMultiSelect("Material type");
        form.selectMultiSelectOption("Bøger");
        form.verifyMultiSelectBadgeCount("Material type", "1");
        form.resetMultiSelect();
        form.closePopover();
        form.verifyMultiSelectShowsAll("Material type");
      });
    });
  });

  describe("Genre and Form Filter", () => {
    it("allows searching and selecting filtered option", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "test");
        form.openMultiSelect("Genre and form");
        form.searchMultiSelectOption("krimi");
        form.verifyMultiSelectOptionsContain("krimi");
        form.selectMultiSelectOption("krimi");
        form.closePopover();
        form.clickSearch();
      });

      page.components.Summary((summary) => {
        summary.verifyItemContains(0, "test");
        summary.verifyOperatorIs(0, "AND");
        summary.verifyItemContains(1, "krimi");
      });
    });
  });

  describe("Age Range Filter", () => {
    it("allows selecting age preset", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "børn");
        form.openRangeSelect("Age");
        form.selectRangePreset("For 3-6-årige");
        form.verifyRangeBadgeContains("Age", "3-6-årige");
        form.clickSearch();
      });

      page.components.Summary((summary) => {
        summary.verifyItemContains(0, "børn");
        summary.verifyItemContains(1, "3-6");
      });
    });

    it("allows entering custom age range", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "unge");
        form.openRangeSelect("Age");
        form.enterRangeValues("10", "15");
        form.closePopover();
        form.verifyRangeBadgeContains("Age", "10-15-årige");
        form.clickSearch();
      });

      page.components.Summary((summary) => {
        summary.verifyItemContains(0, "unge");
        summary.verifyItemContains(1, "10-15");
      });
    });

    it("allows selecting adult preset (16+)", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "voksen");
        form.openRangeSelect("Age");
        form.selectRangePreset("For 16+");
        form.verifyRangeBadgeContains("Age", "16+ årige");
      });
    });

    it("can reset age selection", () => {
      page.components.Form((form) => {
        form.openRangeSelect("Age");
        form.verifyRangeInputValues("", "");
        form.selectRangePreset("For 3-6-årige");
        form.verifyRangeInputValues("3", "6");
        form.verifyRangeBadgeContains("Age", "3-6-årige");
        form.resetRange();
        form.verifyRangeInputValues("", "");
        form.closePopover();
        form.verifyRangeShowsAll("Age");
      });
    });
  });

  describe("Publication Year Filter", () => {
    it("allows selecting year preset", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "nyheder");
        form.openRangeSelect("Year");
        form.selectRangePreset("Seneste 2 år");
        form.verifyRangeInputValues("2024", "2025");
        form.closePopover();
        form.verifyRangeBadgeContains("Year", "2024-2025");
        form.clickSearch();
      });

      page.components.Summary((summary) => {
        summary.verifyItemContains(0, "nyheder");
      });
    });

    it("allows entering custom year range", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "historie");
        form.openRangeSelect("Year");
        form.enterRangeValues("2000", "2020");
        form.closePopover();
        form.verifyRangeBadgeContains("Year", "2000-2020");
        form.clickSearch();
      });

      page.components.Summary((summary) => {
        summary.verifyItemContains(1, "2000-2020");
      });
    });

    it("allows entering open-ended year range (from only)", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "moderne");
        form.openRangeSelect("Year");
        form.enterRangeFrom("2015");
        form.closePopover();
        form.verifyRangeBadgeContains("Year", "2015+");
        form.clickSearch();
      });

      page.components.Summary((summary) => {
        summary.verifyItemContains(1, "2015");
      });
    });

    it("can reset year selection", () => {
      page.components.Form((form) => {
        form.openRangeSelect("Year");
        form.verifyRangeInputValues("", "");
        form.selectRangePreset("Seneste 2 år");
        form.verifyRangeInputValues("2024", "2025");
        form.verifyRangeBadgeContains("Year", "2024-2025");
        form.resetRange();
        form.verifyRangeInputValues("", "");
        form.closePopover();
        form.verifyRangeShowsAll("Year");
      });
    });
  });

  describe("Reset Functionality", () => {
    it("shows reset button only when filters are applied", () => {
      page.components.Form((form) => {
        form.verifyResetButtonNotVisible();
        form.enterSearchTerm(0, "test");
        form.verifyResetButtonVisible();
      });
    });

    it("clears all filters when reset is clicked", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "test");
        form.openMultiSelect("Material type");
        form.selectMultiSelectOption("Bøger");
        form.closePopover();
        form.clickReset();
        form.verifySearchTermValue(0, "");
        form.verifyMultiSelectShowsAll("Material type");
        form.verifyResetButtonNotVisible();
      });
    });
  });

  describe("Edit Search Flow", () => {
    it("allows editing search from results view", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "original");
        form.clickSearch();
      });

      page.verifyResultsAreVisible();

      page.components.Summary((summary) => {
        summary.clickEdit();
      });

      page.verifyFormIsVisible();

      page.components.Form((form) => {
        form.verifySearchTermValue(0, "original");
      });
    });
  });

  describe("Combined Filters", () => {
    it("combines search term with material type and year range", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "danish fiction");
        form.openMultiSelect("Material type");
        form.selectMultiSelectOption("Bøger");
        form.closePopover();
        form.openRangeSelect("Year");
        form.enterRangeValues("2020", "2024");
        form.closePopover();
        form.clickSearch();
      });

      page.components.Summary((summary) => {
        summary.verifyIsVisible();
        summary.verifyItemContains(0, "danish fiction");
        summary.verifyOperatorIs(0, "AND");
        summary.verifyItemContains(1, "bøger");
        summary.verifyOperatorIs(1, "AND");
        summary.verifyItemContains(2, "2020-2024");
      });
    });
  });

  describe("URL State", () => {
    it("adds search terms to URL after search", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "harry");
        form.selectOperator(0, "NOT");
        form.enterSearchTerm(1, "potter");
        form.clickSearch();
      });

      page.verifyUrlParamEquals("suggests", [
        { term: "term.default", query: "harry" },
        { term: "term.default", query: "potter", operator: "not" }
      ]);
    });

    it("adds pre-facets to URL after search", () => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "test");
        form.openMultiSelect("Material type");
        form.selectMultiSelectOption("Bøger");
        form.closePopover();
        form.openRangeSelect("Year");
        form.enterRangeValues("2020", "2024");
        form.closePopover();
        form.clickSearch();
      });

      page.verifyUrlParamEquals("preSearchFacets", [
        {
          facetField: ComplexSearchFacetsEnum.Generalmaterialtype,
          selectedValues: ["bøger"]
        },
        {
          facetField: ComplexSearchFacetsEnum.Publicationyear,
          selectedValues: ["2020", "2024"]
        }
      ]);
    });
  });

  // Tests for AdvancedSearchFilters
  describe("Sidebar Filter Toggles", () => {
    beforeEach(() => {
      // Perform a search to show the results view with sidebar filters
      page.components.Form((form) => {
        form.enterSearchTerm(0, "harry potter");
        form.clickSearch();
      });
      page.verifyResultsAreVisible();
    });

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

    it("toggles 'Only extra titles' filter on and off", () => {
      page.components.Filters((filters) => {
        filters.verifyOnlyExtraTitlesIsNotChecked();
        filters.toggleOnlyExtraTitles();
        filters.verifyOnlyExtraTitlesIsChecked();
      });

      page.verifyUrlContains("onlyExtraTitles=true");

      page.components.Filters((filters) => {
        filters.toggleOnlyExtraTitles();
        filters.verifyOnlyExtraTitlesIsNotChecked();
      });
    });
  });

  describe("Sidebar Filter Groups", () => {
    beforeEach(() => {
      // Perform a search to show the results view with sidebar filters
      page.components.Form((form) => {
        form.enterSearchTerm(0, "harry potter");
        form.clickSearch();
      });
      page.verifyResultsAreVisible();
    });

    it("expands and collapses filter groups", () => {
      page.components.Filters((filters) => {
        // Filter groups start collapsed
        filters.verifyFilterGroupIsCollapsed("Format");

        // Expand the group
        filters.toggleFilterGroup("Format");
        filters.verifyFilterGroupIsExpanded("Format");

        // Collapse the group
        filters.toggleFilterGroup("Format");
        filters.verifyFilterGroupIsCollapsed("Format");
      });
    });

    it("selects and deselects facet values via checkboxes", () => {
      page.components.Filters((filters) => {
        // Expand the Format group
        filters.toggleFilterGroup("Format");
        filters.verifyFilterGroupIsExpanded("Format");

        // Select a facet value
        filters.selectFacetValue("Format", "bog");
        filters.verifyFacetValueIsSelected("Format", "bog");
        filters.verifyFilterGroupBadgeCount("Format", 1);

        // Select another facet value
        filters.selectFacetValue("Format", "e-bog");
        filters.verifyFacetValueIsSelected("Format", "e-bog");
        filters.verifyFilterGroupBadgeCount("Format", 2);

        // Deselect a facet value
        filters.deselectFacetValue("Format", "bog");
        filters.verifyFacetValueIsNotSelected("Format", "bog");
        filters.verifyFilterGroupBadgeCount("Format", 1);
      });
    });

    it("shows facet value counts from search results", () => {
      page.components.Filters((filters) => {
        filters.toggleFilterGroup("Format");
        // Verify facet values have counts displayed (from mocked data)
        filters.verifyFacetValueCount("Format", "bog", 1500);
        filters.verifyFacetValueCount("Format", "e-bog", 800);
      });
    });

    it("shows only first 5 items initially with 'Show all' button", () => {
      page.components.Filters((filters) => {
        filters.toggleFilterGroup("Format");
        // Format has 7 items in mock data, should show 5 initially
        filters.verifyFacetItemCount("Format", 5);
        filters.verifyShowAllButtonExists("Format");
      });
    });

    it("expands to show all items when clicking 'Show all'", () => {
      page.components.Filters((filters) => {
        filters.toggleFilterGroup("Format");
        filters.verifyFacetItemCount("Format", 5);

        // Click show all
        filters.clickShowAllInGroup("Format");
        filters.verifyFacetItemCount("Format", 7);

        // Click show less
        filters.clickShowAllInGroup("Format");
        filters.verifyFacetItemCount("Format", 5);
      });
    });
  });

  describe("Sidebar Facets URL State", () => {
    beforeEach(() => {
      page.components.Form((form) => {
        form.enterSearchTerm(0, "harry potter");
        form.clickSearch();
      });
      page.verifyResultsAreVisible();
    });

    it("adds selected facets to URL", () => {
      page.components.Filters((filters) => {
        filters.toggleFilterGroup("Format");
        filters.selectFacetValue("Format", "bog");
      });

      page.verifyUrlParamEquals("facets", [
        {
          facetField: ComplexSearchFacetsEnum.Specificmaterialtype,
          selectedValues: ["bog"]
        }
      ]);
    });

    it("updates URL when adding multiple facet values", () => {
      page.components.Filters((filters) => {
        filters.toggleFilterGroup("Format");
        filters.selectFacetValue("Format", "bog");
        filters.selectFacetValue("Format", "e-bog");
      });

      page.verifyUrlParamEquals("facets", [
        {
          facetField: ComplexSearchFacetsEnum.Specificmaterialtype,
          selectedValues: ["bog", "e-bog"]
        }
      ]);
    });

    it("removes facet from URL when all values are deselected", () => {
      page.components.Filters((filters) => {
        filters.toggleFilterGroup("Format");
        filters.selectFacetValue("Format", "bog");
      });

      page.verifyUrlContains("facets");

      page.components.Filters((filters) => {
        filters.deselectFacetValue("Format", "bog");
      });

      // Facets param should be removed from URL entirely
      cy.url().then((url) => {
        const urlObj = new URL(url);
        expect(urlObj.searchParams.has("facets")).to.equal(false);
      });
    });

    it("supports selecting facets from multiple filter groups", () => {
      page.components.Filters((filters) => {
        // Select from Format
        filters.toggleFilterGroup("Format");
        filters.selectFacetValue("Format", "bog");

        // Select from Language
        filters.toggleFilterGroup("Language");
        filters.selectFacetValue("Language", "dansk");
      });

      page.verifyUrlParamEquals("facets", [
        {
          facetField: ComplexSearchFacetsEnum.Specificmaterialtype,
          selectedValues: ["bog"]
        },
        {
          facetField: ComplexSearchFacetsEnum.Mainlanguage,
          selectedValues: ["dansk"]
        }
      ]);
    });
  });
});

import { AdvancedSearchV2Page } from "../../../cypress/page-objects/advanced-search-v2/AdvancedSearchV2Page";
import { givenComplexSuggestResponse } from "../../../cypress/intercepts/fbi/complexSuggest";
import { ComplexSearchFacetsEnum } from "../../core/dbc-gateway/generated/graphql";

describe("Advanced Search V2", () => {
  let page: AdvancedSearchV2Page;

  beforeEach(() => {
    page = new AdvancedSearchV2Page();
    givenComplexSuggestResponse();
    page.visit([]);
  });

  describe("Search Row Management", () => {
    it("starts with two empty search rows with correct defaults", () => {
      page.verifyRowCount(2);
      page.verifySearchTermTypeIs(0, "Free text search");
      page.verifySearchInputPlaceholderIs(0, "Search in all material…");
      page.verifySearchTermValue(0, "");
      page.verifySearchTermTypeIs(1, "Free text search");
      page.verifySearchInputPlaceholderIs(1, "Search in all material…");
      page.verifySearchTermValue(1, "");
    });

    it("allows adding and removing search rows", () => {
      page.verifyRowCount(2);
      page.addSearchRow();
      page.verifyRowCount(3);
      page.removeSearchRow(1);
      page.verifyRowCount(2);
    });

    it("updates type label and placeholder when search term type changes", () => {
      page.selectSearchTermType(0, "Title");
      page.verifySearchTermTypeIs(0, "Title");
      page.verifySearchInputPlaceholderIs(0, "Enter title…");

      page.selectSearchTermType(1, "Author / Creator");
      page.verifySearchTermTypeIs(1, "Author / Creator");
      page.verifySearchInputPlaceholderIs(1, "Enter author or creator…");
    });
  });

  describe("Boolean Operators", () => {
    it("defaults to AND operator in summary", () => {
      page.enterSearchTerm(0, "harry");
      page.enterSearchTerm(1, "potter");
      page.clickSearch();

      page.components.Summary((summary) => {
        summary.verifyIsVisible();
        summary.verifyOperatorIs(0, "AND");
      });
    });

    it("combines terms with NOT operator", () => {
      page.enterSearchTerm(0, "harry");
      page.selectOperator(0, "NOT");
      page.enterSearchTerm(1, "potter");
      page.verifyActiveOperatorIs(0, "NOT");
      page.clickSearch();

      page.components.Summary((summary) => {
        summary.verifyIsVisible();
        summary.verifyItemContains(0, "harry");
        summary.verifyOperatorIs(0, "NOT");
        summary.verifyItemContains(1, "potter");
      });
    });

    it("combines terms with OR operator", () => {
      page.enterSearchTerm(0, "roman");
      page.selectOperator(0, "OR");
      page.enterSearchTerm(1, "novelle");
      page.verifyActiveOperatorIs(0, "OR");
      page.clickSearch();

      page.components.Summary((summary) => {
        summary.verifyIsVisible();
        summary.verifyOperatorIs(0, "OR");
      });
    });

    it("defaults new rows to AND operator", () => {
      page.verifyActiveOperatorIs(0, "AND");
      page.addSearchRow();
      page.verifyActiveOperatorIs(1, "AND");
    });
  });

  describe("Multiple Search Rows", () => {
    it("allows searching with 4 rows", () => {
      page.addSearchRow();
      page.addSearchRow();
      page.verifyRowCount(4);

      page.enterSearchTerm(0, "term1");
      page.enterSearchTerm(1, "term2");
      page.enterSearchTerm(2, "term3");
      page.enterSearchTerm(3, "term4");
      page.clickSearch();

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
      page.enterSearchTerm(0, "only-this");
      page.clickSearch();

      page.components.Summary((summary) => {
        summary.verifyItemCount(1);
        summary.verifyItemContains(0, "only-this");
      });
    });
  });

  describe("Material Type Filter", () => {
    it("allows selecting multiple material types", () => {
      page.enterSearchTerm(0, "test");
      page.openMultiSelect("Material type");
      page.selectMultiSelectOption("Bøger");
      page.selectMultiSelectOption("E-bøger");
      page.closePopover();
      page.verifyMultiSelectBadgeCount("Material type", "2");
      page.clickSearch();

      page.components.Summary((summary) => {
        summary.verifyItemContains(1, "bøger");
        summary.verifyItemContains(1, "e-bøger");
      });
    });

    it("can reset material type selection", () => {
      page.openMultiSelect("Material type");
      page.selectMultiSelectOption("Bøger");
      page.verifyMultiSelectBadgeCount("Material type", "1");
      page.resetMultiSelect();
      page.closePopover();
      page.verifyMultiSelectShowsAll("Material type");
    });
  });

  describe("Genre and Form Filter", () => {
    it("allows searching and selecting filtered option", () => {
      page.enterSearchTerm(0, "test");
      page.openMultiSelect("Genre and form");
      page.searchMultiSelectOption("krimi");
      page.verifyMultiSelectOptionsContain("krimi");
      page.selectMultiSelectOption("krimi");
      page.closePopover();
      page.clickSearch();

      page.components.Summary((summary) => {
        summary.verifyItemContains(0, "test");
        summary.verifyOperatorIs(0, "AND");
        summary.verifyItemContains(1, "krimi");
      });
    });
  });

  describe("Age Range Filter", () => {
    it("allows selecting age preset", () => {
      page.enterSearchTerm(0, "børn");
      page.openRangeSelect("Age");
      page.selectRangePreset("For 1-6-årige");
      page.verifyRangeBadgeContains("Age", "1-6-årige");
      page.clickSearch();

      page.components.Summary((summary) => {
        summary.verifyItemContains(0, "børn");
        summary.verifyItemContains(1, "1-6");
      });
    });

    it("allows entering custom age range", () => {
      page.enterSearchTerm(0, "unge");
      page.openRangeSelect("Age");
      page.enterRangeValues("10", "15");
      page.closePopover();
      page.verifyRangeBadgeContains("Age", "10-15-årige");
      page.clickSearch();

      page.components.Summary((summary) => {
        summary.verifyItemContains(0, "unge");
        summary.verifyItemContains(1, "10-15");
      });
    });

    it("allows selecting adult preset (18+)", () => {
      page.enterSearchTerm(0, "voksen");
      page.openRangeSelect("Age");
      page.selectRangePreset("For 18+");
      page.verifyRangeBadgeContains("Age", "18+ årige");
    });

    it("can reset age selection", () => {
      page.openRangeSelect("Age");
      page.verifyRangeInputValues("", "");
      page.selectRangePreset("For 1-6-årige");
      page.verifyRangeInputValues("1", "6");
      page.verifyRangeBadgeContains("Age", "1-6-årige");
      page.resetRange();
      page.verifyRangeInputValues("", "");
      page.closePopover();
      page.verifyRangeShowsAll("Age");
    });
  });

  describe("Publication Year Filter", () => {
    it("allows selecting year preset", () => {
      page.enterSearchTerm(0, "nyheder");
      page.openRangeSelect("Year");
      page.selectRangePreset("Seneste 2 år");
      page.verifyRangeInputValues("2024", "2025");
      page.verifyRangeBadgeContains("Year", "2024-2025");
      page.clickSearch();

      page.components.Summary((summary) => {
        summary.verifyItemContains(0, "nyheder");
      });
    });

    it("allows entering custom year range", () => {
      page.enterSearchTerm(0, "historie");
      page.openRangeSelect("Year");
      page.enterRangeValues("2000", "2020");
      page.closePopover();
      page.verifyRangeBadgeContains("Year", "2000-2020");
      page.clickSearch();

      page.components.Summary((summary) => {
        summary.verifyItemContains(1, "2000-2020");
      });
    });

    it("allows entering open-ended year range (from only)", () => {
      page.enterSearchTerm(0, "moderne");
      page.openRangeSelect("Year");
      page.enterRangeFrom("2015");
      page.closePopover();
      page.verifyRangeBadgeContains("Year", "2015+");
      page.clickSearch();

      page.components.Summary((summary) => {
        summary.verifyItemContains(1, "2015");
      });
    });

    it("can reset year selection", () => {
      page.openRangeSelect("Year");
      page.verifyRangeInputValues("", "");
      page.selectRangePreset("Seneste 2 år");
      page.verifyRangeInputValues("2024", "2025");
      page.verifyRangeBadgeContains("Year", "2024-2025");
      page.resetRange();
      page.verifyRangeInputValues("", "");
      page.closePopover();
      page.verifyRangeShowsAll("Year");
    });
  });

  describe("Reset Functionality", () => {
    it("shows reset button only when filters are applied", () => {
      page.verifyResetButtonNotVisible();
      page.enterSearchTerm(0, "test");
      page.verifyResetButtonVisible();
    });

    it("clears all filters when reset is clicked", () => {
      page.enterSearchTerm(0, "test");
      page.openMultiSelect("Material type");
      page.selectMultiSelectOption("Bøger");
      page.closePopover();
      page.clickReset();
      page.verifySearchTermValue(0, "");
      page.verifyMultiSelectShowsAll("Material type");
      page.verifyResetButtonNotVisible();
    });
  });

  describe("Edit Search Flow", () => {
    it("allows editing search from results view", () => {
      page.enterSearchTerm(0, "original");
      page.clickSearch();
      page.verifyResultsAreVisible();

      page.components.Summary((summary) => {
        summary.clickEdit();
      });

      page.verifyFormIsVisible();
      page.verifySearchTermValue(0, "original");
    });
  });

  describe("Combined Filters", () => {
    it("combines search term with material type and year range", () => {
      page.enterSearchTerm(0, "danish fiction");
      page.openMultiSelect("Material type");
      page.selectMultiSelectOption("Bøger");
      page.closePopover();
      page.openRangeSelect("Year");
      page.enterRangeValues("2020", "2024");
      page.closePopover();
      page.clickSearch();

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
      page.enterSearchTerm(0, "harry");
      page.selectOperator(0, "NOT");
      page.enterSearchTerm(1, "potter");
      page.clickSearch();

      page.verifyUrlParamEquals("suggests", [
        { term: "term.default", query: "harry" },
        { term: "term.default", query: "potter", operator: "not" }
      ]);
    });

    it("adds pre-facets to URL after search", () => {
      page.enterSearchTerm(0, "test");
      page.openMultiSelect("Material type");
      page.selectMultiSelectOption("Bøger");
      page.closePopover();
      page.openRangeSelect("Year");
      page.enterRangeValues("2020", "2024");
      page.closePopover();
      page.clickSearch();

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
});

import { describe, expect, it } from "vitest";
import {
  buildSuggestTerms,
  buildFilterTerms,
  buildCQLQuery,
  hasValidQuery
} from "../../apps/advanced-search-v2/lib/query-builder";
import { SuggestState, FacetState } from "../../apps/advanced-search-v2/types";
import { ComplexSearchFacetsEnum } from "../../core/dbc-gateway/generated/graphql";

describe("buildSuggestTerms", () => {
  it("returns empty string for empty array", () => {
    expect(buildSuggestTerms([])).toBe("");
  });

  it("returns empty string when all queries are empty", () => {
    const suggests: SuggestState[] = [
      { term: "term.default", query: "" },
      { term: "term.title", query: "   " }
    ];
    expect(buildSuggestTerms(suggests)).toBe("");
  });

  it("builds single term correctly", () => {
    const suggests: SuggestState[] = [{ term: "term.default", query: "harry" }];
    expect(buildSuggestTerms(suggests)).toBe('(term.default="harry")');
  });

  it("builds multiple terms with default AND operator", () => {
    const suggests: SuggestState[] = [
      { term: "term.default", query: "harry" },
      { term: "term.default", query: "potter" }
    ];
    expect(buildSuggestTerms(suggests)).toBe(
      '(term.default="harry" AND term.default="potter")'
    );
  });

  it("builds terms with explicit AND operator", () => {
    const suggests: SuggestState[] = [
      { term: "term.default", query: "harry" },
      { term: "term.default", query: "potter", operator: "and" }
    ];
    expect(buildSuggestTerms(suggests)).toBe(
      '(term.default="harry" AND term.default="potter")'
    );
  });

  it("builds terms with OR operator", () => {
    const suggests: SuggestState[] = [
      { term: "term.default", query: "roman" },
      { term: "term.default", query: "novelle", operator: "or" }
    ];
    expect(buildSuggestTerms(suggests)).toBe(
      '(term.default="roman" OR term.default="novelle")'
    );
  });

  it("builds terms with NOT operator", () => {
    const suggests: SuggestState[] = [
      { term: "term.default", query: "harry" },
      { term: "term.default", query: "potter", operator: "not" }
    ];
    expect(buildSuggestTerms(suggests)).toBe(
      '(term.default="harry" NOT term.default="potter")'
    );
  });

  it("builds terms with mixed operators", () => {
    const suggests: SuggestState[] = [
      { term: "term.default", query: "fantasy" },
      { term: "term.title", query: "dragon", operator: "and" },
      { term: "term.creator", query: "tolkien", operator: "or" },
      { term: "term.default", query: "horror", operator: "not" }
    ];
    expect(buildSuggestTerms(suggests)).toBe(
      '(term.default="fantasy" AND term.title="dragon" OR term.creator="tolkien" NOT term.default="horror")'
    );
  });

  it("skips empty queries in mixed input", () => {
    const suggests: SuggestState[] = [
      { term: "term.default", query: "harry" },
      { term: "term.default", query: "" },
      { term: "term.default", query: "potter", operator: "and" }
    ];
    expect(buildSuggestTerms(suggests)).toBe(
      '(term.default="harry" AND term.default="potter")'
    );
  });

  it("escapes double quotes in query", () => {
    const suggests: SuggestState[] = [
      { term: "term.default", query: 'book "title"' }
    ];
    expect(buildSuggestTerms(suggests)).toBe(
      '(term.default="book \\"title\\"")'
    );
  });

  it("escapes multiple double quotes", () => {
    const suggests: SuggestState[] = [
      { term: "term.default", query: '"hello" "world"' }
    ];
    expect(buildSuggestTerms(suggests)).toBe(
      '(term.default="\\"hello\\" \\"world\\"")'
    );
  });

  it("handles different term types", () => {
    const suggests: SuggestState[] = [
      { term: "term.title", query: "harry potter" },
      { term: "term.creator", query: "rowling", operator: "and" }
    ];
    expect(buildSuggestTerms(suggests)).toBe(
      '(term.title="harry potter" AND term.creator="rowling")'
    );
  });
});

describe("buildFilterTerms", () => {
  it("returns empty array for empty input", () => {
    expect(buildFilterTerms([])).toEqual([]);
  });

  it("returns empty array when no values are selected", () => {
    const filters: FacetState[] = [
      { facetField: ComplexSearchFacetsEnum.Mainlanguage, selectedValues: [] }
    ];
    expect(buildFilterTerms(filters)).toEqual([]);
  });

  it("builds single facet filter correctly", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Mainlanguage,
        selectedValues: ["dansk"]
      }
    ];
    expect(buildFilterTerms(filters)).toEqual([
      '((phrase.mainlanguage="dansk"))'
    ]);
  });

  it("builds facet filter with multiple values using OR", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Mainlanguage,
        selectedValues: ["dansk", "engelsk"]
      }
    ];
    expect(buildFilterTerms(filters)).toEqual([
      '((phrase.mainlanguage="dansk" OR phrase.mainlanguage="engelsk"))'
    ]);
  });

  it("builds multiple facet filters", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Mainlanguage,
        selectedValues: ["dansk"]
      },
      {
        facetField: ComplexSearchFacetsEnum.Genreandform,
        selectedValues: ["krimi"]
      }
    ];
    const result = buildFilterTerms(filters);
    expect(result).toHaveLength(2);
    expect(result).toContain('((phrase.mainlanguage="dansk"))');
    expect(result).toContain('((phrase.genreandform="krimi"))');
  });

  it("builds publication year range with from and to", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Publicationyear,
        selectedValues: ["2020", "2024"]
      }
    ];
    expect(buildFilterTerms(filters)).toEqual([
      '((publicationyear within "2020 2024"))'
    ]);
  });

  it("builds publication year range with only from (open-ended)", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Publicationyear,
        selectedValues: ["2015"]
      }
    ];
    expect(buildFilterTerms(filters)).toEqual(["((publicationyear>=2015))"]);
  });

  it("builds publication year with same from and to (single year)", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Publicationyear,
        selectedValues: ["2020", "2020"]
      }
    ];
    expect(buildFilterTerms(filters)).toEqual(["((publicationyear=2020))"]);
  });

  it("builds ages range with from and to", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Ages,
        selectedValues: ["3", "6"]
      }
    ];
    expect(buildFilterTerms(filters)).toEqual(['((ages within "3 6"))']);
  });

  it("builds ages range with only from (open-ended)", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Ages,
        selectedValues: ["16"]
      }
    ];
    expect(buildFilterTerms(filters)).toEqual(["((ages>=16))"]);
  });

  it("builds ages range with same from and to (single age)", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Ages,
        selectedValues: ["10", "10"]
      }
    ];
    expect(buildFilterTerms(filters)).toEqual(["((ages=10))"]);
  });

  it("builds ages with text value using phrase matching (post-search facet)", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Ages,
        selectedValues: ["for 10 år"]
      }
    ];
    expect(buildFilterTerms(filters)).toEqual(['((phrase.ages="for 10 år"))']);
  });

  it("builds ages with multiple text values using OR (post-search facet)", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Ages,
        selectedValues: ["for 10 år", "for 12 år"]
      }
    ];
    expect(buildFilterTerms(filters)).toEqual([
      '((phrase.ages="for 10 år" OR phrase.ages="for 12 år"))'
    ]);
  });

  it("falls back to phrase matching for ages with mixed numeric/text values", () => {
    // Edge case: if somehow mixed values occur, use phrase matching to avoid invalid CQL
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Ages,
        selectedValues: ["10", "for 12 år"]
      }
    ];
    expect(buildFilterTerms(filters)).toEqual([
      '((phrase.ages="10" OR phrase.ages="for 12 år"))'
    ]);
  });

  it("builds generalaudience filter correctly", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Generalaudience,
        selectedValues: ["let at læse"]
      }
    ];
    expect(buildFilterTerms(filters)).toEqual([
      '((phrase.generalaudience="let at læse"))'
    ]);
  });

  it("builds generalaudience with multiple values", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Generalaudience,
        selectedValues: ["let at læse", "voksenmaterialer"]
      }
    ];
    expect(buildFilterTerms(filters)).toEqual([
      '((phrase.generalaudience="let at læse" OR phrase.generalaudience="voksenmaterialer"))'
    ]);
  });

  it("deduplicates identical filters", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Mainlanguage,
        selectedValues: ["dansk"]
      },
      {
        facetField: ComplexSearchFacetsEnum.Mainlanguage,
        selectedValues: ["dansk"]
      }
    ];
    expect(buildFilterTerms(filters)).toEqual([
      '((phrase.mainlanguage="dansk"))'
    ]);
  });

  it("builds material type filter correctly", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Specificmaterialtype,
        selectedValues: ["bog", "e-bog"]
      }
    ];
    expect(buildFilterTerms(filters)).toEqual([
      '((phrase.specificmaterialtype="bog" OR phrase.specificmaterialtype="e-bog"))'
    ]);
  });
});

describe("buildCQLQuery", () => {
  it("returns wildcard when no inputs provided", () => {
    expect(buildCQLQuery([], [], [])).toBe("*");
  });

  it("returns wildcard when all inputs are empty", () => {
    const suggests: SuggestState[] = [{ term: "term.default", query: "" }];
    const facets: FacetState[] = [
      { facetField: ComplexSearchFacetsEnum.Mainlanguage, selectedValues: [] }
    ];
    expect(buildCQLQuery(suggests, facets, [])).toBe("*");
  });

  it("builds query with only search terms", () => {
    const suggests: SuggestState[] = [{ term: "term.default", query: "harry" }];
    expect(buildCQLQuery(suggests, [], [])).toBe('(term.default="harry")');
  });

  it("builds query with only pre-search facets", () => {
    const preSearchFacets: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Mainlanguage,
        selectedValues: ["dansk"]
      }
    ];
    expect(buildCQLQuery([], preSearchFacets, [])).toBe(
      '((phrase.mainlanguage="dansk"))'
    );
  });

  it("builds query with only facets", () => {
    const facets: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Genreandform,
        selectedValues: ["krimi"]
      }
    ];
    expect(buildCQLQuery([], [], facets)).toBe(
      '((phrase.genreandform="krimi"))'
    );
  });

  it("combines search terms and pre-search facets with AND", () => {
    const suggests: SuggestState[] = [{ term: "term.default", query: "harry" }];
    const preSearchFacets: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Mainlanguage,
        selectedValues: ["dansk"]
      }
    ];
    expect(buildCQLQuery(suggests, preSearchFacets, [])).toBe(
      '(term.default="harry") AND ((phrase.mainlanguage="dansk"))'
    );
  });

  it("combines search terms, pre-search facets and facets with AND", () => {
    const suggests: SuggestState[] = [{ term: "term.default", query: "harry" }];
    const preSearchFacets: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Mainlanguage,
        selectedValues: ["dansk"]
      }
    ];
    const facets: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Genreandform,
        selectedValues: ["krimi"]
      }
    ];
    expect(buildCQLQuery(suggests, preSearchFacets, facets)).toBe(
      '(term.default="harry") AND ((phrase.mainlanguage="dansk")) AND ((phrase.genreandform="krimi"))'
    );
  });

  it("adds onlyExtraTitles filter when enabled", () => {
    const suggests: SuggestState[] = [{ term: "term.default", query: "harry" }];
    expect(buildCQLQuery(suggests, [], [], true)).toBe(
      '(term.default="harry") AND term.canAlwaysBeLoaned="true"'
    );
  });

  it("builds complete query with all options", () => {
    const suggests: SuggestState[] = [
      { term: "term.default", query: "fantasy" }
    ];
    const preSearchFacets: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Publicationyear,
        selectedValues: ["2020", "2024"]
      }
    ];
    const facets: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Specificmaterialtype,
        selectedValues: ["bog"]
      }
    ];
    expect(buildCQLQuery(suggests, preSearchFacets, facets, true)).toBe(
      '(term.default="fantasy") AND ((publicationyear within "2020 2024")) AND ((phrase.specificmaterialtype="bog")) AND term.canAlwaysBeLoaned="true"'
    );
  });

  it("handles complex multi-term search with operators", () => {
    const suggests: SuggestState[] = [
      { term: "term.title", query: "harry potter" },
      { term: "term.creator", query: "rowling", operator: "and" },
      { term: "term.default", query: "børn", operator: "not" }
    ];
    const preSearchFacets: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Ages,
        selectedValues: ["6", "12"]
      }
    ];
    expect(buildCQLQuery(suggests, preSearchFacets, [])).toBe(
      '(term.title="harry potter" AND term.creator="rowling" NOT term.default="børn") AND ((ages within "6 12"))'
    );
  });
});

describe("hasValidQuery", () => {
  it("returns false for wildcard query", () => {
    expect(hasValidQuery("*")).toBe(false);
  });

  it("returns true for non-wildcard query", () => {
    expect(hasValidQuery('(term.default="harry")')).toBe(true);
  });

  it("returns true for query containing wildcard as part of string", () => {
    expect(hasValidQuery('(term.default="*test*")')).toBe(true);
  });

  it("returns true for complex query", () => {
    expect(
      hasValidQuery(
        '(term.default="harry") AND ((phrase.mainlanguage="dansk"))'
      )
    ).toBe(true);
  });

  it("returns true for filter-only query", () => {
    expect(hasValidQuery('((phrase.mainlanguage="dansk"))')).toBe(true);
  });
});

import { describe, expect, it } from "vitest";
import {
  buildFilterInputTerms,
  buildPreSearchFacetTerms,
  buildPostSearchFacetTerms,
  buildCQLQuery,
  isWildcardQuery
} from "../../apps/advanced-search-v2/lib/query-builder";
import { FilterState, FacetState } from "../../apps/advanced-search-v2/types";
import { ComplexSearchFacetsEnum } from "../../core/dbc-gateway/generated/graphql";

describe("buildFilterInputTerms", () => {
  it("returns empty string for empty array", () => {
    expect(buildFilterInputTerms([])).toBe("");
  });

  it("returns empty string when all queries are empty", () => {
    const inputs: FilterState[] = [
      { term: "term.default", query: "" },
      { term: "term.title", query: "   " }
    ];
    expect(buildFilterInputTerms(inputs)).toBe("");
  });

  it("builds single term correctly", () => {
    const inputs: FilterState[] = [{ term: "term.default", query: "harry" }];
    expect(buildFilterInputTerms(inputs)).toBe('(term.default="harry")');
  });

  it("builds multiple terms with AND operator (default or explicit)", () => {
    // Default (no operator specified)
    expect(
      buildFilterInputTerms([
        { term: "term.default", query: "harry" },
        { term: "term.default", query: "potter" }
      ])
    ).toBe('(term.default="harry" AND term.default="potter")');

    // Explicit operator: "and"
    expect(
      buildFilterInputTerms([
        { term: "term.default", query: "harry" },
        { term: "term.default", query: "potter", operator: "and" }
      ])
    ).toBe('(term.default="harry" AND term.default="potter")');
  });

  it("builds terms with OR operator", () => {
    const inputs: FilterState[] = [
      { term: "term.default", query: "roman" },
      { term: "term.default", query: "novelle", operator: "or" }
    ];
    expect(buildFilterInputTerms(inputs)).toBe(
      '(term.default="roman" OR term.default="novelle")'
    );
  });

  it("builds terms with NOT operator", () => {
    const inputs: FilterState[] = [
      { term: "term.default", query: "harry" },
      { term: "term.default", query: "potter", operator: "not" }
    ];
    expect(buildFilterInputTerms(inputs)).toBe(
      '(term.default="harry" NOT term.default="potter")'
    );
  });

  it("builds terms with mixed operators", () => {
    const inputs: FilterState[] = [
      { term: "term.default", query: "fantasy" },
      { term: "term.title", query: "dragon", operator: "and" },
      { term: "term.creator", query: "tolkien", operator: "or" },
      { term: "term.default", query: "horror", operator: "not" }
    ];
    expect(buildFilterInputTerms(inputs)).toBe(
      '(term.default="fantasy" AND term.title="dragon" OR term.creator="tolkien" NOT term.default="horror")'
    );
  });

  it("skips empty queries in mixed input", () => {
    const inputs: FilterState[] = [
      { term: "term.default", query: "harry" },
      { term: "term.default", query: "" },
      { term: "term.default", query: "potter", operator: "and" }
    ];
    expect(buildFilterInputTerms(inputs)).toBe(
      '(term.default="harry" AND term.default="potter")'
    );
  });

  it("handles empty first query correctly", () => {
    const inputs: FilterState[] = [
      { term: "term.default", query: "" },
      { term: "term.default", query: "potter", operator: "and" }
    ];
    expect(buildFilterInputTerms(inputs)).toBe('(term.default="potter")');
  });

  it("escapes double quotes in query", () => {
    const inputs: FilterState[] = [
      { term: "term.default", query: 'book "title"' }
    ];
    expect(buildFilterInputTerms(inputs)).toBe(
      '(term.default="book \\"title\\"")'
    );
  });

  it("escapes multiple double quotes", () => {
    const inputs: FilterState[] = [
      { term: "term.default", query: '"hello" "world"' }
    ];
    expect(buildFilterInputTerms(inputs)).toBe(
      '(term.default="\\"hello\\" \\"world\\"")'
    );
  });
});

describe("buildPreSearchFacetTerms", () => {
  it("returns empty array for empty input", () => {
    expect(buildPreSearchFacetTerms([])).toEqual([]);
  });

  it("builds single facet filter correctly", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Mainlanguage,
        selectedValues: ["dansk"]
      }
    ];
    expect(buildPreSearchFacetTerms(filters)).toEqual([
      '((phrase.mainlanguage="dansk"))'
    ]);
  });

  it("builds publication year range with from and to", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Publicationyear,
        selectedValues: ["2020", "2024"]
      }
    ];
    expect(buildPreSearchFacetTerms(filters)).toEqual([
      '((publicationyear within "2020 2024"))'
    ]);
  });

  it("builds publication year with open-ended range for single value", () => {
    expect(
      buildPreSearchFacetTerms([
        {
          facetField: ComplexSearchFacetsEnum.Publicationyear,
          selectedValues: ["2023"]
        }
      ])
    ).toEqual(["((publicationyear>=2023))"]);
  });

  it("builds publication year with exact match for same from/to", () => {
    expect(
      buildPreSearchFacetTerms([
        {
          facetField: ComplexSearchFacetsEnum.Publicationyear,
          selectedValues: ["2020", "2020"]
        }
      ])
    ).toEqual(["((publicationyear=2020))"]);
  });

  it("builds ages with open-ended range for single value", () => {
    expect(
      buildPreSearchFacetTerms([
        {
          facetField: ComplexSearchFacetsEnum.Ages,
          selectedValues: ["16"]
        }
      ])
    ).toEqual(["((ages>=16))"]);
  });

  it("builds ages range with from and to", () => {
    expect(
      buildPreSearchFacetTerms([
        {
          facetField: ComplexSearchFacetsEnum.Ages,
          selectedValues: ["3", "6"]
        }
      ])
    ).toEqual(['((ages within "3 6"))']);
  });
});

describe("buildPostSearchFacetTerms", () => {
  it("returns empty array for empty input", () => {
    expect(buildPostSearchFacetTerms([])).toEqual([]);
  });

  it("returns empty array when no values are selected", () => {
    const filters: FacetState[] = [
      { facetField: ComplexSearchFacetsEnum.Mainlanguage, selectedValues: [] }
    ];
    expect(buildPostSearchFacetTerms(filters)).toEqual([]);
  });

  it("builds single facet filter correctly", () => {
    const filters: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Mainlanguage,
        selectedValues: ["dansk"]
      }
    ];
    expect(buildPostSearchFacetTerms(filters)).toEqual([
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
    expect(buildPostSearchFacetTerms(filters)).toEqual([
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
    const result = buildPostSearchFacetTerms(filters);
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
    expect(buildPostSearchFacetTerms(filters)).toEqual([
      '((publicationyear within "2020 2024"))'
    ]);
  });

  it("builds publication year with exact match for single value or same from/to", () => {
    // Single value - exact match (not open-ended)
    expect(
      buildPostSearchFacetTerms([
        {
          facetField: ComplexSearchFacetsEnum.Publicationyear,
          selectedValues: ["2023"]
        }
      ])
    ).toEqual(["((publicationyear=2023))"]);

    // Same from and to
    expect(
      buildPostSearchFacetTerms([
        {
          facetField: ComplexSearchFacetsEnum.Publicationyear,
          selectedValues: ["2020", "2020"]
        }
      ])
    ).toEqual(["((publicationyear=2020))"]);
  });

  it("builds ages range with from and to", () => {
    expect(
      buildPostSearchFacetTerms([
        {
          facetField: ComplexSearchFacetsEnum.Ages,
          selectedValues: ["3", "6"]
        }
      ])
    ).toEqual(['((ages within "3 6"))']);
  });

  it("builds ages with exact match for single value or same from/to", () => {
    // Single value - exact match (not open-ended)
    expect(
      buildPostSearchFacetTerms([
        {
          facetField: ComplexSearchFacetsEnum.Ages,
          selectedValues: ["16"]
        }
      ])
    ).toEqual(["((ages=16))"]);

    // Same from and to
    expect(
      buildPostSearchFacetTerms([
        {
          facetField: ComplexSearchFacetsEnum.Ages,
          selectedValues: ["10", "10"]
        }
      ])
    ).toEqual(["((ages=10))"]);
  });

  it("builds ages with text value using phrase matching", () => {
    expect(
      buildPostSearchFacetTerms([
        {
          facetField: ComplexSearchFacetsEnum.Ages,
          selectedValues: ["for 10 år"]
        }
      ])
    ).toEqual(['((phrase.ages="for 10 år"))']);
  });

  it("builds ages with multiple text values using OR", () => {
    expect(
      buildPostSearchFacetTerms([
        {
          facetField: ComplexSearchFacetsEnum.Ages,
          selectedValues: ["for 10 år", "for 12 år"]
        }
      ])
    ).toEqual(['((phrase.ages="for 10 år" OR phrase.ages="for 12 år"))']);
  });

  it("uses phrase matching for ages when values contain text", () => {
    expect(
      buildPostSearchFacetTerms([
        {
          facetField: ComplexSearchFacetsEnum.Ages,
          selectedValues: ["10", "for 12 år"]
        }
      ])
    ).toEqual(['((phrase.ages="10" OR phrase.ages="for 12 år"))']);
  });

  it("deduplicates identical filters", () => {
    expect(
      buildPostSearchFacetTerms([
        {
          facetField: ComplexSearchFacetsEnum.Mainlanguage,
          selectedValues: ["dansk"]
        },
        {
          facetField: ComplexSearchFacetsEnum.Mainlanguage,
          selectedValues: ["dansk"]
        }
      ])
    ).toEqual(['((phrase.mainlanguage="dansk"))']);
  });
});

describe("buildCQLQuery", () => {
  it("returns wildcard when no inputs provided", () => {
    expect(buildCQLQuery([], [], [])).toBe("*");
  });

  it("returns wildcard when all inputs are empty", () => {
    const filters: FilterState[] = [{ term: "term.default", query: "" }];
    const facets: FacetState[] = [
      { facetField: ComplexSearchFacetsEnum.Mainlanguage, selectedValues: [] }
    ];
    expect(buildCQLQuery(filters, facets, [])).toBe("*");
  });

  it("builds query with only search terms", () => {
    const filters: FilterState[] = [{ term: "term.default", query: "harry" }];
    expect(buildCQLQuery(filters, [], [])).toBe('(term.default="harry")');
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
    const filters: FilterState[] = [{ term: "term.default", query: "harry" }];
    const preSearchFacets: FacetState[] = [
      {
        facetField: ComplexSearchFacetsEnum.Mainlanguage,
        selectedValues: ["dansk"]
      }
    ];
    expect(buildCQLQuery(filters, preSearchFacets, [])).toBe(
      '(term.default="harry") AND ((phrase.mainlanguage="dansk"))'
    );
  });

  it("combines search terms, pre-search facets and facets with AND", () => {
    const filters: FilterState[] = [{ term: "term.default", query: "harry" }];
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
    expect(buildCQLQuery(filters, preSearchFacets, facets)).toBe(
      '(term.default="harry") AND ((phrase.mainlanguage="dansk")) AND ((phrase.genreandform="krimi"))'
    );
  });

  it("adds onlyExtraTitles filter when enabled", () => {
    const filters: FilterState[] = [{ term: "term.default", query: "harry" }];
    expect(buildCQLQuery(filters, [], [], true)).toBe(
      '(term.default="harry") AND term.canAlwaysBeLoaned="true"'
    );
  });

  it("builds complete query with all options", () => {
    const filters: FilterState[] = [{ term: "term.default", query: "fantasy" }];
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
    expect(buildCQLQuery(filters, preSearchFacets, facets, true)).toBe(
      '(term.default="fantasy") AND ((publicationyear within "2020 2024")) AND ((phrase.specificmaterialtype="bog")) AND term.canAlwaysBeLoaned="true"'
    );
  });

  it("handles complex multi-term search with operators", () => {
    const filters: FilterState[] = [
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
    expect(buildCQLQuery(filters, preSearchFacets, [])).toBe(
      '(term.title="harry potter" AND term.creator="rowling" NOT term.default="børn") AND ((ages within "6 12"))'
    );
  });
});

describe("isWildcardQuery", () => {
  it("returns true for wildcard query", () => {
    expect(isWildcardQuery("*")).toBe(true);
  });

  it("returns false for non-wildcard query", () => {
    expect(isWildcardQuery('(term.default="harry")')).toBe(false);
  });

  it("returns false for query containing wildcard as part of string", () => {
    expect(isWildcardQuery('(term.default="*test*")')).toBe(false);
  });

  it("returns false for complex query", () => {
    expect(
      isWildcardQuery(
        '(term.default="harry") AND ((phrase.mainlanguage="dansk"))'
      )
    ).toBe(false);
  });

  it("returns false for filter-only query", () => {
    expect(isWildcardQuery('((phrase.mainlanguage="dansk"))')).toBe(false);
  });
});

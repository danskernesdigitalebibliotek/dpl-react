import { SuggestState, MultiSelectState, FacetState } from "../types";
import { COMPLEX_FACET_TO_CQL_FIELD } from "./field-mappings";

// Builds search term part of CQL query with operators (AND, OR, NOT)
// Returns wrapped in parentheses or empty string if no valid terms
// e.g. [{ term: "term.default", query: "harry" }] => '(term.default="harry")'
export const buildSuggestTerms = (suggests: SuggestState[]): string => {
  const suggestTerms: string[] = [];

  suggests.forEach((suggest, i) => {
    if (!suggest.query.trim()) return; // Skip empty queries

    const term = `${suggest.term}="${suggest.query}"`; // e.g., term.default="harry"

    if (i === 0) {
      // First term has no operator prefix
      suggestTerms.push(term);
    } else {
      // Use this suggest's operator before the term
      const operator = (suggest.operator || "and").toUpperCase();
      suggestTerms.push(`${operator} ${term}`);
    }
  });

  return suggestTerms.length > 0 ? `(${suggestTerms.join(" ")})` : "";
};

// Builds filter terms from facets and multi-selects
// Maps GraphQL enum to CQL field names and wraps in phrase matching syntax
// e.g. [{ facetField: ComplexSearchFacetsEnum.Mainlanguage, selectedValues: ["dansk"] }]
//   => ['((phrase.mainlanguage="dansk"))']
export const buildFilterTerms = (
  filters: (MultiSelectState | FacetState)[]
): string[] => {
  const filterTerms: string[] = [];

  filters.forEach((item) => {
    // Map GraphQL enum to CQL field name
    const field =
      COMPLEX_FACET_TO_CQL_FIELD[
        item.facetField as keyof typeof COMPLEX_FACET_TO_CQL_FIELD
      ];

    if (field) {
      // Add each selected value as a filter with extra parentheses for phrase matching
      item.selectedValues.forEach((value) => {
        filterTerms.push(`((${field}="${value}"))`);
      });
    }
  });

  return filterTerms;
};

// Builds complete CQL query from search terms and filters
// Returns "*" wildcard if no query is provided
// e.g. suggests=[{term:"term.default",query:"harry"}], selects=[{facetField: ComplexSearchFacetsEnum.Mainlanguage, selectedValues:["dansk"]}], facets=[]
//   => '(term.default="harry") AND ((phrase.mainlanguage="dansk"))'
export const buildCQLQuery = (
  suggests: SuggestState[],
  selects: MultiSelectState[],
  facets: FacetState[]
): string => {
  const parts: string[] = [];

  // Add search terms
  const suggestPart = buildSuggestTerms(suggests);
  if (suggestPart) {
    parts.push(suggestPart);
  }

  // Add filter terms
  const filterParts = buildFilterTerms([...selects, ...facets]);
  parts.push(...filterParts);

  // Join all parts with AND, or return wildcard if no query
  return parts.length > 0 ? parts.join(" AND ") : "*";
};

// Checks if the query has actual search terms (not just wildcard)
// e.g. hasValidQuery("*") => false; hasValidQuery('(term.default="harry")') => true
export const hasValidQuery = (cql: string): boolean => {
  return cql !== "*";
};

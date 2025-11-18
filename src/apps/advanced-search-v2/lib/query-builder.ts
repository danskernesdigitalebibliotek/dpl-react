import { SuggestState, FacetState } from "../types";
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

// Builds filter terms from pre-search facets and facets
// Maps GraphQL enum to CQL field names and wraps in phrase matching syntax
// e.g. [{ facetField: ComplexSearchFacetsEnum.Mainlanguage, selectedValues: ["dansk"] }]
//   => ['((phrase.mainlanguage="dansk"))']
export const buildFilterTerms = (filters: FacetState[]): string[] => {
  const filterTermsSet = new Set<string>();

  filters.forEach((item) => {
    // Map GraphQL enum to CQL field name
    const field =
      COMPLEX_FACET_TO_CQL_FIELD[
        item.facetField as keyof typeof COMPLEX_FACET_TO_CQL_FIELD
      ];

    if (field) {
      // Add each selected value as a filter with extra parentheses for phrase matching
      item.selectedValues.forEach((value) => {
        filterTermsSet.add(`((${field}="${value}"))`);
      });
    }
  });

  return Array.from(filterTermsSet);
};

// Builds complete CQL query from search terms, pre-search facets and facets
// Returns "*" wildcard if no query is provided
// e.g. suggests=[{term:"term.default",query:"harry"}], preSearchFacets=[{facetField: ComplexSearchFacetsEnum.Mainlanguage, selectedValues:["dansk"]}]
//   => '(term.default="harry") AND ((phrase.mainlanguage="dansk"))'
export const buildCQLQuery = (
  suggests: SuggestState[],
  preSearchFacets: FacetState[],
  facets: FacetState[],
  onShelf?: boolean,
  onlyExtraTitles?: boolean
): string => {
  const parts: string[] = [];

  // Add search terms
  const suggestPart = buildSuggestTerms(suggests);
  if (suggestPart) {
    parts.push(suggestPart);
  }

  // Add pre-search facet filter terms
  const preSearchFacetParts = buildFilterTerms(preSearchFacets);
  parts.push(...preSearchFacetParts);

  // Add facet filter terms
  const facetParts = buildFilterTerms(facets);
  parts.push(...facetParts);

  // Add toggle filters
  if (onShelf) {
    // TODO: Verify correct CQL field name for holding status.
    // Current attempt uses term.holdingstatus but may need to be a GraphQL filter instead.
    // See: https://pro.dbcdigital.dk/dokumentation/soegemaskiner/complex-search/
    parts.push('term.holdingstatus="OnShelf"');
  }

  if (onlyExtraTitles) {
    parts.push('term.canAlwaysBeLoaned="true"');
  }

  // Join all parts with AND, or return wildcard if no query
  return parts.length > 0 ? parts.join(" AND ") : "*";
};

// Checks if the query has actual search terms (not just wildcard)
// e.g. hasValidQuery("*") => false; hasValidQuery('(term.default="harry")') => true
export const hasValidQuery = (cql: string): boolean => {
  return cql !== "*";
};

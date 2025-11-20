import { SuggestState, FacetState } from "../types";
import { COMPLEX_FACET_TO_CQL_FIELD } from "./field-mappings";
import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";

// Builds search term part of CQL query with operators (AND, OR, NOT)
// Returns wrapped in parentheses or empty string if no valid terms
// e.g. [{ term: "term.default", query: "harry" }] => '(term.default="harry")'
export const buildSuggestTerms = (suggests: SuggestState[]): string => {
  const suggestTerms: string[] = [];

  suggests.forEach((suggest, i) => {
    if (!suggest.query.trim()) return; // Skip empty queries

    const escapedQuery = suggest.query.replace(/"/g, '\\"');
    const term = `${suggest.term}="${escapedQuery}"`; // e.g., term.default="harry"

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
// Ages are handled specially:
// e.g. [{ facetField: ComplexSearchFacetsEnum.Ages, selectedValues: ["3", "6"] }]
//   => ['((ages within "3 6"))']
// e.g. [{ facetField: ComplexSearchFacetsEnum.Ages, selectedValues: ["18"] }]
//   => ['((ages>"18"))']
export const buildFilterTerms = (filters: FacetState[]): string[] => {
  const filterTermsSet = new Set<string>();

  filters.forEach((item) => {
    // Ages: use "within" for range, ">" for open-ended
    if (
      item.facetField === ComplexSearchFacetsEnum.Ages &&
      item.selectedValues[0]
    ) {
      const [from, to] = item.selectedValues;
      const query = to ? `ages within "${from} ${to}"` : `ages>"${from}"`;
      filterTermsSet.add(`((${query}))`);
      return;
    }

    // Other facets: use phrase matching
    const field =
      COMPLEX_FACET_TO_CQL_FIELD[
        item.facetField as keyof typeof COMPLEX_FACET_TO_CQL_FIELD
      ];
    if (field) {
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

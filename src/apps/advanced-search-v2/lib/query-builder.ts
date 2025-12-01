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

// Check if a value is a pure integer (for range queries)
const isNumericValue = (value: string): boolean => /^\d+$/.test(value);

// Build a CQL range query for numeric values
// e.g. buildRangeQuery("ages", "3", "6") => '((ages within "3 6"))'
// e.g. buildRangeQuery("ages", "16", undefined) => '((ages>=16))'
const buildRangeQuery = (
  field: string,
  from: string,
  to: string | undefined
): string => {
  if (!to) return `((${field}>=${from}))`;
  if (from === to) return `((${field}=${from}))`;
  return `((${field} within "${from} ${to}"))`;
};

// Fields that can use numeric range queries (when all values are numeric)
const RANGE_QUERY_FIELDS: Partial<Record<ComplexSearchFacetsEnum, string>> = {
  [ComplexSearchFacetsEnum.Publicationyear]: "publicationyear",
  [ComplexSearchFacetsEnum.Ages]: "ages" // Used for numeric ranges; text values use phrase.ages
};

// Builds filter terms from pre-search facets and facets
// For range queries (numeric ages, publication years):
// e.g. [{ facetField: ComplexSearchFacetsEnum.Ages, selectedValues: ["3", "6"] }]
//   => ['((ages within "3 6"))']
// For phrase matching (text values):
// e.g. [{ facetField: ComplexSearchFacetsEnum.Mainlanguage, selectedValues: ["dansk"] }]
//   => ['((phrase.mainlanguage="dansk"))']
export const buildFilterTerms = (filters: FacetState[]): string[] => {
  const filterTermsSet = new Set<string>();

  filters.forEach((item) => {
    const { facetField, selectedValues } = item;
    const [from, to] = selectedValues;

    if (!from) return;

    // Check if this field should use range queries
    // For Ages: only use range query if ALL values are numeric (to handle mixed values safely)
    const rangeField = RANGE_QUERY_FIELDS[facetField];
    const allValuesNumeric = selectedValues.every(
      (v) => !v || isNumericValue(v)
    );
    const isAgesWithNumericValues =
      facetField === ComplexSearchFacetsEnum.Ages && allValuesNumeric;
    const useRangeQuery =
      facetField === ComplexSearchFacetsEnum.Publicationyear ||
      isAgesWithNumericValues;

    if (useRangeQuery && rangeField) {
      filterTermsSet.add(buildRangeQuery(rangeField, from, to));
      return;
    }

    // Use phrase matching for all other facets
    const phraseField =
      COMPLEX_FACET_TO_CQL_FIELD[
        facetField as keyof typeof COMPLEX_FACET_TO_CQL_FIELD
      ];

    if (phraseField && selectedValues.length > 0) {
      const orTerms = selectedValues
        .map((value) => `${phraseField}="${value}"`)
        .join(" OR ");
      filterTermsSet.add(`((${orTerms}))`);
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

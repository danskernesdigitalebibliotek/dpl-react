import { FilterState, FacetState } from "../types";
import { COMPLEX_FACET_TO_CQL_FIELD } from "./field-mappings";
import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";

// Escape double quotes in search queries
const escapeQuotes = (value: string): string => value.replace(/"/g, '\\"');

// Check if a value is a pure integer (for range queries)
// ["16"] → true (one numeric)
// ["16", ""] → true (numeric + empty)
// ["3", "6"] → true (both numeric)
// ["for 10 år"] → false (text)
// ["10", "for 12 år"] → false (mixed)
const isNumericValue = (value: string): boolean => /^\d+$/.test(value);

// Builds search term part of CQL query with operators (AND, OR, NOT)
// Returns wrapped in parentheses or empty string if no valid terms
// e.g. [{ term: "term.default", query: "harry" }] => '(term.default="harry")'
export const buildFilterInputTerms = (inputs: FilterState[]): string => {
  const inputTerms: string[] = [];

  inputs.forEach((input) => {
    if (!input.query.trim()) return; // Skip empty queries

    const term = `${input.term}="${escapeQuotes(input.query)}"`; // e.g., term.default="harry"

    if (inputTerms.length === 0) {
      // First valid term has no operator prefix
      inputTerms.push(term);
    } else {
      // Use this input's operator before the term
      const operator = (input.operator || "and").toUpperCase();
      inputTerms.push(`${operator} ${term}`);
    }
  });

  return inputTerms.length > 0 ? `(${inputTerms.join(" ")})` : "";
};

// Build exact match query: e.g. '((publicationyear=2023))'
const buildExactMatchQuery = (field: string, value: string): string =>
  `((${field}=${value}))`;

// Build open-ended range query: e.g. '((ages>=16))'
const buildOpenEndedRangeQuery = (field: string, from: string): string =>
  `((${field}>=${from}))`;

// Build closed range query: e.g. '((ages within "3 6"))'
const buildClosedRangeQuery = (
  field: string,
  from: string,
  to: string
): string => `((${field} within "${from} ${to}"))`;

// Builds phrase match query for non-range facets
const buildPhraseQuery = (field: string, values: string[]): string => {
  const orTerms = values.map((value) => `${field}="${value}"`).join(" OR ");
  return `((${orTerms}))`;
};

// Get the CQL phrase field for a facet, or null if not mapped
const getPhraseField = (facetField: ComplexSearchFacetsEnum): string | null =>
  COMPLEX_FACET_TO_CQL_FIELD[facetField] ?? null;

// Returns CQL field name for range queries, or null if not range-queryable
// Ages field only supports range queries when all values are numeric:
// ["16"] or ["3", "6"] → range query; ["for 10 år"] → phrase query
const getRangeField = (
  facetField: ComplexSearchFacetsEnum,
  values: string[]
): string | null => {
  if (facetField === ComplexSearchFacetsEnum.Publicationyear) {
    return "publicationyear";
  }

  const allValuesNumeric = values.every((v) => !v || isNumericValue(v));
  if (facetField === ComplexSearchFacetsEnum.Ages && allValuesNumeric) {
    return "ages";
  }

  return null;
};

// Shared logic for building facet filter terms
// useOpenEndedRange: true for pre-search (form), false for post-search (results)
const buildFacetTerms = (
  filters: FacetState[],
  useOpenEndedRange: boolean
): string[] => {
  const filterTermsSet = new Set<string>();

  filters.forEach(({ facetField, selectedValues }) => {
    const [from, to] = selectedValues;
    if (!from) return;

    const rangeField = getRangeField(facetField, selectedValues);
    if (rangeField) {
      if (!to) {
        filterTermsSet.add(
          useOpenEndedRange
            ? buildOpenEndedRangeQuery(rangeField, from)
            : buildExactMatchQuery(rangeField, from)
        );
      } else if (from === to) {
        filterTermsSet.add(buildExactMatchQuery(rangeField, from));
      } else {
        filterTermsSet.add(buildClosedRangeQuery(rangeField, from, to));
      }
      return;
    }

    const phraseField = getPhraseField(facetField);
    if (phraseField && selectedValues.length > 0) {
      filterTermsSet.add(buildPhraseQuery(phraseField, selectedValues));
    }
  });

  return Array.from(filterTermsSet);
};

// Pre-search facets (from advanced search form)
// Supports open-ended ranges: ["16"] => '((ages>=16))'
export const buildPreSearchFacetTerms = (filters: FacetState[]): string[] =>
  buildFacetTerms(filters, true);

// Post-search facets (from search results)
// Single values are exact match: ["2023"] => '((publicationyear=2023))'
export const buildPostSearchFacetTerms = (filters: FacetState[]): string[] =>
  buildFacetTerms(filters, false);

// Builds complete CQL query
// Returns "*" wildcard if no query is provided
// e.g. filters=[{term:"term.default",query:"harry"}], preSearchFacets=[{facetField: ComplexSearchFacetsEnum.Mainlanguage, selectedValues:["dansk"]}]
//   => '(term.default="harry") AND ((phrase.mainlanguage="dansk"))'
export const buildCQLQuery = (
  filters: FilterState[],
  preSearchFacets: FacetState[],
  facets: FacetState[],
  onlyExtraTitles?: boolean
): string => {
  const parts: string[] = [];

  // Add search terms
  const filterPart = buildFilterInputTerms(filters);
  if (filterPart) {
    parts.push(filterPart);
  }

  // Add pre-search facet terms (supports open-ended ranges)
  const preSearchFacetParts = buildPreSearchFacetTerms(preSearchFacets);
  parts.push(...preSearchFacetParts);

  // Add post-search facet terms (exact match only)
  const facetParts = buildPostSearchFacetTerms(facets);
  parts.push(...facetParts);

  // Add toggle filters
  if (onlyExtraTitles) {
    parts.push('term.canAlwaysBeLoaned="true"');
  }

  // Join all parts with AND, or return wildcard if no query
  return parts.length > 0 ? parts.join(" AND ") : "*";
};

// Checks if the query is just a wildcard without specific search terms
// e.g. isWildcardQuery("*") => true; isWildcardQuery('(term.default="harry")') => false
export const isWildcardQuery = (cql: string): boolean => {
  return cql === "*";
};

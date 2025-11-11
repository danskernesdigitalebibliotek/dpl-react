import { SuggestState, MultiSelectState, FacetState } from "../types";
import { FACET_TO_CQL_FIELD } from "./constants";

/**
 * Build CQL query from search inputs and facets
 * Example: (term.default="harry" AND term.default="potter" NOT term.default="film") AND term.year="2020"
 */
export const buildCQLQuery = (
  suggests: SuggestState[],
  selects: MultiSelectState[],
  facets: FacetState[]
): string => {
  const parts: string[] = [];

  // Build suggest terms with operators (e.g., "harry AND potter NOT film")
  // Each suggest's operator comes BEFORE that term (first term has no operator)
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

  // Wrap multiple suggest terms in parentheses for proper precedence
  if (suggestTerms.length > 1) {
    parts.push(`(${suggestTerms.join(" ")})`);
  } else if (suggestTerms.length === 1) {
    parts.push(suggestTerms[0]);
  }

  // Add filter terms from selects and facets (e.g., term.year="2020")
  [...selects, ...facets].forEach((item) => {
    // Map GraphQL enum to CQL field name
    const field =
      FACET_TO_CQL_FIELD[item.facetField as keyof typeof FACET_TO_CQL_FIELD];
    if (field) {
      // Add each selected value as a filter
      item.selectedValues.forEach((value) => {
        parts.push(`${field}="${value}"`);
      });
    }
  });

  // Join all parts with AND, or return wildcard if no query
  return parts.length > 0 ? parts.join(" AND ") : "*";
};

/**
 * Build simple search query for facets (without CQL syntax)
 * Used to fetch facet options based on current search terms
 * Example: "harry potter 2020" (no operators, no field names)
 */
export const buildFacetQuery = (
  suggests: SuggestState[],
  selects: MultiSelectState[]
): string => {
  const parts: string[] = [];

  // Add suggest query values (plain text, no operators)
  suggests.forEach((suggest) => {
    if (suggest.query.trim()) {
      parts.push(suggest.query);
    }
  });

  // Add selected filter values
  selects.forEach((select) => {
    select.selectedValues.forEach((value) => {
      parts.push(value);
    });
  });

  // Join with spaces, or return wildcard if empty
  return parts.length > 0 ? parts.join(" ") : "*";
};

/**
 * Check if the query has actual search terms (not just wildcard)
 */
export const hasValidQuery = (cql: string): boolean => {
  return cql !== "*";
};

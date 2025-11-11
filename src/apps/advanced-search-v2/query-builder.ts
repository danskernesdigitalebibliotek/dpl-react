import { SuggestState, MultiSelectState, FacetState } from "./types";
import { FACET_TO_CQL_FIELD } from "./constants";

/**
 * Build CQL query from search inputs and facets
 */
export const buildCQLQuery = (
  suggests: SuggestState[],
  selects: MultiSelectState[],
  facets: FacetState[]
): string => {
  const parts: string[] = [];

  // Add suggest queries
  suggests.forEach((suggest) => {
    if (suggest.query.trim()) {
      parts.push(`${suggest.term}="${suggest.query}"`);
    }
  });

  // Add select search filters
  selects.forEach((select) => {
    select.selectedValues.forEach((value) => {
      parts.push(`${select.term}="${value}"`);
    });
  });

  // Add facet filters
  facets.forEach((facet) => {
    const cqlField = FACET_TO_CQL_FIELD[facet.facetField];
    if (cqlField) {
      facet.selectedValues.forEach((value) => {
        parts.push(`${cqlField}="${value}"`);
      });
    }
  });

  return parts.length > 0 ? parts.join(" AND ") : "*";
};

/**
 * Build simple search query for facets (without CQL syntax)
 */
export const buildFacetQuery = (
  suggests: SuggestState[],
  selects: MultiSelectState[]
): string => {
  const parts: string[] = [];

  suggests.forEach((suggest) => {
    if (suggest.query.trim()) {
      parts.push(suggest.query);
    }
  });

  selects.forEach((select) => {
    select.selectedValues.forEach((value) => {
      parts.push(value);
    });
  });

  return parts.length > 0 ? parts.join(" ") : "*";
};

/**
 * Check if the query has actual search terms (not just wildcard)
 */
export const hasValidQuery = (cql: string): boolean => {
  return cql !== "*";
};

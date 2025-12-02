import { useState, useEffect } from "react";
import {
  useQueryStates,
  parseAsJson,
  parseAsBoolean,
  parseAsStringEnum
} from "nuqs";
import { FilterState, FacetState, SortOption } from "../types";
import { INITIAL_FILTER_STATE } from "../lib/initial-state";

import { isValidFilterState, isValidFacetState } from "../lib/validation";

export interface UseSearchFormStateReturn {
  filters: FilterState[];
  preSearchFacets: FacetState[];
  updateFilter: (index: number, updates: Partial<FilterState>) => void;
  updatePreSearchFacet: (preSearchFacet: FacetState) => void;
  addFilter: () => void;
  removeFilter: (index: number) => void;
  handleSearch: () => void;
  handleClearFilters: () => void;
  clearFacets: () => void;
}

/**
 * Hook to manage search form state with URL synchronization
 * Manages filters and preSearchFacets (form selects)
 * Facets (sidebar filters) are managed separately in AdvancedSearchFacets
 */
export const useSearchFormState = (): UseSearchFormStateReturn => {
  // URL state management with nuqs
  const [urlState, setUrlState] = useQueryStates({
    filters: parseAsJson((value) => {
      if (isValidFilterState(value)) return value;
      return INITIAL_FILTER_STATE;
    }).withDefault(INITIAL_FILTER_STATE),
    preSearchFacets: parseAsJson((value) => {
      if (isValidFacetState(value)) return value;
      return [];
    }).withDefault([]),
    facets: parseAsJson((value) => {
      if (isValidFacetState(value)) return value;
      return [];
    }).withDefault([]),
    onShelf: parseAsBoolean.withDefault(false),
    onlyExtraTitles: parseAsBoolean.withDefault(false),
    sort: parseAsStringEnum<SortOption>(Object.values(SortOption)).withDefault(
      SortOption.Relevance
    )
  });

  // Local state for temporary changes - initialize from URL
  const [filters, setFilters] = useState<FilterState[]>(urlState.filters);
  const [preSearchFacets, setPreSearchFacets] = useState<FacetState[]>(
    urlState.preSearchFacets
  );

  // Sync local state with URL state on mount/URL change
  useEffect(() => {
    setFilters(urlState.filters);
    setPreSearchFacets(urlState.preSearchFacets);
  }, [urlState.filters, urlState.preSearchFacets]);

  // Update a specific filter by index
  const updateFilter = (index: number, updates: Partial<FilterState>) => {
    setFilters((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, ...updates } : item))
    );
  };

  // Upsert pre-search facet: update if exists, add if new, remove if empty
  const updatePreSearchFacet = (preSearchFacet: FacetState) => {
    setPreSearchFacets((prev) => {
      const existingIndex = prev.findIndex(
        (f) => f.facetField === preSearchFacet.facetField
      );

      if (preSearchFacet.selectedValues.length === 0) {
        // Remove if empty
        return prev.filter((f) => f.facetField !== preSearchFacet.facetField);
      } else if (existingIndex >= 0) {
        // Update existing
        return prev.map((f, idx) =>
          idx === existingIndex ? preSearchFacet : f
        );
      } else {
        // Add new
        return [...prev, preSearchFacet];
      }
    });
  };

  // Add a new filter row
  const addFilter = () => {
    setFilters((prev) => [
      ...prev,
      { term: "term.default", query: "", operator: "and" }
    ]);
  };

  // Remove a filter row by index (minimum 1 row must remain)
  const removeFilter = (index: number) => {
    setFilters((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, idx) => idx !== index);
    });
  };

  // Sync local state to URL and trigger search
  const handleSearch = () => {
    // Filter out empty queries and remove operator from first row (never used)
    const nonEmptyFilters = filters
      .filter((filter) => filter.query.trim())
      .map((filter, index) => {
        // First filter doesn't need operator field
        if (index === 0) {
          return { term: filter.term, query: filter.query };
        }
        return filter;
      });

    // history: "push" creates a browser history entry so users can navigate
    // back to previous search results with the back button.
    setUrlState(
      {
        // Don't write empty filters to URL - let it use default on reload
        filters: nonEmptyFilters.length > 0 ? nonEmptyFilters : null,
        preSearchFacets: preSearchFacets.length > 0 ? preSearchFacets : null,
        facets: null // Keep existing facets when searching
      },
      { history: "push" }
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters(INITIAL_FILTER_STATE);
    setPreSearchFacets([]);
    setUrlState(
      {
        filters: INITIAL_FILTER_STATE,
        preSearchFacets: [],
        facets: []
      },
      { history: "push" }
    );
  };

  // Clear facets (sidebar filters), toggles, and sort when returning to edit
  const clearFacets = () => {
    setUrlState(
      {
        facets: [],
        onShelf: false,
        onlyExtraTitles: false,
        sort: null
      },
      { history: "push" }
    );
  };

  return {
    filters,
    preSearchFacets,
    updateFilter,
    updatePreSearchFacet,
    addFilter,
    removeFilter,
    handleSearch,
    handleClearFilters,
    clearFacets
  };
};

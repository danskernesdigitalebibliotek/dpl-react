import { useState, useEffect, useCallback } from "react";
import { useQueryStates, parseAsJson } from "nuqs";
import { SuggestState, FilterState } from "../types";
import {
  INITIAL_SUGGEST_STATE,
  INITIAL_FILTERS_STATE
} from "../lib/initial-state";

export interface UseSearchFormStateReturn {
  suggests: SuggestState[];
  filters: FilterState[];
  updateSuggest: (index: number, updates: Partial<SuggestState>) => void;
  updateFilter: (index: number, updates: Partial<FilterState>) => void;
  addSuggest: () => void;
  removeSuggest: (index: number) => void;
  handleSearch: () => void;
  handleClearFilters: () => void;
}

/**
 * Hook to manage search form state with URL synchronization
 */
export const useSearchFormState = (): UseSearchFormStateReturn => {
  // URL state management with nuqs
  const [urlState, setUrlState] = useQueryStates(
    {
      suggests: parseAsJson((value) => value as SuggestState[]).withDefault(
        INITIAL_SUGGEST_STATE
      ),
      filters: parseAsJson((value) => value as FilterState[]).withDefault(
        INITIAL_FILTERS_STATE
      )
    },
    { shallow: true }
  );

  // Local state for temporary changes - initialize from URL
  const [suggests, setSuggests] = useState<SuggestState[]>(urlState.suggests);
  const [filters, setFilters] = useState<FilterState[]>(urlState.filters);

  // Sync local state with URL state on mount/URL change
  useEffect(() => {
    setSuggests(urlState.suggests);
    setFilters(urlState.filters);
  }, [urlState.suggests, urlState.filters]);

  // Update a specific suggest by index
  const updateSuggest = useCallback(
    (index: number, updates: Partial<SuggestState>) => {
      setSuggests((prev) =>
        prev.map((item, idx) =>
          idx === index ? { ...item, ...updates } : item
        )
      );
    },
    []
  );

  // Update a specific filter by index
  const updateFilter = useCallback(
    (index: number, updates: Partial<FilterState>) => {
      setFilters((prev) =>
        prev.map((item, idx) =>
          idx === index ? { ...item, ...updates } : item
        )
      );
    },
    []
  );

  // Add a new suggest row
  const addSuggest = useCallback(() => {
    setSuggests((prev) => [
      ...prev,
      { term: "term.default", query: "", operator: "and" }
    ]);
  }, []);

  // Remove a suggest row by index (minimum 1 row must remain)
  const removeSuggest = useCallback((index: number) => {
    setSuggests((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, idx) => idx !== index);
    });
  }, []);

  // Sync local state to URL and trigger search
  const handleSearch = useCallback(() => {
    // Filter out empty queries and remove operator from first row (never used)
    const nonEmptySuggests = suggests
      .filter((suggest) => suggest.query.trim())
      .map((suggest, index) => {
        // First suggest doesn't need operator field
        if (index === 0) {
          return { term: suggest.term, query: suggest.query };
        }
        return suggest;
      });

    setUrlState({
      suggests: nonEmptySuggests,
      filters
    });
  }, [suggests, filters, setUrlState]);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setSuggests(INITIAL_SUGGEST_STATE);
    setFilters(INITIAL_FILTERS_STATE);
    setUrlState({
      suggests: INITIAL_SUGGEST_STATE,
      filters: INITIAL_FILTERS_STATE
    });
  }, [setUrlState]);

  return {
    suggests,
    filters,
    updateSuggest,
    updateFilter,
    addSuggest,
    removeSuggest,
    handleSearch,
    handleClearFilters
  };
};

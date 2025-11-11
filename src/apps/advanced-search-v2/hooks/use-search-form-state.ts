import { useState, useEffect, useCallback } from "react";
import { useQueryStates, parseAsJson } from "nuqs";
import { SuggestState, MultiSelectState, FacetState } from "../types";
import { SUGGESTS_CONFIG, SELECTS_CONFIG } from "../lib/config";

export interface UseSearchFormStateReturn {
  suggests: SuggestState[];
  selects: MultiSelectState[];
  updateSuggest: (index: number, updates: Partial<SuggestState>) => void;
  updateSelect: (index: number, updates: Partial<MultiSelectState>) => void;
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
        SUGGESTS_CONFIG
      ),
      selects: parseAsJson((value) => value as MultiSelectState[]).withDefault(
        SELECTS_CONFIG
      ),
      facets: parseAsJson((value) => value as FacetState[]).withDefault([])
    },
    { shallow: true }
  );

  // Local state for temporary changes - initialize from URL
  const [suggests, setSuggests] = useState<SuggestState[]>(urlState.suggests);
  const [selects, setSelects] = useState<MultiSelectState[]>(urlState.selects);

  // Sync local state with URL state on mount/URL change
  useEffect(() => {
    setSuggests(urlState.suggests);
    setSelects(urlState.selects);
  }, [urlState.suggests, urlState.selects]);

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

  // Update a specific select by index
  const updateSelect = useCallback(
    (index: number, updates: Partial<MultiSelectState>) => {
      setSelects((prev) =>
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
      selects
    });
  }, [suggests, selects, setUrlState]);
  // Clear all filters including facets
  const handleClearFilters = useCallback(() => {
    setSuggests(SUGGESTS_CONFIG);
    setSelects(SELECTS_CONFIG);
    setUrlState({
      suggests: SUGGESTS_CONFIG,
      selects: SELECTS_CONFIG,
      facets: []
    });
  }, [setUrlState]);

  return {
    suggests,
    selects,
    updateSuggest,
    updateSelect,
    addSuggest,
    removeSuggest,
    handleSearch,
    handleClearFilters
  };
};

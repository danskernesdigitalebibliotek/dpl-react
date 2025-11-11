import { useState, useEffect, useCallback } from "react";
import { useQueryStates, parseAsJson } from "nuqs";
import { SuggestState, MultiSelectState } from "../types";
import { DEFAULT_SUGGESTS, DEFAULT_SELECTS } from "../constants";

export interface UseSearchFormStateReturn {
  suggests: SuggestState[];
  selects: MultiSelectState[];
  updateSuggest: (index: number, updates: Partial<SuggestState>) => void;
  updateSelect: (index: number, updates: Partial<MultiSelectState>) => void;
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
        DEFAULT_SUGGESTS
      ),
      selects: parseAsJson((value) => value as MultiSelectState[]).withDefault(
        DEFAULT_SELECTS
      )
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

  // Sync local state to URL and trigger search
  const handleSearch = useCallback(() => {
    setUrlState({
      suggests,
      selects
    });
  }, [suggests, selects, setUrlState]);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setSuggests(DEFAULT_SUGGESTS);
    setSelects(DEFAULT_SELECTS);
    setUrlState({
      suggests: DEFAULT_SUGGESTS,
      selects: DEFAULT_SELECTS
    });
  }, [setUrlState]);

  return {
    suggests,
    selects,
    updateSuggest,
    updateSelect,
    handleSearch,
    handleClearFilters
  };
};

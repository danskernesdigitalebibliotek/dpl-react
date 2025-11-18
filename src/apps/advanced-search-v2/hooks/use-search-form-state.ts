import { useState, useEffect, useCallback } from "react";
import { useQueryStates, parseAsJson, parseAsBoolean } from "nuqs";
import { SuggestState, FacetState } from "../types";
import { INITIAL_SUGGEST_STATE } from "../lib/initial-state";

export interface UseSearchFormStateReturn {
  suggests: SuggestState[];
  preSearchFacets: FacetState[];
  updateSuggest: (index: number, updates: Partial<SuggestState>) => void;
  updatePreSearchFacet: (preSearchFacet: FacetState) => void;
  addSuggest: () => void;
  removeSuggest: (index: number) => void;
  handleSearch: () => void;
  handleClearFilters: () => void;
  clearFacets: () => void;
}

/**
 * Hook to manage search form state with URL synchronization
 * Manages suggests and preSearchFacets (form selects)
 * Facets (sidebar filters) are managed separately in AdvancedSearchFilters
 */
export const useSearchFormState = (): UseSearchFormStateReturn => {
  // URL state management with nuqs
  const [urlState, setUrlState] = useQueryStates(
    {
      suggests: parseAsJson((value) => value as SuggestState[]).withDefault(
        INITIAL_SUGGEST_STATE
      ),
      preSearchFacets: parseAsJson(
        (value) => value as FacetState[]
      ).withDefault([]),
      facets: parseAsJson((value) => value as FacetState[]).withDefault([]),
      onShelf: parseAsBoolean.withDefault(false),
      onlyExtraTitles: parseAsBoolean.withDefault(false)
    },
    { shallow: true }
  );

  // Local state for temporary changes - initialize from URL
  const [suggests, setSuggests] = useState<SuggestState[]>(urlState.suggests);
  const [preSearchFacets, setPreSearchFacets] = useState<FacetState[]>(
    urlState.preSearchFacets
  );

  // Sync local state with URL state on mount/URL change
  useEffect(() => {
    setSuggests(urlState.suggests);
    setPreSearchFacets(urlState.preSearchFacets);
  }, [urlState.suggests, urlState.preSearchFacets]);

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

  // Upsert pre-search facet: update if exists, add if new, remove if empty
  const updatePreSearchFacet = useCallback((preSearchFacet: FacetState) => {
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
  }, []);

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

    setUrlState(
      {
        // Don't write empty suggests to URL - let it use default on reload
        suggests: nonEmptySuggests.length > 0 ? nonEmptySuggests : null,
        preSearchFacets: preSearchFacets.length > 0 ? preSearchFacets : null,
        facets: null // Keep existing facets when searching
      },
      { history: "push" }
    );
  }, [suggests, preSearchFacets, setUrlState]);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setSuggests(INITIAL_SUGGEST_STATE);
    setPreSearchFacets([]);
    setUrlState({
      suggests: INITIAL_SUGGEST_STATE,
      preSearchFacets: [],
      facets: []
    });
  }, [setUrlState]);

  // Clear facets (sidebar filters) and toggles when returning to edit
  const clearFacets = useCallback(() => {
    setUrlState({ facets: [], onShelf: false, onlyExtraTitles: false });
  }, [setUrlState]);

  return {
    suggests,
    preSearchFacets,
    updateSuggest,
    updatePreSearchFacet,
    addSuggest,
    removeSuggest,
    handleSearch,
    handleClearFilters,
    clearFacets
  };
};

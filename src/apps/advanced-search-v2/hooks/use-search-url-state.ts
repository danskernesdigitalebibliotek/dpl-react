import { useQueryStates, parseAsJson, parseAsBoolean } from "nuqs";
import { SuggestState, FacetState } from "../types";
import { INITIAL_SUGGEST_STATE } from "../lib/initial-state";
import { isValidSuggestState, isValidFacetState } from "../lib/validation";

export interface UrlSearchState {
  suggests: SuggestState[];
  preSearchFacets: FacetState[];
  facets: FacetState[];
  onShelf: boolean;
  onlyExtraTitles: boolean;
}

/**
 * Hook to manage URL state synchronization
 * Handles parsing and validation of all URL-based search parameters
 */
export const useSearchUrlState = () => {
  const [urlState, setUrlState] = useQueryStates(
    {
      suggests: parseAsJson((value) => {
        if (isValidSuggestState(value)) return value;
        return INITIAL_SUGGEST_STATE;
      }).withDefault(INITIAL_SUGGEST_STATE),
      preSearchFacets: parseAsJson((value) => {
        if (isValidFacetState(value)) return value;
        return [];
      }).withDefault([]),
      facets: parseAsJson((value) => {
        if (isValidFacetState(value)) return value;
        return [];
      }).withDefault([]),
      onShelf: parseAsBoolean.withDefault(false),
      onlyExtraTitles: parseAsBoolean.withDefault(false)
    },
    { shallow: true }
  );

  const clearUrlState = () => {
    setUrlState(
      {
        suggests: INITIAL_SUGGEST_STATE,
        preSearchFacets: [],
        facets: [],
        onShelf: false,
        onlyExtraTitles: false
      },
      { shallow: false }
    );
  };

  return { urlState, setUrlState, clearUrlState };
};

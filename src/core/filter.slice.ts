import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FacetValue } from "./dbc-gateway/generated/graphql";

export type FilterItemTerm = Omit<FacetValue, "__typename">;
export type FacetOrigin = "facetLine" | "facetBrowser" | "facetUrl";
export type FilterItemTermWithOrigin = FilterItemTerm & {
  origin: FacetOrigin;
};

export type Filter = {
  [key: string]: { [key: string]: FilterItemTermWithOrigin };
};

export type FilterPayloadType = {
  facet: string;
  term: FilterItemTerm;
};

export type FilterPayloadTypeWithOrigin = FilterPayloadType & {
  origin: FacetOrigin;
};

const initialState: Filter = {};

const filterState = createSlice({
  name: "filter",
  initialState,
  reducers: {
    add(state, action: PayloadAction<FilterPayloadTypeWithOrigin>) {
      const { facet, term, origin } = action.payload;
      return {
        ...state,
        [facet]: {
          ...state[facet],
          [term.term]: {
            ...term,
            origin
          }
        }
      };
    },
    remove(state, action: PayloadAction<FilterPayloadType>) {
      const { facet, term } = action.payload;

      // Get the current selected facet from the state
      const selectedFacet = { ...state[facet] };

      // Remove the term from the selected facet
      delete selectedFacet[term.term];

      // If there are no more selected terms in the facet, remove the facet from the state entirely
      if (Object.keys(selectedFacet).length === 0) {
        const stateCopy = { ...state };
        delete stateCopy[facet];
        return stateCopy;
      }

      // If there are more terms in the facet, return the updated state
      return {
        ...state,
        [facet]: selectedFacet
      };
    },
    clear() {
      return initialState;
    }
  }
});

export const { add, remove, clear } = filterState.actions;
export default filterState.reducer;

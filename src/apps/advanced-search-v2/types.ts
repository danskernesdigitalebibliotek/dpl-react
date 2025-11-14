import { ComplexSearchFacetsEnum } from "../../core/dbc-gateway/generated/graphql";

export type Operator = "and" | "or" | "not";

export type SuggestState = {
  term: string;
  query: string;
  operator?: Operator;
};

// Unified filter state used by both form MultiSelects and sidebar Facets
export type FilterState = {
  label: string;
  facetField: ComplexSearchFacetsEnum;
  selectedValues: string[];
};

export type FacetConfig = {
  label: string;
  facetField: ComplexSearchFacetsEnum;
};

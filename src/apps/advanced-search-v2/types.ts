import { ComplexSearchFacetsEnum } from "../../core/dbc-gateway/generated/graphql";

export type Operator = "and" | "or" | "not";

export type SuggestState = {
  term: string;
  query: string;
  operator?: Operator;
};

// Facets are filters that can be either pre-search (form selects) or post-search (sidebar filters)
export type FacetState = {
  label: string;
  facetField: ComplexSearchFacetsEnum;
  selectedValues: string[];
};

export type FacetConfig = {
  label: string;
  facetField: ComplexSearchFacetsEnum;
};

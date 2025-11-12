import { ComplexSearchFacetsEnum } from "../../core/dbc-gateway/generated/graphql";

export type SuggestState = {
  term: string;
  query: string;
  operator?: "and" | "or" | "not";
};

export type MultiSelectState = {
  label: string;
  facetField: ComplexSearchFacetsEnum;
  selectedValues: string[];
};

export type FacetState = {
  facetField: ComplexSearchFacetsEnum;
  selectedValues: string[];
};

export type FacetConfig = {
  label: string;
  facetField: ComplexSearchFacetsEnum;
};

import { FacetFieldEnum } from "../../core/dbc-gateway/generated/graphql";

export type SuggestState = {
  term: string;
  query: string;
  operator?: "and" | "or" | "not";
};

export type MultiSelectState = {
  label: string;
  facetField: FacetFieldEnum;
  selectedValues: string[];
};

export type FacetState = {
  facetField: FacetFieldEnum;
  selectedValues: string[];
};

export type FacetConfig = {
  label: string;
  facetField: FacetFieldEnum;
};

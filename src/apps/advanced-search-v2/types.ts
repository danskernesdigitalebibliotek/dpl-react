import { FacetFieldEnum } from "../../core/dbc-gateway/generated/graphql";

export type SuggestState = {
  term: string;
  query: string;
};

export type MultiSelectState = {
  term: string;
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

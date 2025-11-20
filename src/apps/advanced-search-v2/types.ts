import { ComplexSearchFacetsEnum } from "../../core/dbc-gateway/generated/graphql";

export type Option = {
  label: string;
  value: string;
  count?: number;
};

export type Operator = "and" | "or" | "not";

export type SuggestState = {
  term: string;
  query: string;
  operator?: Operator;
};

// Facets are filters that can be either pre-search (form selects) or post-search (sidebar filters)
export type FacetState = {
  facetField: ComplexSearchFacetsEnum;
  selectedValues: string[];
};

export type RangeValue = {
  from: number | null;
  to: number | null;
};

export type RangePreset = {
  id: string;
  label: string;
  from: number;
  to: number | null;
};

type BaseFacetConfig = {
  label: string;
  facetField: ComplexSearchFacetsEnum;
};

export type SelectFacetConfig = BaseFacetConfig & {
  type: "select";
  options: Option[];
};

export type RangeFacetConfig = BaseFacetConfig & {
  type: "range";
  presets: RangePreset[];
};

export type FacetConfig = SelectFacetConfig | RangeFacetConfig;

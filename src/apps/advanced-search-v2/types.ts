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

export type FacetConfig = {
  label: string;
  facetField: ComplexSearchFacetsEnum;
};

export type PreSelectFacetConfig = FacetConfig & {
  type: "select";
  options: Option[];
  enableSearch: boolean;
};

export type PreRangeFacetConfig = FacetConfig & {
  type: "range";
  rangePresets: RangePreset[];
};

export type PreFacetConfig = PreSelectFacetConfig | PreRangeFacetConfig;

export enum SortOption {
  Relevance = "relevance",
  TitleAsc = "sort.title.asc",
  TitleDesc = "sort.title.desc",
  CreatorAsc = "sort.creator.asc",
  CreatorDesc = "sort.creator.desc",
  LatestPubDateAsc = "sort.latestpublicationdate.asc",
  LatestPubDateDesc = "sort.latestpublicationdate.desc"
}

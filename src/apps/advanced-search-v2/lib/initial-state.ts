import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import { SuggestState, FilterState } from "../types";

export const INITIAL_SUGGEST_STATE: SuggestState[] = [
  { term: "term.default", query: "", operator: "and" },
  { term: "term.default", query: "", operator: "and" }
];

export const INITIAL_FILTERS_STATE: FilterState[] = [
  {
    label: "Genre og form",
    facetField: ComplexSearchFacetsEnum.Genreandform,
    selectedValues: []
  },
  {
    label: "Sprog",
    facetField: ComplexSearchFacetsEnum.Mainlanguage,
    selectedValues: []
  },
  {
    label: "Udgivelsesår",
    facetField: ComplexSearchFacetsEnum.Publicationyear,
    selectedValues: []
  },
  {
    label: "Aldersgruppe",
    facetField: ComplexSearchFacetsEnum.Ages,
    selectedValues: []
  },
  {
    label: "Kilde",
    facetField: ComplexSearchFacetsEnum.Source,
    selectedValues: []
  }
];

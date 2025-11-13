import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import { SuggestState, MultiSelectState } from "../types";

export const SUGGESTS_CONFIG: SuggestState[] = [
  { term: "term.default", query: "", operator: "and" },
  { term: "term.default", query: "", operator: "and" }
];

export const SELECTS_CONFIG: MultiSelectState[] = [
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
  }
];

import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import { SuggestState, MultiSelectState, FacetConfig } from "../types";

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

export const FACETS_CONFIG: FacetConfig[] = [
  {
    label: "Format",
    facetField: ComplexSearchFacetsEnum.Specificmaterialtype
  },
  { label: "Forfatter / ophav", facetField: ComplexSearchFacetsEnum.Creator },
  { label: "Emne", facetField: ComplexSearchFacetsEnum.Subject },
  { label: "Sprog", facetField: ComplexSearchFacetsEnum.Mainlanguage },
  { label: "Målgruppe", facetField: ComplexSearchFacetsEnum.Generalaudience },
  {
    label: "Fiktiv hovedperson",
    facetField: ComplexSearchFacetsEnum.Fictionalcharacter
  },
  { label: "Genre og form", facetField: ComplexSearchFacetsEnum.Genreandform },
  { label: "Aldersgruppe", facetField: ComplexSearchFacetsEnum.Ages },
  { label: "Lix-tal", facetField: ComplexSearchFacetsEnum.Lix }
];

import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import { SuggestState, FacetConfig } from "../types";

export const INITIAL_SUGGEST_STATE: SuggestState[] = [
  { term: "term.default", query: "", operator: "and" },
  { term: "term.default", query: "", operator: "and" }
];

// Pre-search facets are the form selects shown in the search form
export const INITIAL_PRE_SEARCH_FACETS_STATE: FacetConfig[] = [
  { label: "Genre og form", facetField: ComplexSearchFacetsEnum.Genreandform },
  { label: "Sprog", facetField: ComplexSearchFacetsEnum.Mainlanguage },
  {
    label: "Udgivelsesår",
    facetField: ComplexSearchFacetsEnum.Publicationyear
  },
  { label: "Aldersgruppe", facetField: ComplexSearchFacetsEnum.Ages },
  { label: "Kilde", facetField: ComplexSearchFacetsEnum.Source }
];

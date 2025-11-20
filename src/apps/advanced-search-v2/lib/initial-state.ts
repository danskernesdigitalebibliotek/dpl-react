import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import { SuggestState, FacetConfig } from "../types";

import {
  MATERIAL_TYPE_OPTIONS,
  GENRE_OPTIONS,
  SOURCE_OPTIONS,
  LANGUAGE_OPTIONS,
  YEAR_PRESETS,
  AGE_PRESETS
} from "./advanced-search-select-options";

export const INITIAL_SUGGEST_STATE: SuggestState[] = [
  { term: "term.default", query: "", operator: "and" },
  { term: "term.default", query: "", operator: "and" }
];

// Pre-search facets are the form selects shown in the search form
export const INITIAL_PRE_SEARCH_FACETS_STATE: FacetConfig[] = [
  {
    label: "advancedSearchFacetMaterialTypeText",
    facetField: ComplexSearchFacetsEnum.Generalmaterialtype,
    type: "select",
    options: MATERIAL_TYPE_OPTIONS
  },
  {
    label: "advancedSearchFacetGenreAndFormText",
    facetField: ComplexSearchFacetsEnum.Genreandform,
    type: "select",
    options: GENRE_OPTIONS
  },
  {
    label: "advancedSearchFacetSourceText",
    facetField: ComplexSearchFacetsEnum.Source,
    type: "select",
    options: SOURCE_OPTIONS
  },
  {
    label: "advancedSearchFacetLanguageText",
    facetField: ComplexSearchFacetsEnum.Mainlanguage,
    type: "select",
    options: LANGUAGE_OPTIONS
  },
  {
    label: "advancedSearchFacetYearText",
    facetField: ComplexSearchFacetsEnum.Publicationyear,
    type: "range",
    presets: YEAR_PRESETS
  },
  {
    label: "advancedSearchFacetAgeText",
    facetField: ComplexSearchFacetsEnum.Ages,
    type: "range",
    presets: AGE_PRESETS
  }
];

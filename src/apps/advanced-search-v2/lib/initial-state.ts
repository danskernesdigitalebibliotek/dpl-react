import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import { FilterState, PreFacetConfig } from "../types";

import {
  MATERIAL_TYPE_OPTIONS,
  GENRE_OPTIONS,
  SOURCE_OPTIONS,
  LANGUAGE_OPTIONS,
  YEAR_PRESETS,
  AGE_PRESETS
} from "./advanced-search-select-options";

export const INITIAL_FILTER_STATE: FilterState[] = [
  { term: "term.default", query: "", operator: "and" },
  { term: "term.default", query: "", operator: "and" }
];

// Pre-search facets are the form selects shown in the search form
export const INITIAL_PRE_SEARCH_FACETS_STATE: PreFacetConfig[] = [
  {
    label: "advancedSearchFacetMaterialTypeText",
    facetField: ComplexSearchFacetsEnum.Generalmaterialtype,
    type: "select",
    options: MATERIAL_TYPE_OPTIONS,
    enableSearch: false
  },
  {
    label: "advancedSearchFacetGenreAndFormText",
    facetField: ComplexSearchFacetsEnum.Genreandform,
    type: "select",
    options: GENRE_OPTIONS,
    enableSearch: true
  },
  {
    label: "advancedSearchFacetSourceText",
    facetField: ComplexSearchFacetsEnum.Source,
    type: "select",
    options: SOURCE_OPTIONS,
    enableSearch: true
  },
  {
    label: "advancedSearchFacetLanguageText",
    facetField: ComplexSearchFacetsEnum.Mainlanguage,
    type: "select",
    options: LANGUAGE_OPTIONS,
    enableSearch: true
  },
  {
    label: "advancedSearchFacetYearText",
    facetField: ComplexSearchFacetsEnum.Publicationyear,
    type: "range",
    rangePresets: YEAR_PRESETS
  },
  {
    label: "advancedSearchFacetAgeText",
    facetField: ComplexSearchFacetsEnum.Ages,
    type: "range",
    rangePresets: AGE_PRESETS
  }
];

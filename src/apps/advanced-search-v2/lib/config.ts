import { FacetFieldEnum } from "../../../core/dbc-gateway/generated/graphql";
import { SuggestState, MultiSelectState, FacetConfig } from "../types";

export const SUGGESTS_CONFIG: SuggestState[] = [
  { term: "term.default", query: "", operator: "and" },
  { term: "term.default", query: "", operator: "and" }
];

export const SELECTS_CONFIG: MultiSelectState[] = [
  {
    label: "Genre og form",
    facetField: FacetFieldEnum.Genreandform,
    selectedValues: []
  },
  {
    label: "Sprog",
    facetField: FacetFieldEnum.Mainlanguages,
    selectedValues: []
  },
  {
    label: "Udgivelsesår",
    facetField: FacetFieldEnum.Year,
    selectedValues: []
  },
  { label: "Aldersgruppe", facetField: FacetFieldEnum.Age, selectedValues: [] }
];

export const FACETS_CONFIG: FacetConfig[] = [
  { label: "Format", facetField: FacetFieldEnum.Materialtypesspecific },
  { label: "Forfatter / ophav", facetField: FacetFieldEnum.Creators },
  { label: "Emne", facetField: FacetFieldEnum.Subjects },
  { label: "Sprog", facetField: FacetFieldEnum.Mainlanguages },
  { label: "Målgruppe", facetField: FacetFieldEnum.Generalaudience },
  {
    label: "Fiktiv hovedperson",
    facetField: FacetFieldEnum.Fictionalcharacters
  },
  { label: "Genre og form", facetField: FacetFieldEnum.Genreandform },
  { label: "Aldersgruppe", facetField: FacetFieldEnum.Age },
  { label: "Lix-tal", facetField: FacetFieldEnum.Lix }
];

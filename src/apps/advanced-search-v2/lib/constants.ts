import { FacetFieldEnum } from "../../../core/dbc-gateway/generated/graphql";
import { SuggestState, MultiSelectState } from "../types";

export const DEFAULT_SUGGESTS: SuggestState[] = [
  { term: "term.default", query: "" },
  { term: "term.default", query: "" }
];

export const DEFAULT_SELECTS: MultiSelectState[] = [
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

export const DEFAULT_PAGE_SIZE = 50;

export const FACET_TO_CQL_FIELD: Partial<Record<FacetFieldEnum, string>> = {
  [FacetFieldEnum.Materialtypesspecific]: "term.specificmaterialtype",
  [FacetFieldEnum.Creators]: "term.creator",
  [FacetFieldEnum.Subjects]: "term.subject",
  [FacetFieldEnum.Mainlanguages]: "term.mainlanguage",
  [FacetFieldEnum.Generalaudience]: "term.audience",
  [FacetFieldEnum.Fictionalcharacters]: "term.fictionalcharacter",
  [FacetFieldEnum.Genreandform]: "term.genreandform",
  [FacetFieldEnum.Age]: "term.age",
  [FacetFieldEnum.Lix]: "term.lix",
  [FacetFieldEnum.Year]: "term.year"
};

import { FacetFieldEnum } from "../../../core/dbc-gateway/generated/graphql";
import { SuggestState, MultiSelectState, FacetConfig } from "../types";

export const DEFAULT_SUGGESTS: SuggestState[] = [
  { term: "term.default", query: "" },
  { term: "term.default", query: "" }
];

export const DEFAULT_SELECTS: MultiSelectState[] = [
  { term: "Voksen", selectedValues: [] },
  { term: "Magi", selectedValues: [] }
];

export const DEFAULT_PAGE_SIZE = 50;

export const MINIMAL_AUTOSUGGEST_CHARACTERS = 3;

export const FACET_TO_CQL_FIELD: Partial<Record<FacetFieldEnum, string>> = {
  [FacetFieldEnum.Materialtypesspecific]: "term.specificmaterialtype",
  [FacetFieldEnum.Creators]: "term.creator",
  [FacetFieldEnum.Subjects]: "term.subject",
  [FacetFieldEnum.Mainlanguages]: "term.mainlanguage",
  [FacetFieldEnum.Generalaudience]: "term.audience",
  [FacetFieldEnum.Fictionalcharacters]: "term.fictionalcharacter",
  [FacetFieldEnum.Genreandform]: "term.genreandform",
  [FacetFieldEnum.Age]: "term.age",
  [FacetFieldEnum.Lix]: "term.lix"
};

export const FACET_CONFIGS: FacetConfig[] = [
  { label: "Material Type", facetField: FacetFieldEnum.Materialtypesspecific },
  { label: "Creator", facetField: FacetFieldEnum.Creators },
  { label: "Subject", facetField: FacetFieldEnum.Subjects },
  { label: "Language", facetField: FacetFieldEnum.Mainlanguages },
  { label: "Audience", facetField: FacetFieldEnum.Generalaudience }
];

import { FacetFieldEnum } from "../../../core/dbc-gateway/generated/graphql";

export const MIN_QUERY_LENGTH = 3;
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

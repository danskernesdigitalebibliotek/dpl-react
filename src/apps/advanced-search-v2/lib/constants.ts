import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";

export const MIN_QUERY_LENGTH = 3;
export const DEFAULT_PAGE_SIZE = 50;

// Map ComplexSearchFacetsEnum to CQL field names for building search queries
export const COMPLEX_FACET_TO_CQL_FIELD: Partial<
  Record<ComplexSearchFacetsEnum, string>
> = {
  [ComplexSearchFacetsEnum.Specificmaterialtype]: "term.specificmaterialtype",
  [ComplexSearchFacetsEnum.Creator]: "term.creator",
  [ComplexSearchFacetsEnum.Subject]: "term.subject",
  [ComplexSearchFacetsEnum.Mainlanguage]: "term.mainlanguage",
  [ComplexSearchFacetsEnum.Generalaudience]: "term.audience",
  [ComplexSearchFacetsEnum.Fictionalcharacter]: "term.fictionalcharacter",
  [ComplexSearchFacetsEnum.Genreandform]: "term.genreandform",
  [ComplexSearchFacetsEnum.Ages]: "term.age",
  [ComplexSearchFacetsEnum.Lix]: "term.lix",
  [ComplexSearchFacetsEnum.Publicationyear]: "term.year"
};

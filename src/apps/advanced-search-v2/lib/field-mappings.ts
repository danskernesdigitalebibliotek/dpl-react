import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";

// Map ComplexSearchFacetsEnum to CQL field names for building search queries
// Facets use "phrase" prefix to match exact values at work level
export const COMPLEX_FACET_TO_CQL_FIELD: Partial<
  Record<ComplexSearchFacetsEnum, string>
> = {
  [ComplexSearchFacetsEnum.Specificmaterialtype]: "phrase.specificmaterialtype",
  [ComplexSearchFacetsEnum.Creator]: "phrase.creator",
  [ComplexSearchFacetsEnum.Subject]: "phrase.subject",
  [ComplexSearchFacetsEnum.Mainlanguage]: "phrase.mainlanguage",
  [ComplexSearchFacetsEnum.Generalaudience]: "phrase.audience",
  [ComplexSearchFacetsEnum.Fictionalcharacter]: "phrase.fictionalcharacter",
  [ComplexSearchFacetsEnum.Genreandform]: "phrase.genreandform",
  [ComplexSearchFacetsEnum.Ages]: "phrase.age",
  [ComplexSearchFacetsEnum.Lix]: "phrase.lix",
  [ComplexSearchFacetsEnum.Publicationyear]: "phrase.year"
};

import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";

// Map ComplexSearchFacetsEnum to CQL field names for building search queries
// Facets use "phrase" prefix to match exact values at work level
export const COMPLEX_FACET_TO_CQL_FIELD: Partial<
  Record<ComplexSearchFacetsEnum, string>
> = {
  [ComplexSearchFacetsEnum.Specificmaterialtype]: "phrase.specificmaterialtype",
  [ComplexSearchFacetsEnum.Generalmaterialtype]: "phrase.generalmaterialtype",
  [ComplexSearchFacetsEnum.Creator]: "phrase.creator",
  [ComplexSearchFacetsEnum.Subject]: "phrase.subject",
  [ComplexSearchFacetsEnum.Mainlanguage]: "phrase.mainlanguage",
  [ComplexSearchFacetsEnum.Generalaudience]: "phrase.generalaudience",
  [ComplexSearchFacetsEnum.Fictionalcharacter]: "phrase.fictionalcharacter",
  [ComplexSearchFacetsEnum.Genreandform]: "phrase.genreandform",
  [ComplexSearchFacetsEnum.Ages]: "phrase.ages",
  [ComplexSearchFacetsEnum.Lix]: "lix",
  [ComplexSearchFacetsEnum.Publicationyear]: "phrase.year",
  [ComplexSearchFacetsEnum.Accesstype]: "phrase.accesstype",
  [ComplexSearchFacetsEnum.Source]: "phrase.source",
  [ComplexSearchFacetsEnum.Primarytarget]: "phrase.primarytarget",
  [ComplexSearchFacetsEnum.Let]: "let",
  [ComplexSearchFacetsEnum.Hostpublication]: "phrase.hostpublication",
  [ComplexSearchFacetsEnum.Contributor]: "phrase.contributor",
  [ComplexSearchFacetsEnum.Instrument]: "phrase.instrument",
  [ComplexSearchFacetsEnum.Chambermusictype]: "phrase.chambermusictype",
  [ComplexSearchFacetsEnum.Choirtype]: "phrase.choirtype",
  [ComplexSearchFacetsEnum.Typeofscore]: "phrase.typeofscore"
};

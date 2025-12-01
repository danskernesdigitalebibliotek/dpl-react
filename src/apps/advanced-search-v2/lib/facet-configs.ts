import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import { FacetConfig } from "../types";

// Facets are the sidebar filters shown after search

export const FACETS_CONFIG: FacetConfig[] = [
  {
    label: "advancedSearchFacetAccessTypeText",
    facetField: ComplexSearchFacetsEnum.Accesstype
  },
  // Fiktion / Nonfiktion - Not available in ComplexSearchFacetsEnum
  {
    label: "advancedSearchFacetFormatText",
    facetField: ComplexSearchFacetsEnum.Specificmaterialtype
  },
  {
    label: "advancedSearchFacetCreatorText",
    facetField: ComplexSearchFacetsEnum.Creator
  },
  {
    label: "advancedSearchFacetContributorText",
    facetField: ComplexSearchFacetsEnum.Contributor
  },
  {
    label: "advancedSearchFacetYearText",
    facetField: ComplexSearchFacetsEnum.Publicationyear
  },
  {
    label: "advancedSearchFacetSourceText",
    facetField: ComplexSearchFacetsEnum.Source
  },

  {
    label: "advancedSearchFacetHostPublicationText",
    facetField: ComplexSearchFacetsEnum.Hostpublication
  },
  {
    label: "advancedSearchFacetLanguageText",
    facetField: ComplexSearchFacetsEnum.Mainlanguage
  },
  {
    label: "advancedSearchFacetSubjectText",
    facetField: ComplexSearchFacetsEnum.Subject
  },
  {
    label: "advancedSearchFacetGenreAndFormText",
    facetField: ComplexSearchFacetsEnum.Genreandform
  },
  {
    label: "advancedSearchFacetFictionalCharacterText",
    facetField: ComplexSearchFacetsEnum.Fictionalcharacter
  },
  // For børn / voksne - Not available in ComplexSearchFacetsEnum
  {
    label: "advancedSearchFacetAgeText",
    facetField: ComplexSearchFacetsEnum.Ages
  },
  {
    label: "advancedSearchFacetAudienceText",
    facetField: ComplexSearchFacetsEnum.Generalaudience
  },
  {
    label: "advancedSearchFacetLevelText",
    facetField: ComplexSearchFacetsEnum.Primarytarget
  },
  {
    label: "advancedSearchFacetLixText",
    facetField: ComplexSearchFacetsEnum.Lix
  },
  {
    label: "advancedSearchFacetLetText",
    facetField: ComplexSearchFacetsEnum.Let
  },
  {
    label: "advancedSearchFacetInstrumentText",
    facetField: ComplexSearchFacetsEnum.Instrument
  },
  {
    label: "advancedSearchFacetChamberMusicText",
    facetField: ComplexSearchFacetsEnum.Chambermusictype
  },
  {
    label: "advancedSearchFacetChoirText",
    facetField: ComplexSearchFacetsEnum.Choirtype
  },
  {
    label: "advancedSearchFacetScoreTypeText",
    facetField: ComplexSearchFacetsEnum.Typeofscore
  }
];

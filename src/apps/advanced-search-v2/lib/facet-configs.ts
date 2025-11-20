import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import { FacetConfig } from "../types";

// Facets are the sidebar filters shown after search
export const FACETS_CONFIG: FacetConfig[] = [
  {
    label: "advancedSearchFacetFormatText",
    facetField: ComplexSearchFacetsEnum.Specificmaterialtype
  },
  {
    label: "advancedSearchFacetGenreAndFormText",
    facetField: ComplexSearchFacetsEnum.Genreandform
  },
  {
    label: "advancedSearchFacetSourceText",
    facetField: ComplexSearchFacetsEnum.Source
  },
  {
    label: "advancedSearchFacetLanguageText",
    facetField: ComplexSearchFacetsEnum.Mainlanguage
  },
  {
    label: "advancedSearchFacetAccessTypeText",
    facetField: ComplexSearchFacetsEnum.Accesstype
  },
  // { label: "Fiktion/Nonfiktion", facetField: "term.fictionnonfiction" }, // Not in enum
  {
    label: "advancedSearchFacetLevelText",
    facetField: ComplexSearchFacetsEnum.Primarytarget
  },
  // { label: "For børn/voksne", facetField: "term.childrenoradults" }, // Not in enum
  {
    label: "advancedSearchFacetAudienceText",
    facetField: ComplexSearchFacetsEnum.Generalaudience
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
    label: "advancedSearchFacetSubjectText",
    facetField: ComplexSearchFacetsEnum.Subject
  },
  {
    label: "advancedSearchFacetHostPublicationText",
    facetField: ComplexSearchFacetsEnum.Hostpublication
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
  },
  {
    label: "advancedSearchFacetYearText",
    facetField: ComplexSearchFacetsEnum.Publicationyear
  },
  {
    label: "advancedSearchFacetFictionalCharacterText",
    facetField: ComplexSearchFacetsEnum.Fictionalcharacter
  },
  {
    label: "advancedSearchFacetAgeText",
    facetField: ComplexSearchFacetsEnum.Ages
  }
];

import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import { FacetConfig } from "../types";

// Facets are the sidebar filters shown after search
export const FACETS_CONFIG: FacetConfig[] = [
  {
    label: "advancedSearchFacetFormatText",
    facetField: ComplexSearchFacetsEnum.Specificmaterialtype,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetGenreAndFormText",
    facetField: ComplexSearchFacetsEnum.Genreandform,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetSourceText",
    facetField: ComplexSearchFacetsEnum.Source,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetLanguageText",
    facetField: ComplexSearchFacetsEnum.Mainlanguage,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetAccessTypeText",
    facetField: ComplexSearchFacetsEnum.Accesstype,
    type: "select",
    options: []
  },
  // { label: "Fiktion/Nonfiktion", facetField: "term.fictionnonfiction" }, // Not in enum
  {
    label: "advancedSearchFacetLevelText",
    facetField: ComplexSearchFacetsEnum.Primarytarget,
    type: "select",
    options: []
  },
  // { label: "For børn/voksne", facetField: "term.childrenoradults" }, // Not in enum
  {
    label: "advancedSearchFacetAudienceText",
    facetField: ComplexSearchFacetsEnum.Generalaudience,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetLixText",
    facetField: ComplexSearchFacetsEnum.Lix,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetLetText",
    facetField: ComplexSearchFacetsEnum.Let,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetSubjectText",
    facetField: ComplexSearchFacetsEnum.Subject,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetHostPublicationText",
    facetField: ComplexSearchFacetsEnum.Hostpublication,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetCreatorText",
    facetField: ComplexSearchFacetsEnum.Creator,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetContributorText",
    facetField: ComplexSearchFacetsEnum.Contributor,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetInstrumentText",
    facetField: ComplexSearchFacetsEnum.Instrument,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetChamberMusicText",
    facetField: ComplexSearchFacetsEnum.Chambermusictype,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetChoirText",
    facetField: ComplexSearchFacetsEnum.Choirtype,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetScoreTypeText",
    facetField: ComplexSearchFacetsEnum.Typeofscore,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetYearText",
    facetField: ComplexSearchFacetsEnum.Publicationyear,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetFictionalCharacterText",
    facetField: ComplexSearchFacetsEnum.Fictionalcharacter,
    type: "select",
    options: []
  },
  {
    label: "advancedSearchFacetAgeText",
    facetField: ComplexSearchFacetsEnum.Ages,
    type: "select",
    options: []
  }
];

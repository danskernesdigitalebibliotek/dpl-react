import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import { FacetConfig } from "../types";

// Facets are the sidebar filters shown after search
export const FACETS_CONFIG: FacetConfig[] = [
  {
    label: "Format",
    facetField: ComplexSearchFacetsEnum.Specificmaterialtype
  },
  { label: "Genre og form", facetField: ComplexSearchFacetsEnum.Genreandform },
  { label: "Kilde", facetField: ComplexSearchFacetsEnum.Source },
  { label: "Sprog", facetField: ComplexSearchFacetsEnum.Mainlanguage },
  { label: "Fysisk/Online", facetField: ComplexSearchFacetsEnum.Accesstype },
  // { label: "Fiktion/Nonfiktion", facetField: "term.fictionnonfiction" }, // Not in enum
  {
    label: "Fagligt niveau",
    facetField: ComplexSearchFacetsEnum.Primarytarget
  },
  // { label: "For børn/voksne", facetField: "term.childrenoradults" }, // Not in enum
  { label: "Målgruppe", facetField: ComplexSearchFacetsEnum.Generalaudience },
  { label: "Lix-tal", facetField: ComplexSearchFacetsEnum.Lix },
  { label: "Let", facetField: ComplexSearchFacetsEnum.Let },
  { label: "Emne", facetField: ComplexSearchFacetsEnum.Subject },
  {
    label: "Værtspublikation",
    facetField: ComplexSearchFacetsEnum.Hostpublication
  },
  { label: "Forfatter / ophav", facetField: ComplexSearchFacetsEnum.Creator },
  {
    label: "Oplæser / oversætter / bidrag",
    facetField: ComplexSearchFacetsEnum.Contributor
  },
  { label: "Instrument", facetField: ComplexSearchFacetsEnum.Instrument },
  {
    label: "Kammermusik",
    facetField: ComplexSearchFacetsEnum.Chambermusictype
  },
  { label: "Noder til kor", facetField: ComplexSearchFacetsEnum.Choirtype },
  { label: "Nodetype", facetField: ComplexSearchFacetsEnum.Typeofscore },
  {
    label: "Udgivelsesår",
    facetField: ComplexSearchFacetsEnum.Publicationyear
  },
  {
    label: "Fiktiv hovedperson",
    facetField: ComplexSearchFacetsEnum.Fictionalcharacter
  },
  { label: "Aldersgruppe", facetField: ComplexSearchFacetsEnum.Ages }
];

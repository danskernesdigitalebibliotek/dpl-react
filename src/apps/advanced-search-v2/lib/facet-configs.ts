import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import { FacetConfig } from "../types";

export const FACETS_CONFIG: FacetConfig[] = [
  {
    label: "Format",
    facetField: ComplexSearchFacetsEnum.Specificmaterialtype
  },
  { label: "Forfatter / ophav", facetField: ComplexSearchFacetsEnum.Creator },
  { label: "Emne", facetField: ComplexSearchFacetsEnum.Subject },
  { label: "Sprog", facetField: ComplexSearchFacetsEnum.Mainlanguage },
  { label: "Målgruppe", facetField: ComplexSearchFacetsEnum.Generalaudience },
  {
    label: "Fiktiv hovedperson",
    facetField: ComplexSearchFacetsEnum.Fictionalcharacter
  },
  { label: "Genre og form", facetField: ComplexSearchFacetsEnum.Genreandform },
  { label: "Aldersgruppe", facetField: ComplexSearchFacetsEnum.Ages },
  { label: "Lix-tal", facetField: ComplexSearchFacetsEnum.Lix }
];

import { FacetField } from "../../core/dbc-gateway/generated/graphql";
import { FilterItemTerm } from "./types";

export const formatFacetTerms = (filters: {
  [key: string]: { [key: string]: FilterItemTerm };
}) => {
  return Object.keys(filters).reduce(
    (acc, key) => ({
      ...acc,
      [key]: Object.keys(filters[key])
    }),
    {}
  );
};

export const BowserFacets = [
  FacetField.MainLanguages,
  FacetField.AccessTypes,
  FacetField.ChildrenOrAdults,
  FacetField.Creators,
  FacetField.FictionNonfiction,
  FacetField.FictionalCharacter,
  FacetField.GenreAndForm,
  FacetField.MaterialTypes,
  FacetField.Subjects,
  FacetField.WorkTypes
];

export const lineFacets = [
  FacetField.FictionNonfiction,
  FacetField.WorkTypes,
  FacetField.GenreAndForm
];

export const defaultFacetLineTerms = [
  "Faglitteratur",
  "Skønlitteratur",
  "Film",
  "Spil",
  "Musik"
];

export const showFacetAsSelect = ["genreAndForm"];

export const getPlaceHolderFacets = (facets: string[]) =>
  facets.map((facet) => ({
    name: facet,
    values: [
      {
        term: ""
      }
    ]
  }));

export default {};

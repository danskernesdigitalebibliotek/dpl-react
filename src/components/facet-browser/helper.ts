import { useEffect, useState } from "react";
import { FilterItemTerm } from "../../apps/search-result/types";
import { Filter } from "../../apps/search-result/useFilterHandler";
import {
  FacetField,
  SearchFacetQuery,
  useSearchFacetQuery
} from "../../core/dbc-gateway/generated/graphql";

export const allFacetFields = [
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
        key: "",
        term: ""
      }
    ]
  }));

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

export function useGetFacets(query: string, filters: Filter) {
  const [facets, setFacets] = useState<
    SearchFacetQuery["search"]["facets"] | undefined
  >(undefined);

  const { data, isLoading } = useSearchFacetQuery(
    {
      q: { all: query },
      facets: allFacetFields,
      facetLimit: 10,
      filters: formatFacetTerms(filters)
    },
    {
      keepPreviousData: true,
      placeholderData: {
        search: {
          facets: getPlaceHolderFacets(allFacetFields)
        }
      }
    }
  );

  useEffect(() => {
    if (!data) {
      return;
    }
    setFacets(data.search.facets);
  }, [data, filters, query]);

  return { facets, isLoading };
}

export const FacetBrowserModalId = "facet-browser-modal";

export default {};

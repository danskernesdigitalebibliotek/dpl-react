import { useEffect, useState } from "react";
import { Filter } from "../../apps/search-result/useFilterHandler";
import {
  FacetField,
  SearchFacetQuery,
  useSearchFacetQuery
} from "../../core/dbc-gateway/generated/graphql";
import { formatFacetTerms } from "../../apps/search-result/helpers";

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

const getPlaceHolderFacets = (facets: string[]) =>
  facets.map((facet) => ({
    name: facet,
    values: [
      {
        key: "",
        term: ""
      }
    ]
  }));

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

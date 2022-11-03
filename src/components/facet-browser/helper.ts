import { useEffect, useState } from "react";
import { isObjectEmpty } from "../../core/utils/helpers/general";
import { Filter } from "../../apps/search-result/useFilterHandler";
import {
  FacetField,
  SearchFacetQuery,
  useSearchFacetQuery
} from "../../core/dbc-gateway/generated/graphql";
import { formatFilters } from "../../apps/search-result/helpers";

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

export function useGetFacets(query: string, filters: Filter) {
  const [facets, setFacets] = useState<
    SearchFacetQuery["search"]["facets"] | undefined
  >(undefined);

  const { data, isLoading } = useSearchFacetQuery({
    q: { all: query },
    facets: allFacetFields,
    facetLimit: 10,
    ...(isObjectEmpty(filters)
      ? {}
      : { filters: { ...formatFilters(filters) } })
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    setFacets(data.search.facets);
  }, [data, filters, query]);

  return { facets, isLoading };
}

export default {};

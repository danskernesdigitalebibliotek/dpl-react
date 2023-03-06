import { mapValues } from "lodash";
import {
  FacetField,
  useSearchFacetQuery
} from "../../core/dbc-gateway/generated/graphql";
import useGetCleanBranches from "../../core/utils/branches";
import { Filter, FilterItemTerm } from "../../core/filter.slice";
import { getMaterialTypes } from "../../core/utils/helpers/general";
import { Manifestation } from "../../core/utils/types/entities";

export const allFacetFields = [
  FacetField.MainLanguages,
  FacetField.AccessTypes,
  FacetField.ChildrenOrAdults,
  FacetField.Creators,
  FacetField.FictionNonfiction,
  FacetField.FictionalCharacters,
  FacetField.GenreAndForm,
  FacetField.MaterialTypes,
  FacetField.Subjects,
  FacetField.WorkTypes
];

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

export const createFilters = (
  facets: {
    [key: string]: { [key: string]: FilterItemTerm };
  },
  branchIdList: string[]
) => {
  return {
    ...formatFacetTerms(facets),
    ...(branchIdList ? { branchId: branchIdList } : {})
  };
};

export function useGetFacets(query: string, filters: Filter) {
  const cleanBranches = useGetCleanBranches();

  const { data, isLoading } = useSearchFacetQuery(
    {
      q: { all: query },
      facets: allFacetFields,
      facetLimit: 10,
      filters: createFilters(filters, cleanBranches)
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

  return { facets: data?.search.facets || null, isLoading };
}

export const FacetBrowserModalId = "facet-browser-modal";

export function getAllFilterPathsAsString(filterObject: {
  [key: string]: { [key: string]: FilterItemTerm };
}) {
  const mappedFilterValues = mapValues(filterObject, (filter) => {
    return Object.keys(filter);
  });
  const filterNames = Object.keys(mappedFilterValues);
  let allFilterPathsAsString = "";
  filterNames.forEach((filterName) => {
    mappedFilterValues[filterName].forEach((filterValue) => {
      if (allFilterPathsAsString !== "") {
        allFilterPathsAsString = allFilterPathsAsString.concat(";");
      }
      allFilterPathsAsString = allFilterPathsAsString.concat(
        `facet.${filterName}:${filterValue}`
      );
    });
  });
  return allFilterPathsAsString;
}

export const getFirstMaterialTypeFromFilters = (
  filters: Filter,
  manifestations: Manifestation[]
) => {
  const materialTypeFilter = Object.keys(filters.materialTypes || {}).sort()[0];
  const allMaterialTypes = getMaterialTypes(manifestations);
  return allMaterialTypes.includes(materialTypeFilter)
    ? materialTypeFilter
    : undefined;
};

export default {};

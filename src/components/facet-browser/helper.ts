import { mapValues } from "lodash";
import {
  FacetField,
  FacetResult,
  FacetValue,
  useSearchFacetQuery
} from "../../core/dbc-gateway/generated/graphql";
import useGetCleanBranches from "../../core/utils/branches";
import { Filter, FilterItemTerm } from "../../core/filter.slice";
import invalidSwitchCase from "../../core/utils/helpers/invalid-switch-case";

export const allFacetFields = [
  FacetField.WorkTypes,
  FacetField.Creators,
  FacetField.Subjects,
  FacetField.FictionNonfiction,
  FacetField.ChildrenOrAdults,
  FacetField.AccessTypes,
  FacetField.MainLanguages,
  FacetField.GenreAndForm,
  FacetField.MaterialTypesSpecific,
  FacetField.FictionalCharacters
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
          sorting: null,
          facets: getPlaceHolderFacets(allFacetFields)
        }
      }
    }
  );

  return { facets: data?.search.facets || null, sorting: data?.search.sorting, isLoading };
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

export const getFacetFieldTranslation = (name: FacetField) => {
  switch (name) {
    case FacetField.AccessTypes:
      return "facetAccessTypesText";
    case FacetField.CanAlwaysBeLoaned:
      return "facetCanAlwaysBeLoanedText";
    case FacetField.ChildrenOrAdults:
      return "facetChildrenOrAdultsText";
    case FacetField.Creators:
      return "facetCreatorsText";
    case FacetField.Dk5:
      return "facetDk5Text";
    case FacetField.FictionNonfiction:
      return "facetFictionNonfictionText";
    case FacetField.FictionalCharacters:
      return "facetFictionalCharactersText";
    case FacetField.GenreAndForm:
      return "facetGenreAndFormText";
    case FacetField.MainLanguages:
      return "facetMainLanguagesText";
    case FacetField.MaterialTypesGeneral:
      return "facetMaterialTypesGeneralText";
    case FacetField.MaterialTypesSpecific:
      return "facetMaterialTypesSpecificText";
    case FacetField.Subjects:
      return "facetSubjectsText";
    case FacetField.WorkTypes:
      return "facetWorkTypesText";
    case FacetField.Year:
      return "facetYearText";
    case FacetField.Age:
      return "facetAgeText";
    default:
      return invalidSwitchCase<string>(name as never);
  }
};

type FacetMap = { [key: string]: FacetValue };
// createFacetsMap generates a map for quick lookup and enhanced search
// capabilities by combining facet name and term into a single string key.
// Structure: { [facetName:termKey]: FacetValue }
// Example Key: 'fictionalCharacters:Batman'
export const createFacetsMap = (facets: FacetResult[]): FacetMap => {
  return facets.reduce((acc: FacetMap, facet: FacetResult) => {
    const newAcc = { ...acc };

    facet.values.forEach((value) => {
      const combinedKey = `${facet.name}:${value.key}`;
      newAcc[combinedKey] = value;
    });

    return newAcc;
  }, {});
};

export const findTermInFacetMap = (
  facetName: string,
  termName: string,
  facetMap: FacetMap
): FacetValue => {
  const key = `${facetName}:${termName}`;
  return facetMap[key];
};

export default {};

/* ********************************* Vitest Section  ********************************* */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  const branchIdList = ["710100", "710200"];

  const filters = {
    mainLanguages: {
      Dansk: {
        key: "dan",
        term: "Dansk",
        score: 295
      },
      Engelsk: {
        key: "eng",
        term: "Engelsk",
        score: 9
      }
    },
    accessTypes: {
      Fysisk: {
        key: "PHYSICAL",
        term: "Fysisk",
        score: 356
      }
    }
  };

  const facetsTestData: FacetResult[] = [
    {
      name: "materialTypesGeneral",
      values: [
        {
          key: "computerspil",
          term: "computerspil",
          score: 26
        }
      ]
    },
    {
      name: "mainLanguages",
      values: [
        {
          key: "dan",
          term: "Dansk",
          score: 427
        },
        {
          key: "eng",
          term: "Engelsk",
          score: 82
        }
      ]
    },
    {
      name: "materialTypesGeneral",
      values: [
        {
          key: "artikler",
          term: "artikler",
          score: 346
        },
        {
          key: "bøger",
          term: "bøger",
          score: 74
        },
        {
          key: "e-bøger",
          term: "e-bøger",
          score: 38
        },
        {
          key: "computerspil",
          term: "computerspil",
          score: 26
        },
        {
          key: "film",
          term: "film",
          score: 9
        }
      ]
    }
  ];

  describe("getPlaceHolderFacets", () => {
    it("should get placeholder facets", () => {
      expect(getPlaceHolderFacets(allFacetFields)).toMatchSnapshot();
    });
  });

  describe("formatFacetTerms", () => {
    it("should format facet terms", () => {
      expect(formatFacetTerms(filters)).toMatchSnapshot();
    });
  });

  describe("createFilters", () => {
    it("should create filters", () => {
      expect(createFilters(filters, branchIdList)).toMatchSnapshot();
    });
  });

  it("createFacetsMap", () => {
    expect(createFacetsMap(facetsTestData)).toMatchSnapshot();
  });
}

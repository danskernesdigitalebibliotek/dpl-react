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
  FacetField.MainLanguages,
  FacetField.AccessTypes,
  FacetField.ChildrenOrAdults,
  FacetField.Creators,
  FacetField.FictionNonfiction,
  FacetField.FictionalCharacters,
  FacetField.GenreAndForm,
  FacetField.MaterialTypesSpecific,
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
    default:
      return invalidSwitchCase<string>(name);
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
      name: "materialTypesGeneral",
      values: [
        {
          key: "abekat",
          term: "abekat",
          score: 0
        }
      ]
    },
    {
      name: "subjects",
      values: [
        {
          key: "legetøj",
          term: "legetøj",
          score: 165
        },
        {
          key: "legetøjsindustri",
          term: "legetøjsindustri",
          score: 126
        },
        {
          key: "lego",
          term: "lego",
          score: 101
        },
        {
          key: "legoklodser",
          term: "legoklodser",
          score: 98
        },
        {
          key: "virksomhedsledelse",
          term: "virksomhedsledelse",
          score: 65
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
        },
        {
          key: "fre",
          term: "Fransk",
          score: 9
        },
        {
          key: "ger",
          term: "Tysk",
          score: 9
        },
        {
          key: "ita",
          term: "Italiensk",
          score: 9
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
    },
    {
      name: "year",
      values: [
        {
          key: "2017",
          term: "2017",
          score: 35
        },
        {
          key: "2015",
          term: "2015",
          score: 33
        },
        {
          key: "2014",
          term: "2014",
          score: 31
        },
        {
          key: "2018",
          term: "2018",
          score: 29
        },
        {
          key: "2013",
          term: "2013",
          score: 27
        }
      ]
    },
    {
      name: "fictionalCharacters",
      values: [
        {
          key: "Batman",
          term: "Batman",
          score: 4
        },
        {
          key: "Justice League",
          term: "Justice League",
          score: 4
        },
        {
          key: "Harry Potter",
          term: "Harry Potter",
          score: 3
        },
        {
          key: "Hermione Granger",
          term: "Hermione Granger",
          score: 3
        },
        {
          key: "Ron Weasley",
          term: "Ron Weasley",
          score: 3
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

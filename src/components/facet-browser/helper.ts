import { mapValues } from "lodash";
import {
  FacetFieldEnum,
  FacetResult,
  FacetValue,
  useSearchFacetQuery
} from "../../core/dbc-gateway/generated/graphql";
import useGetCleanBranches from "../../core/utils/branches";
import { Filter, FilterItemTerm } from "../../core/filter.slice";
import invalidSwitchCase from "../../core/utils/helpers/invalid-switch-case";
import { Facets } from "../../core/utils/types/entities";

export const allFacetFields = [
  FacetFieldEnum.Materialtypesgeneral,
  FacetFieldEnum.Creators,
  FacetFieldEnum.Subjects,
  FacetFieldEnum.Fictionnonfiction,
  FacetFieldEnum.Childrenoradults,
  FacetFieldEnum.Accesstypes,
  FacetFieldEnum.Mainlanguages,
  FacetFieldEnum.Genreandform,
  FacetFieldEnum.Materialtypesspecific,
  FacetFieldEnum.Fictionalcharacters
];

export const getPlaceHolderFacets = (facets: string[]) =>
  facets.map((facet) => ({
    name: facet,
    type: facet as FacetFieldEnum,
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

export const getFacetFieldTranslation = (name: FacetFieldEnum) => {
  switch (name.toLowerCase()) {
    case FacetFieldEnum.Accesstypes.toLowerCase():
      return "facetAccessTypesText";
    case FacetFieldEnum.Canalwaysbeloaned.toLowerCase():
      return "facetCanAlwaysBeLoanedText";
    case FacetFieldEnum.Childrenoradults.toLowerCase():
      return "facetChildrenOrAdultsText";
    case FacetFieldEnum.Creators.toLowerCase():
      return "facetCreatorsText";
    case FacetFieldEnum.Dk5.toLowerCase():
      return "facetDk5Text";
    case FacetFieldEnum.Fictionnonfiction.toLowerCase():
      return "facetFictionNonfictionText";
    case FacetFieldEnum.Fictionalcharacters.toLowerCase():
      return "facetFictionalCharactersText";
    case FacetFieldEnum.Genreandform.toLowerCase():
      return "facetGenreAndFormText";
    case FacetFieldEnum.Mainlanguages.toLowerCase():
      return "facetMainLanguagesText";
    case FacetFieldEnum.Materialtypesspecific.toLowerCase():
      return "facetMaterialTypesGeneralText";
    case FacetFieldEnum.Materialtypesgeneral.toLowerCase():
      return "facetMaterialTypesSpecificText";
    case FacetFieldEnum.Subjects.toLowerCase():
      return "facetSubjectsText";
    case FacetFieldEnum.Worktypes.toLowerCase():
      return "facetWorkTypesText";
    case FacetFieldEnum.Year.toLowerCase():
      return "facetYearText";
    case FacetFieldEnum.Gameplatform.toLowerCase():
      return "facetGamePlatformText";
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

  const facetsTestData: Facets = [
    {
      name: "materialTypesGeneral",
      type: FacetFieldEnum.Materialtypesgeneral,
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
      type: FacetFieldEnum.Mainlanguages,
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
      type: FacetFieldEnum.Materialtypesgeneral,
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

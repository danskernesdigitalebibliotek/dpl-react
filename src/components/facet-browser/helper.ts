import { mapValues } from "lodash";
import {
  FacetField,
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

export default {};

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

  describe("getPlaceHolderFacets", () => {
    it("should get placeholder facets", () => {
      expect(getPlaceHolderFacets(allFacetFields)).toMatchInlineSnapshot(`
        [
          {
            "name": "mainLanguages",
            "values": [
              {
                "key": "",
                "term": "",
              },
            ],
          },
          {
            "name": "accessTypes",
            "values": [
              {
                "key": "",
                "term": "",
              },
            ],
          },
          {
            "name": "childrenOrAdults",
            "values": [
              {
                "key": "",
                "term": "",
              },
            ],
          },
          {
            "name": "creators",
            "values": [
              {
                "key": "",
                "term": "",
              },
            ],
          },
          {
            "name": "fictionNonfiction",
            "values": [
              {
                "key": "",
                "term": "",
              },
            ],
          },
          {
            "name": "fictionalCharacters",
            "values": [
              {
                "key": "",
                "term": "",
              },
            ],
          },
          {
            "name": "genreAndForm",
            "values": [
              {
                "key": "",
                "term": "",
              },
            ],
          },
          {
            "name": "materialTypes",
            "values": [
              {
                "key": "",
                "term": "",
              },
            ],
          },
          {
            "name": "subjects",
            "values": [
              {
                "key": "",
                "term": "",
              },
            ],
          },
          {
            "name": "workTypes",
            "values": [
              {
                "key": "",
                "term": "",
              },
            ],
          },
        ]
      `);
    });
  });

  describe("formatFacetTerms", () => {
    it("should format facet terms", () => {
      expect(formatFacetTerms(filters)).toMatchInlineSnapshot(`
        {
          "accessTypes": [
            "Fysisk",
          ],
          "mainLanguages": [
            "Dansk",
            "Engelsk",
          ],
        }
      `);
    });
  });

  describe("createFilters", () => {
    it("should create filters", () => {
      expect(createFilters(filters, branchIdList)).toMatchInlineSnapshot(`
        {
          "accessTypes": [
            "Fysisk",
          ],
          "branchId": [
            "710100",
            "710200",
          ],
          "mainLanguages": [
            "Dansk",
            "Engelsk",
          ],
        }
      `);
    });
  });
}

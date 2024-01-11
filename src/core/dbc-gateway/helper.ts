import { QueryFunctionContext } from "react-query";
import { beforeAll, vi } from "vitest";
import {
  getServiceBaseUrl,
  serviceUrlKeys
} from "../utils/reduxMiddleware/extractServiceBaseUrls";

const map = {
  // Search requests.
  complexSearchWithPagination: serviceUrlKeys.fbiSearch,
  complexSearchWithPaginationWorkAccess: serviceUrlKeys.fbiSearch,
  intelligentFacets: serviceUrlKeys.fbiSearch,
  recommendFromFaust: serviceUrlKeys.fbiSearch,
  searchFacet: serviceUrlKeys.fbiSearch,
  searchWithPagination: serviceUrlKeys.fbiSearch,
  suggestionsFromQueryString: serviceUrlKeys.fbiSearch,
  // Material requests.
  getInfomedia: serviceUrlKeys.fbiMaterial,
  getManifestationViaBestRepresentationByFaust: serviceUrlKeys.fbiMaterial,
  getManifestationViaMaterialByFaust: serviceUrlKeys.fbiMaterial,
  getMaterial: serviceUrlKeys.fbiMaterial,
  getReviewManifestations: serviceUrlKeys.fbiMaterial,
  getSmallWork: serviceUrlKeys.fbiMaterial,
  openOrder: serviceUrlKeys.fbiMaterial,
  // All other requests.
  default: serviceUrlKeys.fbi
} as const;

type Baseurl = typeof map[keyof typeof map];

export const resolveBaseUrl = (query?: string) => {
  if (!query) {
    return getServiceBaseUrl(map.default) as Baseurl;
  }

  return getServiceBaseUrl(
    map[query as keyof typeof map] || map.default
  ) as Baseurl;
};

export const getQueryUrlFromContext = (
  context: QueryFunctionContext | undefined
) => {
  // Get the default base url if no context.
  if (!context) {
    return resolveBaseUrl();
  }

  const { queryKey } = context;
  const [queryName] = queryKey;
  return resolveBaseUrl(queryName as string);
};

export default {};

/* ********************************* Vitest Section  ********************************* */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("DBC Gateway Requests", () => {
    beforeAll(() => {
      vi.mock("../utils/reduxMiddleware/extractServiceBaseUrls", () => {
        const urls = {
          fbiBaseUrl: "i-am-fbi-url",
          fbiSearchBaseUrl: "i-am-fbi-search-url",
          fbiMaterialBaseUrl: "i-am-fbi-material-url"
        } as const;

        return {
          getServiceBaseUrl: (apiBaseUrlKey: keyof typeof urls) => {
            return urls[apiBaseUrlKey] ?? urls.fbiBaseUrl;
          },
          serviceUrlKeys: {
            fbi: "fbiBaseUrl",
            fbiSearch: "fbiSearchBaseUrl",
            fbiMaterial: "fbiMaterialBaseUrl"
          }
        };
      });
    });

    it("should resolve baseurl based on query name", () => {
      expect(resolveBaseUrl("complexSearchWithPagination")).toEqual(
        "i-am-fbi-search-url"
      );
      expect(resolveBaseUrl("complexSearchWithPaginationWorkAccess")).toEqual(
        "i-am-fbi-search-url"
      );
      expect(resolveBaseUrl("intelligentFacets")).toEqual(
        "i-am-fbi-search-url"
      );
      expect(resolveBaseUrl("recommendFromFaust")).toEqual(
        "i-am-fbi-search-url"
      );
      expect(resolveBaseUrl("searchFacet")).toEqual("i-am-fbi-search-url");
      expect(resolveBaseUrl("searchWithPagination")).toEqual(
        "i-am-fbi-search-url"
      );
      expect(resolveBaseUrl("suggestionsFromQueryString")).toEqual(
        "i-am-fbi-search-url"
      );
      expect(resolveBaseUrl("getInfomedia")).toEqual("i-am-fbi-material-url");
      expect(
        resolveBaseUrl("getManifestationViaBestRepresentationByFaust")
      ).toEqual("i-am-fbi-material-url");
      expect(resolveBaseUrl("getManifestationViaMaterialByFaust")).toEqual(
        "i-am-fbi-material-url"
      );
      expect(resolveBaseUrl("getMaterial")).toEqual("i-am-fbi-material-url");
      expect(resolveBaseUrl("getReviewManifestations")).toEqual(
        "i-am-fbi-material-url"
      );
      expect(resolveBaseUrl("getSmallWork")).toEqual("i-am-fbi-material-url");
      expect(resolveBaseUrl("openOrder")).toEqual("i-am-fbi-material-url");
    });

    it("should resolve default to the fbi base url if the query is unknown", () => {
      expect(resolveBaseUrl("someUnknownQuery")).toEqual("i-am-fbi-url");
    });

    it("should resolve default to the fbi base url if no query has been specified", () => {
      expect(resolveBaseUrl()).toEqual("i-am-fbi-url");
    });
  });
}

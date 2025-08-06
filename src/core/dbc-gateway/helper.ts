import { QueryFunctionContext } from "react-query";
import { beforeAll, vi } from "vitest";
import { getServiceBaseUrl } from "../utils/reduxMiddleware/extractServiceBaseUrls";
import queryMap from "./queryMap";

type Baseurl = (typeof queryMap)[keyof typeof queryMap];

export const resolveBaseUrl = (query?: string) => {
  if (!query) {
    return getServiceBaseUrl(queryMap.default) as Baseurl;
  }

  return getServiceBaseUrl(
    queryMap[query as keyof typeof queryMap] || queryMap.default
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
      vi.mock("../utils/reduxMiddleware/extractServiceBaseUrls", async () => {
        const urls = {
          fbiBaseUrl: "i-am-fbi-url",
          fbiLocalBaseUrl: "i-am-fbi-local-url",
          fbiGlobalBaseUrl: "i-am-fbi-global-url"
        } as const;

        const actual = await vi.importActual(
          "../utils/reduxMiddleware/extractServiceBaseUrls"
        );

        return {
          ...(typeof actual === "object" ? actual : {}),
          getServiceBaseUrl: (apiBaseUrlKey: keyof typeof urls) => {
            return urls[apiBaseUrlKey] ?? urls.fbiBaseUrl;
          }
        };
      });
    });

    it("should resolve baseurl based on query name", () => {
      expect(resolveBaseUrl("complexSearchWithPagination")).toEqual(
        "i-am-fbi-local-url"
      );
      expect(resolveBaseUrl("complexSearchWithPaginationWorkAccess")).toEqual(
        "i-am-fbi-local-url"
      );
      expect(resolveBaseUrl("intelligentFacets")).toEqual("i-am-fbi-local-url");
      expect(resolveBaseUrl("recommendFromFaust")).toEqual(
        "i-am-fbi-local-url"
      );
      expect(resolveBaseUrl("searchFacet")).toEqual("i-am-fbi-local-url");
      expect(resolveBaseUrl("searchWithPagination")).toEqual(
        "i-am-fbi-local-url"
      );
      expect(resolveBaseUrl("suggestionsFromQueryString")).toEqual(
        "i-am-fbi-local-url"
      );
      expect(resolveBaseUrl("getInfomedia")).toEqual("i-am-fbi-global-url");
      expect(
        resolveBaseUrl("getManifestationViaBestRepresentationByFaust")
      ).toEqual("i-am-fbi-global-url");
      expect(resolveBaseUrl("getManifestationViaMaterialByFaust")).toEqual(
        "i-am-fbi-global-url"
      );
      expect(resolveBaseUrl("getMaterial")).toEqual("i-am-fbi-local-url");
      expect(resolveBaseUrl("getMaterialGlobally")).toEqual(
        "i-am-fbi-global-url"
      );
      expect(resolveBaseUrl("getReviewManifestations")).toEqual(
        "i-am-fbi-global-url"
      );
      expect(resolveBaseUrl("getSmallWork")).toEqual("i-am-fbi-global-url");
      expect(resolveBaseUrl("openOrder")).toEqual("i-am-fbi-global-url");
    });

    it("should resolve default to the fbi base url if the query is unknown", () => {
      expect(resolveBaseUrl("someUnknownQuery")).toEqual("i-am-fbi-url");
    });

    it("should resolve default to the fbi base url if no query has been specified", () => {
      expect(resolveBaseUrl()).toEqual("i-am-fbi-url");
    });
  });
}

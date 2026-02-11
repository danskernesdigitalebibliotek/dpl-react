import { useUrls } from "../../../core/utils/url";
import { appendQueryParametersToUrl } from "../../../core/utils/helpers/url";
import { useSearchQueries } from "./use-search-queries";

export const useCqlSearchUrl = (): { customCqlUrl: URL | null } => {
  const u = useUrls();
  const cqlSearchUrl = u("advancedSearchV2CqlSearchUrl", true);
  const { cql } = useSearchQueries();

  if (!cqlSearchUrl || typeof cqlSearchUrl === "boolean") {
    return { customCqlUrl: null };
  }

  const customCqlUrl = appendQueryParametersToUrl(cqlSearchUrl, {
    advancedSearchCql: cql
  });

  return { customCqlUrl };
};

export default useCqlSearchUrl;

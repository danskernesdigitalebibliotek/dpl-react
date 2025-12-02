import { useUrls } from "../../../core/utils/url";
import { appendQueryParametersToUrl } from "../../../core/utils/helpers/url";
import { useSearchQueries } from "./use-search-queries";

export const useCqlSearchUrl = (): { targetCqlUrl: URL | null } => {
  const u = useUrls();
  const cqlSearchUrl = u("advancedSearchV2CqlSearchUrl", true);
  const { cql } = useSearchQueries();

  if (!cqlSearchUrl || typeof cqlSearchUrl === "boolean") {
    return { targetCqlUrl: null };
  }

  const targetCqlUrl = appendQueryParametersToUrl(cqlSearchUrl, {
    advancedSearchCql: cql
  });

  return { targetCqlUrl };
};

export default useCqlSearchUrl;

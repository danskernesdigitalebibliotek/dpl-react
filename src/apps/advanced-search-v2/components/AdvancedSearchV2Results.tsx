import React from "react";
import { useText } from "../../../core/utils/text";
import SearchResultList from "../../../components/card-item-list/SearchResultList";
import SearchResultZeroHits from "../../search-result/search-result-zero-hits";
import AdvancedSearchV2Facets from "./AdvancedSearchV2Facets";
import { useSearchQueries } from "../hooks/use-search-queries";
import { usePaginatedResults } from "../hooks/use-paginated-results";
import { DEFAULT_PAGE_SIZE } from "../lib/constants";

interface AdvancedSearchV2ResultsProps {
  pageSize?: number;
}

const AdvancedSearchV2Results: React.FC<AdvancedSearchV2ResultsProps> = ({
  pageSize = DEFAULT_PAGE_SIZE
}) => {
  const t = useText();
  const { cql, facetQuery, hasQuery } = useSearchQueries();
  const {
    resultItems,
    hitcount,
    isLoading,
    isFetching,
    isRefetching,
    canShowZeroResults,
    page,
    PagerComponent
  } = usePaginatedResults({ cql, hasQuery, pageSize });

  const isLoadingOrRefetching = isLoading || isFetching || isRefetching;
  const shouldShowSearchResults =
    isLoadingOrRefetching || resultItems.length > 0;
  const shouldShowResultHeadline = hitcount > 0 && !isLoadingOrRefetching;
  const shouldShowZeroResults =
    !isLoadingOrRefetching && hitcount === 0 && canShowZeroResults;

  if (!hasQuery) return null;

  return (
    <div
      className="advanced-search-v2__results-container"
      style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}
    >
      <AdvancedSearchV2Facets fetchQuery={facetQuery} />
      <section className="content-list-page">
        <h2
          className="content-list-page__heading"
          id="advanced-search-result"
          aria-live="polite"
        >
          {isLoadingOrRefetching && t("loadingResultsText")}
          {shouldShowResultHeadline &&
            t("showingMaterialsText", {
              placeholders: { "@hitcount": hitcount }
            })}
        </h2>

        {shouldShowSearchResults && (
          <>
            <SearchResultList
              resultItems={resultItems}
              page={page}
              pageSize={pageSize}
            />
            <PagerComponent isLoading={isLoadingOrRefetching} />
          </>
        )}

        {shouldShowZeroResults && <SearchResultZeroHits />}
      </section>
    </div>
  );
};

export default AdvancedSearchV2Results;

import React, { useEffect } from "react";
import usePager from "../../components/result-pager/use-pager";
import SearchResultList from "../../components/card-item-list/SearchResultList";
import SearchResultZeroHits from "../search-result/search-result-zero-hits";
import AdvancedSearchV2Facets from "./AdvancedSearchV2Facets";
import { useSearchResults } from "./hooks/use-search-results";
import { DEFAULT_PAGE_SIZE } from "./constants";

interface AdvancedSearchV2ResultsProps {
  pageSize?: number;
}

const AdvancedSearchV2Results: React.FC<AdvancedSearchV2ResultsProps> = ({
  pageSize = DEFAULT_PAGE_SIZE
}) => {
  const { PagerComponent, page, resetPage } = usePager({
    hitcount: 0,
    pageSize
  });

  const {
    resultItems,
    hitcount,
    isLoading,
    isFetching,
    isRefetching,
    facetQuery,
    hasQuery,
    canShowZeroResults
  } = useSearchResults({ page, pageSize });

  // Reset page when query changes (handled via resetPage in usePager)
  useEffect(() => {
    resetPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facetQuery]);

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
          {isLoadingOrRefetching && "Loading results..."}
          {shouldShowResultHeadline && `Showing ${hitcount} materials`}
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

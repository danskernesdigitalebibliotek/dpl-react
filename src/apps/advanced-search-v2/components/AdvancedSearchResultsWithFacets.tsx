import React from "react";
import { useText } from "../../../core/utils/text";
import SearchResultList from "../../../components/card-item-list/SearchResultList";
import SearchResultZeroHits from "../../search-result/search-result-zero-hits";
import AdvancedSearchFilters from "./AdvancedSearchFilters";
import { useSearchQueries } from "../hooks/use-search-queries";
import { usePaginatedResults } from "../hooks/use-paginated-results";

interface AdvancedSearchResultsWithFacetsProps {
  pageSize: number;
}

const AdvancedSearchResultsWithFacets: React.FC<
  AdvancedSearchResultsWithFacetsProps
> = ({ pageSize }) => {
  const t = useText();
  const { cql, hasQuery } = useSearchQueries();
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
    <div className="advanced-search-v2__results-container">
      <h2
        className="advanced-search-v2__result-heading"
        id="advanced-search-result"
        aria-live="polite"
      >
        {isLoadingOrRefetching && t("loadingResultsText")}
        {shouldShowResultHeadline &&
          t("showingMaterialsText", {
            placeholders: { "@hitcount": hitcount }
          })}
      </h2>

      <div className="advanced-search-v2__grid">
        <AdvancedSearchFilters cql={cql} />

        <section className="content-list-page content-list-page--no-top-margin">
          {shouldShowSearchResults && (
            <>
              <SearchResultList
                resultItems={resultItems}
                page={page}
                pageSize={pageSize}
                className="content-list--no-top-margin"
              />
              <PagerComponent isLoading={isLoadingOrRefetching} />
            </>
          )}

          {shouldShowZeroResults && <SearchResultZeroHits />}
        </section>
      </div>
    </div>
  );
};

export default AdvancedSearchResultsWithFacets;

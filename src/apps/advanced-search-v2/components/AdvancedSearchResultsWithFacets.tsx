import React from "react";
import { useText } from "../../../core/utils/text";
import SearchResultList from "../../../components/card-item-list/SearchResultList";
import SearchResultZeroHits from "../../search-result/search-result-zero-hits";
import AdvancedSearchFilters from "./AdvancedSearchFilters";
import AdvancedSearchSummary from "./AdvancedSearchSummary";
import { useSearchQueries } from "../hooks/use-search-queries";
import { usePaginatedResults } from "../hooks/use-paginated-results";
import { useFormVisibility } from "../hooks/use-form-visibility";
import { useSearchFormState } from "../hooks/use-search-form-state";

interface AdvancedSearchResultsWithFacetsProps {
  pageSize: number;
}

const AdvancedSearchResultsWithFacets: React.FC<
  AdvancedSearchResultsWithFacetsProps
> = ({ pageSize }) => {
  const t = useText();
  const { cql, hasQuery, onShelf } = useSearchQueries();
  const { setView } = useFormVisibility();
  const { clearFacets } = useSearchFormState();
  const {
    resultItems,
    hitcount,
    page,
    PagerComponent,
    isLoadingOrRefetching,
    shouldShowSearchResults,
    shouldShowResultHeadline,
    shouldShowZeroResults
  } = usePaginatedResults({ cql, hasQuery, onShelf, pageSize });

  if (!hasQuery) return null;

  return (
    <div>
      <AdvancedSearchSummary
        onEditClick={() => {
          // Clear facets (sidebar filters) when editing, keep preSearchFacets
          clearFacets();
          setView("search");
        }}
      />
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

        <section>
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
    </div>
  );
};

export default AdvancedSearchResultsWithFacets;

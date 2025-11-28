import React from "react";
import { useText } from "../../../core/utils/text";
import SearchResultList from "../../../components/card-item-list/SearchResultList";
import SearchResultZeroHits from "../../search-result/search-result-zero-hits";
import AdvancedSearchFilters from "./AdvancedSearchFilters";
import AdvancedSearchSummary from "./AdvancedSearchSummary";
import AdvancedSortSelect from "./AdvancedSortSelect";
import { useSearchQueries } from "../hooks/use-search-queries";
import { usePaginatedResults } from "../hooks/use-paginated-results";
import { useFormVisibility } from "../hooks/use-form-visibility";
import { FacetState, SuggestState } from "../types";

interface AdvancedSearchResultsWithFacetsProps {
  pageSize: number;
  suggests: SuggestState[];
  preSearchFacets: FacetState[];
}

const AdvancedSearchResultsWithFacets: React.FC<
  AdvancedSearchResultsWithFacetsProps
> = ({ pageSize, suggests, preSearchFacets }) => {
  const t = useText();
  const { cql, hasQuery, onShelf, sort, setSort } = useSearchQueries();
  const { setView } = useFormVisibility();

  const {
    resultItems,
    hitcount,
    page,
    PagerComponent,
    isLoadingOrRefetching,
    shouldShowSearchResults,
    shouldShowResultHeadline,
    shouldShowZeroResults
  } = usePaginatedResults({ cql, hasQuery, onShelf, pageSize, sort });

  if (!hasQuery) return null;

  return (
    <div>
      <AdvancedSearchSummary
        suggests={suggests}
        preSearchFacets={preSearchFacets}
        onEditClick={() => {
          // Clear facets (sidebar filters) when editing, keep preSearchFacets
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
          <AdvancedSortSelect sort={sort} setSort={setSort} />

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

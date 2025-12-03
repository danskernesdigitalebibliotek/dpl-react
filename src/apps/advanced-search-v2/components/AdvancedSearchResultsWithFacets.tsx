import React from "react";
import { useText } from "../../../core/utils/text";
import SearchResultList from "../../../components/card-item-list/SearchResultList";
import SearchResultZeroHits from "../../search-result/search-result-zero-hits";
import AdvancedSearchFacets from "./AdvancedSearchFacets";
import AdvancedSearchSummary from "./AdvancedSearchSummary";
import AdvancedSortSelect from "./AdvancedSortSelect";
import { useSearchQueries } from "../hooks/use-search-queries";
import { usePaginatedResults } from "../hooks/use-paginated-results";
import { useFormVisibility } from "../hooks/use-form-visibility";
import CopyLink from "../../../components/copy-link/CopyLink";
import IconFilter from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-filter.svg";

interface AdvancedSearchResultsWithFacetsProps {
  pageSize: number;
  clearFacets: () => void;
}

const AdvancedSearchResultsWithFacets: React.FC<
  AdvancedSearchResultsWithFacetsProps
> = ({ pageSize, clearFacets }) => {
  const t = useText();
  const { cql, isSearchEnabled, onShelf, sort, setSort } = useSearchQueries();
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
  } = usePaginatedResults({ cql, isSearchEnabled, onShelf, pageSize, sort });

  if (!isSearchEnabled) return null;

  return (
    <div className="advanced-search-v2__results">
      <AdvancedSearchSummary
        onEditClick={() => {
          // Clear facets (sidebar filters) when editing, keep preSearchFacets
          clearFacets();
          setView("search");
        }}
      />

      <div className="advanced-search-v2__grid">
        <AdvancedSearchFacets cql={cql} />

        <section>
          <div className="advanced-search-v2__results-top-bar">
            <div className="advanced-search-v2__results-top-bar__left">
              <h2
                className="advanced-search-v2__results-heading"
                id="advanced-search-result"
                aria-live="polite"
              >
                {isLoadingOrRefetching && t("loadingResultsText")}
                {shouldShowResultHeadline &&
                  t("showingMaterialsText", {
                    placeholders: { "@hitcount": hitcount }
                  })}
              </h2>
              <CopyLink
                className="advanced-search-v2__copy-link"
                label="Kopier link"
              />
            </div>
            <div className="advanced-search-v2__results-top-bar__right">
              <button
                onClick={() => setView("search")}
                className="advanced-search-v2__modify-filters-button"
              >
                <img src={IconFilter} alt="" />
                <span>{t("addMoreFiltersText")}</span>
              </button>
              <AdvancedSortSelect sortOption={sort} setSortOption={setSort} />
            </div>
          </div>

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

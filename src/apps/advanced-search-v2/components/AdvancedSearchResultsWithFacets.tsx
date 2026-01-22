import React from "react";
import { useText } from "../../../core/utils/text";
import SearchResultList from "../../../components/card-item-list/SearchResultList";
import AdvancedSearchFacets from "./AdvancedSearchFacets";
import AdvancedSearchSummary from "./AdvancedSearchSummary";
import AdvancedSortSelect from "./AdvancedSortSelect";
import { useSearchQueries } from "../hooks/use-search-queries";
import { usePaginatedResults } from "../hooks/use-paginated-results";
import { useFormVisibility } from "../hooks/use-form-visibility";
import CopyLink from "../../../components/copy-link/CopyLink";
import IconFilter from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-filter.svg";
import useDialog from "../../../components/dialog/useDialog";
import Dialog from "../../../components/dialog/Dialog";
import { Button } from "../../../components/Buttons/Button";

interface AdvancedSearchResultsWithFacetsProps {
  pageSize: number;
  customCqlUrl?: URL;
  customCqlUrlLabel?: string;
  clearFacets: () => void;
}

const AdvancedSearchResultsWithFacets: React.FC<
  AdvancedSearchResultsWithFacetsProps
> = ({ customCqlUrl, customCqlUrlLabel, pageSize, clearFacets }) => {
  const t = useText();
  const { cql, isSearchEnabled, onShelf, sort, setSort } = useSearchQueries();
  const { setView } = useFormVisibility();
  const { openDialogWithContent, closeDialog, dialogRef } = useDialog();

  const {
    resultItems,
    hitcount,
    page,
    PagerComponent,
    isLoadingOrRefetching,
    shouldShowSearchResults
  } = usePaginatedResults({ cql, isSearchEnabled, onShelf, pageSize, sort });

  if (!isSearchEnabled) return null;

  return (
    <div className="search-v2__results">
      <AdvancedSearchSummary
        customCqlUrl={customCqlUrl}
        customCqlUrlLabel={customCqlUrlLabel}
        onEditClick={() => {
          // Clear facets (sidebar filters) when editing, keep preSearchFacets
          clearFacets();
          setView("search");
        }}
      />

      <div className="search-v2__grid">
        <AdvancedSearchFacets cql={cql} />

        <section>
          <div className="search-v2__results-top-bar">
            <div className="search-v2__results-top-bar__left">
              <h2
                className="search-v2__results-heading"
                id="advanced-search-result"
                aria-live="polite"
              >
                {t("showingMaterialsText", {
                  placeholders: { "@hitcount": hitcount }
                })}
              </h2>
              <CopyLink className="search-v2__copy-link" label="Kopier link" />
            </div>
            <div className="search-v2__results-top-bar__right">
              <button
                onClick={() => openDialogWithContent(true)}
                className="search-v2__modify-filters-button"
              >
                <img src={IconFilter} alt="" />
                <span>{t("addMoreFiltersText")}</span>
              </button>
              <AdvancedSortSelect sortOption={sort} setSortOption={setSort} />

              <Dialog isSidebar closeDialog={closeDialog} ref={dialogRef}>
                <div className="search-v2-facets__dialog">
                  <div className="search-v2-facets__dialog-content">
                    <h2 className="search-v2-facets__dialog-content__heading">
                      {t("advancedSearchFilterMaterialsText", {
                        placeholders: { "@hitcount": hitcount }
                      })}
                    </h2>
                    <AdvancedSearchFacets cql={cql} />
                  </div>
                  <div className="search-v2-facets__dialog__actions">
                    <Button
                      classNames="search-v2-facets__dialog__actions__button"
                      collapsible
                      label={t("advancedSearchShowResultsText")}
                      size="medium"
                      buttonType="none"
                      variant="filled"
                      onClick={closeDialog}
                    />
                  </div>
                </div>
              </Dialog>
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
        </section>
      </div>
    </div>
  );
};

export default AdvancedSearchResultsWithFacets;

import React from "react";
import SearchResultList from "../../../components/card-item-list/SearchResultList";
import SearchResultFacets from "./SearchResultFacets";
import { useText } from "../../../core/utils/text";
import { Work } from "../../../core/utils/types/entities";
import { FacetResult } from "../../../core/dbc-gateway/generated/graphql";
import Campaign from "../../../components/campaign/Campaign";
import { CampaignMatchPOST200 } from "../../../core/dpl-cms/model";
import IconFilter from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-filter.svg";
import useDialog from "../../../components/dialog/useDialog";
import Dialog from "../../../components/dialog/Dialog";
import { Button } from "../../../components/Buttons/Button";

interface SearchResultResultsProps {
  hitcount: number;
  resultItems: Work[];
  page: number;
  pageSize: number;
  facets: FacetResult[] | null;
  campaignData: CampaignMatchPOST200 | null;
  isLoading: boolean;
  PagerComponent: React.FC<{ isLoading?: boolean }>;
  infoBoxProps?: {
    title?: string;
    html?: string;
    buttonLabel?: string;
    buttonUrl?: URL;
  };
}

const SearchResultResults: React.FC<SearchResultResultsProps> = ({
  hitcount,
  resultItems,
  page,
  pageSize,
  facets,
  campaignData,
  isLoading,
  PagerComponent,
  infoBoxProps
}) => {
  const t = useText();
  const { openDialogWithContent, closeDialog, dialogRef } = useDialog();

  return (
    <div className="search-v2__results">
      <div className="search-v2__grid">
        <SearchResultFacets facets={facets} />

        <section>
          <div className="search-v2__results-top-bar">
            <div className="search-v2__results-top-bar__left">
              <h2
                className="search-v2__results-heading"
                id="search-result-v2"
                aria-live="polite"
              >
                {/* TODO: translation */}
                {`Din søgning har ${hitcount} resultater`}
              </h2>
            </div>
            <div className="search-v2__results-top-bar__right">
              <button
                onClick={() => openDialogWithContent(true)}
                className="search-v2__modify-filters-button"
              >
                <img src={IconFilter} alt="" />
                <span>{t("addMoreFiltersText")}</span>
              </button>

              <Dialog isSidebar closeDialog={closeDialog} ref={dialogRef}>
                <div className="search-v2-facets__dialog">
                  <div className="search-v2-facets__dialog-content">
                    <h2 className="search-v2-facets__dialog-content__heading">
                      {/* TODO: translation */}
                      {`Din søgning har ${hitcount} resultater`}
                    </h2>
                    <SearchResultFacets facets={facets} />
                  </div>
                  <div className="search-v2-facets__dialog__actions">
                    <Button
                      classNames="search-v2-facets__dialog__actions__button"
                      collapsible
                      label={'t("advancedSearchShowResultsText")'}
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

          {campaignData && campaignData.data && (
            <Campaign campaignData={campaignData.data} />
          )}

          <SearchResultList
            resultItems={resultItems}
            page={page}
            pageSize={pageSize}
            infoBoxProps={infoBoxProps}
          />
          <PagerComponent isLoading={isLoading} />
        </section>
      </div>
    </div>
  );
};

export default SearchResultResults;

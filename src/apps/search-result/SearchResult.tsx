import React, { useEffect, useState } from "react";
import useSearchResultTracking from "./useSearchResultTracking";
import { useDeepCompareEffect } from "react-use";
import { useQueryState, parseAsJson, parseAsBoolean } from "nuqs";
import SearchResultHeader from "../../components/search-bar/search-result-header/SearchResultHeader";
import usePager from "../../components/result-pager/use-pager";
import {
  SearchWithPaginationQuery,
  useSearchWithPaginationQuery,
  useSearchFacetQuery,
  HoldingsStatusEnum
} from "../../core/dbc-gateway/generated/graphql";
import { Work } from "../../core/utils/types/entities";
import {
  createFilters,
  allFacetFields,
  getPlaceHolderFacets
} from "../../components/facet-browser/helper";
import { getCurrentLocation, redirectTo } from "../../core/utils/helpers/url";
import { useText } from "../../core/utils/text";
import { cleanBranchesId, TBranch } from "../../core/utils/branches";
import SearchResultInvalidSearch from "./search-result-not-valid-search";
import { useUrls } from "../../core/utils/url";
import { useConfig } from "../../core/utils/config";
import SearchResultList from "./SearchResultList";
import SearchResultFacets from "./SearchResultFacets";
import IconFilter from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-filter.svg";
import useDialog from "../../components/dialog/useDialog";
import Dialog from "../../components/dialog/Dialog";
import { Button } from "../../components/Buttons/Button";
import { convertFacetsToFilters, isValidFacetsState } from "./helpers";
import { isWildcardQuery } from "../advanced-search-v2/lib/query-builder";

interface SearchResultProps {
  q: string;
  pageSize: number;
}

const SearchResult: React.FC<SearchResultProps> = ({ q, pageSize }) => {
  const u = useUrls();
  const zeroHitsSearchUrl = u("zeroHitsSearchUrl");
  const t = useText();
  const [resultItems, setResultItems] = useState<Work[] | null>(null);
  const [hitcount, setHitCount] = useState<number>(0);
  const minimalQueryLength = 1;
  const config = useConfig();
  const branches = config<TBranch[]>("branchesConfig", {
    transformer: "jsonParse"
  });
  const cleanBranches = cleanBranchesId(branches);

  const { openDialogWithContent, closeDialog, dialogRef } = useDialog();

  // Facets state from URL via nuqs
  const [facetsFromUrl] = useQueryState(
    "facets",
    parseAsJson((facetsState) => {
      if (isValidFacetsState(facetsState)) return facetsState;
      return [];
    }).withDefault([])
  );

  // "On shelf" toggle state stored in URL (shared with advanced search)
  const [onShelf] = useQueryState("onShelf", parseAsBoolean.withDefault(false));

  // Convert nuqs facets to filters format
  const facetFilters = convertFacetsToFilters(facetsFromUrl);

  // Base filters (facets + branches)
  const baseFilters = createFilters(facetFilters, cleanBranches);
  // Include holdings status (radios are applied via facets, not direct filters)
  const searchFilters = {
    ...baseFilters,
    ...(onShelf ? { status: [HoldingsStatusEnum.Onshelf] } : {})
  };

  const { PagerComponent, page, resetPage } = usePager({
    hitcount,
    pageSize
  });

  // If q or filters change (eg. in Storybook context or via facets)
  // then make sure that we reset the entire result set and pager.
  useDeepCompareEffect(() => {
    setResultItems([]);
    resetPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, pageSize, searchFilters]);

  // Fetch facets for campaign matching
  const { data: facetData } = useSearchFacetQuery(
    {
      q: { all: q },
      facets: allFacetFields,
      facetLimit: 50,
      filters: searchFilters
    },
    {
      keepPreviousData: true,
      placeholderData: {
        search: {
          facets: getPlaceHolderFacets(allFacetFields)
        }
      }
    }
  );

  const facets = facetData?.search.facets || [];
  const { data, isLoading } = useSearchWithPaginationQuery(
    {
      q: { all: q },
      offset: page * pageSize,
      limit: pageSize,
      filters: searchFilters
    },
    {
      enabled: q.length >= minimalQueryLength,
      onSuccess: (data) => {
        if (data.search.hitcount === 0) {
          redirectTo(zeroHitsSearchUrl);
        }
      }
    }
  );

  useEffect(() => {
    if (!data) {
      return;
    }
    const {
      search: { works: resultWorks, hitcount: resultCount }
    } = data as {
      search: {
        works: Work[];
        hitcount: SearchWithPaginationQuery["search"]["hitcount"];
      };
    };
    setHitCount(resultCount);
    // if page has change then append the new result to the existing result
    if (page > 0) {
      setResultItems((prev) => {
        if (prev === null) {
          return [...resultWorks];
        }
        return [...prev, ...resultWorks];
      });
      return;
    }

    setResultItems(resultWorks);
  }, [data, page]);

  useSearchResultTracking({ q, hitcount });

  if (!q || q.length < minimalQueryLength) {
    return <SearchResultInvalidSearch />;
  }

  const isWildcardQuerySearch = isWildcardQuery(q);

  const headerTitle = isWildcardQuerySearch
    ? t("showingAllMaterialsText")
    : t("showingResultsForText", { placeholders: { "@query": q } });

  // Get search info box data from config
  const {
    title: infoBoxTitle,
    content: infoBoxContent,
    buttonLabel: infoBoxButtonLabel,
    buttonUrl: infoBoxButtonUrl
  } = config<{
    title?: string;
    content: { value?: string };
    buttonLabel?: string;
    buttonUrl?: string;
  }>("searchInfoboxConfig", {
    transformer: "jsonParse"
  });
  const infoBoxHtml = infoBoxContent?.value || "";

  const webSearchConfig = config<{
    webSearchUrl: string;
    webSearchText: string;
    webSearchTotal: string;
    hasWebSearchResults: boolean;
  }>("webSearchConfig", {
    transformer: "jsonParse"
  });

  return (
    <div className="search">
      <SearchResultHeader
        headerTitle={headerTitle}
        subtitleRenderProp={
          !isWildcardQuerySearch &&
          webSearchConfig?.hasWebSearchResults &&
          webSearchConfig?.webSearchUrl &&
          webSearchConfig?.webSearchText ? (
            <>
              {`${t("webSearchLinkText")} `}
              <a
                className="link-tag text-body-medium-medium"
                href={webSearchConfig.webSearchUrl}
              >
                {webSearchConfig.webSearchTotal
                  ? `${webSearchConfig.webSearchText} (${webSearchConfig.webSearchTotal})`
                  : webSearchConfig.webSearchText}
              </a>
            </>
          ) : null
        }
      />
      <div className="search__results">
        <div className="search__grid">
          <SearchResultFacets facets={facets} />

          <section>
            <div className="search__results-top-bar">
              <div className="search__results-top-bar__left">
                <h2 className="search__results-heading">
                  {t("searchShowingMaterialsText", {
                    placeholders: { "@hitcount": hitcount }
                  })}
                </h2>
              </div>
              <div className="search__results-top-bar__right">
                <button
                  onClick={() => openDialogWithContent(true)}
                  className="search__modify-filters-button"
                >
                  <img src={IconFilter} alt="" />
                  <span>{t("addMoreFiltersText")}</span>
                </button>

                <Dialog isSidebar closeDialog={closeDialog} ref={dialogRef}>
                  <div className="search-facets__dialog">
                    <div className="search-facets__dialog-content">
                      <h2 className="search-facets__dialog-content__heading">
                        {t("searchDialogFilterMaterialsText", {
                          placeholders: { "@hitcount": hitcount }
                        })}
                      </h2>
                      <SearchResultFacets facets={facets} />
                    </div>
                    <div className="search-facets__dialog__actions">
                      <Button
                        classNames="search-facets__dialog__actions__button"
                        collapsible
                        label={t("searchShowResultsText")}
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

            {resultItems && (
              <>
                <SearchResultList
                  resultItems={resultItems}
                  isLoading={isLoading}
                  page={page}
                  pageSize={pageSize}
                  infoBoxProps={{
                    title: infoBoxTitle,
                    html: infoBoxHtml,
                    buttonLabel: infoBoxButtonLabel,
                    buttonUrl: infoBoxButtonUrl
                      ? new URL(infoBoxButtonUrl, getCurrentLocation())
                      : undefined
                  }}
                />
                <PagerComponent isLoading={isLoading} />
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;

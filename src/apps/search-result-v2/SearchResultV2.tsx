import React, { useEffect, useState } from "react";
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
import { useCollectPageStatistics } from "../../core/statistics/useStatistics";
import { useCampaignMatchPOST } from "../../core/dpl-cms/dpl-cms";
import {
  CampaignMatchPOST200,
  CampaignMatchPOSTBodyItem
} from "../../core/dpl-cms/model";
import { statistics } from "../../core/statistics/statistics";
import { getCurrentLocation, redirectTo } from "../../core/utils/helpers/url";
import { useText } from "../../core/utils/text";
import { cleanBranchesId, TBranch } from "../../core/utils/branches";
import SearchResultInvalidSearch from "../search-result/search-result-not-valid-search";
import { useUrls } from "../../core/utils/url";
import { useConfig } from "../../core/utils/config";
import { isWildcardQuery } from "../advanced-search-v2/lib/query-builder";
import SearchResultList from "../../components/card-item-list/SearchResultList";
import SearchResultFacets from "./components/SearchResultFacets";
import Campaign from "../../components/campaign/Campaign";
import IconFilter from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-filter.svg";
import useDialog from "../../components/dialog/useDialog";
import Dialog from "../../components/dialog/Dialog";
import { Button } from "../../components/Buttons/Button";

interface SearchResultV2Props {
  q: string;
  pageSize: number;
}

type InfoBoxConfig = {
  title?: string;
  content: { value?: string };
  buttonLabel?: string;
  buttonUrl?: string;
};

// Type for facet state stored in URL
// Uses facetName (camelCase string like "materialTypesGeneral") as that's what the API expects for filters
type FacetState = {
  facetName: string;
  selectedValues: string[];
};

// Validation function for facet state from URL
const isValidFacetState = (value: unknown): value is FacetState[] => {
  if (!Array.isArray(value)) return false;

  return value.every((item) => {
    if (typeof item !== "object" || item === null) return false;

    const { facetName, selectedValues } = item as Record<string, unknown>;

    if (typeof facetName !== "string") {
      return false;
    }
    if (
      !Array.isArray(selectedValues) ||
      !selectedValues.every((v) => typeof v === "string")
    ) {
      return false;
    }

    return true;
  });
};

// Convert nuqs facet state to filter format expected by createFilters
const convertFacetsToFilters = (facets: FacetState[]) => {
  const filters: {
    [key: string]: {
      [key: string]: { key: string; term: string; traceId: string };
    };
  } = {};

  facets.forEach(({ facetName, selectedValues }) => {
    if (selectedValues.length > 0) {
      filters[facetName] = {};
      selectedValues.forEach((value) => {
        filters[facetName][value] = {
          key: value,
          term: value,
          traceId: "url-facet"
        };
      });
    }
  });

  return filters;
};

const SearchResultV2: React.FC<SearchResultV2Props> = ({ q, pageSize }) => {
  const u = useUrls();
  const zeroHitsSearchUrl = u("zeroHitsSearchUrl");
  const t = useText();
  const [resultItems, setResultItems] = useState<Work[] | null>(null);
  const [hitcount, setHitCount] = useState<number>(0);
  const { mutate } = useCampaignMatchPOST();
  const [campaignData, setCampaignData] = useState<CampaignMatchPOST200 | null>(
    null
  );
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
    parseAsJson((value) => {
      if (isValidFacetState(value)) return value;
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

  const { collectPageStatistics } = useCollectPageStatistics();
  useEffect(() => {
    collectPageStatistics({
      ...statistics.searchQuery,
      trackedData: q
    });
    // We actually just want to track if the query changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

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

  const campaignFacets = facetData?.search.facets || null;
  const facets = facetData?.search.facets || [];

  useDeepCompareEffect(() => {
    if (campaignFacets) {
      mutate(
        {
          data: campaignFacets as CampaignMatchPOSTBodyItem[],
          params: {
            _format: "json"
          }
        },
        {
          onSuccess: (campaign) => {
            setCampaignData(campaign);
          }
        }
      );
    }
  }, [campaignFacets, mutate]);

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

  useEffect(() => {
    if (campaignData?.data?.title) {
      collectPageStatistics({
        ...statistics.campaignShown,
        trackedData: campaignData.data.title
      });
    }
    // We only want to track when campaignData changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignData]);

  if (!q || q.length < minimalQueryLength) {
    return <SearchResultInvalidSearch />;
  }

  const isWildcardQuerySearch = isWildcardQuery(q);

  const headerTitle = isWildcardQuerySearch
    ? "Viser alle materialer"
    : t("showingResultsForText", { placeholders: { "@query": q } });

  // Get search info box data from config
  const {
    title: infoBoxTitle,
    content: infoBoxContent,
    buttonLabel: infoBoxButtonLabel,
    buttonUrl: infoBoxButtonUrl
  } = config<InfoBoxConfig>("searchInfoboxConfig", {
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
    <div className="search-v2">
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
                  {t("searchShowingMaterialsText", {
                    count: hitcount && !isLoading ? hitcount : 0
                  })}
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
                        {t("searchShowingMaterialsText", {
                          count: hitcount && !isLoading ? hitcount : 0
                        })}
                      </h2>
                      <SearchResultFacets facets={facets} />
                    </div>
                    <div className="search-v2-facets__dialog__actions">
                      <Button
                        classNames="search-v2-facets__dialog__actions__button"
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

            {campaignData && campaignData.data && (
              <Campaign campaignData={campaignData.data} />
            )}

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

export default SearchResultV2;

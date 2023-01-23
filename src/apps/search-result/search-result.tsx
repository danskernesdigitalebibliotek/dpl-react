import React, { useEffect, useState } from "react";
import { useDeepCompareEffect } from "react-use";
import SearchResultHeader from "../../components/search-bar/search-result-header/SearchResultHeader";
import usePager from "../../components/result-pager/use-pager";
import SearchResultList from "../../components/search-result-list/SearchResultList";
import {
  FacetField,
  SearchWithPaginationQuery,
  useSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import { Work } from "../../core/utils/types/entities";
import {
  createFilters,
  useGetFacets
} from "../../components/facet-browser/helper";
import useFilterHandler from "./useFilterHandler";
import { TermOnClickHandler } from "./types";
import { useStatistics } from "../../core/statistics/useStatistics";
import { useCampaignMatchPOST } from "../../core/dpl-cms/dpl-cms";
import {
  CampaignMatchPOST200,
  CampaignMatchPOSTBodyItem
} from "../../core/dpl-cms/model";
import Campaign from "../../components/campaign/Campaign";
import FacetBrowserModal from "../../components/facet-browser/FacetBrowserModal";
import { statistics } from "../../core/statistics/statistics";
import FacetLine from "../../components/facet-line/FacetLine";
import { getUrlQueryParam } from "../../core/utils/helpers/url";
import useGetCleanBranches from "../../core/utils/branches";
import { dataIsNotEmpty } from "../../core/utils/helpers/general";

interface SearchResultProps {
  q: string;
  pageSize: number;
}

const SearchResult: React.FC<SearchResultProps> = ({ q, pageSize }) => {
  const cleanBranches = useGetCleanBranches();
  const [resultItems, setResultItems] = useState<Work[]>([]);
  const [hitcount, setHitCount] = useState<number>(0);
  const [canWeTrackHitcount, setCanWeTrackHitcount] = useState<boolean>(false);
  const { PagerComponent, page } = usePager(hitcount, pageSize);
  const { filters, filterHandler } = useFilterHandler();
  const { mutate } = useCampaignMatchPOST();
  const [campaignData, setCampaignData] = useState<CampaignMatchPOST200 | null>(
    null
  );
  const filteringHandler: TermOnClickHandler = (filterInfo) => {
    filterHandler(filterInfo);
  };
  const { facets: campaignFacets } = useGetFacets(q, filters);

  // If q changes (eg. in Storybook context)
  // then make sure that we reset the entire result set.
  useDeepCompareEffect(() => {
    setResultItems([]);
  }, [q, pageSize, filters]);

  const { track } = useStatistics();
  useEffect(() => {
    track("click", {
      id: statistics.searchQuery.id,
      name: statistics.searchQuery.name,
      trackedData: q
    });
    // We actually just want to track if the query changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  useDeepCompareEffect(() => {
    if (campaignFacets) {
      mutate(
        {
          data: campaignFacets as CampaignMatchPOSTBodyItem[]
        },
        {
          onSuccess: (campaign) => {
            setCampaignData(campaign);
          },
          onError: () => {
            // TODO: when we handle errors - handle this error
          }
        }
      );
    }
  }, [campaignFacets, mutate]);

  // Check for material type filters in url on pageload
  // This is an initial, intentionally simple approach supporting what is required by the search header.
  // It could be reworked to support all filters and terms at a later point.
  useEffect(() => {
    const materialTypeUrlFilter = getUrlQueryParam("materialType");
    if (materialTypeUrlFilter) {
      filterHandler({
        filterItem: {
          facet: FacetField.MaterialTypes,
          term: { key: materialTypeUrlFilter, term: materialTypeUrlFilter }
        },
        action: "add"
      });
    }
    // We only want to do this once, so we need the dependency array empty
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data } = useSearchWithPaginationQuery({
    q: { all: q },
    offset: page * pageSize,
    limit: pageSize,
    filters: createFilters(filters, cleanBranches)
  });

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
      setResultItems((prev) => [...prev, ...resultWorks]);
      return;
    }

    setResultItems(resultWorks);
  }, [data, page]);

  useEffect(() => {
    // We want to disregard the first hitcount because it is always 0 and doesn't
    // represent reality (the number is set manually by us in the code). We only
    // track all the following hitcount values that are based on the data.
    if (!canWeTrackHitcount) {
      setCanWeTrackHitcount(true);
      return;
    }
    track("click", {
      id: statistics.searchResultCount.id,
      name: statistics.searchResultCount.name,
      trackedData: hitcount ? hitcount.toString() : "0"
    });
    // We actaully just want to track if the hitcount changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hitcount]);

  useEffect(() => {
    if (campaignData?.data?.title) {
      track("click", {
        id: statistics.campaignShown.id,
        name: statistics.campaignShown.name,
        trackedData: campaignData.data.title
      });
    }
    // We only want to track when campaignData changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignData]);

  return (
    <div className="search-result-page">
      <SearchResultHeader hitcount={hitcount} q={q} />
      <FacetLine q={q} filters={filters} filterHandler={filteringHandler} />
      {campaignData && campaignData.data && (
        <Campaign campaignData={campaignData.data} />
      )}
      <SearchResultList resultItems={resultItems} />
      {PagerComponent}
      {dataIsNotEmpty(resultItems) && (
        <FacetBrowserModal
          q={q}
          filters={filters}
          filterHandler={filteringHandler}
        />
      )}
    </div>
  );
};

export default SearchResult;

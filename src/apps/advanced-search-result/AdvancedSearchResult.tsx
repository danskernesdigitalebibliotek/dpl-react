import React, { useEffect, useState } from "react";
import { useDeepCompareEffect } from "react-use";
import useGetCleanBranches from "../../core/utils/branches";
import { Work } from "../../core/utils/types/entities";
import usePager from "../../components/result-pager/use-pager";
import { useStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";
import {
  useSearchWithPaginationQuery,
  SearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import AdvancedSearchResultSkeleton from "./AdvancedSearchResultSkeleton";
import { useText } from "../../core/utils/text";
import { Button } from "../../components/Buttons/Button";
import SearchResultList from "../../components/card-item-list/SearchResultList";
import SearchResultZeroHits from "../search-result/search-result-zero-hits";

interface AdvancedSearchResultProps {
  q: string;
  pageSize: number;
}

const AdvancedSearchResult: React.FC<AdvancedSearchResultProps> = ({
  q,
  pageSize
}) => {
  const cleanBranches = useGetCleanBranches();
  const [resultItems, setResultItems] = useState<Work[]>([]);
  const [hitcount, setHitCount] = useState<number>(0);
  const { PagerComponent, page } = usePager({
    hitcount,
    pageSize
  });
  const t = useText();
  const copyTextToClipboard = (query: string) => {
    navigator.clipboard.writeText(query);
  };
  const [cql, setCql] = useState<string>(q);

  // On every render we take the url parameter and set it as sql search query.
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("q")) {
      setCql((prev) => {
        return searchParams.get("q") || prev;
      });
    }
  }, []);

  // If q changes (eg. in Storybook context)
  // then make sure that we reset the entire result set.
  useDeepCompareEffect(() => {
    setResultItems([]);
  }, [q, pageSize]);

  const { track } = useStatistics();
  useEffect(() => {
    track("click", {
      id: statistics.searchQuery.id,
      name: statistics.searchQuery.name,
      trackedData: cql
    });
    // We actually just want to track if the sql query changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cql]);

  const { data, isLoading } = useSearchWithPaginationQuery({
    q: { all: cql },
    offset: page * pageSize,
    limit: pageSize,
    filters: {
      branchId: cleanBranches
    }
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
    // If page has changed then append the new result to the existing result.
    if (page > 0) {
      setResultItems((prev) => [...prev, ...resultWorks]);
      return;
    }
    setResultItems(resultWorks);
  }, [data, page]);

  if (isLoading) {
    return <AdvancedSearchResultSkeleton q={cql} />;
  }

  if (hitcount === 0) {
    return <SearchResultZeroHits />;
  }

  return (
    <div className="card-list-page">
      <h1 className="text-header-h2 mb-16 search-result-title">
        {`${t("showingResultsForWithoutQueryText")}:`}
      </h1>
      <p className="text-body-large mt-16 mb-48">{cql}</p>
      <Button
        buttonType="none"
        collapsible={false}
        disabled={false}
        size="small"
        variant="outline"
        label="Copy query to clipboard"
        onClick={() => {
          copyTextToClipboard(cql);
        }}
      />
      <SearchResultList
        resultItems={resultItems}
        page={page}
        pageSize={pageSize}
      />
      <PagerComponent isLoading={isLoading} />
    </div>
  );
};

export default AdvancedSearchResult;

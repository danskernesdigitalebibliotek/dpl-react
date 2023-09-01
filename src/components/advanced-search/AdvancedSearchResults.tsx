import React, { useEffect, useState } from "react";
import { useDeepCompareEffect } from "react-use";
import { useText } from "../../core/utils/text";
import { Button } from "../Buttons/Button";
import SearchResultList from "../card-item-list/SearchResultList";
import { copyTextToClipboard } from "../../apps/advanced-search/helper";
import useGetCleanBranches from "../../core/utils/branches";
import { Work } from "../../core/utils/types/entities";
import usePager from "../result-pager/use-pager";
import {
  ComplexSearchWithPaginationQuery,
  useComplexSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";

interface AdvancedSearchResultProps {
  q: string;
  pageSize: number;
}

const AdvancedSearchResult: React.FC<AdvancedSearchResultProps> = ({
  q,
  pageSize
}) => {
  const t = useText();
  const cleanBranches = useGetCleanBranches();
  const [resultItems, setResultItems] = useState<Work[]>([]);
  const [hitcount, setHitCount] = useState<number>(0);
  const { PagerComponent, page } = usePager({
    hitcount,
    pageSize
  });
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

  const { data, isLoading } = useComplexSearchWithPaginationQuery({
    cql,
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
      complexSearch: { works: resultWorks, hitcount: resultCount }
    } = data as {
      complexSearch: {
        works: Work[];
        hitcount: ComplexSearchWithPaginationQuery["complexSearch"]["hitcount"];
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

  return (
    <>
      <div className="advanced-search__divider" />
      <h2 className="text-header-h2 advanced-search__title">
        Viser materialer ({hitcount})
      </h2>
      <button type="button" className="link-tag mb-16">
        {t("advancedSearchLinkToThisSearchText")}
      </button>
      <SearchResultList
        resultItems={resultItems}
        page={page}
        pageSize={pageSize}
      />
      <PagerComponent isLoading={isLoading} />
    </>
  );
};

export default AdvancedSearchResult;

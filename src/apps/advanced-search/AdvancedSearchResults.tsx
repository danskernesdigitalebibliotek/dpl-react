import React, { useEffect, useState } from "react";
import { useCopyToClipboard } from "react-use";
import CheckIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Check.svg";
import clsx from "clsx";
import { useText } from "../../core/utils/text";
import useGetCleanBranches from "../../core/utils/branches";
import { Work } from "../../core/utils/types/entities";
import {
  ComplexSearchWithPaginationQuery,
  useComplexSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import usePager from "../../components/result-pager/use-pager";
import SearchResultList from "../../components/card-item-list/SearchResultList";
import SearchResultZeroHits from "../search-result/search-result-zero-hits";
import { currentLocationWithParametersUrl } from "../../core/utils/helpers/url";

interface AdvancedSearchResultProps {
  q: string;
  pageSize: number;
  showContentOnly: boolean;
}

const AdvancedSearchResult: React.FC<AdvancedSearchResultProps> = ({
  q,
  pageSize,
  showContentOnly
}) => {
  const t = useText();
  const [copiedLinkToSearch, setCopiedLinkToSearch] = useState<boolean>(false);
  const cleanBranches = useGetCleanBranches();
  const [resultItems, setResultItems] = useState<Work[]>([]);
  const [hitcount, setHitCount] = useState<number>(0);
  const { PagerComponent, page } = usePager({
    hitcount,
    pageSize
  });
  const [cql, setCql] = useState<string>(q);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, copy] = useCopyToClipboard();

  useEffect(() => {
    setCql(q);
  }, [q]);

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
  useEffect(() => {
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

  const shouldShowSearchResults = isLoading || (!isLoading && hitcount > 0);
  const shouldShowResultHeadline = hitcount && !isLoading;

  useEffect(() => {
    if (copiedLinkToSearch) {
      setTimeout(() => {
        setCopiedLinkToSearch(false);
      }, 2000);
    }
  }, [copiedLinkToSearch]);

  return (
    <>
      <div className="advanced-search__divider" />
      <h2 className="text-header-h2 advanced-search__title capitalize-first">
        {isLoading && t("loadingResultsText")}
        {shouldShowResultHeadline &&
          t("showingMaterialsText", {
            placeholders: { "@hitcount": hitcount }
          })}
      </h2>
      {!showContentOnly && (
        <button
          type="button"
          className={clsx("link-tag mb-16 capitalize-first", {
            "cursor-pointer": !copiedLinkToSearch
          })}
          onClick={() => {
            copy(currentLocationWithParametersUrl({ linked: "true" }).href);
            setCopiedLinkToSearch(true);
          }}
        >
          {!copiedLinkToSearch && t("advancedSearchLinkToThisSearchText")}
          {copiedLinkToSearch && (
            <>
              {t("copiedLinkToThisSearchText")}
              <img className="inline-icon" src={CheckIcon} alt="" />{" "}
            </>
          )}
        </button>
      )}
      {shouldShowSearchResults && (
        <>
          <SearchResultList
            resultItems={resultItems}
            page={page}
            pageSize={pageSize}
          />
          <PagerComponent isLoading={isLoading} />
        </>
      )}
      {!isLoading && hitcount === 0 && <SearchResultZeroHits />}
    </>
  );
};

export default AdvancedSearchResult;

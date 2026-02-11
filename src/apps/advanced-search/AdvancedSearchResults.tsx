import React, { useEffect, useState, useMemo } from "react";
import { isEqual } from "lodash";
import { useCopyToClipboard, usePrevious } from "react-use";
import CheckIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Check.svg";
import clsx from "clsx";
import { useText } from "../../core/utils/text";
import useGetSearchBranches from "../../core/utils/branches";
import { Work } from "../../core/utils/types/entities";
import {
  ComplexSearchWithPaginationQuery,
  HoldingsStatusEnum,
  useComplexSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import usePager from "../../components/result-pager/use-pager";
import SearchResultList from "../../components/card-item-list/SearchResultList";
import SearchResultZeroHits from "../search-result/search-result-zero-hits";
import { currentLocationWithParametersUrl } from "../../core/utils/helpers/url";
import { LocationFilter } from "./LocationFilter";
import AdvancedSortSelect from "./AdvancedSortSelect";
import {
  advancedSortMap,
  AdvancedSortMapStrings,
  FirstAccessionOperatorFilter
} from "./types";

interface AdvancedSearchResultProps {
  q: string;
  pageSize: number;
  showContentOnly: boolean;
  onShelf: boolean;
  locationFilter: LocationFilter;
  firstAccessionDateFilter: string | null;
  firstAccessionOperatorFilter: FirstAccessionOperatorFilter;
  sort: AdvancedSortMapStrings;
  setSort: (value: AdvancedSortMapStrings) => void;
}

type FilterState = Pick<
  AdvancedSearchResultProps,
  | "locationFilter"
  | "firstAccessionDateFilter"
  | "firstAccessionOperatorFilter"
  | "sort"
>;

const AdvancedSearchResult: React.FC<AdvancedSearchResultProps> = ({
  q,
  pageSize,
  showContentOnly,
  onShelf,
  locationFilter,
  firstAccessionDateFilter,
  firstAccessionOperatorFilter,
  sort,
  setSort
}) => {
  const t = useText();
  const [copiedLinkToSearch, setCopiedLinkToSearch] = useState<boolean>(false);
  const cleanBranches = useGetSearchBranches();
  const [resultItems, setResultItems] = useState<Work[]>([]);
  const [hitcount, setHitCount] = useState<number>(0);
  const { PagerComponent, page, resetPage } = usePager({
    hitcount,
    pageSize
  });
  const [cql, setCql] = useState<string>(q);
  const [, copy] = useCopyToClipboard();

  const currentFilters: FilterState = useMemo(
    () => ({
      locationFilter,
      firstAccessionDateFilter,
      firstAccessionOperatorFilter,
      sort
    }),
    [
      locationFilter,
      firstAccessionDateFilter,
      firstAccessionOperatorFilter,
      sort
    ]
  );
  const prevFilters = usePrevious(currentFilters);

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
      branchId: cleanBranches,
      status: onShelf ? [HoldingsStatusEnum.Onshelf] : [],
      ...(locationFilter?.location?.length && {
        location: locationFilter.location
      }),
      ...(locationFilter?.sublocation?.length && {
        sublocation: locationFilter.sublocation
      }),
      ...(locationFilter?.branch?.length && {
        branch: locationFilter.branch
      }),
      ...(locationFilter?.department?.length && {
        department: locationFilter.department
      }),
      ...(firstAccessionDateFilter && firstAccessionOperatorFilter
        ? {
            firstAccessionDate: `${firstAccessionOperatorFilter} ${firstAccessionDateFilter}`
          }
        : {})
    },
    ...(sort ? { sort: advancedSortMap[sort as AdvancedSortMapStrings] } : {})
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
  }, [data, locationFilter, page]);

  const shouldShowSearchResults = isLoading || (!isLoading && hitcount > 0);
  const shouldShowResultHeadline = !!(hitcount && !isLoading);

  useEffect(() => {
    if (copiedLinkToSearch) {
      // We reset copiedLinkToSearch to switch from "link copied" to "copy link"
      // text again. 2 seconds timeout makes sure the user notices the change.
      setTimeout(() => {
        setCopiedLinkToSearch(false);
      }, 2000);
    }
  }, [copiedLinkToSearch]);

  // Reset page to 0 when filters or sort change (but not on initial render)
  useEffect(() => {
    if (prevFilters && !isEqual(prevFilters, currentFilters)) {
      resetPage();
    }
  }, [resetPage, prevFilters, currentFilters]);

  return (
    <>
      {!showContentOnly && <div className="advanced-search__divider" />}
      <section className="content-list-page">
        <h2
          className="content-list-page__heading"
          /* ID is used to scroll to the results upon hitting the search button. */
          id="advanced-search-result"
          aria-live="polite"
        >
          {isLoading && <>{t("loadingResultsText")}</>}
          {shouldShowResultHeadline && (
            <>
              {t("showingMaterialsText", {
                placeholders: { "@hitcount": hitcount }
              })}
            </>
          )}
        </h2>
        {!showContentOnly && (
          <div className="content-list-page__subheading">
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
          </div>
        )}
        {shouldShowSearchResults && (
          <>
            <ul className="content-list-page__filters">
              <AdvancedSortSelect sort={sort} setSort={setSort} />
            </ul>
            <SearchResultList
              resultItems={resultItems}
              page={page}
              pageSize={pageSize}
            />
            <PagerComponent isLoading={isLoading} />
          </>
        )}
        {!isLoading && hitcount === 0 && <SearchResultZeroHits />}
      </section>
    </>
  );
};

export default AdvancedSearchResult;

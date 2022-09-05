import React, { useEffect, useState } from "react";
import SearchResultHeader from "../../components/search-bar/search-result-header/SearchResultHeader";
import SearchResultList from "../../components/search-result-list/search-result.list";
import SearchResultPager from "../../components/search-result-pager/search-result-pager";
import {
  SearchResponse,
  useSearchWithPaginationQuery,
  WorkSmallFragment
} from "../../core/dbc-gateway/generated/graphql";

interface SearchResultProps {
  q: string;
  pageSize: number;
}

const SearchResult: React.FC<SearchResultProps> = ({ q, pageSize }) => {
  const [resultItems, setResultItems] = useState<WorkSmallFragment[] | []>([]);
  const [hitcount, setHitCount] = useState<SearchResponse["hitcount"] | number>(
    0
  );
  const [page, setPage] = useState(0);
  const [searchItemsShown, setSearchItemsShown] = useState(pageSize);

  const setPageHandler = () => {
    const currentPage = page + 1;
    setPage(currentPage);
    setSearchItemsShown((currentPage + 1) * pageSize);
  };

  // If q changes (eg. in Storybook context)
  //  then make sure that we reset the entire result set.
  useEffect(() => {
    setResultItems([]);
    setPage(0);
    setSearchItemsShown(pageSize);
  }, [q, pageSize]);

  useSearchWithPaginationQuery(
    {
      q: { all: q },
      offset: page * pageSize,
      limit: pageSize
    },
    {
      // If the component is used in Storybook context
      // the same query and other parameters might come twice within the global stale time.
      // If that happens the onssuccess handler will not be called and we cannot
      // see the functionality of it properly.
      // By setting it to zero here we basically disable the cache for search queries,
      // which is tolerable since the same query probably won't occur in production
      // within a reasonable global stale time.
      staleTime: 0,
      onSuccess: (result) => {
        const {
          search: { works: resultWorks, hitcount: resultCount }
        } = result;

        setResultItems([...resultItems, ...resultWorks]);

        if (!hitcount) {
          setHitCount(resultCount);
        }
      }
    }
  );

  const hasSearchItemsLeft = searchItemsShown < hitcount;
  const worksAreLoaded = Boolean(resultItems.length);
  const moreWorksToBeLoaded = worksAreLoaded && hasSearchItemsLeft;

  return (
    <div className="search-result-page">
      <SearchResultHeader hitcount={String(hitcount)} q={q} />
      {worksAreLoaded && <SearchResultList resultItems={resultItems} />}
      {moreWorksToBeLoaded && (
        <SearchResultPager
          searchItemsShown={searchItemsShown}
          hitcount={hitcount}
          setPageHandler={setPageHandler}
        />
      )}
    </div>
  );
};

export default SearchResult;

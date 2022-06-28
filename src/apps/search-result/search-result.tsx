import React, { useEffect, useState } from "react";
import SearchResultList from "../../components/search-result-list/search-result.list";
import SearchResultPager from "../../components/search-result-pager/search-result-pager";
import {
  SearchWithPaginationQuery,
  useSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";

interface SearchResultProps {
  q: string;
  pageSize: number;
}

const SearchResult: React.FC<SearchResultProps> = ({ q, pageSize }) => {
  const [resultItems, setResultItems] = useState<
    SearchWithPaginationQuery["search"]["works"] | []
  >([]);
  const [hitcount, setHitCount] = useState<
    SearchWithPaginationQuery["search"]["hitcount"] | number
  >(0);
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
    <>
      {worksAreLoaded && <SearchResultList resultItems={resultItems} />}
      {moreWorksToBeLoaded && (
        <SearchResultPager
          searchItemsShown={searchItemsShown}
          hitcount={hitcount}
          setPageHandler={setPageHandler}
        />
      )}
    </>
  );
};

export default SearchResult;

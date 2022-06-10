import React, { useEffect, useState } from "react";
import SearchResultList from "../../components/search-result-list/search-result.list";
import SearchResultPager from "../../components/search-result-pager/search-result-pager";
import {
  SearchWithPaginationQuery,
  useSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";

interface SearchResultProps {
  q: string | null;
}

const SearchResult: React.FC<SearchResultProps> = ({ q }) => {
  const [works, setWorks] = useState<
    SearchWithPaginationQuery["search"]["works"] | []
  >([]);
  const [hitcount, setHitCount] = useState<
    SearchWithPaginationQuery["search"]["hitcount"] | number
  >(0);
  const pageSizeDesktop = 20;
  const [page, setPage] = useState(1);
  const [searchItemsShown, setSearchItemsShown] = useState(pageSizeDesktop);
  const [readyToFetch, setReadyToFetch] = useState(true);

  const setPageHandler = () => {
    const currentPage = page + 1;
    setPage(currentPage);
    setReadyToFetch(true);
    setSearchItemsShown(currentPage * pageSizeDesktop);
  };

  const { isSuccess, data } = useSearchWithPaginationQuery({
    q: { all: q },
    offset: page === 1 ? 0 : searchItemsShown,
    limit: pageSizeDesktop
  });

  useEffect(() => {
    if (readyToFetch && isSuccess && data) {
      const {
        search: { works: resultWorks, hitcount: resultCount }
      } = data;
      setWorks([...works, ...resultWorks]);
      setReadyToFetch(false);
      if (!hitcount) {
        setHitCount(resultCount);
      }
    }
  }, [data, isSuccess, works, page, hitcount, readyToFetch]);

  const hasSearchItemsLeft = searchItemsShown < hitcount;
  const searchListIsVisible = Boolean(works.length);
  const pagerIsVisible = searchListIsVisible && hasSearchItemsLeft;

  return (
    <>
      {searchListIsVisible && <SearchResultList works={works} />}
      {pagerIsVisible && (
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

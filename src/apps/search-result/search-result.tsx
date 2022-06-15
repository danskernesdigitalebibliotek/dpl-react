import React, { useEffect, useState } from "react";
import SearchResultList from "../../components/search-result-list/search-result.list";
import SearchResultPager from "../../components/search-result-pager/search-result-pager";
import {
  SearchWithPaginationQuery,
  useSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import { usePrevious } from "../../core/utils/helpers";

interface SearchResultProps {
  q: string;
  numberOfResultItems: number;
}

const SearchResult: React.FC<SearchResultProps> = ({
  q,
  numberOfResultItems
}) => {
  const [resultItems, setResultItems] = useState<
    SearchWithPaginationQuery["search"]["works"] | []
  >([]);
  const [hitcount, setHitCount] = useState<
    SearchWithPaginationQuery["search"]["hitcount"] | number
  >(0);
  const [page, setPage] = useState(1);
  const [searchItemsShown, setSearchItemsShown] = useState(numberOfResultItems);

  const setPageHandler = () => {
    const currentPage = page + 1;
    setPage(currentPage);
    setSearchItemsShown(currentPage * numberOfResultItems);
  };

  const { isSuccess, data } = useSearchWithPaginationQuery({
    q: { all: q },
    offset: page === 1 ? 0 : searchItemsShown,
    limit: numberOfResultItems
  });

  // The first item of the fetched works.
  const firstWork = data?.search?.works?.[0]?.id;
  // The first item of the last time we fetched the works.
  const firstPreviousWork = usePrevious(firstWork);
  // If they differ data has changed ¯\_(ツ)_/¯.
  const dataHasChanged = firstWork !== firstPreviousWork;

  useEffect(() => {
    // If new data has not been loaded do nothing.
    if (!dataHasChanged) {
      return;
    }

    if (isSuccess && data) {
      const {
        search: { works: resultWorks, hitcount: resultCount }
      } = data;

      setResultItems([...resultItems, ...resultWorks]);

      if (!hitcount) {
        setHitCount(resultCount);
      }
    }
  }, [data, isSuccess, resultItems, page, hitcount, dataHasChanged]);

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

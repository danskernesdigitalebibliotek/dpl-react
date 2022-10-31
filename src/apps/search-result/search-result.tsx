import React, { useEffect, useState } from "react";
import SearchResultHeader from "../../components/search-bar/search-result-header/SearchResultHeader";
import usePager from "../../components/result-pager/use-pager";
import SearchResultList from "../../components/search-result-list/search-result.list";
import {
  SearchWithPaginationQuery,
  useSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import { Work } from "../../core/utils/types/entities";
import FacetBrowserModal from "../../components/facet-browser/FacetBrowserModal";
import { formatFilters } from "./helpers";
import useFilterHandler from "./useFilterHandler";
import { isObjectEmpty } from "../../core/utils/helpers/general";
import { TagOnclickHandler } from "./types";

interface SearchResultProps {
  q: string;
  pageSize: number;
}

const SearchResult: React.FC<SearchResultProps> = ({ q, pageSize }) => {
  const [resultItems, setResultItems] = useState<Work[]>([]);
  const [hitcount, setHitCount] = useState<number>(0);
  const { PagerComponent, page, resetPager } = usePager(hitcount, pageSize);
  const { filters, filterHandler } = useFilterHandler();

  const filteringHandler: TagOnclickHandler = (filterInfo) => {
    filterHandler(filterInfo);
    resetPager();
  };

  // If q changes (eg. in Storybook context)
  //  then make sure that we reset the entire result set.
  useEffect(() => {
    setResultItems([]);
  }, [q, pageSize, filters]);

  useSearchWithPaginationQuery(
    {
      q: { all: q },
      offset: page * pageSize,
      limit: pageSize,
      ...(isObjectEmpty(filters)
        ? {}
        : { filters: { ...formatFilters(filters) } })
    },
    {
      staleTime: 0,
      onSuccess: (result) => {
        const {
          search: { works: resultWorks, hitcount: resultCount }
        } = result as {
          search: {
            works: Work[];
            hitcount: SearchWithPaginationQuery["search"]["hitcount"];
          };
        };

        setHitCount(resultCount);

        setResultItems([...resultItems, ...resultWorks]);
      }
    }
  );

  const worksAreLoaded = Boolean(resultItems.length);

  return (
    <div className="search-result-page">
      {worksAreLoaded && (
        <>
          <SearchResultHeader hitcount={String(hitcount)} q={q} />
          <SearchResultList resultItems={resultItems} filters={filters} q={q} />
          {PagerComponent}
        </>
      )}
      <FacetBrowserModal
        q={q}
        filters={filters}
        filterHandler={filteringHandler}
      />
    </div>
  );
};

export default SearchResult;

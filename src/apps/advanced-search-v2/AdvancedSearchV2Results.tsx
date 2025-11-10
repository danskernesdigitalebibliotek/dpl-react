import React, { useEffect, useState, useMemo } from "react";
import { useQueryState, parseAsJson } from "nuqs";
import {
  useComplexSearchWithPaginationQuery,
  ComplexSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import usePager from "../../components/result-pager/use-pager";
import SearchResultList from "../../components/card-item-list/SearchResultList";
import SearchResultZeroHits from "../search-result/search-result-zero-hits";

type SuggestState = {
  term: string;
  query: string;
};

type MultiSelectState = {
  term: string;
  selectedValues: string[];
};

interface AdvancedSearchV2ResultsProps {
  suggests: SuggestState[];
  selects: MultiSelectState[];
  pageSize?: number;
}

// Helper function to build CQL query from filter state
const buildCQLQuery = (
  suggests: SuggestState[],
  selects: MultiSelectState[],
  facets: MultiSelectState[]
): string => {
  const parts: string[] = [];

  // Add suggest queries
  suggests.forEach((suggest) => {
    if (suggest.query.trim()) {
      // Use CQL index=value format
      parts.push(`${suggest.term}="${suggest.query}"`);
    }
  });

  // Add select search filters
  selects.forEach((select) => {
    select.selectedValues.forEach((value) => {
      parts.push(`${select.term}="${value}"`);
    });
  });

  // Add facet filters
  facets.forEach((facet) => {
    facet.selectedValues.forEach((value) => {
      parts.push(`${facet.term}="${value}"`);
    });
  });

  // Join all parts with AND
  return parts.length > 0 ? parts.join(" AND ") : "*";
};

type WorkResult =
  ComplexSearchWithPaginationQuery["complexSearch"]["works"][number];

const AdvancedSearchV2Results: React.FC<AdvancedSearchV2ResultsProps> = ({
  suggests,
  selects,
  pageSize = 50
}) => {
  // Read facets from URL directly
  const [facets] = useQueryState(
    "facets",
    parseAsJson((value) => value as MultiSelectState[])
      .withDefault([])
  );
  const [resultItems, setResultItems] = useState<WorkResult[]>([]);
  const [hitcount, setHitCount] = useState<number>(0);
  const { PagerComponent, page, resetPage } = usePager({
    hitcount,
    pageSize
  });

  // Build CQL query from current state - memoized to prevent infinite loops
  const cql = useMemo(
    () => buildCQLQuery(suggests, selects, facets),
    [suggests, selects, facets]
  );

  // Fetch search results - disabled if no query
  const { data, isLoading } = useComplexSearchWithPaginationQuery(
    {
      cql,
      offset: page * pageSize,
      limit: pageSize,
      filters: {}
    },
    {
      enabled: cql !== "*"
    }
  );

  // Update results when data changes
  useEffect(() => {
    if (!data) {
      return;
    }

    const {
      complexSearch: { works: resultWorks, hitcount: resultCount }
    } = data;

    setHitCount(resultCount);

    // If page has changed then append the new result to the existing result
    if (page > 0) {
      setResultItems((prev) => [...prev, ...resultWorks]);
      return;
    }

    setResultItems(resultWorks);
  }, [data, page]);

  // Reset results when query changes
  useEffect(() => {
    setResultItems([]);
    setHitCount(0);
    resetPage();
  }, [cql]);

  const shouldShowSearchResults = isLoading || (!isLoading && hitcount > 0);
  const shouldShowResultHeadline = !!(hitcount && !isLoading);

  // Don't show results if there's no query
  if (cql === "*") {
    return null;
  }

  return (
    <section className="content-list-page">
      <h2
        className="content-list-page__heading"
        id="advanced-search-result"
        aria-live="polite"
      >
        {isLoading && <>Loading results...</>}
        {shouldShowResultHeadline && <>Showing {hitcount} materials</>}
      </h2>

      {shouldShowSearchResults && (
        <>
          <SearchResultList
            resultItems={resultItems as any}
            page={page}
            pageSize={pageSize}
          />
          <PagerComponent isLoading={isLoading} />
        </>
      )}

      {!isLoading && hitcount === 0 && <SearchResultZeroHits />}
    </section>
  );
};

export default AdvancedSearchV2Results;

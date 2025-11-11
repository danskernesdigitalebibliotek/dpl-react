import React, { useEffect, useState, useMemo } from "react";
import { useQueryState, parseAsJson } from "nuqs";
import {
  useComplexSearchWithPaginationQuery,
  FacetFieldEnum
} from "../../core/dbc-gateway/generated/graphql";
import usePager from "../../components/result-pager/use-pager";
import SearchResultList from "../../components/card-item-list/SearchResultList";
import SearchResultZeroHits from "../search-result/search-result-zero-hits";
import AdvancedSearchV2Facets from "./AdvancedSearchV2Facets";
import { SuggestState, MultiSelectState, FacetState } from "./types";
import { Work } from "../../core/utils/types/entities";

interface AdvancedSearchV2ResultsProps {
  pageSize?: number;
}

// Map FacetFieldEnum to CQL field names
const facetToCqlField: Partial<Record<FacetFieldEnum, string>> = {
  [FacetFieldEnum.Materialtypesspecific]: "term.specificmaterialtype",
  [FacetFieldEnum.Creators]: "term.creator",
  [FacetFieldEnum.Subjects]: "term.subject",
  [FacetFieldEnum.Mainlanguages]: "term.mainlanguage",
  [FacetFieldEnum.Generalaudience]: "term.audience",
  [FacetFieldEnum.Fictionalcharacters]: "term.fictionalcharacter",
  [FacetFieldEnum.Genreandform]: "term.genreandform",
  [FacetFieldEnum.Age]: "term.age",
  [FacetFieldEnum.Lix]: "term.lix"
};

// Helper function to build CQL query from search inputs and facets
const buildCQLQuery = (
  suggests: SuggestState[],
  selects: MultiSelectState[],
  facets: FacetState[]
): string => {
  const parts: string[] = [];

  // Add suggest queries
  suggests.forEach((suggest) => {
    if (suggest.query.trim()) {
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
    const cqlField = facetToCqlField[facet.facetField];
    if (cqlField) {
      facet.selectedValues.forEach((value) => {
        parts.push(`${cqlField}="${value}"`);
      });
    }
  });

  return parts.length > 0 ? parts.join(" AND ") : "*";
};

// Helper function to build simple search query for facets (without CQL syntax)
const buildFacetQuery = (
  suggests: SuggestState[],
  selects: MultiSelectState[]
): string => {
  const parts: string[] = [];

  suggests.forEach((suggest) => {
    if (suggest.query.trim()) {
      parts.push(suggest.query);
    }
  });

  selects.forEach((select) => {
    select.selectedValues.forEach((value) => {
      parts.push(value);
    });
  });

  return parts.length > 0 ? parts.join(" ") : "*";
};

const AdvancedSearchV2Results: React.FC<AdvancedSearchV2ResultsProps> = ({
  pageSize = 50
}) => {
  // Read all search state from URL
  const [suggests] = useQueryState(
    "suggests",
    parseAsJson((value) => value as SuggestState[]).withDefault([])
  );

  const [selects] = useQueryState(
    "selects",
    parseAsJson((value) => value as MultiSelectState[]).withDefault([])
  );

  const [facets] = useQueryState(
    "facets",
    parseAsJson((value) => value as FacetState[]).withDefault([])
  );
  const [resultItems, setResultItems] = useState<Work[]>([]);
  const [hitcount, setHitCount] = useState(0);
  const [isRefetching, setIsRefetching] = useState(false);
  const [lastQueryStr, setLastQueryStr] = useState("");
  const [canShowZeroResults, setCanShowZeroResults] = useState(false);
  const { PagerComponent, page, resetPage } = usePager({ hitcount, pageSize });

  // Build CQL query from all inputs
  const cql = useMemo(
    () => buildCQLQuery(suggests, selects, facets),
    [suggests, selects, facets]
  );

  // Build simple query for facets (without facet filters)
  const facetQuery = useMemo(
    () => buildFacetQuery(suggests, selects),
    [suggests, selects]
  );

  const hasQuery = cql !== "*";

  // Fetch search results - disabled if no query
  const { data, isLoading, isFetching } = useComplexSearchWithPaginationQuery(
    {
      cql,
      offset: page * pageSize,
      limit: pageSize,
      filters: {}
    },
    {
      enabled: hasQuery,
      keepPreviousData: false,
      cacheTime: 0,
      staleTime: 0
    }
  );

  // Update results when data changes
  useEffect(() => {
    if (!data) {
      return;
    }

    const {
      complexSearch: { works: resultWorks, hitcount: resultCount }
    } = data as {
      complexSearch: {
        works: Work[];
        hitcount: number;
      };
    };

    setHitCount(resultCount);

    // If page has changed then append the new result to the existing result
    if (page > 0) {
      setResultItems((prev) => [...prev, ...resultWorks]);
      return;
    }

    setResultItems(resultWorks);
  }, [data, page]);

  // Reset results when CQL query changes
  const currentQueryStr = useMemo(() => cql, [cql]);

  useEffect(() => {
    if (currentQueryStr !== lastQueryStr) {
      setResultItems([]);
      setHitCount(0);
      setIsRefetching(true);
      setCanShowZeroResults(false);
      setLastQueryStr(currentQueryStr);
      resetPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQueryStr]);

  // Update refetching state when data arrives
  useEffect(() => {
    if (!isFetching && !isLoading && isRefetching) {
      setIsRefetching(false);
      setCanShowZeroResults(true);
    }
  }, [isFetching, isLoading, isRefetching]);

  const isLoadingOrRefetching = isLoading || isFetching || isRefetching;
  const shouldShowSearchResults =
    isLoadingOrRefetching || resultItems.length > 0;
  const shouldShowResultHeadline = hitcount > 0 && !isLoadingOrRefetching;
  const shouldShowZeroResults =
    !isLoadingOrRefetching && hitcount === 0 && data && canShowZeroResults;

  if (!hasQuery) return null;

  return (
    <>
      <AdvancedSearchV2Facets fetchQuery={facetQuery} />
      <section className="content-list-page">
        <h2
          className="content-list-page__heading"
          id="advanced-search-result"
          aria-live="polite"
        >
          {isLoadingOrRefetching && "Loading results..."}
          {shouldShowResultHeadline && `Showing ${hitcount} materials`}
        </h2>

        {shouldShowSearchResults && (
          <>
            <SearchResultList
              resultItems={resultItems}
              page={page}
              pageSize={pageSize}
            />
            <PagerComponent isLoading={isLoadingOrRefetching} />
          </>
        )}

        {shouldShowZeroResults && <SearchResultZeroHits />}
      </section>
    </>
  );
};

export default AdvancedSearchV2Results;

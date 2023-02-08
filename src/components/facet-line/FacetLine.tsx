import React, { memo } from "react";
import {
  FilterItemTerm,
  TermOnClickHandler
} from "../../apps/search-result/types";
import {
  FacetResult,
  useIntelligentFacetsQuery
} from "../../core/dbc-gateway/generated/graphql";
import FacetLineSelected from "./FacetLineSelected";
import FacetLineFilters from "./FacetLineFilters";
import { createFilters } from "../facet-browser/helper";
import useGetCleanBranches from "../../core/utils/branches";
import FacetLineFiltersSkeleton from "./FacetLineFiltersSkeleton";

type FacetLineProps = {
  q: string;
  filters: { [key: string]: { [key: string]: FilterItemTerm } };
  filterHandler: TermOnClickHandler;
};

const FacetLine: React.FunctionComponent<FacetLineProps> = ({
  q,
  filters,
  filterHandler
}) => {
  const cleanBranches = useGetCleanBranches();

  const { data } = useIntelligentFacetsQuery({
    q: { all: q },
    facetsLimit: 6,
    valuesLimit: 5,
    filters: createFilters(filters, cleanBranches)
  });

  return (
    <>
      {!data && <FacetLineFiltersSkeleton />}
      {data && (
        <FacetLineFilters
          filters={filters}
          facets={data.search.intelligentFacets as FacetResult[]}
          filterHandler={filterHandler}
        />
      )}
      <FacetLineSelected filters={filters} filterHandler={filterHandler} />
    </>
  );
};

export default memo(FacetLine);

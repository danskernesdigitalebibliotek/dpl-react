import React, { memo } from "react";
import { useIntelligentFacetsQuery } from "../../core/dbc-gateway/generated/graphql";
import FacetLineSelected from "./FacetLineSelected";
import FacetLineFilters from "./FacetLineFilters";
import useGetSearchBranches from "../../core/utils/branches";
import FacetLineFiltersSkeleton from "./FacetLineFiltersSkeleton";
import useFilterHandler from "../../apps/search-result/useFilterHandler";
import { createFilters } from "../../apps/search-result/helper";

type FacetLineProps = {
  q: string;
};

const FacetLine: React.FunctionComponent<FacetLineProps> = ({ q }) => {
  const { filters } = useFilterHandler();
  const cleanBranches = useGetSearchBranches();
  const { data, isLoading } = useIntelligentFacetsQuery({
    q: { all: q },
    facetsLimit: 5,
    valuesLimit: 50,
    filters: createFilters(filters, cleanBranches)
  });

  return (
    <>
      {isLoading && <FacetLineFiltersSkeleton />}
      {data && <FacetLineFilters facets={data.search.intelligentFacets} />}
      <FacetLineSelected />
    </>
  );
};

export default memo(FacetLine);

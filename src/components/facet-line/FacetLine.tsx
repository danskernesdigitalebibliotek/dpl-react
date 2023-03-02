import React, { memo } from "react";
import { useIntelligentFacetsQuery } from "../../core/dbc-gateway/generated/graphql";
import FacetLineSelected from "./FacetLineSelected";
import FacetLineFilters from "./FacetLineFilters";
import { createFilters } from "../facet-browser/helper";
import useGetCleanBranches from "../../core/utils/branches";
import FacetLineFiltersSkeleton from "./FacetLineFiltersSkeleton";
import useFilterHandler from "../../apps/search-result/useFilterHandler";

type FacetLineProps = {
  q: string;
  hitCount: number;
  isLoading: boolean;
};

const FacetLine: React.FunctionComponent<FacetLineProps> = ({
  q,
  hitCount,
  isLoading
}) => {
  const { filters } = useFilterHandler();

  const cleanBranches = useGetCleanBranches();

  const { data, isLoading: isLoadingFacets } = useIntelligentFacetsQuery({
    q: { all: q },
    facetsLimit: 6,
    valuesLimit: 5,
    filters: createFilters(filters, cleanBranches)
  });

  return (
    <>
      {(isLoading || isLoadingFacets) && <FacetLineFiltersSkeleton />}
      {data && hitCount > 0 && (
        <FacetLineFilters facets={data.search.intelligentFacets} />
      )}
      <FacetLineSelected />
    </>
  );
};

export default memo(FacetLine);

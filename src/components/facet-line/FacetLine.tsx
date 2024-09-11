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
};

const FacetLine: React.FunctionComponent<FacetLineProps> = ({ q }) => {
  const { filters, sorting } = useFilterHandler();

  const cleanBranches = useGetCleanBranches();
  const { data, isLoading } = useIntelligentFacetsQuery({
    q: { all: q },
    facetsLimit: 6,
    valuesLimit: 5,
    filters: createFilters(filters, cleanBranches),
    sorting: sorting?.key
  });

  return (
    <>
      {isLoading && <FacetLineFiltersSkeleton />}
      {data && <FacetLineFilters facets={data.search.intelligentFacets} sorting={data.search?.sorting} />}
      <FacetLineSelected />
    </>
  );
};

export default memo(FacetLine);

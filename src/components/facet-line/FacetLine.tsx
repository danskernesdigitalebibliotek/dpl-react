import React from "react";
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
  const { data } = useIntelligentFacetsQuery({
    q: { all: q },
    facetsLimit: 5,
    valuesLimit: 5
  });

  return (
    <>
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

export default FacetLine;

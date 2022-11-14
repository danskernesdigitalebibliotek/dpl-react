import * as React from "react";

import {
  FilterItemTerm,
  TermOnClickHandler
} from "../../../apps/search-result/types";
import {
  FacetResult,
  useIntelligentFacetsQuery
} from "../../../core/dbc-gateway/generated/graphql";
import { useText } from "../../../core/utils/text";
import FacetLine from "../../facet-line/FacetLine";
import FacetLineSelected from "../../facet-line/FacetLineSelected";

export interface SearchResultHeaderProps {
  hitcount: string;
  q: string;
  filters: { [key: string]: { [key: string]: FilterItemTerm } };
  filterHandler: TermOnClickHandler;
}

const SearchResultHeader: React.FC<SearchResultHeaderProps> = ({
  hitcount,
  q,
  filters,
  filterHandler
}) => {
  const t = useText();

  const { data } = useIntelligentFacetsQuery({
    q: { all: q },
    facetsLimit: 5,
    valuesLimit: 5
  });

  return (
    <>
      <h1 className="text-header-h2 mb-16 search-result-title">
        {`${t("showingResultsForText")} “${q}” (${hitcount})`}
      </h1>
      {data && (
        <FacetLine
          filters={filters}
          facets={data.search.intelligentFacets as FacetResult[]}
          filterHandler={filterHandler}
        />
      )}
      <FacetLineSelected filters={filters} filterHandler={filterHandler} />
    </>
  );
};

export default SearchResultHeader;

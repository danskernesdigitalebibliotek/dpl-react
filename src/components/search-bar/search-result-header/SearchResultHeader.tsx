import * as React from "react";
import {
  formatFacetTerms,
  getPlaceHolderFacets,
  lineFacets
} from "../../../apps/search-result/helpers";
import {
  FilterItemTerm,
  TermOnClickHandler
} from "../../../apps/search-result/types";
import {
  FacetResult,
  useSearchFacetQuery
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

  const { data } = useSearchFacetQuery(
    {
      q: { all: q },
      facets: lineFacets,
      facetLimit: 10,
      filters: formatFacetTerms(filters)
    },
    {
      keepPreviousData: true,
      placeholderData: {
        search: {
          facets: getPlaceHolderFacets(lineFacets)
        }
      }
    }
  );

  if (!data) {
    return null;
  }

  return (
    <>
      <h1 className="text-header-h2 mb-16 search-result-title">
        {`${t("showingResultsForText")} “${q}” (${hitcount})`}
      </h1>
      <FacetLine
        filters={filters}
        facets={data.search.facets as FacetResult[]}
        filterHandler={filterHandler}
      />
      <FacetLineSelected filters={filters} filterHandler={filterHandler} />
    </>
  );
};

export default SearchResultHeader;

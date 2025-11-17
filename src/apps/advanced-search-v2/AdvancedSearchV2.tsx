import React from "react";
import AdvancedSearchResultsWithFacets from "./components/AdvancedSearchResultsWithFacets";
import SearchForm from "./components/AdvancedSearchForm";

interface AdvancedSearchV2Props {
  pageSize: number;
}

const AdvancedSearchV2: React.FC<AdvancedSearchV2Props> = ({ pageSize }) => {
  return (
    <div className="advanced-search-v2">
      <SearchForm />

      <AdvancedSearchResultsWithFacets pageSize={pageSize} />
    </div>
  );
};

export default AdvancedSearchV2;

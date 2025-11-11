import React from "react";
import AdvancedSearchResultsWithFacets from "./components/AdvancedSearchResultsWithFacets";
import SearchForm from "./components/AdvancedSearchForm";

const AdvancedSearchV2: React.FC = () => {
  return (
    <div className="advanced-search-v2">
      <SearchForm />

      <AdvancedSearchResultsWithFacets />
    </div>
  );
};

export default AdvancedSearchV2;

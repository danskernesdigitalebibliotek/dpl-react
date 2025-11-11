import React from "react";
import AdvancedSearchV2Results from "./components/AdvancedSearchV2Results";
import SearchForm from "./components/SearchForm";

const AdvancedSearchV2: React.FC = () => {
  return (
    <div
      className="advanced-search-v2"
      style={{
        maxWidth: 1200,
        margin: "20px auto"
      }}
    >
      <SearchForm />

      {/* Results Section with Facets Sidebar */}
      <AdvancedSearchV2Results />
    </div>
  );
};

export default AdvancedSearchV2;

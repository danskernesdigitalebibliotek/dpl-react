import React, { useState } from "react";
import AdvancedSearchHeader from "../../components/advanced-search/AdvancedSearchHeader";
import AdvancedSearchResult from "../../components/advanced-search/AdvancedSearchResults";

interface AdvancedSearchProps {
  pageSize: number;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ pageSize }) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  return (
    <div className="advanced-search">
      <AdvancedSearchHeader setSearchQuery={setSearchQuery} />
      {searchQuery && (
        <AdvancedSearchResult q={searchQuery} pageSize={pageSize} />
      )}
    </div>
  );
};

export default AdvancedSearch;

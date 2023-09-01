import React, { useState } from "react";
import { useText } from "../../core/utils/text";
import AdvancedSearchHeader from "../../components/advanced-search/AdvancedSearchHeader";
import AdvancedSearchResult from "../../components/advanced-search/AdvancedSearchResults";

interface AdvancedSearchProps {
  pageSize: number;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ pageSize }) => {
  const t = useText();
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  return (
    <div className="advanced-search">
      <AdvancedSearchHeader setSearchQuery={setSearchQuery} />
      {showSearchResult && (
        <AdvancedSearchResult q="harry" pageSize={pageSize} />
      )}
    </div>
  );
};

export default AdvancedSearch;

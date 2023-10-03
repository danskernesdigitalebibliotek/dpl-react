import React, { useEffect, useState } from "react";
import AdvancedSearchHeader from "../../components/advanced-search/AdvancedSearchHeader";
import AdvancedSearchResult from "../../components/advanced-search/AdvancedSearchResults";
import { AdvancedSearchQuery } from "../../core/utils/types/advanced-search-types";
import { translateSearchObjectToCql } from "./helpers";

interface AdvancedSearchProps {
  pageSize: number;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ pageSize }) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchObject, setSearchObject] = useState<AdvancedSearchQuery | null>(
    null
  );

  useEffect(() => {
    if (searchObject === null) return;
    const cql = translateSearchObjectToCql(searchObject);
    if (cql.trim() === "") return;

    setSearchQuery(cql);
  }, [searchObject]);

  return (
    <div className="advanced-search">
      <AdvancedSearchHeader
        searchObject={searchObject}
        setSearchObject={setSearchObject}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {searchQuery && (
        <AdvancedSearchResult q={searchQuery} pageSize={pageSize} />
      )}
    </div>
  );
};

export default AdvancedSearch;

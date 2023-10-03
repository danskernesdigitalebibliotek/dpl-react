import React, { useEffect, useState } from "react";
import AdvancedSearchHeader from "./AdvancedSearchHeader";
import AdvancedSearchResult from "./AdvancedSearchResults";
import { translateSearchObjectToCql } from "./helpers";
import { AdvancedSearchQuery } from "./types";
import { getUrlQueryParam } from "../../core/utils/helpers/url";

interface AdvancedSearchProps {
  pageSize: number;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ pageSize }) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchObject, setSearchObject] = useState<AdvancedSearchQuery | null>(
    null
  );
  const [showResultOnly, setShowResultOnly] = useState<boolean>(false);

  useEffect(() => {
    if (searchObject === null) return;
    const cql = translateSearchObjectToCql(searchObject);
    if (cql.trim() === "") return;

    setSearchQuery(cql);
  }, [searchObject]);

  useEffect(() => {
    if (getUrlQueryParam("linked") === "true") {
      setShowResultOnly(true);
    }
  }, []);

  return (
    <div className="advanced-search">
      {!showResultOnly && (
        <AdvancedSearchHeader
          searchObject={searchObject}
          setSearchObject={setSearchObject}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      {searchQuery && (
        <AdvancedSearchResult
          q={searchQuery}
          pageSize={pageSize}
          showContentOnly={showResultOnly}
        />
      )}
    </div>
  );
};

export default AdvancedSearch;

import React, { useEffect, useState } from "react";
import { useEffectOnce } from "react-use";
import AdvancedSearchHeader from "./AdvancedSearchHeader";
import AdvancedSearchResult from "./AdvancedSearchResults";
import { translateSearchObjectToCql } from "./helpers";
import { AdvancedSearchQuery } from "./types";
import {
  getUrlQueryParam,
  removeQueryParametersFromUrl,
  setQueryParametersInUrl
} from "../../core/utils/helpers/url";

interface AdvancedSearchProps {
  pageSize: number;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ pageSize }) => {
  // searchQuery is the CQL string used to query the FBI API.
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  // searchObject is the object representation of the searchQuery that we work with
  // in the code. It is translated to CQL upon hitting the search button.
  const [searchObject, setSearchObject] = useState<AdvancedSearchQuery | null>(
    null
  );
  // Users can link to searches that only show the results without the search form,
  // using the "link to this search" button inside the AdvancedSearchResult comp.
  const [showResultOnly, setShowResultOnly] = useState<boolean>(false);
  // This is the CQL query that is actually executed.
  const [executedQuery, setExecutedQuery] = useState<string | null>(null);

  // Only react on url parameters on the initial render.
  useEffectOnce(() => {
    // We have to remove brackets if multiple filters were used so that we can
    // translate the string back to an object.
    const advancedSearchQuery = getUrlQueryParam("advancedSearchQuery")
      ?.replace("(", "")
      .replace(")", "");
    if (advancedSearchQuery) {
      // TODO: Add runtime validation
      // If the value does not match the type because of url tampering, type
      // mismatch etc. errors will occur. However they should be handled
      // somewhat gracefully by our error boundary..
      const queryObject = JSON.parse(advancedSearchQuery);
      setSearchObject(queryObject);
    }

    const advancedSearchCql = getUrlQueryParam("advancedSearchCql");
    if (advancedSearchCql) {
      setSearchQuery(advancedSearchCql);
    }

    if (getUrlQueryParam("linked") === "true") {
      setShowResultOnly(true);
    }
  });

  useEffect(() => {
    if (!searchObject) return;
    const cql = translateSearchObjectToCql(searchObject);
    if (cql.trim() === "") return;

    // Replace any existing CQL query with the advanced search query to avoid
    // mixing the two.
    setQueryParametersInUrl({
      advancedSearchQuery: JSON.stringify(searchObject)
    });
    removeQueryParametersFromUrl("advancedSearchCql");
    setExecutedQuery(cql);
  }, [searchObject]);

  useEffect(() => {
    if (!searchQuery) return;
    // Replace any existing advanced search query with the CQL query to avoid
    // mixing the two.
    setQueryParametersInUrl({ advancedSearchCql: searchQuery });
    removeQueryParametersFromUrl("advancedSearchQuery");
    setExecutedQuery(searchQuery);
  }, [searchQuery]);

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
      {executedQuery && (
        <AdvancedSearchResult
          q={executedQuery}
          pageSize={pageSize}
          showContentOnly={showResultOnly}
        />
      )}
    </div>
  );
};

export default AdvancedSearch;

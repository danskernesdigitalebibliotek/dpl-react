import React, { useEffect, useState } from "react";
import { useEffectOnce } from "react-use";
import AdvancedSearchHeader from "./AdvancedSearchHeader";
import AdvancedSearchResult from "./AdvancedSearchResults";
import {
  commaSeparatedStringToArray,
  translateSearchObjectToCql
} from "./helpers";
import { AdvancedSearchQuery, AdvancedSortMapStrings } from "./types";
import {
  getUrlQueryParam,
  removeQueryParametersFromUrl,
  setQueryParametersInUrl
} from "../../core/utils/helpers/url";
import { LocationFilter } from "./LocationFilter";

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

  const [locationFilter, setLocationFilter] = useState<LocationFilter>({});

  const [sort, setSort] = useState<AdvancedSortMapStrings>(
    AdvancedSortMapStrings.Relevance
  );

  const handleLocationChange = (location: string) => {
    setLocationFilter((prevFilter) => ({
      ...prevFilter,
      location: commaSeparatedStringToArray(location)
    }));
    if (location) {
      setQueryParametersInUrl({ location });
    } else {
      removeQueryParametersFromUrl("location");
    }
  };

  const handleSublocationChange = (sublocation: string) => {
    setLocationFilter((prevFilter) => ({
      ...prevFilter,
      sublocation: commaSeparatedStringToArray(sublocation)
    }));
    if (sublocation) {
      setQueryParametersInUrl({ sublocation });
    } else {
      removeQueryParametersFromUrl("sublocation");
    }
  };

  const handleSortChange = (value: AdvancedSortMapStrings) => {
    setSort(value);
    setQueryParametersInUrl({ sort: value });
  };

  const [onShelf, setOnShelf] = useState(false);
  const handleOnShelfChange = (checked: boolean) => {
    setOnShelf(checked);
    if (checked) {
      setQueryParametersInUrl({
        onshelf: "true"
      });
    } else {
      removeQueryParametersFromUrl("onshelf");
    }
  };

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

    if (getUrlQueryParam("onshelf") === "true") {
      setOnShelf(true);
    }

    const locationParam = getUrlQueryParam("location");
    if (locationParam) {
      setLocationFilter((prevFilter) => ({
        ...prevFilter,
        location: commaSeparatedStringToArray(locationParam)
      }));
    }

    const sublocationParam = getUrlQueryParam("sublocation");
    if (sublocationParam) {
      setLocationFilter((prevFilter) => ({
        ...prevFilter,
        sublocation: commaSeparatedStringToArray(sublocationParam)
      }));
    }

    const sortParam = getUrlQueryParam("sort");
    if (sortParam) {
      setSort(sortParam as AdvancedSortMapStrings);
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
          onShelf={onShelf}
          setOnShelf={handleOnShelfChange}
          onLocationChange={handleLocationChange}
          onSublocationChange={handleSublocationChange}
          locationFilter={locationFilter}
        />
      )}
      {executedQuery && (
        <AdvancedSearchResult
          q={executedQuery}
          pageSize={pageSize}
          showContentOnly={showResultOnly}
          onShelf={onShelf}
          locationFilter={locationFilter}
          sort={sort}
          setSort={handleSortChange}
        />
      )}
    </div>
  );
};

export default AdvancedSearch;

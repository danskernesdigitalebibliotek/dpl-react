import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Searchlist from "./searchlist";
import FollowSearches from "../../core/FollowSearches";

const client = new FollowSearches();

function SearchlistEntry({
  newButtonText,
  removeButtonText,
  statusText,
  searchUrl
}) {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState("inactive");
  useEffect(function getSearches() {
    setLoading("active");
    client
      .getSearches()
      .then(function onSuccess(result) {
        setSearches(result);
        setLoading("finished");
      })
      .catch(function onError() {
        setLoading("failed");
      });
  }, []);
  return (
    <Searchlist
      loading={loading}
      searches={searches}
      newButtonText={newButtonText}
      removeButtonText={removeButtonText}
      statusText={statusText}
      searchUrl={searchUrl}
    />
  );
}

SearchlistEntry.propTypes = {
  newButtonText: PropTypes.string,
  removeButtonText: PropTypes.string,
  statusText: PropTypes.string,
  searchUrl: PropTypes.string
};

SearchlistEntry.defaultProps = {
  newButtonText: "Nye materialer",
  removeButtonText: "Fjern fra listen",
  statusText: ":hit_count nye materialer siden den",
  searchUrl: "https://lollandbib.dk/search/ting/:query"
};

export default SearchlistEntry;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";

import Searchlist from "./searchlist";
import FollowSearches from "../../core/FollowSearches";

const client = new FollowSearches();

function SearchlistEntry({
  removeButtonText,
  emptyListText,
  errorText,
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

  function removeSearch(id) {
    const fallback = [...searches];
    setSearches(searches.filter(search => search.id !== id));
    client.deleteSearch({ searchId: id }).catch(function onError() {
      setSearches(fallback);
    });
  }

  return (
    <Searchlist
      loading={loading}
      searches={searches}
      onRemoveSearch={removeSearch}
      removeButtonText={removeButtonText}
      errorText={errorText}
      emptyListText={emptyListText}
      searchUrl={searchUrl}
    />
  );
}

SearchlistEntry.propTypes = {
  removeButtonText: PropTypes.string,
  errorText: PropTypes.string,
  emptyListText: PropTypes.string,
  searchUrl: urlPropType.isRequired
};

SearchlistEntry.defaultProps = {
  removeButtonText: "Fjern fra listen",
  emptyListText: "Ingen gemte søgninger.",
  errorText: "Gemte søgninger kunne ikke hentes."
};

export default SearchlistEntry;

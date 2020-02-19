import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";

import Searchlist from "./searchlist";
import FollowSearches from "../../core/FollowSearches";

function SearchlistEntry({
  followSearchesUrl,
  removeButtonText,
  emptyListText,
  errorText,
  goToSearchText,
  searchUrl
}) {
  const [searches, setSearches] = useState([]);
  const [status, setStatus] = useState("initial");

  function setSearchlistFailedStatus() {
    setStatus("failed");
  }

  function setSearchlist(result) {
    setSearches(result);
    setStatus("ready");
  }

  useEffect(() => {
    const client = new FollowSearches({ baseUrl: followSearchesUrl });
    client
      .getSearches()
      .then(setSearchlist)
      .catch(setSearchlistFailedStatus);
  }, [followSearchesUrl]);

  function removeSearch(id) {
    const fallback = [...searches];

    function removeDeletedSearch(search) {
      return search.id !== id;
    }
    setSearches(searches.filter(removeDeletedSearch));

    function setDeleteSearchErrorStatus() {
      setSearches(fallback);
    }

    const client = new FollowSearches({ baseUrl: followSearchesUrl });
    client.deleteSearch({ searchId: id }).catch(setDeleteSearchErrorStatus);
  }

  return (
    <Searchlist
      status={status}
      searches={searches}
      onRemoveSearch={removeSearch}
      removeButtonText={removeButtonText}
      errorText={errorText}
      emptyListText={emptyListText}
      goToSearchText={goToSearchText}
      searchUrl={searchUrl}
    />
  );
}

SearchlistEntry.propTypes = {
  followSearchesUrl: urlPropType,
  removeButtonText: PropTypes.string,
  errorText: PropTypes.string,
  emptyListText: PropTypes.string,
  goToSearchText: PropTypes.string,
  searchUrl: urlPropType.isRequired
};

SearchlistEntry.defaultProps = {
  followSearchesUrl: "https://stage.followsearches.dandigbib.org",
  removeButtonText: "Fjern fra listen",
  emptyListText: "Ingen gemte søgninger.",
  errorText: "Gemte søgninger kunne ikke hentes.",
  goToSearchText: "Gå til søgeresultat"
};

export default SearchlistEntry;

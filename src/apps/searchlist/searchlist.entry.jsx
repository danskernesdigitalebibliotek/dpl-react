import React, { useEffect } from "react";

import Searchlist from "./searchlist";
import FollowSearches from "../../core/FollowSearches";

const client = new FollowSearches();

function SearchlistEntry() {
  useEffect(function getSearches() {
    client
      .getSearches()
      .then(function onSuccess(result) {
        console.log(result);
      })
      .catch(function onError(err) {
        console.error(err);
      });
  }, []);
  return <Searchlist />;
}

export default SearchlistEntry;

import React, { useState } from "react";
import PropTypes from "prop-types";

import AddToSearchlist from "./add-to-searchlist.js";
import FollowSearches from "../../core/FollowSearches.js";

const client = new FollowSearches();

function AddToSearchlistEntry(props) {
  const [state, setState] = useState("inactive");

  function addToSearchList(title) {
    setState("requesting");
    client
      .addSearch({ title: title, search: props["ddb-search-query"] })
      .then(function onResult() {
        // Wolla. What to do here?
      })
      .catch(function onError() {
        setState("failed");
        setTimeout(function onRestore() {
          setState("inactive");
        }, 2000);
      })
      .finally(function onEnd() {
        setState("finished");
      });
  }

  return (
    <AddToSearchlist
      state={state}
      onSubmit={addToSearchList}
      ddbText={props["ddb-text"]}
      ddbLabel={props["ddb-label"]}
      ddbDefaultTitle={props["ddb-default-title"]}
      ddbSearchQuery={props["ddb-search-query"]}
      ddbSuccessMessage={props["ddb-success-message"]}
      ddbErrorMessage={props["ddb-error-message"]}
    />
  );
}

AddToSearchlistEntry.propTypes = {
  "ddb-text": PropTypes.string,
  "ddb-label": PropTypes.string,
  "ddb-default-title": PropTypes.string,
  "ddb-search-query": PropTypes.string,
  "ddb-success-message": PropTypes.string,
  "ddb-error-message": PropTypes.string
};

export default AddToSearchlistEntry;

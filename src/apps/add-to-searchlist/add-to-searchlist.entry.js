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
      .addSearch({ title: title, search: props["search-query"] })
      .then(function onResult() {
        setState("finished");
      })
      .catch(function onError() {
        setState("failed");
        setTimeout(function onRestore() {
          setState("inactive");
        }, 2000);
      });
  }

  return (
    <AddToSearchlist
      state={state}
      onSubmit={addToSearchList}
      text={props["text"]}
      label={props["label"]}
      defaultTitle={props["default-title"]}
      searchQuery={props["search-query"]}
      successMessage={props["success-message"]}
      errorMessage={props["error-message"]}
    />
  );
}

AddToSearchlistEntry.propTypes = {
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  "default-title": PropTypes.string,
  "search-query": PropTypes.string.isRequired,
  "success-message": PropTypes.string.isRequired,
  "error-message": PropTypes.string.isRequired
};

export default AddToSearchlistEntry;

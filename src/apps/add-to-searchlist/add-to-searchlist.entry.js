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
      .addSearch({ title: title, search: props["searchQuery"] })
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
      defaultTitle={props["defaultTitle"]}
      searchQuery={props["searchQuery"]}
      successMessage={props["successMessage"]}
      errorMessage={props["errorMessage"]}
    />
  );
}

AddToSearchlistEntry.propTypes = {
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultTitle: PropTypes.string,
  searchQuery: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired
};

export default AddToSearchlistEntry;

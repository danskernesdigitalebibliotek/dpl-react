import React, { useState } from "react";
import PropTypes from "prop-types";

import AddToSearchlist from "./add-to-searchlist";
import FollowSearches from "../../core/FollowSearches";

const client = new FollowSearches();

function AddToSearchlistEntry({ text, label, defaultValue, searchQuery }) {
  const [state, setState] = useState("inactive");

  function addToSearchList(title) {
    setState("requesting");
    client
      .addSearch({ title, search: searchQuery })
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
      text={text}
      label={label}
      defaultValue={defaultValue}
      searchQuery={searchQuery}
    />
  );
}

AddToSearchlistEntry.propTypes = {
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  searchQuery: PropTypes.string.isRequired
};

AddToSearchlistEntry.defaultProps = {
  defaultValue: ""
};

export default AddToSearchlistEntry;

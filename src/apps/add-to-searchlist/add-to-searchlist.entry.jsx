import React, { useState } from "react";
import PropTypes from "prop-types";

import AddToSearchlist from "./add-to-searchlist";
import FollowSearches from "../../core/FollowSearches";

const client = new FollowSearches();

function AddToSearchlistEntry({
  searchQuery,
  buttonText,
  labelText,
  defaultTitle,
  helpText,
  successText,
  errorText,
  addButtonText
}) {
  const [appState, setAppState] = useState("inactive");
  const openDialog = () => setAppState("active");
  const closeDialog = () => setAppState("inactive");

  function addToSearchList(title) {
    setAppState("requesting");
    client
      .addSearch({ title, query: searchQuery })
      .then(function onSuccess() {
        setTimeout(() => {
          setAppState("inactive");
        }, 2000);
      })
      .catch(function onError() {
        setAppState("failed");
        setTimeout(() => {
          setAppState("active");
        }, 2000);
      });
  }

  return (
    <AddToSearchlist
      appState={appState}
      onSubmit={addToSearchList}
      openDialog={openDialog}
      closeDialog={closeDialog}
      searchQuery={searchQuery}
      buttonText={buttonText}
      labelText={labelText}
      defaultTitle={defaultTitle || searchQuery}
      errorText={errorText}
      successText={successText}
      addButtonText={addButtonText}
      helpText={helpText}
    />
  );
}

AddToSearchlistEntry.propTypes = {
  buttonText: PropTypes.string,
  errorText: PropTypes.string,
  successText: PropTypes.string,
  labelText: PropTypes.string,
  addButtonText: PropTypes.string,
  defaultTitle: PropTypes.string,
  helpText: PropTypes.string,
  searchQuery: PropTypes.string.isRequired
};

AddToSearchlistEntry.defaultProps = {
  buttonText: "Tilføj til mine søgninger",
  labelText: "Søgetitel",
  errorText: "Noget gik galt",
  successText: "Tilføjet",
  addButtonText: "Gem",
  defaultTitle: "",
  helpText:
    "Gem en søgning her og giv den en title så du let kan finde den igen."
};

export default AddToSearchlistEntry;

import React, { useState } from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";

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
  successLink,
  successLinkText,
  errorText,
  addButtonText,
  errorRequiredMessage,
  errorMaxLengthMessage
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
        }, 10000);
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
      defaultTitle={defaultTitle}
      errorText={errorText}
      successText={successText}
      successLink={successLink}
      successLinkText={successLinkText}
      addButtonText={addButtonText}
      helpText={helpText}
      errorRequiredMessage={errorRequiredMessage}
      errorMaxLengthMessage={errorMaxLengthMessage}
    />
  );
}

AddToSearchlistEntry.propTypes = {
  buttonText: PropTypes.string,
  errorText: PropTypes.string,
  successText: PropTypes.string,
  successLink: urlPropType,
  successLinkText: PropTypes.string,
  labelText: PropTypes.string,
  addButtonText: PropTypes.string,
  defaultTitle: PropTypes.string,
  errorRequiredMessage: PropTypes.string,
  errorMaxLengthMessage: PropTypes.string,
  helpText: PropTypes.string,
  searchQuery: PropTypes.string.isRequired
};

AddToSearchlistEntry.defaultProps = {
  buttonText: "Tilføj til mine søgninger",
  labelText: "Søgetitel",
  errorText: "Noget gik galt",
  successText: "Tilføjet til dine gemte søgninger.",
  successLink: undefined,
  successLinkText: "Se dine gemte søgnigner.",
  errorRequiredMessage: "En titel er påkrævet.",
  errorMaxLengthMessage: "Titlen må ikke være længere end 255 tegn.",
  addButtonText: "Gem",
  defaultTitle: "",
  helpText:
    "Gem en søgning her og giv den en titel så du nemt kan kende forskel på alle dine mange gemte søgninger."
};

export default AddToSearchlistEntry;

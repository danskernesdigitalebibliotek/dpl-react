import React from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import ChecklistMaterialButtonEntry from "../checklist-button/checklist-material-button.entry";

function AddToChecklistEntry({
  materialListUrl,
  text,
  successText,
  errorText,
  id,
  loginUrl
}) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(
      "AddToChecklist is deprecated. Please use ChecklistMaterialButton instead."
    );
  }

  return (
    <ChecklistMaterialButtonEntry
      addText={text}
      addErrorText={errorText}
      addSuccessText={successText}
      loginUrl={loginUrl}
      id={id}
      materialListUrl={materialListUrl}
      initialOnList="off"
      containerClass="dpl-add-to-checklist__container"
    />
  );
}

AddToChecklistEntry.propTypes = {
  materialListUrl: urlPropType,
  text: PropTypes.string,
  errorText: PropTypes.string,
  successText: PropTypes.string,
  id: PropTypes.string.isRequired,
  loginUrl: urlPropType.isRequired
};

AddToChecklistEntry.defaultProps = {
  materialListUrl: "https://test.materiallist.dandigbib.org",
  text: "Tilføj til min liste",
  errorText: "Det lykkedes ikke at gemme materialet.",
  successText: "Materialet er tilføjet"
};

export default AddToChecklistEntry;

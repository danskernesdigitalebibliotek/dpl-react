import React, { useState } from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";

import ChecklistMaterialButton from "./checklist-material-button";
import MaterialList from "../../core/MaterialList";

function ChecklistMaterialButtonEntry({
  materialListUrl,
  addText,
  addSuccessText,
  addErrorText,
  removeText,
  removeSuccessText,
  removeErrorText,
  id,
  loginUrl,
  initialOnList
}) {
  const [status, setStatus] = useState("ready");
  const [onList, setOnList] = useState(initialOnList);

  function setRestoreStatus(newOnList) {
    setOnList(newOnList);
    setStatus("ready");
  }

  function setListErrorStatus() {
    setStatus("failed");
    setTimeout(setRestoreStatus, 4000);
  }

  function addToList() {
    setStatus("processing");

    const client = new MaterialList({ baseUrl: materialListUrl });
    client
      .addListMaterial({ materialId: id })
      .then(() => {
        setTimeout(() => {
          setRestoreStatus("on");
        }, 4000);
      })
      .catch(setListErrorStatus);
  }

  function removeFromList() {
    setStatus("processing");

    const client = new MaterialList({ baseUrl: materialListUrl });
    client
      .deleteListMaterial({ materialId: id })
      .then(() => {
        setTimeout(() => {
          setRestoreStatus("off");
        }, 4000);
      })
      .catch(setListErrorStatus);
  }

  let onClick = addToList;
  let text = addText;
  let errorText = addErrorText;
  let successText = addSuccessText;
  if (onList === "on") {
    onClick = removeFromList;
    text = removeText;
    errorText = removeErrorText;
    successText = removeSuccessText;
  }

  if (status === "ready" && onList === "unknown") {
    const client = new MaterialList({ baseUrl: materialListUrl });
    client
      .checkListMaterial({ materialId: id })
      .then(listMaterial => {
        setOnList(listMaterial ? "on" : "off");
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {
        // Do nothing. If the call fails then we show the add button by default.
        // If this is a permanent error then clicking the button will trigger an
        // error. If this is a temporary error and the user clicks the button
        // then the material will not be added multiple times and thus cause
        // further problems.
      });
  }

  return (
    <ChecklistMaterialButton
      text={text}
      errorText={errorText}
      successText={successText}
      status={status}
      onClick={onClick}
      loginUrl={loginUrl}
      materialId={id}
    />
  );
}

ChecklistMaterialButtonEntry.propTypes = {
  materialListUrl: urlPropType,
  addText: PropTypes.string,
  addErrorText: PropTypes.string,
  addSuccessText: PropTypes.string,
  removeText: PropTypes.string,
  removeErrorText: PropTypes.string,
  removeSuccessText: PropTypes.string,
  id: PropTypes.string.isRequired,
  loginUrl: urlPropType.isRequired,
  initialOnList: PropTypes.oneOf(["unknown", "on", "off"])
};

ChecklistMaterialButtonEntry.defaultProps = {
  materialListUrl: "https://test.materiallist.dandigbib.org",
  addText: "Tilføj til min liste",
  addErrorText: "Det lykkedes ikke at gemme materialet.",
  addSuccessText: "Materialet er tilføjet",
  removeText: "Fjern fra min liste",
  removeErrorText: "Det lykkedes ikke at fjerne materialet.",
  removeSuccessText: "Materialet er fjernet",
  initialOnList: "unknown"
};

export default ChecklistMaterialButtonEntry;

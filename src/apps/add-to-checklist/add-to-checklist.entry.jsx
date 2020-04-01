import React, { useState } from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";

import AddToChecklist from "./add-to-checklist";
import MaterialList from "../../core/MaterialList";

function AddToChecklistEntry({
  materialListUrl,
  text,
  successText,
  errorText,
  id,
  loginUrl
}) {
  const [status, setStatus] = useState("ready");

  function setRestoreStatus() {
    setStatus("ready");
  }

  function setListErrorStatus() {
    setStatus("failed");
    setTimeout(setRestoreStatus, 4000);
  }

  function addToList() {
    setStatus("processing");

    const client = new MaterialList({ baseUrl: materialListUrl });
    client.addListMaterial({ materialId: id }).catch(setListErrorStatus);
  }

  return (
    <AddToChecklist
      text={text}
      errorText={errorText}
      successText={successText}
      status={status}
      onClick={addToList}
      loginUrl={loginUrl}
      materialId={id}
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

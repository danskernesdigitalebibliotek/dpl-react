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
  const [loading, setLoading] = useState("inactive");

  function addToList() {
    setLoading("active");

    const client = new MaterialList({ baseUrl: materialListUrl });
    client.addListMaterial({ materialId: id }).catch(function onError() {
      setLoading("failed");
      setTimeout(function onRestore() {
        setLoading("inactive");
      }, 4000);
    });
  }

  return (
    <AddToChecklist
      text={text}
      errorText={errorText}
      successText={successText}
      loading={loading}
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

import React, { useState } from "react";
import PropTypes from "prop-types";

import AddToChecklist from "./add-to-checklist.js";
import MaterialList from "../../core/MaterialList.js";

const client = new MaterialList();

function AddToChecklistEntry(props) {
  const [loading, setLoading] = useState("inactive");

  function addToList() {
    setLoading("active");
    client
      .addListMaterial({ materialId: props["ddb-id"] })
      .then(function onResult(result) {
        console.log(result);
      })
      .catch(function onError() {
        setLoading("failed");
        setTimeout(function onRestore() {
          setLoading("inactive");
        }, 2000);
      })
      .finally(function onEnd() {
        setLoading("finished");
      });
  }

  return <AddToChecklist loading={loading} onClick={addToList} />;
}

AddToChecklistEntry.propTypes = {
  "ddb-id": PropTypes.string
};

export default AddToChecklistEntry;

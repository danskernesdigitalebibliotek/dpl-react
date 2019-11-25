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
      .addListMaterial({ materialId: props.id })
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

  console.log(props.text);

  return (
    <AddToChecklist text={props.text} loading={loading} onClick={addToList} />
  );
}

AddToChecklistEntry.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string
};

export default AddToChecklistEntry;

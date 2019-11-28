import React, { useState } from "react";
import PropTypes from "prop-types";

import AddToChecklist from "./add-to-checklist";
import MaterialList from "../../core/MaterialList";

const client = new MaterialList();

function AddToChecklistEntry({ text, id }) {
  const [loading, setLoading] = useState("inactive");

  function addToList() {
    setLoading("active");
    client
      .addListMaterial({ materialId: id })
      .then()
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

  return <AddToChecklist text={text} loading={loading} onClick={addToList} />;
}

AddToChecklistEntry.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string.isRequired
};

AddToChecklistEntry.defaultProps = {
  text: ""
};

export default AddToChecklistEntry;

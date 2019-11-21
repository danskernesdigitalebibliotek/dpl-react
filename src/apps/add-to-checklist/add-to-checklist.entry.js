import React from "react";
import PropTypes from "prop-types";

import AddToChecklist from "./add-to-checklist.js";

function AddToChecklistEntry(props) {
  console.log("Do something with: ", props["ddb-id"]);
  return <AddToChecklist />;
}

AddToChecklistEntry.propTypes = {
  "ddb-id": PropTypes.string
};

export default AddToChecklistEntry;

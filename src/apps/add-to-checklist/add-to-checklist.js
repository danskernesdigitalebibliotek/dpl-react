import React from "react";
import PropTypes from "prop-types";

import Button from "../../components/atoms/button/button.js";

export function AddToChecklist({ children }) {
  // Here will also be server requests etc.
  return (
    <div className="ddb-container">
      <Button>{children}</Button>
    </div>
  );
}

AddToChecklist.defaultProps = {
  children: "Tilføj til min huskeliste"
};

AddToChecklist.propTypes = {
  children: PropTypes.node
};

export default AddToChecklist;

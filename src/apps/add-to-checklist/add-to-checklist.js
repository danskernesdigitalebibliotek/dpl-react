import React from "react";
import PropTypes from "prop-types";

import Button from "../../components/atoms/button/button.js";

export function AddToChecklist({ children, loading, onClick }) {
  // Here will also be server requests etc.
  if (loading === "active") {
    return <div>Tilføjet</div>;
  }

  if (loading === "failed") {
    return <div>Noget gik galt</div>;
  }

  return (
    <div className="ddb-container">
      <Button onClick={onClick}>{children}</Button>
    </div>
  );
}

AddToChecklist.defaultProps = {
  children: "Tilføj til min huskeliste",
  loading: "inactive"
};

AddToChecklist.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.oneOf(["inactive", "active", "failed", "finished"])
};

export default AddToChecklist;

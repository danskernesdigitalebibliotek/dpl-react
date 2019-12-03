import React from "react";
import PropTypes from "prop-types";

import Button from "../../components/atoms/button/button";
import Alert from "../../components/alert/alert";

function AddToChecklist({ loading, onClick, text }) {
  // Here will also be server requests etc.
  if (loading === "active") {
    return <Alert message="Tilføjet" type="polite" variant="success" />;
  }

  if (loading === "failed") {
    return <Alert message="Noget gik galt" type="polite" variant="warning" />;
  }

  return (
    <div className="ddb-container">
      <Button className="ddb-btn--charcoal" onClick={onClick}>
        {text}
      </Button>
    </div>
  );
}

AddToChecklist.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.oneOf(["inactive", "active", "failed", "finished"])
};

AddToChecklist.defaultProps = {
  text: "Tilføj til min huskeliste",
  loading: "inactive"
};

export default AddToChecklist;

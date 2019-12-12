import React from "react";
import PropTypes from "prop-types";

import Button from "../../components/atoms/button/button";
import Alert from "../../components/alert/alert";

function AddToChecklist({ loading, onClick, text, errorText, successText }) {
  if (loading === "active") {
    return <Alert message={successText} type="polite" variant="success" />;
  }

  if (loading === "failed") {
    return <Alert message={errorText} type="polite" variant="warning" />;
  }

  return (
    <div className="ddb-container">
      <Button variant="black" align="left" onClick={onClick}>
        {text}
      </Button>
    </div>
  );
}

AddToChecklist.propTypes = {
  text: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  successText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.oneOf(["inactive", "active", "failed", "finished"])
};

AddToChecklist.defaultProps = {
  loading: "inactive"
};

export default AddToChecklist;

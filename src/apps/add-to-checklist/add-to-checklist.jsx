import React from "react";
import PropTypes from "prop-types";

import Button from "../../components/atoms/button/button";
import Alert from "../../components/alert/alert";

function AddToChecklist({ status, onClick, text, errorText, successText }) {
  if (status === "processing" || status === "finished") {
    return <Alert message={successText} type="polite" variant="success" />;
  }

  if (status === "failed") {
    return <Alert message={errorText} type="polite" variant="warning" />;
  }

  return (
    <div className="ddb-add-to-checklist__container">
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
  status: PropTypes.oneOf(["ready", "processing", "failed", "finished"])
};

AddToChecklist.defaultProps = {
  status: "ready"
};

export default AddToChecklist;

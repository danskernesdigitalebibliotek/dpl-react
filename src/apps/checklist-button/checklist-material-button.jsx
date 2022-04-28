import React from "react";
import PropTypes from "prop-types";

import Button from "../../components/atoms/button/button";
import Alert from "../../components/alert/alert";

function ChecklistMaterialButton({
  status,
  onClick,
  text,
  errorText,
  successText,
  containerClass
}) {
  if (status === "processing" || status === "finished") {
    return <Alert message={successText} type="polite" variant="success" />;
  }

  if (status === "failed") {
    return <Alert message={errorText} type="polite" variant="warning" />;
  }

  return (
    <div className={containerClass}>
      <Button variant="black" align="left" onClick={onClick}>
        {text}
      </Button>
    </div>
  );
}

ChecklistMaterialButton.propTypes = {
  text: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  successText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  status: PropTypes.oneOf([
    "pending",
    "ready",
    "processing",
    "failed",
    "finished"
  ]),
  containerClass: PropTypes.string
};

ChecklistMaterialButton.defaultProps = {
  status: "ready",
  containerClass: "dpl-checklist-material-button__container"
};

export default ChecklistMaterialButton;

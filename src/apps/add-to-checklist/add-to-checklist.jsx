import React from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";

import Button from "../../components/atoms/button/button";
import Alert from "../../components/alert/alert";
import User from "../../core/user";
import replacePlaceholders from "../../core/replacePlaceholders";

function AddToChecklist({
  status,
  onClick,
  text,
  errorText,
  successText,
  loginUrl,
  materialId
}) {
  if (status === "processing") {
    return <Alert message={successText} type="polite" variant="success" />;
  }

  if (status === "failed") {
    return <Alert message={errorText} type="polite" variant="warning" />;
  }

  return (
    <div className="ddb-add-to-checklist__container">
      <Button
        href={
          !User.isAuthenticated()
            ? replacePlaceholders({
                text: loginUrl,
                tags: {
                  id: encodeURIComponent(materialId)
                }
              })
            : undefined
        }
        variant="black"
        align="left"
        onClick={onClick}
      >
        {text}
      </Button>
    </div>
  );
}

AddToChecklist.propTypes = {
  text: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  successText: PropTypes.string.isRequired,
  loginUrl: urlPropType.isRequired,
  onClick: PropTypes.func.isRequired,
  status: PropTypes.oneOf(["ready", "processing", "failed", "finished"]),
  materialId: PropTypes.string.isRequired
};

AddToChecklist.defaultProps = {
  status: "ready"
};

export default AddToChecklist;

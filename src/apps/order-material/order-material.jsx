import React from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";

import Button from "../../components/atoms/button/button";
import Alert from "../../components/alert/alert";
import User from "../../core/user";
import replacePlaceholders from "../../core/replacePlaceholders";

function OrderMaterial({
  status,
  checkingText,
  progressText,
  unavailableText,
  invalidPickupBranchText,
  onClick,
  text,
  errorText,
  successText,
  loginUrl,
  materialId
}) {
  if (status === "initial") {
    // Don't render anything until we start checking if the material
    // can be ordered.
    return <></>;
  }

  if (status === "checking") {
    return <Alert message={checkingText} type="polite" variant="info" />;
  }

  if (status === "processing") {
    return <Alert message={progressText} type="polite" variant="info" />;
  }

  if (status === "finished") {
    return <Alert message={successText} type="polite" variant="success" />;
  }

  if (status === "unavailable") {
    return <Alert message={unavailableText} type="polite" variant="success" />;
  }

  if (status === "invalid branch") {
    return (
      <Alert
        message={invalidPickupBranchText}
        type="polite"
        variant="warning"
      />
    );
  }

  if (status === "failed") {
    return <Alert message={errorText} type="polite" variant="warning" />;
  }

  return (
    <div className="ddb-order-material__container">
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

OrderMaterial.propTypes = {
  text: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  successText: PropTypes.string.isRequired,
  checkingText: PropTypes.string.isRequired,
  progressText: PropTypes.string.isRequired,
  unavailableText: PropTypes.string.isRequired,
  invalidPickupBranchText: PropTypes.string.isRequired,
  loginUrl: urlPropType.isRequired,
  onClick: PropTypes.func.isRequired,
  status: PropTypes.oneOf([
    "initial",
    "checking",
    "unavailable",
    "invalid branch",
    "ready",
    "processing",
    "failed",
    "finished"
  ]),
  materialId: PropTypes.string.isRequired
};

OrderMaterial.defaultProps = {
  status: "initial"
};

export default OrderMaterial;

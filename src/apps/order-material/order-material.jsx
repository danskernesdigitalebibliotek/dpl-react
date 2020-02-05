import React from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";

import Button from "../../components/atoms/button/button";
import Alert from "../../components/alert/alert";
import User from "../../core/user";
import replacePlaceholders from "../../core/replacePlaceholders";

function OrderMaterial({
  loading,
  checkingText,
  unavailableText,
  invalidPickupBranchText,
  onClick,
  text,
  errorText,
  successText,
  loginUrl,
  materialId
}) {
  if (loading === "checking") {
    return <Alert message={checkingText} type="polite" variant="info" />;
  }

  if (loading === "active") {
    return <Alert message={successText} type="polite" variant="success" />;
  }

  if (loading === "unavailable") {
    return <Alert message={unavailableText} type="polite" variant="success" />;
  }

  if (loading === "invalid branch") {
    return (
      <Alert
        message={invalidPickupBranchText}
        type="polite"
        variant="warning"
      />
    );
  }

  if (loading === "failed") {
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
  unavailableText: PropTypes.string.isRequired,
  invalidPickupBranchText: PropTypes.string.isRequired,
  loginUrl: urlPropType.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.oneOf([
    "inactive",
    "checking",
    "unavailable",
    "invalid branch",
    "active",
    "failed",
    "finished"
  ]),
  materialId: PropTypes.string.isRequired
};

OrderMaterial.defaultProps = {
  loading: "inactive"
};

export default OrderMaterial;

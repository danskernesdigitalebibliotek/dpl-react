import React, { useState } from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";

import Button from "../../components/atoms/button/button";
import Dialog from "../../components/atoms/dialog/dialog";
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
  successMessage,
  loginUrl,
  materialId
}) {
  const [open, setOpen] = useState(true);
  const closeDialog = () => setOpen(false);

  switch (status) {
    case "initial":
      // Don't render anything until we start checking if the material
      // can be ordered.
      return null;

    case "checking":
      return <Alert message={checkingText} type="polite" variant="info" />;

    case "unavailable":
      return (
        <Alert message={unavailableText} type="polite" variant="success" />
      );

    case "invalid branch":
      return (
        <Alert
          message={invalidPickupBranchText}
          type="polite"
          variant="warning"
        />
      );

    case "processing":
      return <Alert message={progressText} type="polite" variant="info" />;

    case "finished":
      return (
        <>
          <Alert message={successText} type="polite" variant="success" />
          <Dialog
            label="Tilføj søgning til liste"
            showCloseButton
            dropDown
            isOpen={open}
            onDismiss={closeDialog}
          >
            <Alert message={successMessage} type="polite" variant="blank" />
          </Dialog>
        </>
      );

    case "failed":
      return <Alert message={errorText} type="polite" variant="warning" />;

    default:
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
}

OrderMaterial.propTypes = {
  text: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  successText: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
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

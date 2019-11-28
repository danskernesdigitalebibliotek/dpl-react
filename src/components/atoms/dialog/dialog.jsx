import React from "react";
import PropTypes from "prop-types";
import ReachDialog from "@reach/dialog";
import Button from "../button/button";

function Dialog({
  className,
  label,
  showCloseButton,
  children,
  onDismiss,
  isOpen
}) {
  return (
    <ReachDialog
      aria-label={label}
      className={`ddb-dialog ${className}`}
      isOpen={isOpen}
    >
      {children}
      {showCloseButton && (
        <Button
          className="ddb-btn--charcoal ddb-dialog__close-button"
          onClick={onDismiss}
        >
          Close
        </Button>
      )}
    </ReachDialog>
  );
}

Dialog.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  showCloseButton: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

Dialog.defaultProps = {
  className: "",
  showCloseButton: true
};

export default Dialog;

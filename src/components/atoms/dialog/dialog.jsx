import React from "react";
import PropTypes from "prop-types";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import Button from "../button/button";
import Cross from "../icons/cross";

function Dialog({
  className,
  label,
  showCloseButton,
  children,
  onDismiss,
  dropDown,
  isOpen
}) {
  return (
    <DialogOverlay
      className="dpl-dialog__overlay"
      isOpen={isOpen}
      onDismiss={onDismiss}
    >
      <DialogContent
        aria-label={label}
        className={`dpl-dialog__content ${
          dropDown ? "dpl-dialog__content--dropdown" : ""
        } ${className}`}
      >
        {showCloseButton && (
          <div className="dpl-dialog__header">
            <Button
              variant="blank"
              tabIndex="-1" // escape is available for exiting the form.
              onClick={onDismiss}
            >
              <Cross className="dpl-dialog__close" />
            </Button>
          </div>
        )}
        {children}
      </DialogContent>
    </DialogOverlay>
  );
}

Dialog.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  showCloseButton: PropTypes.bool,
  dropDown: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

Dialog.defaultProps = {
  className: "",
  showCloseButton: true,
  dropDown: false
};

export default Dialog;

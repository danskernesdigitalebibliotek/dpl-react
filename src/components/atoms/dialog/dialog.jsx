import React from "react";
import PropTypes from "prop-types";
import ReachDialog from "@reach/dialog";

function Dialog({ className, noClose, children, onDismiss, isOpen }) {
  return (
    <ReachDialog className={`ddb-dialog ${className}`} isOpen={isOpen}>
      {noClose ? null : (
        <button type="button" className="close-button" onClick={onDismiss}>
          Close
        </button>
      )}
      {children}
    </ReachDialog>
  );
}

Dialog.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  noClose: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired
};

Dialog.defaultProps = {
  className: "",
  noClose: false
};

export default Dialog;

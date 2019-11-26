import React from "react";
import PropTypes from "prop-types";
import ReachDialog from "@reach/dialog";

export function Dialog({ noClose, children, onDismiss, ...props }) {
  return (
    <ReachDialog className="ddb-dialog" {...props}>
      {noClose ? null : (
        <button className="close-button" onClick={onDismiss}>
          Close
        </button>
      )}
      {children}
    </ReachDialog>
  );
}

Dialog.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node),
  noClose: PropTypes.bool,
  onDismiss: PropTypes.func
};

export default Dialog;

import React from "react";
import PropTypes from "prop-types";
import ReachDialog from "@reach/dialog";

function Dialog({ isOpen, onDismiss, children }) {
  return (
    <ReachDialog isOpen={isOpen} onDismiss={onDismiss}>
      {children}
    </ReachDialog>
  );
}

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

Dialog.defaultProps = {
  isOpen: false
};

export default Dialog;

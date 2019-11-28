import React from "react";
import PropTypes from "prop-types";

/**
 * A simple button that serves as the foundation of all buttons.
 *
 * @export
 * @param {Object} props
 * @returns {ReactNode}
 */
function Button({ className, onClick, children }) {
  return (
    <button
      type="button"
      className={`ddb-reset ddb-btn ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  className: ""
};

export default Button;

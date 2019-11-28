import React from "react";
import PropTypes from "prop-types";

/**
 * A simple button that serves as the foundation of all buttons.
 *
 * @export
 * @param {Object} props
 * @returns {ReactNode}
 */
function Button({ className, variant, onClick, children }) {
  return (
    <button
      type="button"
      className={`ddb-reset ddb-btn ${
        variant ? `ddb-btn--${variant}` : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["black"]),
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  className: "",
  variant: "grey"
};

export default Button;

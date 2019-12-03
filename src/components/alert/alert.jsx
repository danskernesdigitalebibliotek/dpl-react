import React from "react";
import PropTypes from "prop-types";

// https://reacttraining.com/reach-ui/alert
import ReactAlert from "@reach/alert";

/**
 * A simple alert that serves as the foundation of all alerts.
 *
 * @export
 * @param {object} props
 * @param {string} className
 * @param {string} message
 * @param {string} type
 * @param {string} variant
 * @returns {ReactNode}
 */
function Alert({ className, message, type, variant }) {
  return (
    <ReactAlert
      className={`ddb-alert ddb-alert--${variant} ${className}`}
      type={type}
    >
      {message}
    </ReactAlert>
  );
}

Alert.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(["assertive", "polite"]),
  variant: PropTypes.string
};

Alert.defaultProps = {
  className: "",
  message: "Hov, der opstod en fejl!",
  type: "polite",
  variant: ""
};

export default Alert;

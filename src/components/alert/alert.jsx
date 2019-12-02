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
 * @returns {ReactNode}
 */
function Alert({ className, message, type }) {
  return (
    <ReactAlert className={`ddb-alert ${className}`} type={type}>
      {message}
    </ReactAlert>
  );
}

Alert.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(["assertive", "polite"])
};

Alert.defaultProps = {
  className: "",
  message: "Hov, der opstod en fejl!",
  type: "polite"
};

export default Alert;

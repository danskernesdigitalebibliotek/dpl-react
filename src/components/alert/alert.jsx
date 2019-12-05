import React from "react";
import PropTypes from "prop-types";

// https://reacttraining.com/reach-ui/alert
import ReachAlert from "@reach/alert";

/**
 * A simple alert that serves as the foundation of all alerts.
 *
 * @export
 * @param {object} props
 * @param {string} props.className
 * @param {string} props.message
 * @param {string} props.type
 * @param {string} props.variant
 * @returns {ReactNode}
 */
function Alert({ className, message, type, variant }) {
  return (
    <ReachAlert
      className={`ddb-alert ddb-alert--${variant} ${className}`}
      type={type}
    >
      {message}
    </ReachAlert>
  );
}

Alert.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(["assertive", "polite"]),
  variant: PropTypes.oneOf(["info", "success", "warning"])
};

Alert.defaultProps = {
  className: "",
  message: "Hov, der opstod en fejl!",
  type: "polite",
  variant: "info"
};

export default Alert;

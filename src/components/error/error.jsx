import React from "react";
import PropTypes from "prop-types";

// https://reacttraining.com/reach-ui/alert
import Alert from "@reach/alert";

/**
 * A simple error that serves as the foundation of all errors.
 *
 * @export
 * @param {object} props
 * @param {string} className
 * @param {string} message
 * @returns {ReactNode}
 */
function Error({ className, message, type }) {
  return (
    <Alert className={`ddb-error ${className}`} type={type}>
      {message}
    </Alert>
  );
}

Error.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(["assertive", "polite"])
};

Error.defaultProps = {
  className: "",
  message: "Hov, der opstod en fejl!",
  type: "polite"
};

export default Error;

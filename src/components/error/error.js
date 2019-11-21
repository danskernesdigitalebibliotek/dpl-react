import React from "react";
import { string, oneOf } from "prop-types";

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
export function Error({ className, message, ...rest }) {
  return (
    <Alert className={`ddb-error ${!className ? "" : className}`} {...rest}>
      {message}
    </Alert>
  );
}

Error.propTypes = {
  className: string,
  message: string,
  type: oneOf(["assertive", "polite"])
};

Error.defaultProps = {
  message: "Hov, der opstod en fejl!",
  type: "polite"
};

export default Error;

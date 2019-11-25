import React from "react";
import { string } from "prop-types";

/**
 * A simple text field with label.
 *
 * @export
 * @param {Object} props
 * @returns {ReactNode}
 */
export function TextField({ className, label, value, ...rest }) {
  return (
    <label className={`ddb-btn ${!className ? "" : className}`} {...rest}>
      {label}
      <input value={value} />
    </label>
  );
}

TextField.propTypes = {
  className: string,
  label: string,
  value: string
};

export default TextField;

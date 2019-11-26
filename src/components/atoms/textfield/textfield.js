import React from "react";
import PropTypes from "prop-types";

/**
 * A simple text field with label.
 *
 * @export
 * @param {Object} props
 * @param {string} props.className
 * @param {string} props.label
 * @param {string} props.value
 * @returns {ReactNode}
 */
export function TextField({ className, label, value, onChange, ...rest }) {
  return (
    <label
      className={`ddb-reset ddb-textfield ${!className ? "" : className}`}
      {...rest}
    >
      {label}
      <input className="ddb-reset" value={value} onChange={onChange} />
    </label>
  );
}

TextField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default TextField;

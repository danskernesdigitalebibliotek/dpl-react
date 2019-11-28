import React from "react";
import PropTypes from "prop-types";
import { useId } from "@reach/auto-id";

/**
 * A simple text field with label.
 *
 * @export
 * @param {object} props
 * @param {string} props.id
 * @param {string} props.className
 * @param {string} props.label
 * @param {string} props.value
 * @returns {ReactNode}
 */

function TextField({ className, inputClassName, label, id, value, onChange }) {
  const generatedId = useId(id);
  return (
    <label htmlFor={generatedId} className={`ddb-reset ${className}`}>
      {label}
      <input
        id={generatedId}
        type="text"
        className={`ddb-reset ${inputClassName}`}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

TextField.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TextField.defaultProps = {
  className: "",
  inputClassName: "",
  id: undefined,
  label: undefined,
  value: undefined
};

export default TextField;

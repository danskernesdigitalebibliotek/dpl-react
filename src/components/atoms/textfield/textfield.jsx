import React from "react";
import PropTypes from "prop-types";

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

function TextField({ className, label, id, value, onChange }) {
  return (
    <label htmlFor={id} className={`ddb-reset ${!className ? "" : className}`}>
      {label}
      <input
        id={id}
        type="text"
        className="ddb-reset"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

TextField.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired, // We nest AND assign an id because of Comodo Dragon https://github.com/airbnb/javascript/pull/2136
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TextField.defaultProps = {
  className: "",
  label: undefined,
  value: undefined
};

export default TextField;

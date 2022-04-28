import React from "react";
import PropTypes from "prop-types";
import { useId } from "@reach/auto-id";
import Alert from "@reach/alert";
import Cross from "../icons/cross";

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
const TextField = React.forwardRef(
  (
    {
      labelClass,
      containerClass,
      inputClass,
      hideLabel,
      label,
      placeholder,
      id,
      defaultValue,
      name,
      value,
      required,
      onChange,
      error
    },
    ref
  ) => {
    const generatedId = useId(id);
    return (
      <>
        <label
          htmlFor={generatedId}
          className={`dpl-reset dpl-textfield__label ${
            hideLabel ? "dpl-textfield__label--hidden" : ""
          } ${labelClass}`}
        >
          {label}
        </label>
        <div className={`dpl-textfield__container ${containerClass}`}>
          <div className="dpl-textfield__action">
            <input
              id={generatedId}
              name={name}
              ref={ref}
              defaultValue={defaultValue}
              type="text"
              className={`dpl-reset dpl-textfield__input ${
                error ? "dpl-textfield__input--error" : ""
              } ${inputClass}`}
              value={value}
              placeholder={placeholder || label}
              onChange={onChange}
              required={required}
            />
            <div className="dpl-textfield__icon">
              {error && <Cross variant="red" />}
            </div>
          </div>
          <div className="dpl-textfield__error">
            {error && <Alert type="polite">{error}</Alert>}
          </div>
        </div>
      </>
    );
  }
);

TextField.propTypes = {
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  containerClass: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

TextField.defaultProps = {
  inputClass: "",
  containerClass: "",
  labelClass: "",
  error: false,
  id: undefined,
  value: undefined,
  defaultValue: "",
  placeholder: undefined,
  onChange: undefined,
  hideLabel: true,
  required: false
};

export default TextField;

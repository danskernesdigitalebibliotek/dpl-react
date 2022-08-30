import React from "react";
import IconCheckbox from "../../../../components/icon-checkbox/icon-checkbox";

interface CheckBoxProps {
  id: string;
  label: string;
  hideLabel?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({ id, label, hideLabel }) => {
  return (
    <div className="checkbox">
      <input id={id} className="checkbox__input" type="checkbox" />
      <label className="checkbox__label" htmlFor={id}>
        <span className="checkbox__icon">
          <IconCheckbox />
        </span>
        <span
          className={`checkbox__text text-small-caption color-secondary-gray ${
            hideLabel ? "checkbox__text--hide-visually" : ""
          }`}
        >
          {label}
        </span>
      </label>
    </div>
  );
};

export default CheckBox;

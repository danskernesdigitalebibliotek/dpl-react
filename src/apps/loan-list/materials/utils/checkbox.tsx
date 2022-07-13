import React from "react";

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
          <svg width="20px" height="20px">
            <polyline
              points="1.5 6 4.5 9 10.5 1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
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

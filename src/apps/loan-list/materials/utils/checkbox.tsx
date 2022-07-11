import React from "react";

interface CheckBoxProps {
  id: string;
  label: string;
  hideLabel?: boolean;
  additionalClasses?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  id,
  label,
  hideLabel,
  additionalClasses
}) => {
  return (
    // todo add space between label adn checkbox
    <div className={`checkbox ${additionalClasses}`}>
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
        {/* todo hide label class on hide label */}
        <span
          className={`checkbox__text text-small-caption color-secondary-gray ${
            hideLabel ? "hide-visually" : ""
          }`}
        >
          {label}
        </span>
        <input id={id} className="checkbox__input" type="checkbox" />
      </label>
    </div>
  );
};

export default CheckBox;

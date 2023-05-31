import React, { FC, ReactNode } from "react";
import IconCheckbox from "../icon-checkbox/icon-checkbox";

interface CheckBoxProps {
  id: string;
  label?: string | ReactNode;
  hideLabel?: boolean;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onChecked?: (value: boolean) => void;
  ariaLabel?: string;
  focused?: boolean;
}

const CheckBox: FC<CheckBoxProps> = ({
  id,
  label,
  hideLabel,
  className,
  selected,
  onChecked,
  disabled,
  ariaLabel,
  focused
}) => {
  const checkedHandler = (checked: boolean) => {
    if (onChecked) {
      onChecked(checked);
    }
  };

  return (
    <div className={`checkbox ${className || ""}`}>
      <input
        // This is to handle focus when more items are loaded via pagination
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={focused}
        id={id}
        data-cy={id}
        className="checkbox__input"
        onChange={(e) => {
          checkedHandler(e.target.checked);
        }}
        checked={selected}
        type="checkbox"
        aria-label={ariaLabel}
        disabled={disabled}
      />
      <label className="checkbox__label" htmlFor={id}>
        <span className="checkbox__icon">
          <IconCheckbox />
        </span>
        {label && (
          <span
            className={`checkbox__text text-small-caption color-secondary-gray ${
              hideLabel ? "checkbox__text--hide-visually" : ""
            }`}
          >
            {label}
          </span>
        )}
      </label>
    </div>
  );
};

export default CheckBox;

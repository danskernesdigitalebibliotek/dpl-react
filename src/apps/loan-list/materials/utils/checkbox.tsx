import React, { FC } from "react";
import IconCheckbox from "../../../../components/icon-checkbox/icon-checkbox";
import { FaustId } from "../../../../core/utils/types/ids";

interface CheckBoxProps {
  id: string;
  label: string;
  hideLabel?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onChecked: (faust: FaustId) => void;
}

const CheckBox: FC<CheckBoxProps> = ({
  id,
  label,
  hideLabel,
  selected,
  onChecked,
  disabled
}) => {
  return (
    <div className="checkbox">
      <input
        id={id}
        className="checkbox__input"
        onChange={() => onChecked(id as FaustId)}
        checked={selected}
        type="checkbox"
        disabled={disabled}
      />
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

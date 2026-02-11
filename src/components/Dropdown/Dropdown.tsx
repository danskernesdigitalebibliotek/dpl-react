import clsx from "clsx";
import React from "react";
import DropdownIcon from "./DropdownIcon";
import { FormSelectValue } from "../reservation/forms/types";

export type Option<TValue extends FormSelectValue = string> = {
  label: string;
  disabled?: boolean;
  value: TValue;
};

type DropdownProps<TValueType extends FormSelectValue> = {
  options: Option<TValueType>[];
  label?: string;
  labelClassName?: string;
  id?: string;
  ariaLabel: string;
  labelledBy?: string;
  arrowIcon: "triangles" | "chevron";
  classNames?: string;
  innerClassNames?: { select?: string; option?: string; arrowWrapper?: string };
  handleOnChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: Option;
  cyData?: string;
  defaultValue?: TValueType;
};

const Dropdown = <TValueType extends FormSelectValue>({
  arrowIcon,
  ariaLabel,
  options,
  classNames,
  innerClassNames,
  handleOnChange,
  placeholder,
  cyData,
  label,
  labelClassName,
  id,
  labelledBy,
  defaultValue
}: DropdownProps<TValueType>) => {
  const classes = {
    root: clsx("dropdown", classNames),
    select: clsx("dropdown__select", innerClassNames?.select),
    option: clsx("dropdown__option", innerClassNames?.option),
    arrowWrapper: clsx("dropdown__arrows", innerClassNames?.arrowWrapper)
  };

  const checkHandleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (handleOnChange && e.target.value) {
      handleOnChange(e);
    }
    return undefined;
  };

  const optionsList = placeholder ? [placeholder, ...options] : options;

  return (
    <div className={classes.root}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <div className={classes.root}>
        <select
          id={id}
          data-cy={cyData}
          className={classes.select}
          aria-labelledby={labelledBy}
          aria-label={ariaLabel}
          onChange={checkHandleOnChange}
        >
          {optionsList.map(({ label: optionsLabel, value, disabled }) => (
            <option
              key={optionsLabel}
              value={value}
              className={classes.option}
              disabled={disabled}
              selected={value.toString() === defaultValue?.toString()}
            >
              {optionsLabel}
            </option>
          ))}
        </select>
        <div className={classes.arrowWrapper}>
          <DropdownIcon arrowIcon={arrowIcon} />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

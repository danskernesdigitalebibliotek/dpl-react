import clsx from "clsx";
import React from "react";
import DropdownIcon from "./DropdownIcon";

export type Option = {
  label: string;
  href?: string;
  disabled?: boolean;
  value: string;
  selected?: boolean;
};

type DropdownProps = {
  options: Option[];
  ariaLabel: string;
  arrowIcon: "triangles" | "chevron";
  classNames?: string;
  innerClassNames?: { select?: string; option?: string; arrowWrapper?: string };
  handleOnChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
};

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  arrowIcon,
  ariaLabel,
  options,
  classNames,
  innerClassNames,
  handleOnChange,
  placeholder
}) => {
  const classes = {
    root: clsx("dropdown", classNames),
    select: clsx("dropdown__select", innerClassNames?.select),
    option: clsx("dropdown__option", innerClassNames?.option),
    arrowWrapper: clsx("dropdown__arrows", innerClassNames?.arrowWrapper)
  };

  const checkHandleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (handleOnChange && e.target.value) handleOnChange(e);
    return undefined;
  };

  return (
    <div className={classes.root}>
      <select
        className={classes.select}
        aria-label={ariaLabel}
        onChange={checkHandleOnChange}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(({ label, value, disabled, selected }) => {
          return (
            <option
              key={label}
              value={value}
              className={classes.option}
              disabled={disabled}
              selected={selected}
            >
              {label}
            </option>
          );
        })}
      </select>
      <div className={classes.arrowWrapper}>
        <DropdownIcon arrowIcon={arrowIcon} />
      </div>
    </div>
  );
};

export default Dropdown;

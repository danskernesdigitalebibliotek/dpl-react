import clsx from "clsx";
import React from "react";
import DropdownIcon from "./DropdownIcon";

export type DropdownItem = {
  label: string;
  href?: string;
  disabled?: boolean;
  value: string;
  selected?: boolean;
};

type DropdownProps = {
  list: DropdownItem[];
  ariaLabel: string;
  arrowIcon: "triangles" | "chevron";
  classNames?: string;
  innerClassNames?: { select?: string; option?: string; arrowWrapper?: string };
  handleOnChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: {
    label: string;
    selected?: boolean;
    disabled?: boolean;
    hidden?: boolean;
  };
  defaultValue?: string;
};

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  arrowIcon,
  ariaLabel,
  list,
  classNames,
  innerClassNames,
  handleOnChange,
  placeholder,
  defaultValue
}) => {
  const classes = {
    root: clsx("dropdown", classNames),
    select: clsx("dropdown__select", innerClassNames?.select),
    option: clsx("dropdown__option", innerClassNames?.option),
    arrowWrapper: clsx("dropdown__arrows", innerClassNames?.arrowWrapper)
  };
  return (
    <div className={classes.root}>
      <select
        className={classes.select}
        aria-label={ariaLabel}
        onChange={handleOnChange ? (e) => handleOnChange(e) : undefined}
        defaultValue={defaultValue ?? undefined}
      >
        {placeholder && (
          <option
            className={classes.option}
            hidden={placeholder.hidden ?? undefined}
            selected={placeholder.selected ?? undefined}
            disabled={placeholder.disabled ?? undefined}
          >
            {placeholder.label}
          </option>
        )}

        {list.map(({ label, value, disabled, selected }) => {
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

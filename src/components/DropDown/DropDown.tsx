import clsx from "clsx";
import React from "react";
import DropdownIcon from "./DropdownIcon";

export type DropdownItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  value?: unknown;
  selected?: boolean;
};

type DropDownProps = {
  list: DropdownItem[];
  ariaLabel: string;
  arrowIcon: "triangles" | "chevron";
  classNames?: string;
  innerClassNames?: { select?: string; option?: string; arrowWrapper?: string };
  handleOnChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
};

const DropDown: React.FunctionComponent<DropDownProps> = ({
  arrowIcon,
  ariaLabel,
  list,
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
  return (
    <div className={classes.root}>
      <select
        className={classes.select}
        aria-label={ariaLabel}
        onChange={handleOnChange ? (e) => handleOnChange(e) : undefined}
      >
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}

        {list.map(({ title, disabled, selected }) => {
          return (
            <option
              value={title}
              key={title}
              className={classes.option}
              disabled={disabled}
              selected={selected}
            >
              {title}
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

export default DropDown;

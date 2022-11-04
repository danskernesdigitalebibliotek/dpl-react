import React from "react";
import clsx from "clsx";

import iconTriangle from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-triangle.svg";
import iconExpandMore from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";

export type DropdownItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  value?: unknown;
  selected?: boolean;
};

export const DropdownIcon = ({
  arrowIcon
}: {
  arrowIcon: "triangles" | "chevron";
}) => {
  if (arrowIcon === "triangles") {
    return (
      <span>
        <img className="dropdown__arrow" src={iconTriangle} alt="" />
        <img
          className="dropdown__arrow dropdown__arrow--bottom"
          src={iconTriangle}
          alt=""
        />
      </span>
    );
  }

  if (arrowIcon === "chevron") {
    return <img className="dropdown__arrow" src={iconExpandMore} alt="" />;
  }

  return null;
};

export type DropdownProps = {
  list: DropdownItem[];
  ariaLabel: string;
  arrowIcon: "triangles" | "chevron";
  classNames?: string;
  innerClassNames?: { select?: string; option?: string; arrowWrapper?: string };
  handleOnChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
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

export default Dropdown;

import React, { useId } from "react";
import clsx from "clsx";

interface SearchToggleProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SearchToggle: React.FC<SearchToggleProps> = ({
  id,
  label,
  description,
  checked,
  onChange
}) => {
  const uniqueId = `${id}-${useId()}`;
  return (
    <div className="search-toggle">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={clsx(
          "search-toggle__button",
          checked && "search-toggle__button--checked"
        )}
        id={uniqueId}
      >
        <span className="search-toggle__slider" />
      </button>
      <label
        htmlFor={uniqueId}
        className="search-toggle__content cursor-pointer"
      >
        <span className="search-toggle__label">{label}</span>
        <span className="search-toggle__description">{description}</span>
      </label>
    </div>
  );
};

export default SearchToggle;

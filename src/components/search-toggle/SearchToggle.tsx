import React from "react";
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
  return (
    <div className="search-toggle">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={clsx(
          "search-toggle__button",
          checked && "search-toggle__button--checked"
        )}
        id={id}
      >
        <span className="search-toggle__slider" />
      </button>
      <label htmlFor={id} className="search-toggle__content cursor-pointer">
        <span className="search-toggle__label">{label}</span>
        <span className="search-toggle__description">{description}</span>
      </label>
    </div>
  );
};

export default SearchToggle;

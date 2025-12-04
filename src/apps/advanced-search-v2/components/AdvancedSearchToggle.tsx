import React from "react";
import clsx from "clsx";

interface AdvancedSearchToggleProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const AdvancedSearchToggle: React.FC<AdvancedSearchToggleProps> = ({
  id,
  label,
  description,
  checked,
  onChange
}) => {
  return (
    <div className="advanced-search-toggle">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={clsx(
          "advanced-search-toggle__button",
          checked && "advanced-search-toggle__button--checked"
        )}
        id={id}
      >
        <span className="advanced-search-toggle__slider" />
      </button>
      <label
        htmlFor={id}
        className="advanced-search-toggle__content cursor-pointer"
      >
        <span className="advanced-search-toggle__label">{label}</span>
        <span className="advanced-search-toggle__description">
          {description}
        </span>
      </label>
    </div>
  );
};

export default AdvancedSearchToggle;

import React from "react";
import clsx from "clsx";

export type RadioOption = {
  label: string;
  value: string;
};

interface AdvancedSearchRadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string | null;
  onChange: (value: string | null) => void;
}

const AdvancedSearchRadioGroup: React.FC<AdvancedSearchRadioGroupProps> = ({
  name,
  options,
  value,
  onChange
}) => {
  const handleChange = (optionValue: string) => {
    // Toggle off if clicking the same value
    if (value === optionValue) {
      onChange(null);
    } else {
      onChange(optionValue);
    }
  };

  return (
    <div className="advanced-search-radio-group">
      {options.map((option) => (
        <label
          key={option.value}
          className={clsx(
            "advanced-search-radio-group__option",
            value === option.value &&
              "advanced-search-radio-group__option--selected"
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => handleChange(option.value)}
            className="advanced-search-radio-group__input"
          />
          <span className="advanced-search-radio-group__label">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default AdvancedSearchRadioGroup;

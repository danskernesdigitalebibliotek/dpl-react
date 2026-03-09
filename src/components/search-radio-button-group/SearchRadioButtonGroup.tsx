import React from "react";
import { RadioGroup, Radio, Label } from "@headlessui/react";

interface RadioOption {
  value: string;
  label: string;
}

interface SearchRadioButtonGroupProps {
  name: string;
  options: RadioOption[];
  selectedValue: string | null;
  onChange: (value: string | null) => void;
}

const SearchRadioButtonGroup = ({
  options,
  selectedValue,
  onChange
}: SearchRadioButtonGroupProps) => {
  const handleRadioClick = (optionValue: string) => {
    // Toggle: if clicking the already-selected value, deselect it
    if (selectedValue === optionValue) {
      onChange(null);
    } else {
      onChange(optionValue);
    }
  };

  return (
    <RadioGroup
      value={selectedValue ?? undefined}
      className="search-radio-button-group"
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          onClick={(e) => {
            e.preventDefault();
            handleRadioClick(option.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleRadioClick(option.value);
            }
          }}
        >
          {({ checked }) => (
            <Label className="search-radio-button-group__label">
              <span
                className={`search-radio-button-group__input ${
                  checked ? "search-radio-button-group__input--checked" : ""
                }`}
              />
              {option.label}
            </Label>
          )}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default SearchRadioButtonGroup;

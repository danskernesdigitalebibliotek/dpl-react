import React from "react";
import { RadioGroup, Radio, Label } from "@headlessui/react";

interface RadioOption {
  value: string;
  label: string;
}

interface AdvancedSearchRadioGroupProps {
  name: string;
  options: RadioOption[];
  selectedValue: string | null;
  onChange: (value: string | null) => void;
}

const AdvancedSearchRadioGroup = ({
  options,
  selectedValue,
  onChange
}: AdvancedSearchRadioGroupProps) => {
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
      className="advanced-search-radio-group"
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
            <Label className="advanced-search-radio-group__label">
              <span
                className={`advanced-search-radio-group__input ${
                  checked ? "advanced-search-radio-group__input--checked" : ""
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

export default AdvancedSearchRadioGroup;

import React from "react";

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

const AdvancedSearchRadioGroup: React.FC<AdvancedSearchRadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange
}) => {
  const handleClick = (value: string) => {
    // Toggle: if clicking the already-selected value, deselect it
    if (selectedValue === value) {
      onChange(null);
    } else {
      onChange(value);
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      {options.map((option) => (
        <label
          key={option.value}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleClick(option.value)}
            style={{
              cursor: "pointer",
              width: "16px",
              height: "16px"
            }}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default AdvancedSearchRadioGroup;

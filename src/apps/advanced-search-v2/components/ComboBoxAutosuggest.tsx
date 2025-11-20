import React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions
} from "@headlessui/react";
import clsx from "clsx";
import type { Option } from "../types";

export type ComboBoxAutosuggestProps = {
  items: Option[];
  value?: string;
  onInputChange: (query: string) => void;
  placeholder?: string;
};

const ComboBoxAutosuggest: React.FC<ComboBoxAutosuggestProps> = ({
  items,
  value = "",
  onInputChange,
  placeholder = "Start typing …"
}) => {
  const hiddenOption = { value: "__hidden__", label: "" };

  const handleItemSelect = (item: Option | null) => {
    // Ignore hidden option selection
    if (item && item.value !== "__hidden__") {
      onInputChange(item.label);
    }
  };

  const filtered =
    value === ""
      ? items
      : items.filter((item) =>
          item.label.toLowerCase().includes(value.toLowerCase())
        );

  return (
    <Combobox value={hiddenOption} onChange={handleItemSelect}>
      <ComboboxInput
        className={clsx("combobox-input")}
        onChange={(e) => onInputChange(e.target.value)}
        displayValue={() => value}
        placeholder={placeholder}
      />

      {value.length >= 3 && filtered.length > 0 && (
        <ComboboxOptions className="combobox-options">
          {/* Hidden option to prevent auto-selection of first item */}
          <ComboboxOption value={hiddenOption} style={{ display: "none" }}>
            {""}
          </ComboboxOption>

          {filtered.map((item) => (
            <ComboboxOption
              key={item.value}
              value={item}
              className={({ focus, selected }) =>
                clsx("combobox-option", {
                  "combobox-option--focused": focus,
                  "combobox-option--selected": selected
                })
              }
            >
              {item.label}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      )}
    </Combobox>
  );
};

export default ComboBoxAutosuggest;

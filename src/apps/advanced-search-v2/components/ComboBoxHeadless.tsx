import React, { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions
} from "@headlessui/react";
import clsx from "clsx";
import type { Option } from "../suggestions";

export type ComboBoxProps = {
  items: Option[];
  onSelect: (item: Option) => void;

  onQueryChange?: (q: string) => void;
};

const ComboBoxHeadless = ({
  items,
  onSelect,

  onQueryChange
}: ComboBoxProps) => {
  const [selected, setSelected] = useState<Option | null>(null);

  return (
    <Combobox
      value={selected}
      onChange={(item) => {
        setSelected(item);
        if (item) onSelect(item);
      }}
      by="value"
    >
      <ComboboxInput
        className="advanced-search-suggest__combobox-input"
        onChange={(event) => {
          const v = event.currentTarget.value;
          onQueryChange?.(v);
        }}
        displayValue={(item: Option | null) => (item ? item.label : "")}
        placeholder="Start typing …"
      />

      <ComboboxOptions className="advanced-search-suggest__combobox-dropdown">
        {items.map((item) => (
          <ComboboxOption
            key={item.value}
            value={item}
            className={({ focus, selected }) =>
              clsx("advanced-search-combobox-option", {
                "is-focus": focus,
                "is-selected": selected
              })
            }
          >
            {item.label}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};

export default ComboBoxHeadless;

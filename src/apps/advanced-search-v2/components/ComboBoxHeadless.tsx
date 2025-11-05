import React, { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label
} from "@headlessui/react";
import clsx from "clsx";
import type { Option } from "../suggestions";

export type ComboBoxProps = {
  items: Option[];
  onSelect: (item: Option) => void;
  label?: string;
  onQueryChange?: (q: string) => void;
};

const ComboBoxHeadless = ({
  items,
  onSelect,
  label = "Choose an item",
  onQueryChange
}: ComboBoxProps) => {
  const [selected, setSelected] = useState<Option | null>(null);

  return (
    <div className="adv2-combobox">
      <Combobox
        value={selected}
        onChange={(item) => {
          setSelected(item);
          if (item) onSelect(item);
        }}
        by="value"
      >
        <Label className="adv2-combobox__label">{label}</Label>
        <div className="adv2-combobox__row">
          <ComboboxInput
            onChange={(event) => {
              const v = event.currentTarget.value;
              onQueryChange?.(v);
            }}
            displayValue={(item: Option | null) => (item ? item.label : "")}
            placeholder="Start typing …"
            className="adv2-combobox__input focus-styling__input"
          />
        </div>
        <ComboboxOptions className="adv2-combobox__menu">
          {items.map((item) => (
            <ComboboxOption
              key={item.value}
              value={item}
              className={({ active, selected }) =>
                clsx("adv2-combobox__option", {
                  "is-active": active,
                  "is-selected": selected
                })
              }
            >
              {item.label}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};

export default ComboBoxHeadless;

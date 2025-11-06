import React, { useMemo, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label
} from "@headlessui/react";
import type { Option } from "../suggestions";

import clsx from "clsx";
import CheckBox from "../../../components/checkbox/Checkbox";

export type FacetsSelectProps = {
  items: Option[];
  label?: string;
  onChange?: (selected: Option[]) => void;
};

const FacetsSelectHeadless: React.FC<FacetsSelectProps> = ({
  items,
  label = "Facet",
  onChange
}) => {
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items;
  }, [items, query]);

  return (
    <div className="">
      <Combobox
        multiple
        value={selectedItems}
        onChange={(vals: Option[]) => {
          setSelectedItems(vals);
          onChange?.(vals);
        }}
        by={(a: Option, b: Option) => a.value === b.value}
      >
        <Label className="">{label}</Label>
        <div className="">
          <ComboboxInput
            className=""
            placeholder="Start typing …"
            onChange={(e) => setQuery(e.currentTarget.value)}
            displayValue={() => query}
          />
          <ComboboxOptions className="" static>
            {filtered.length === 0 && <li className="">No results</li>}
            {filtered.map((item) => (
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
                {({ selected }) => (
                  <CheckBox
                    id={`facets-hu-${item.value}`}
                    label={item.label}
                    selected={selected}
                    onChecked={() => {}}
                    isVisualOnly
                  />
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
};

export default FacetsSelectHeadless;

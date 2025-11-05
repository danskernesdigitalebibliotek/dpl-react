import React, { useMemo, useState } from "react";
import { Combobox } from "@headlessui/react";
import type { Option } from "../suggestions";
import CheckBox from "../../../components/checkbox/Checkbox";
import clsx from "clsx";

export type FacetsSelectProps = {
  items: Option[];
  label?: string;
  onChange?: (selected: Option[]) => void;
};

const FacetsSelectHeadless: React.FC<FacetsSelectProps> = ({
  items,
  label = "Choose items",
  onChange
}) => {
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items;
  }, [items, query]);

  return (
    <div className="adv2-multiselect">
      <Combobox
        multiple
        value={selectedItems}
        onChange={(vals: Option[]) => {
          setSelectedItems(vals);
          onChange?.(vals);
        }}
        by={(a: Option, b: Option) => a.value === b.value}
      >
        <Combobox.Label className="adv2-multiselect__label">
          {label}
        </Combobox.Label>
        <div className="adv2-multiselect__row">
          <Combobox.Input
            className="adv2-multiselect__search focus-styling__input"
            placeholder="Start typing …"
            onChange={(e) => setQuery(e.currentTarget.value)}
            displayValue={() => query}
          />
          <Combobox.Options className="adv2-multiselect__menu" static>
            {filtered.length === 0 && (
              <li className="adv2-combobox__muted">No results</li>
            )}
            {filtered.map((item) => (
              <Combobox.Option
                key={item.value}
                value={item}
                className={({ active }) =>
                  clsx("adv2-multiselect__option", { "is-active": active })
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
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
};

export default FacetsSelectHeadless;

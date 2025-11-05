import React, { useMemo, useState } from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import type { Option } from "../suggestions";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Popover,
  PopoverButton,
  PopoverPanel
} from "@headlessui/react";
import CheckBox from "../../../components/checkbox/Checkbox";
import clsx from "clsx";

export type MultiSelectProps = {
  items: Option[];
  label?: string;
  onChange?: (selected: Option[]) => void;
};

const MultiSelectHeadless: React.FC<MultiSelectProps> = ({
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
      <Popover>
        <PopoverButton className="dropdown dropdown--grey-borders">
          <div className="dropdown__select dropdown__select--inline-body-font focus-styling">
            {label}
          </div>
          <div className="dropdown__arrows dropdown__arrows--inline">
            <img className="dropdown__arrow" src={IconExpand} alt="" />
          </div>
        </PopoverButton>

        <PopoverPanel
          style={{
            backgroundColor: "white"
          }}
        >
          <Combobox
            multiple
            value={selectedItems}
            onChange={(vals: Option[]) => {
              setSelectedItems(vals);
              onChange?.(vals);
            }}
            by={(a: Option, b: Option) => a.value === b.value}
          >
            <ComboboxInput
              className="adv2-multiselect__search focus-styling__input"
              placeholder="Start typing …"
              onChange={(e) => setQuery(e.target.value)}
              displayValue={() => query}
            />

            <ComboboxOptions
              static
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                width: "100%"
              }}
            >
              {filtered.length === 0 && query.length > 0 && (
                <li
                  className="adv2-combobox__muted"
                  style={{ padding: "8px 12px", color: "#666" }}
                >
                  No results
                </li>
              )}
              {items.length === 0 && (
                <li
                  className="adv2-combobox__muted"
                  style={{ padding: "8px 12px", color: "#666" }}
                >
                  No items available
                </li>
              )}
              {filtered.map((item) => (
                <ComboboxOption
                  key={item.value}
                  value={item}
                  className={({ focus }) =>
                    clsx("adv2-multiselect__option", { "is-active": focus })
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
          </Combobox>
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default MultiSelectHeadless;

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

import clsx from "clsx";
import CheckBox from "../../../components/checkbox/Checkbox";

type Props = {
  items: Option[];
  onChange?: (vals: Option[]) => void;
  label?: string;
};

const MultiSelectHeadless: React.FC<Props> = ({
  items = [],
  onChange,
  label = "Label"
}) => {
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items;
  }, [items, query]);

  return (
    <Popover className="advanced-search-select-search">
      <PopoverButton className="dropdown dropdown--grey-borders advanced-search-select-search__button">
        <div
          className="dropdown__select dropdown__select--inline-body-font focus-styling"
          style={{ height: "100%" }}
        >
          {label}
        </div>
        <div className="dropdown__arrows dropdown__arrows--inline">
          <img className="dropdown__arrow" src={IconExpand} alt="" />
        </div>
      </PopoverButton>

      <PopoverPanel
        anchor="bottom"
        className="advanced-search-select-search__dropdown"
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
            className="advanced-search-select-search__dropdown-input"
            placeholder="Start typing …"
            onChange={(e) => setQuery(e.target.value)}
            displayValue={() => query}
          />
          <ComboboxOptions static>
            {filtered?.length === 0 && query.length > 0 && (
              <li className="advanced-search-combobox-option">No results</li>
            )}
            {items.length === 0 && (
              <li className="advanced-search-combobox-option">
                No items available
              </li>
            )}
            {filtered?.map((item) => (
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
        </Combobox>
      </PopoverPanel>
    </Popover>
  );
};

export default MultiSelectHeadless;

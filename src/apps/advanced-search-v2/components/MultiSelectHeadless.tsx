import React, { useState } from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import type { Option } from "../suggestions";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import CheckBox from "../../../components/checkbox/Checkbox";
import ComboBoxBase from "./ComboBoxBase";

type Props = {
  items: Option[];
  value: Option[];
  onChange?: (vals: Option[]) => void;
  label?: string;
};

const MultiSelectHeadless: React.FC<Props> = ({
  items = [],
  value,
  onChange,
  label = "Label"
}) => {
  const [query, setQuery] = useState("");

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
        className="advanced-search-dropdown advanced-search-select-search__popover-panel"
      >
        <ComboBoxBase
          multiple
          items={items}
          value={value ?? []}
          onChange={(vals) => {
            if (Array.isArray(vals)) {
              onChange?.(vals);
            }
          }}
          query={query}
          onQueryChange={setQuery}
          classes={{
            options: "advanced-search-select-search__combobox-options"
          }}
          optionsStatic
          showEmptyStates
          renderOption={(item, state) => (
            <CheckBox
              id={`facets-hu-${item.value}`}
              label={item.label}
              selected={state.selected}
              onChecked={() => {}}
              isVisualOnly
            />
          )}
        />
      </PopoverPanel>
    </Popover>
  );
};

export default MultiSelectHeadless;

import React, { useState } from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import type { Option } from "../lib/suggestions";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useText } from "../../../core/utils/text";

import CheckBox from "../../../components/checkbox/Checkbox";
import ComboBoxBase from "./ComboBoxBase";

type HeadlessMultiSelectProps = {
  items: Option[];
  value: Option[];
  onChange?: (vals: Option[]) => void;
  label: string;
};

const HeadlessMultiSelect: React.FC<HeadlessMultiSelectProps> = ({
  items = [],
  value,
  onChange,
  label
}) => {
  const t = useText();
  const [query, setQuery] = useState("");
  const selectedCount = value?.length ?? 0;
  const hasSelection = selectedCount > 0;

  return (
    <div className="advanced-search-select-search-wrapper">
      {label && (
        <label className="advanced-search-select-search__label">{label}</label>
      )}
      <Popover className="advanced-search-select-search">
        <PopoverButton className="dropdown dropdown--grey-borders advanced-search-select-search__button">
          <div className="dropdown__select dropdown__select--inline-body-font focus-styling advanced-search-v2__multiselect-button">
            {hasSelection ? t("advancedSearchSelectedText") : t("advancedSearchAllText")}
            {hasSelection && (
              <span className="advanced-search-v2__count-badge">
                {selectedCount}
              </span>
            )}
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
                id={`advanced-search-select-${item.value}`}
                label={item.label}
                selected={state.selected}
                onChecked={() => {}}
                isVisualOnly
              />
            )}
          />
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default HeadlessMultiSelect;

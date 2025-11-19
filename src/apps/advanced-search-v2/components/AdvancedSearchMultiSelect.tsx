import React, { useState } from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import type { Option } from "../lib/suggestions";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useText } from "../../../core/utils/text";

import CheckBox from "../../../components/checkbox/Checkbox";
import ComboBoxBase from "./ComboBoxBase";

type AdvancedSearchMultiSelectProps = {
  items: Option[];
  value: Option[];
  onChange?: (vals: Option[]) => void;
  label: string;
};

const AdvancedSearchMultiSelect: React.FC<AdvancedSearchMultiSelectProps> = ({
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
    <div className="advanced-search-multi-select-wrapper">
      {label && (
        <label className="advanced-search-multi-select__label">{label}</label>
      )}
      <Popover className="advanced-search-multi-select">
        <PopoverButton className="dropdown dropdown--grey-borders advanced-search-multi-select__button">
          <div className="dropdown__select dropdown__select--inline-body-font focus-styling advanced-search-v2__multiselect-button">
            {hasSelection
              ? t("advancedSearchSelectedText")
              : t("advancedSearchAllText")}
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
          className="advanced-search-dropdown advanced-search-multi-select__popover-panel"
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
              options: "advanced-search-multi-select__combobox-options"
            }}
            optionsStatic
            showEmptyStates
            focusOnMount
            renderOption={(item, state) => (
              <CheckBox
                id={`advanced-search-select-${item.value}`}
                label={item.label}
                selected={state.selected}
                onChecked={() => {}}
                isVisualOnly
                tabIndex={-1}
              />
            )}
          />

          <div className="advanced-search-multi-select__footer">
            <button
              type="button"
              className="advanced-search-multi-select__reset-button"
              onClick={() => {
                onChange?.([]);
                setQuery("");
              }}
            >
              {t("advancedSearchResetText")}
            </button>
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default AdvancedSearchMultiSelect;

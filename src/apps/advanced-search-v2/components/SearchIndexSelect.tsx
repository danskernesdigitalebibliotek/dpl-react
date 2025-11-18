import React, { forwardRef } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from "@headlessui/react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import clsx from "clsx";
import {
  SEARCH_INDEX_OPTIONS,
  type SearchIndexItem
} from "../lib/search-fields-config";
import { useText } from "../../../core/utils/text";

export type SearchIndexSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchIndexSelect = forwardRef<HTMLButtonElement, SearchIndexSelectProps>(
  ({ value, onChange }, ref) => {
    const t = useText();

    const selectedOption = SEARCH_INDEX_OPTIONS.find(
      (item) => item.value === value
    );

    return (
      <Listbox value={value} onChange={onChange}>
        <div className="advanced-search-v2__search-index-select">
          <ListboxButton ref={ref} className="dropdown dropdown--grey-borders ">
            <div className="dropdown__select dropdown__select--inline-body-font focus-styling">
              {selectedOption ? t(selectedOption.labelKey) : "Select"}
            </div>
            <div className="dropdown__arrows dropdown__arrows--inline">
              <img className="dropdown__arrow" src={IconExpand} alt="" />
            </div>
          </ListboxButton>

          <ListboxOptions className="advanced-search-dropdown">
            {SEARCH_INDEX_OPTIONS.map((item: SearchIndexItem) => (
              <ListboxOption
                key={item.value}
                value={item.value}
                className={({ focus, selected }) =>
                  clsx("advanced-search-combobox-option", {
                    "is-focus": focus,
                    "is-selected": selected
                  })
                }
              >
                {t(item.labelKey)}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    );
  }
);

SearchIndexSelect.displayName = "SearchIndexSelect";

export default SearchIndexSelect;

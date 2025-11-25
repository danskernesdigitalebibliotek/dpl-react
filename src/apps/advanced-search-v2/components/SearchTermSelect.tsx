import React, { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from "@headlessui/react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import clsx from "clsx";
import {
  SEARCH_TERM_OPTIONS,
  type SearchTermItem
} from "../lib/search-fields-config";
import { useText } from "../../../core/utils/text";

export type SearchTermSelectProps = {
  value: string;
  onChange: (value: string) => void;
  shouldAutoFocus?: boolean;
};

const SearchTermSelect = ({
  value,
  onChange,
  shouldAutoFocus
}: SearchTermSelectProps) => {
  const t = useText();
  const [isButtonFocused, setIsButtonFocused] = useState(false);

  const selectedOption = SEARCH_TERM_OPTIONS.find(
    (item) => item.value === value
  );

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => {
        const isFocused = isButtonFocused || open;

        return (
          <div className={clsx("select", { "select--focused": isFocused })}>
            <ListboxButton
              // Intentionally allow autoFocus when the parent asks us to move focus after add/remove
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={shouldAutoFocus}
              className="select-button"
              onFocus={() => setIsButtonFocused(true)}
              onBlur={() => setIsButtonFocused(false)}
            >
              <p>{selectedOption ? t(selectedOption.labelKey) : "Select"}</p>
              <div className="select-button__arrow">
                <img src={IconExpand} alt="" />
              </div>
            </ListboxButton>

            <ListboxOptions className="select-options">
              {SEARCH_TERM_OPTIONS.map((item: SearchTermItem) => (
                <ListboxOption
                  key={item.value}
                  value={item.value}
                  className={({ focus }) =>
                    clsx("select-option", {
                      "select-option--focused": focus
                    })
                  }
                >
                  {t(item.labelKey)}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        );
      }}
    </Listbox>
  );
};

export default SearchTermSelect;

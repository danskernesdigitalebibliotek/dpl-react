import React, { useMemo, useState } from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import clsx from "clsx";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions
} from "@headlessui/react";
import type { Option } from "../types";
import { useText } from "../../../core/utils/text";
import CheckBox from "../../../components/checkbox/Checkbox";

type MultiSelectProps = {
  options: Option[];
  selectedOptions: Option[];
  onChange?: (vals: Option[]) => void;
  label: string;
  enableSearch?: boolean;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions,
  onChange,
  label,
  enableSearch = false
}) => {
  const t = useText();
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (!enableSearch || !query) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query, enableSearch]);

  const selectedCount = selectedOptions.length;
  const hasSelection = selectedCount > 0;

  return (
    <div className="hui-multiselect-wrapper">
      <label className="hui-multiselect-wrapper__label">{t(label)}</label>

      <Popover className="hui-multiselect">
        {({ open }) => (
          <>
            <PopoverButton
              className={clsx("hui-multiselect__button", {
                "hui-multiselect__button--open": open
              })}
            >
              <div className="hui-multiselect__button-label">
                {hasSelection
                  ? t("advancedSearchSelectedText")
                  : t("advancedSearchAllText")}
                {hasSelection && (
                  <span className="hui-multiselect__button-label__count-badge">
                    {selectedCount}
                  </span>
                )}
              </div>
              <div className="hui-multiselect__button-arrow">
                <img src={IconExpand} alt="" />
              </div>
            </PopoverButton>

            <PopoverPanel className="hui-multiselect__popover-panel">
              <Combobox
                multiple
                value={selectedOptions}
                onChange={(val) => onChange?.(val)}
                by="value"
              >
                {enableSearch ? (
                  <ComboboxInput
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                    className="hui-multiselect__input"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t(
                      "advancedSearchMultiselectSearchPlaceholderText"
                    )}
                  />
                ) : (
                  // Hidden input to capture focus and keyboard events
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  <ComboboxInput readOnly autoFocus className="hide-visually" />
                )}

                <div className="hui-multiselect__options" tabIndex={-1}>
                  <ComboboxOptions static>
                    {filteredOptions.map((option) => (
                      <ComboboxOption key={option.value} value={option}>
                        {({ selected, focus }) => (
                          <div
                            className={clsx(
                              "hui-multiselect__options__option",
                              {
                                "hui-multiselect__options__option--selected":
                                  selected,
                                "hui-multiselect__options__option--focused":
                                  focus
                              }
                            )}
                          >
                            <CheckBox
                              id={`multiselect-${option.value}`}
                              label={option.label}
                              selected={selected}
                              isVisualOnly
                              tabIndex={-1}
                            />
                          </div>
                        )}
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </div>
              </Combobox>

              <div className="hui-multiselect__footer">
                <button
                  type="button"
                  className="hui-multiselect__reset-button"
                  onClick={() => onChange?.([])}
                  disabled={!hasSelection}
                >
                  {t("advancedSearchResetText")}
                </button>
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  );
};

export default MultiSelect;

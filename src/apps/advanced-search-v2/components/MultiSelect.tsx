import React, {
  useMemo,
  useRef,
  useEffect,
  useState,
  KeyboardEvent
} from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import clsx from "clsx";
import type { Option } from "../types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useText } from "../../../core/utils/text";
import CheckBox from "../../../components/checkbox/Checkbox";

const PopoverFocusHandler = ({
  open,
  enableSearch,
  inputRef,
  listRef
}: {
  open: boolean;
  enableSearch?: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  listRef: React.RefObject<HTMLUListElement | null>;
}) => {
  useEffect(() => {
    if (open) {
      if (enableSearch && inputRef.current) {
        inputRef.current.focus();
      } else if (!enableSearch && listRef.current) {
        const firstCheckbox = listRef.current.querySelector<HTMLInputElement>(
          'input[type="checkbox"]'
        );
        if (firstCheckbox) {
          firstCheckbox.focus();
        }
      }
    }
  }, [open, enableSearch, inputRef, listRef]);

  return null;
};

type MultiSelectProps = {
  options: Option[];
  selectedOptions: Option[];
  onChange?: (vals: Option[]) => void;
  label: string;
  enableSearch?: boolean;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options = [],
  selectedOptions,
  onChange,
  label,
  enableSearch
}) => {
  const t = useText();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const selectedCount = selectedOptions?.length ?? 0;
  const hasSelection = selectedCount > 0;

  // Filter options based on search value
  const filtered = useMemo(() => {
    const inputString = inputValue.trim().toLowerCase();
    if (!inputString) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(inputString)
    );
  }, [options, inputValue]);

  const handleToggle = (option: Option) => {
    const isSelected = selectedOptions.some(
      (opt) => opt.value === option.value
    );
    if (isSelected) {
      onChange?.(selectedOptions.filter((opt) => opt.value !== option.value));
    } else {
      onChange?.([...selectedOptions, option]);
    }
  };

  const handleReset = () => {
    onChange?.([]);
  };

  const handleListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (filtered.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < filtered.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case " ":
      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filtered.length) {
          handleToggle(filtered[focusedIndex]);
        }
        break;
    }
  };

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("li");
      items[focusedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth"
      });
    }
  }, [focusedIndex]);

  return (
    <div className="hui-multiselect-wrapper">
      {label && (
        <label
          htmlFor={`hui-multiselect-${label}`}
          className="hui-multiselect-wrapper__label"
        >
          {t(label)}
        </label>
      )}
      <Popover className="hui-multiselect">
        {({ open }) => {
          return (
            <>
              <PopoverFocusHandler
                open={open}
                enableSearch={enableSearch}
                inputRef={inputRef}
                listRef={listRef}
              />
              <PopoverButton
                id={`hui-multiselect-${label}`}
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
                {enableSearch && (
                  <input
                    ref={inputRef}
                    type="text"
                    className="hui-multiselect__input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown" && listRef.current) {
                        e.preventDefault();
                        const firstCheckbox =
                          listRef.current.querySelector<HTMLInputElement>(
                            'input[type="checkbox"]'
                          );
                        if (firstCheckbox) {
                          firstCheckbox.focus();
                          setFocusedIndex(0);
                        }
                      }
                    }}
                    placeholder={t(
                      "advancedSearchMultiselectSearchPlaceholderText"
                    )}
                  />
                )}

                <ul
                  ref={listRef}
                  className="hui-multiselect__options"
                  tabIndex={0}
                  role="listbox"
                  onKeyDown={handleListKeyDown}
                  onFocus={() => {
                    if (focusedIndex === -1 && filtered.length > 0) {
                      setFocusedIndex(0);
                    }
                  }}
                  onBlur={() => setFocusedIndex(-1)}
                >
                  {filtered.map((option, index) => {
                    const isSelected = selectedOptions.some(
                      (opt) => opt.value === option.value
                    );
                    const isFocused = focusedIndex === index;

                    return (
                      <li
                        className={clsx("hui-multiselect__options__option", {
                          "hui-multiselect__options__option--selected":
                            isSelected,
                          "hui-multiselect__options__option--focused": isFocused
                        })}
                        key={option.value}
                      >
                        <div
                          role="button"
                          tabIndex={-1}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault();
                              handleToggle(option);
                            }
                          }}
                        >
                          <CheckBox
                            id={`select-${option.value}`}
                            label={option.label}
                            selected={isSelected}
                            onChecked={() => handleToggle(option)}
                            isVisualOnly={false}
                            tabIndex={index === 0 && !enableSearch ? 0 : -1}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="hui-multiselect__footer">
                  <button
                    ref={resetButtonRef}
                    type="button"
                    className="hui-multiselect__reset-button"
                    onClick={handleReset}
                    disabled={selectedCount === 0}
                  >
                    {t("advancedSearchResetText")}
                  </button>
                </div>
              </PopoverPanel>
            </>
          );
        }}
      </Popover>
    </div>
  );
};

export default MultiSelect;

import React from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Radio,
  RadioGroup
} from "@headlessui/react";
import clsx from "clsx";
import { useText } from "../../../core/utils/text";
import { RangeValue, RangePreset } from "../types";

type RangeSelectProps = {
  label: string;
  value?: RangeValue;
  onChange: (next: RangeValue) => void;
  rangePresets: RangePreset[];
  fromLabel?: string;
  toLabel?: string;
  resetLabel?: string;
  formatBadge?: (from: number | null, to: number | null) => string | null;
};

const emptyRange: RangeValue = { from: null, to: null };

const parseIntegerOrNull = (rawValue: string): number | null => {
  const trimmed = rawValue.trim();
  if (trimmed === "") return null;

  const parsed = Number(trimmed);
  return Number.isNaN(parsed) ? null : parsed;
};

const defaultFormatBadge = (
  from: number | null,
  to: number | null
): string | null => {
  if (from === null) return null;
  if (to === null) return `${from}+`;
  if (from === to) return `${from}`;
  return `${from}-${to}`;
};

const RangeSelect: React.FC<RangeSelectProps> = ({
  label,
  value,
  onChange,
  rangePresets,
  fromLabel = "Fra",
  toLabel = "Til",
  resetLabel,
  formatBadge = defaultFormatBadge
}) => {
  const t = useText();
  const currentValue = value ?? emptyRange;

  const handlePresetChange = (presetId: string) => {
    const preset = rangePresets.find((p) => p.id === presetId);
    if (preset) {
      onChange({ from: preset.from, to: preset.to });
    }
  };

  const handleInputChange =
    (field: "from" | "to") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseIntegerOrNull(e.currentTarget.value);
      onChange({
        from: field === "from" ? newValue : currentValue.from,
        to: field === "to" ? newValue : currentValue.to
      });
    };

  const handleReset = () => onChange(emptyRange);

  return (
    <div className="range-select-wrapper">
      {label && <label className="range-select-wrapper__label">{label}</label>}
      <Popover className="range-select">
        {({ open }) => {
          return (
            <>
              <PopoverButton
                className={clsx("range-select__button", {
                  "range-select__button--open": open
                })}
              >
                <div className="range-select__button-label">
                  {currentValue.from !== null
                    ? t("advancedSearchSelectedText")
                    : t("advancedSearchAllText")}
                  {currentValue.from && currentValue.to && (
                    <span className="range-select__button-label__count-badge">
                      {formatBadge(currentValue.from, currentValue.to)}
                    </span>
                  )}
                </div>
                <div className="dropdown__arrows dropdown__arrows--inline">
                  <img className="dropdown__arrow" src={IconExpand} alt="" />
                </div>
              </PopoverButton>

              <PopoverPanel className="range-select__popover-panel">
                <div className="range-select__content">
                  <RadioGroup
                    value={
                      // Match current values to preset for aria-checked="true"
                      rangePresets.find(
                        (p) =>
                          p.from === currentValue.from &&
                          p.to === currentValue.to
                      )?.id ?? ""
                    }
                    onChange={handlePresetChange}
                  >
                    <div className="range-select__options">
                      {rangePresets.map((presetOption) => (
                        <Radio
                          key={presetOption.id}
                          value={presetOption.id}
                          className="range-select__option"
                        >
                          {({ checked }) => (
                            <div className="range-select__option-inner">
                              <span>{presetOption.label}</span>
                              <span
                                className={clsx(
                                  "range-select__option__bullet",
                                  checked &&
                                    "range-select__option__bullet--checked"
                                )}
                                aria-hidden="true"
                              />
                            </div>
                          )}
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>

                  <div className="range-select__range">
                    <div className="range-select__field">
                      <label
                        htmlFor="range-select-from"
                        className="range-select-wrapper__label"
                      >
                        {fromLabel}
                      </label>
                      <input
                        id="range-select-from"
                        type="number"
                        className="range-select__input"
                        value={currentValue.from ?? ""}
                        onChange={handleInputChange("from")}
                      />
                    </div>

                    <div className="range-select__separator">—</div>

                    <div className="range-select__field">
                      <label
                        htmlFor="range-select-to"
                        className="range-select-wrapper__label"
                      >
                        {toLabel}
                      </label>
                      <input
                        id="range-select-to"
                        type="number"
                        className="range-select__input"
                        value={currentValue.to ?? ""}
                        onChange={handleInputChange("to")}
                      />
                    </div>
                  </div>
                </div>

                <div className="range-select__footer">
                  <button
                    type="button"
                    className="range-select__reset-button"
                    onClick={handleReset}
                  >
                    {resetLabel ?? t("advancedSearchResetText")}
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

export default RangeSelect;

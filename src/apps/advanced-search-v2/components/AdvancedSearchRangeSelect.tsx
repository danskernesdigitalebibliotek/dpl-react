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

type AdvancedSearchRangeSelectProps = {
  label: string;
  value?: RangeValue;
  onChange: (next: RangeValue) => void;
  presets: RangePreset[];
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
  if (to === null || from === to) return `${from}+`;
  return `${from}-${to}`;
};

const AdvancedSearchRangeSelect: React.FC<AdvancedSearchRangeSelectProps> = ({
  label,
  value,
  onChange,
  presets,
  fromLabel = "Fra",
  toLabel = "Til",
  resetLabel,
  formatBadge = defaultFormatBadge
}) => {
  const t = useText();
  const currentValue = value ?? emptyRange;

  const rangeLabel = formatBadge(currentValue.from, currentValue.to);
  const buttonLabel =
    currentValue.from !== null
      ? t("advancedSearchSelectedText")
      : t("advancedSearchAllText");

  const handlePresetChange = (presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
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
    <div className="advanced-search-range-select-wrapper">
      {label && (
        <label className="advanced-search-multi-select__label">{label}</label>
      )}
      <Popover className="advanced-search-range-select">
        <PopoverButton className="dropdown dropdown--grey-borders advanced-search-multi-select__button">
          <div className="dropdown__select dropdown__select--inline-body-font focus-styling advanced-search-v2__multiselect-button">
            {buttonLabel}
            {rangeLabel && (
              <span className="advanced-search-v2__count-badge">
                {rangeLabel}
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
          <div className="advanced-search-range-select__content">
            <RadioGroup
              value={
                // Match current values to preset for aria-checked="true"
                presets.find(
                  (p) =>
                    p.from === currentValue.from && p.to === currentValue.to
                )?.id ?? ""
              }
              onChange={handlePresetChange}
            >
              <div className="advanced-search-range-select__options">
                {presets.map((presetOption) => (
                  <Radio
                    key={presetOption.id}
                    value={presetOption.id}
                    className="advanced-search-range-select__option"
                  >
                    {({ checked }) => (
                      <div className="advanced-search-range-select__option-inner">
                        <span
                          className={clsx(
                            "advanced-search-range-select__bullet",
                            checked &&
                              "advanced-search-range-select__bullet--checked"
                          )}
                          aria-hidden="true"
                        />
                        <span>{presetOption.label}</span>
                      </div>
                    )}
                  </Radio>
                ))}
              </div>
            </RadioGroup>

            <div className="advanced-search-range-select__range">
              <div className="advanced-search-range-select__field">
                <label className="input-label">{fromLabel}</label>
                <input
                  type="number"
                  className="advanced-search-range-select__input"
                  value={currentValue.from ?? ""}
                  onChange={handleInputChange("from")}
                />
              </div>

              <div className="advanced-search-range-select__separator">—</div>

              <div className="advanced-search-range-select__field">
                <label className="input-label">{toLabel}</label>
                <input
                  type="number"
                  className="advanced-search-range-select__input"
                  value={currentValue.to ?? ""}
                  onChange={handleInputChange("to")}
                />
              </div>
            </div>
          </div>

          <div className="advanced-search-multi-select__footer">
            <button
              type="button"
              className="advanced-search-multi-select__reset-button"
              onClick={handleReset}
            >
              {resetLabel ?? t("advancedSearchResetText")}
            </button>
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default AdvancedSearchRangeSelect;

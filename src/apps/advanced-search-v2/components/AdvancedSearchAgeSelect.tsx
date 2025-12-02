import React from "react";
import AdvancedSearchRangeSelect from "./AdvancedSearchRangeSelect";
import { RangePreset } from "../types";
import { useText } from "../../../core/utils/text";
import useRangeSelectAdapter from "../hooks/useRangeSelectAdapter";

type AdvancedSearchAgeSelectProps = {
  label: string;
  selectedValues: string[];
  onUpdate: (values: string[]) => void;
  resetLabel?: string;
  rangePresets: RangePreset[];
};

const AdvancedSearchAgeSelect: React.FC<AdvancedSearchAgeSelectProps> = ({
  label,
  selectedValues,
  onUpdate,
  resetLabel,
  rangePresets
}) => {
  const t = useText();
  const { value, handleChange } = useRangeSelectAdapter({
    selectedValues,
    onUpdate
  });

  const formatAgeBadge = (
    from: number | null,
    to: number | null
  ): string | null => {
    if (from === null) return null;
    if (to === null) {
      return t("advancedSearchAgeBadgeOpenEndedText", {
        placeholders: { "@age": from }
      });
    }
    if (from === to) {
      return t("advancedSearchAgeBadgeSingleText", {
        placeholders: { "@age": from }
      });
    }
    return t("advancedSearchAgeBadgeRangeText", {
      placeholders: { "@from": from, "@to": to }
    });
  };

  return (
    <AdvancedSearchRangeSelect
      label={label}
      value={value}
      onChange={handleChange}
      rangePresets={rangePresets}
      fromLabel={t("advancedSearchRangeFromText")}
      toLabel={t("advancedSearchRangeToText")}
      resetLabel={resetLabel}
      formatBadge={formatAgeBadge}
    />
  );
};

export default AdvancedSearchAgeSelect;

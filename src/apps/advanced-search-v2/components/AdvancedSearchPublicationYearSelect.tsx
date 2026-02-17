import React from "react";
import { RangePreset, RangeValue } from "../types";
import { useText } from "../../../core/utils/text";
import { parseRangeFromStrings, rangeToStrings } from "../helpers/rangeAdapter";
import RangeSelect from "./RangeSelect";

type AdvancedSearchPublicationYearSelectProps = {
  label: string;
  selectedValues: string[];
  onUpdate: (values: string[]) => void;
  resetLabel?: string;
  rangePresets: RangePreset[];
};

const formatYearBadge = (range: RangeValue): string | null => {
  const { from, to } = range;
  if (from === null) return null;
  if (to === null) return `${from}+`;
  if (from === to) return `${from}`;
  return `${from}-${to}`;
};

const AdvancedSearchPublicationYearSelect: React.FC<
  AdvancedSearchPublicationYearSelectProps
> = ({ label, selectedValues, onUpdate, resetLabel, rangePresets }) => {
  const t = useText();
  const value = parseRangeFromStrings(selectedValues);
  const handleChange = (range: RangeValue) => onUpdate(rangeToStrings(range));

  return (
    <RangeSelect
      label={label}
      value={value}
      onChange={handleChange}
      rangePresets={rangePresets}
      fromLabel={t("advancedSearchRangeFromText")}
      toLabel={t("advancedSearchRangeToText")}
      resetLabel={resetLabel}
      formatBadge={formatYearBadge}
    />
  );
};

export default AdvancedSearchPublicationYearSelect;

import React from "react";
import AdvancedSearchRangeSelect from "./AdvancedSearchRangeSelect";
import { RangeValue, RangePreset } from "../types";

type AdvancedSearchAgeSelectProps = {
  label: string;
  selectedValues: string[];
  onUpdate: (values: string[]) => void;
  resetLabel?: string;
  rangePresets: RangePreset[];
};

const formatAgeBadge = (
  from: number | null,
  to: number | null
): string | null => {
  if (from === null) return null;
  if (to === null) return `${from}+ årige`;
  if (from === to) return `${from} årige`;
  return `${from}-${to}-årige`;
};

const AdvancedSearchAgeSelect: React.FC<AdvancedSearchAgeSelectProps> = ({
  label,
  selectedValues,
  onUpdate,
  resetLabel,
  rangePresets
}) => {
  // Convert string[] to RangeValue
  const value: RangeValue = {
    from:
      selectedValues[0] && !isNaN(parseInt(selectedValues[0]))
        ? parseInt(selectedValues[0])
        : null,
    to:
      selectedValues[1] && !isNaN(parseInt(selectedValues[1]))
        ? parseInt(selectedValues[1])
        : null
  };

  // Convert RangeValue to string[]
  const handleChange = (range: RangeValue) => {
    const values: string[] = [];
    if (range.from !== null) values.push(String(range.from));
    if (range.to !== null) values.push(String(range.to));
    onUpdate(values);
  };

  return (
    <AdvancedSearchRangeSelect
      label={label}
      value={value}
      onChange={handleChange}
      rangePresets={rangePresets}
      fromLabel="Fra"
      toLabel="Til"
      resetLabel={resetLabel}
      formatBadge={formatAgeBadge}
    />
  );
};

export default AdvancedSearchAgeSelect;

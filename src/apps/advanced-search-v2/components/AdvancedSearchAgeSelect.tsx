import React from "react";
import AdvancedSearchRangeSelect from "./AdvancedSearchRangeSelect";
import { RangeValue, RangePreset } from "../types";

type AdvancedSearchAgeSelectProps = {
  label: string;
  value?: RangeValue;
  onChange: (next: RangeValue) => void;
  resetLabel?: string;
  presets: RangePreset[];
};

const formatAgeBadge = (
  from: number | null,
  to: number | null
): string | null => {
  if (from === null) return null;
  if (to === null || from === to) return `${from}+ årige`;
  return `${from}-${to}-årige`;
};

const AdvancedSearchAgeSelect: React.FC<AdvancedSearchAgeSelectProps> = ({
  label,
  value,
  onChange,
  resetLabel,
  presets
}) => {
  return (
    <AdvancedSearchRangeSelect
      label={label}
      value={value}
      onChange={onChange}
      presets={presets}
      fromLabel="Fra"
      toLabel="Til"
      resetLabel={resetLabel}
      formatBadge={formatAgeBadge}
    />
  );
};

export default AdvancedSearchAgeSelect;

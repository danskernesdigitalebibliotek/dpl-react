import React from "react";
import AdvancedSearchRangeSelect, {
  RangePreset,
  RangeValue
} from "./AdvancedSearchRangeSelect";

type AdvancedSearchAgeSelectProps = {
  label: string;
  value?: RangeValue;
  onChange: (next: RangeValue) => void;
  resetLabel?: string;
};

const DEFAULT_AGE_PRESETS: RangePreset[] = [
  { id: "1-6", label: "For 1-6-årige", from: 1, to: 6 },
  { id: "7-10", label: "For 7-10-årige", from: 7, to: 10 },
  { id: "11-13", label: "For 11-13-årige", from: 11, to: 13 },
  { id: "14-18", label: "For 14-18-årige", from: 14, to: 18 },
  { id: "18+", label: "For 18+", from: 18, to: null }
];

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
  resetLabel
}) => {
  return (
    <AdvancedSearchRangeSelect
      label={label}
      value={value}
      onChange={onChange}
      presets={DEFAULT_AGE_PRESETS}
      fromLabel="Fra"
      toLabel="Til"
      resetLabel={resetLabel}
      formatBadge={formatAgeBadge}
    />
  );
};

export default AdvancedSearchAgeSelect;

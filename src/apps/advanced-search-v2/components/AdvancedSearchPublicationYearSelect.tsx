import React from "react";
import AdvancedSearchRangeSelect from "./AdvancedSearchRangeSelect";
import { RangeValue, RangePreset } from "../types";

type AdvancedSearchPublicationYearSelectProps = {
  label: string;
  value?: RangeValue;
  onChange: (next: RangeValue) => void;
  resetLabel?: string;
  presets: RangePreset[];
};

const formatYearBadge = (
  from: number | null,
  to: number | null
): string | null => {
  if (from === null) return null;
  if (to === null || from === to) return `${from}+`;
  return `${from}-${to}`;
};

const AdvancedSearchPublicationYearSelect: React.FC<
  AdvancedSearchPublicationYearSelectProps
> = ({ label, value, onChange, resetLabel, presets }) => {
  return (
    <AdvancedSearchRangeSelect
      label={label}
      value={value}
      onChange={onChange}
      presets={presets}
      fromLabel="Fra"
      toLabel="Til"
      resetLabel={resetLabel}
      formatBadge={formatYearBadge}
    />
  );
};

export default AdvancedSearchPublicationYearSelect;

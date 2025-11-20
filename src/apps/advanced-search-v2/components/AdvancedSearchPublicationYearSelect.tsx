import React from "react";
import AdvancedSearchRangeSelect, {
  RangePreset,
  RangeValue
} from "./AdvancedSearchRangeSelect";

type AdvancedSearchPublicationYearSelectProps = {
  label: string;
  value?: RangeValue;
  onChange: (next: RangeValue) => void;
  resetLabel?: string;
};

const currentYear = new Date().getFullYear();

const YEAR_PRESETS: RangePreset[] = [
  {
    id: "current-year",
    label: `I år (${currentYear})`,
    from: currentYear,
    to: currentYear
  },
  {
    id: "last-2-years",
    label: "Seneste 2 år",
    from: currentYear - 1,
    to: currentYear
  },
  {
    id: "last-3-years",
    label: "Seneste 3 år",
    from: currentYear - 2,
    to: currentYear
  },
  {
    id: "last-5-years",
    label: "Seneste 5 år",
    from: currentYear - 4,
    to: currentYear
  },
  {
    id: "last-10-years",
    label: "Seneste 10 år",
    from: currentYear - 9,
    to: currentYear
  }
];

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
> = ({ label, value, onChange, resetLabel }) => {
  return (
    <AdvancedSearchRangeSelect
      label={label}
      value={value}
      onChange={onChange}
      presets={YEAR_PRESETS}
      fromLabel="Fra"
      toLabel="Til"
      resetLabel={resetLabel}
      formatBadge={formatYearBadge}
    />
  );
};

export default AdvancedSearchPublicationYearSelect;

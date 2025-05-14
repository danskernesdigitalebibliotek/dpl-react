import React from "react";
import {
  MaterialGridFilterOption,
  MaterialGridFilterType
} from "./MaterialGridRelated.types";
import { useText } from "../../core/utils/text";

type MaterialGridRelatedInlineFiltersProps = {
  filter: MaterialGridFilterType;
  onChange: (value: MaterialGridFilterType) => void;
  options: MaterialGridFilterOption[];
};

export function MaterialGridRelatedInlineFilters({
  filter,
  onChange,
  options
}: MaterialGridRelatedInlineFiltersProps) {
  const t = useText();

  return (
    <div
      className="material-grid-related__filter-inline"
      role="group"
      aria-label={t("materialGridRelatedInlineFiltersAriaLabelText")}
    >
      {options.map(({ label, value, count }) => (
        <button
          key={value}
          data-cy="material-grid-related-filter-button"
          className={`material-grid-related__filter-button ${
            filter === value
              ? "material-grid-related__filter-button--active"
              : ""
          }`}
          aria-pressed={filter === value}
          onClick={() => onChange(value)}
        >
          <span className="material-grid-related__filter-text">{label}</span>
          <sup className="material-grid-related__filter-sup">{count}</sup>
        </button>
      ))}
    </div>
  );
}

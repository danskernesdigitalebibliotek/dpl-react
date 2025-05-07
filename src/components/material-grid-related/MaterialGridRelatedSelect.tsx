import React from "react";
import iconTriangle from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-triangle.svg";
import {
  MaterialGridFilterOption,
  MaterialGridFilterType
} from "./MaterialGridRelated.types";
import { useText } from "../../core/utils/text";

type MaterialGridRelatedSelectProps = {
  filter: MaterialGridFilterType;
  onChange: (value: MaterialGridFilterType) => void;
  options: MaterialGridFilterOption[];
};

export function MaterialGridRelatedSelect({
  filter,
  onChange,
  options
}: MaterialGridRelatedSelectProps) {
  const t = useText();

  return (
    <div className="dropdown dropdown--grey-borders input-with-dropdown__dropdown material-grid-related__dropdown">
      <select
        className="dropdown__select dropdown__select--inline focus-styling"
        aria-label={t("materialGridRelatedSelectAriaLabelText")}
        value={filter}
        onChange={(e) => onChange(e.target.value as MaterialGridFilterType)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="dropdown__arrows dropdown__arrows--inline">
        <img
          className="dropdown__arrow dropdown__arrow--bottom"
          src={iconTriangle}
          alt=""
        />
      </div>
    </div>
  );
}

import React from "react";
import type { Option } from "../suggestions";
import ComboBoxBase from "./ComboBoxBase";

export type ComboBoxProps = {
  items: Option[];
  value: Option | null;
  onChange: (item: Option | null) => void;
  onQueryChange?: (q: string) => void;
};

const ComboBoxHeadless = ({
  items,
  value,
  onChange,
  onQueryChange
}: ComboBoxProps) => {
  return (
    <ComboBoxBase
      items={items}
      value={value}
      onChange={(next) => {
        if (!Array.isArray(next)) {
          onChange(next ?? null);
        }
      }}
      onQueryChange={onQueryChange}
      classes={{
        input: "advanced-search-select-search__combobox-input",
        options:
          "advanced-search-dropdown advanced-search-suggest__combobox-options"
      }}
    />
  );
};

export default ComboBoxHeadless;

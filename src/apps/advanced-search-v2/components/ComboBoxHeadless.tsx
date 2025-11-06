import React, { useState } from "react";
import type { Option } from "../suggestions";
import ComboBoxBase from "./ComboBoxBase";

export type ComboBoxProps = {
  items: Option[];
  onSelect: (item: Option) => void;
  onQueryChange?: (q: string) => void;
};

const ComboBoxHeadless = ({
  items,
  onSelect,
  onQueryChange
}: ComboBoxProps) => {
  const [selected, setSelected] = useState<Option | null>(null);

  return (
    <ComboBoxBase
      items={items}
      value={selected}
      onChange={(next) => {
        if (!Array.isArray(next) && next) {
          setSelected(next);
          onSelect(next);
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

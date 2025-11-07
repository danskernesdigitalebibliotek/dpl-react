import React from "react";
import type { Option } from "../suggestions";

import CheckBox from "../../../components/checkbox/Checkbox";
import ComboBoxBase from "./ComboBoxBase";

export type FacetsSelectProps = {
  items: Option[];
  value: Option[];
  label?: string;
  onChange?: (selected: Option[]) => void;
  query?: string;
  onQueryChange?: (q: string) => void;
};

const FacetsSelectHeadless: React.FC<FacetsSelectProps> = ({
  items,
  value,
  label = "Facet",
  onChange,
  query = "",
  onQueryChange
}) => {
  return (
    <div className="advanced-search-facets">
      <ComboBoxBase
        label={label}
        multiple
        items={items}
        value={value ?? []}
        onChange={(vals) => {
          if (Array.isArray(vals)) {
            onChange?.(vals);
          }
        }}
        query={query}
        onQueryChange={onQueryChange}
        classes={{
          options: "advanced-search-facets__combobox-options"
        }}
        optionsStatic
        showEmptyStates
        renderOption={(item, state) => (
          <CheckBox
            id={`facets-hu-${item.value}`}
            label={item.label}
            selected={state.selected}
            onChecked={() => {}}
            isVisualOnly
          />
        )}
      />
    </div>
  );
};

export default FacetsSelectHeadless;

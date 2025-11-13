// SHOULD BE DELETED
import React, { useState } from "react";
import type { Option } from "../lib/suggestions";

import CheckBox from "../../../components/checkbox/Checkbox";
import ComboBoxBase from "./ComboBoxBase";

export type FacetsSelectProps = {
  items: Option[];
  value: Option[];
  label?: string;
  onChange?: (selected: Option[]) => void;
};

const HeadlessFacetsSelect: React.FC<FacetsSelectProps> = ({
  items,
  value,
  label = "Facet",
  onChange
}) => {
  const [query, setQuery] = useState("");

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
        onQueryChange={setQuery}
        classes={{
          options: "advanced-search-facets__combobox-options"
        }}
        optionsStatic
        showEmptyStates
        renderOption={(item, state) => (
          <div className="advanced-search-facet__option">
            <CheckBox
              id={`advanced-search-facet-${item.value}`}
              label={item.label}
              selected={state.selected}
              onChecked={() => {}}
              isVisualOnly
            />
            {item.count !== undefined && (
              <span className="advanced-search-facet__count">{item.count}</span>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default HeadlessFacetsSelect;

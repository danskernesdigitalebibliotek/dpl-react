import React from "react";
import type { Option } from "../types";
import MultiSelectCombobox from "./MultiSelectCombobox";
import MultiSelectListbox from "./MultiSelectListbox";

type MultiSelectProps = {
  options: Option[];
  selectedOptions: Option[];
  onChange?: (vals: Option[]) => void;
  label: string;
  enableSearch?: boolean;
};

const MultiSelectAccessible: React.FC<MultiSelectProps> = ({
  enableSearch,
  options,
  selectedOptions,
  onChange,
  label
}) => {
  if (enableSearch) {
    return (
      <MultiSelectCombobox
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        label={label}
      />
    );
  }
  return (
    <MultiSelectListbox
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      label={label}
    />
  );
};

export default MultiSelectAccessible;

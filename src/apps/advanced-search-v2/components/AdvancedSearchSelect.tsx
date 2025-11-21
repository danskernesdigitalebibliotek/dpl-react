import React from "react";
import AdvancedSearchMultiSelect from "./AdvancedSearchMultiSelect";
import type { Option } from "../types";
import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";

type Props = {
  facetField: ComplexSearchFacetsEnum;
  selected: Option[];
  onChange: (selected: Option[]) => void;
  label?: string;
  options: Option[];
};

const AdvancedSearchSelect: React.FC<Props> = ({
  selected,
  onChange,
  label,
  options
}) => {
  return (
    <AdvancedSearchMultiSelect
      items={options}
      value={selected}
      onChange={onChange}
      label={label ?? "Filter"}
      enableSearch={true}
    />
  );
};

export default AdvancedSearchSelect;

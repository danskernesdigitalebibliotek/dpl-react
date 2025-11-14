import React from "react";
import HeadlessMultiSelect from "./HeadlessMultiSelect";
import type { Option } from "../lib/suggestions";
import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import { ADVANCED_SEARCH_SELECT_OPTIONS } from "../lib/advanced-search-select-options";

type Props = {
  facetField: ComplexSearchFacetsEnum;
  selected: Option[];
  onChange: (selected: Option[]) => void;
  label?: string;
};

const AdvancedSearchSelect: React.FC<Props> = ({
  facetField,
  selected,
  onChange,
  label
}) => {
  const items = ADVANCED_SEARCH_SELECT_OPTIONS[facetField] ?? [];

  return (
    <HeadlessMultiSelect
      items={items}
      value={selected}
      onChange={onChange}
      label={label ?? "Filter"}
    />
  );
};

export default AdvancedSearchSelect;

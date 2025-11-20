import React from "react";
import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import AdvancedSearchAgeSelect from "./AdvancedSearchAgeSelect";
import AdvancedSearchPublicationYearSelect from "./AdvancedSearchPublicationYearSelect";
import { RangeValue } from "./AdvancedSearchRangeSelect";

type AdvancedSearchRangeFacetProps = {
  facetField: ComplexSearchFacetsEnum;
  label: string;
  selectedValues: string[];
  onUpdate: (values: string[]) => void;
};

const AdvancedSearchRangeFacet: React.FC<AdvancedSearchRangeFacetProps> = ({
  facetField,
  label,
  selectedValues,
  onUpdate
}) => {
  const value: RangeValue = {
    from:
      selectedValues[0] && !isNaN(parseInt(selectedValues[0]))
        ? parseInt(selectedValues[0])
        : null,
    to:
      selectedValues[1] && !isNaN(parseInt(selectedValues[1]))
        ? parseInt(selectedValues[1])
        : null
  };

  const handleChange = (range: RangeValue) => {
    const values: string[] = [];
    if (range.from !== null) values.push(String(range.from));
    if (range.to !== null) values.push(String(range.to));
    onUpdate(values);
  };

  if (facetField === ComplexSearchFacetsEnum.Ages) {
    return (
      <AdvancedSearchAgeSelect
        label={label}
        value={value}
        onChange={handleChange}
      />
    );
  }

  if (facetField === ComplexSearchFacetsEnum.Publicationyear) {
    return (
      <AdvancedSearchPublicationYearSelect
        label={label}
        value={value}
        onChange={handleChange}
      />
    );
  }

  return null;
};

export default AdvancedSearchRangeFacet;

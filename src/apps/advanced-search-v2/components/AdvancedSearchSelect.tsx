import React, { useMemo } from "react";
import HeadlessMultiSelect from "./HeadlessMultiSelect";
import type { Option } from "../lib/suggestions";
import {
  ComplexSearchFacetsEnum,
  ComplexFacetSearchQuery,
  useComplexFacetSearchQuery
} from "../../../core/dbc-gateway/generated/graphql";

type Props = {
  cql: string;
  facetField: ComplexSearchFacetsEnum;
  selected: Option[];
  onChange: (selected: Option[]) => void;
  label?: string;
};

const AdvancedSearchSelect: React.FC<Props> = ({
  cql,
  facetField,
  selected,
  onChange,
  label
}) => {
  const { data: facetData } = useComplexFacetSearchQuery(
    {
      cql,
      facets: { facets: [facetField], facetLimit: 50 },
      filters: {}
    },
    { keepPreviousData: true }
  );

  const items: Option[] = useMemo(() => {
    type FacetValue = NonNullable<
      NonNullable<
        NonNullable<ComplexFacetSearchQuery["complexSearch"]["facets"]>[number]
      >["values"]
    >[number];
    const facets = facetData?.complexSearch?.facets ?? [];
    const values: FacetValue[] =
      (facets[0]?.values as FacetValue[] | undefined) ?? [];
    return values.map((v) => ({ label: v.key, value: v.key }));
  }, [facetData]);

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

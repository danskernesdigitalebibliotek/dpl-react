import React from "react";
import HeadlessFacetsSelect from "./HeadlessFacetsSelect";
import { Option } from "../lib/suggestions";
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
  label: string;
};

const AdvancedSearchFacet: React.FC<Props> = ({
  cql,
  facetField,
  selected,
  onChange,
  label
}) => {
  const { data: facetData } = useComplexFacetSearchQuery({
    cql,
    facets: { facets: [facetField], facetLimit: 10 },
    filters: {}
  });

  type FacetValue = NonNullable<
    NonNullable<
      NonNullable<ComplexFacetSearchQuery["complexSearch"]["facets"]>[number]
    >["values"]
  >[number];

  const facets = facetData?.complexSearch?.facets ?? [];
  const facetValues: FacetValue[] =
    (facets[0]?.values as FacetValue[] | undefined) ?? [];

  // Map facet values to options with counts
  // Complex search facets use 'key' field directly - it's the searchable value
  const facetItems = facetValues.map((v) => ({
    label: v.key, // Complex search uses key as both display and filter value
    value: v.key,
    count: v.score ?? 0
  }));

  return (
    <HeadlessFacetsSelect
      key={`facets-headless`}
      items={facetItems}
      value={selected}
      onChange={onChange}
      label={label}
    />
  );
};

export default AdvancedSearchFacet;

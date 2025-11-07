import React from "react";
import FacetsSelectHeadless from "./FacetsSelectHeadless";
import { Option } from "../suggestions";
import {
  FacetFieldEnum,
  SearchFacetQuery,
  useSearchFacetQuery
} from "../../../core/dbc-gateway/generated/graphql";

type Props = {
  fetchQuery: string;
  facetField: FacetFieldEnum;
  selected: Option[];
  onChange: (selected: Option[]) => void;
  label?: string;
};

const AdvancedSearchFacet: React.FC<Props> = ({
  fetchQuery,
  facetField,
  selected,
  onChange,
  label
}) => {
  const { data: facetData } = useSearchFacetQuery(
    {
      q: { all: fetchQuery },
      facets: [facetField],
      facetLimit: 10
    },
    { keepPreviousData: true }
  );

  type FacetValue =
    SearchFacetQuery["search"]["facets"][number]["values"][number];

  const facetValues: FacetValue[] =
    (facetData?.search?.facets?.[0]?.values as FacetValue[] | undefined) ?? [];

  const facetItems = facetValues.map((v) => ({
    label: v.term,
    value: v.key
  }));

  return (
    <FacetsSelectHeadless
      key={`facets-headless`}
      items={facetItems}
      value={selected}
      onChange={onChange}
      label={label ?? fetchQuery}
    />
  );
};

export default AdvancedSearchFacet;

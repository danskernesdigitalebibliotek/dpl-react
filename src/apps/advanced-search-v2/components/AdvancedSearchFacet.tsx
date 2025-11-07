import React from "react";
import FacetsSelectHeadless from "./FacetsSelectHeadless";
import { Option } from "../suggestions";
import {
  FacetFieldEnum,
  SearchFacetQuery,
  useSearchFacetQuery
} from "../../../core/dbc-gateway/generated/graphql";

type Props = {
  query: string;
  onQueryChange: (q: string) => void;
  selected: Option[];
  onChange: (selected: Option[]) => void;
  label?: string;
};

const AdvancedSearchFacet: React.FC<Props> = ({
  query,
  onQueryChange,
  selected,
  onChange,
  label
}) => {
  // Fetch facet values (e.g. subjects) based on query
  const { data: facetData } = useSearchFacetQuery(
    { q: { all: query }, facets: [FacetFieldEnum.Subjects], facetLimit: 10 },
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
      query={query}
      onQueryChange={onQueryChange}
      label={label}
    />
  );
};

export default AdvancedSearchFacet;

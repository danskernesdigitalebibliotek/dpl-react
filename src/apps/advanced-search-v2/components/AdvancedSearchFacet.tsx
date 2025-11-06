import React, { useState } from "react";
import FacetsSelectHeadless from "./FacetsSelectHeadless";
import { Option } from "../suggestions";
import {
  FacetFieldEnum,
  SearchFacetQuery,
  useSearchFacetQuery
} from "../../../core/dbc-gateway/generated/graphql";

const AdvancedSearchFacet = () => {
  const [facetsHeadless, setFacetsHeadless] = useState<Option[]>([]);

  const [facetQ, setFacetQ] = useState("harry");

  // Fetch facet values (e.g. subjects) based on facetQ
  const { data: facetData } = useSearchFacetQuery(
    { q: { all: facetQ }, facets: [FacetFieldEnum.Subjects], facetLimit: 10 },
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
      onChange={setFacetsHeadless}
    />
  );
};

export default AdvancedSearchFacet;

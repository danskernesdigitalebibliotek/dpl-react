import React, { useMemo, useState } from "react";

import MultiSelectHeadless from "./MultiSelectHeadless";
import type { Option } from "../suggestions";
import {
  FacetFieldEnum,
  SearchFacetQuery,
  useSearchFacetQuery
} from "../../../core/dbc-gateway/generated/graphql";

const AdvancedSearchSelectSearch: React.FC = () => {
  const [facetQ, setFacetQ] = useState<string>("harry");

  const { data: facetData } = useSearchFacetQuery(
    { q: { all: facetQ }, facets: [FacetFieldEnum.Subjects], facetLimit: 50 },
    { keepPreviousData: true }
  );

  const items: Option[] = useMemo(() => {
    type FacetValue =
      SearchFacetQuery["search"]["facets"][number]["values"][number];
    const values: FacetValue[] =
      (facetData?.search?.facets?.[0]?.values as FacetValue[] | undefined) ??
      [];
    return values.map((v) => ({ label: v.term, value: v.key }));
  }, [facetData]);

  const onChange = (selected: Option[]) => {
    console.log("Selected items:", selected);
  };

  return <MultiSelectHeadless items={items} onChange={onChange} />;
};

export default AdvancedSearchSelectSearch;

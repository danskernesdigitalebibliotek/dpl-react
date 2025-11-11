import React, { useMemo } from "react";

import MultiSelectHeadless from "./MultiSelectHeadless";
import type { Option } from "../lib/suggestions";
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

const AdvancedSearchSelectSearch: React.FC<Props> = ({
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
      facetLimit: 50
    },
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

  return (
    <MultiSelectHeadless
      items={items}
      value={selected}
      onChange={onChange}
      label={label ?? fetchQuery}
    />
  );
};

export default AdvancedSearchSelectSearch;

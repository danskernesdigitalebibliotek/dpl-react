import React, { useMemo } from "react";

import MultiSelectHeadless from "./MultiSelectHeadless";
import type { Option } from "../suggestions";
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

const AdvancedSearchSelectSearch: React.FC<Props> = ({
  query,
  onQueryChange,
  selected,
  onChange,
  label
}) => {
  const { data: facetData } = useSearchFacetQuery(
    { q: { all: query }, facets: [FacetFieldEnum.Subjects], facetLimit: 50 },
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
      query={query}
      onQueryChange={onQueryChange}
      label={label}
    />
  );
};

export default AdvancedSearchSelectSearch;

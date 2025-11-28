import { useMemo } from "react";
import {
  useComplexFacetSearchQuery,
  ComplexSearchFacetsEnum
} from "../../../core/dbc-gateway/generated/graphql";
import { INITIAL_PRE_SEARCH_FACETS_STATE } from "../lib/initial-state";
import type { Option } from "../types";

export type MergedFacetOption = {
  facetField: ComplexSearchFacetsEnum;
  options: Option[];
};

interface UseMergedFacetOptionsReturn {
  mergedFacetOptions: MergedFacetOption[];
  isLoading: boolean;
}

/**
 * Fetch dynamic facets and merge them with static options.
 * Returns an array of { facetField, options } for each select facet.
 */
export const useMergedFacetOptions = (): UseMergedFacetOptionsReturn => {
  const facetFields = useMemo(
    () =>
      INITIAL_PRE_SEARCH_FACETS_STATE.filter(
        (config) => config.type === "select"
      ).map((c) => c.facetField),
    []
  );

  const { data, isLoading } = useComplexFacetSearchQuery({
    cql: "*",
    facets: { facets: facetFields, facetLimit: 25 },
    filters: {}
  });

  const mergedFacetOptions = useMemo(() => {
    return INITIAL_PRE_SEARCH_FACETS_STATE.filter(
      (config) => config.type === "select"
    ).map((config) => {
      const staticOptions = [...config.options];

      const dynamicFacet = data?.complexSearch?.facets?.find(
        (facet) =>
          facet.name === config.facetField ||
          facet.name === `facet.${config.facetField.toLowerCase()}`
      );

      if (!dynamicFacet?.values) {
        return { facetField: config.facetField, options: staticOptions };
      }

      const existingValues = new Set(staticOptions.map((opt) => opt.value));

      const newOptions = dynamicFacet.values
        .filter((v) => v.key && !existingValues.has(v.key))
        .map((v) => ({
          label: v.key!,
          value: v.key!,
          count: v.score ?? undefined
        }));

      return {
        facetField: config.facetField,
        options: [...staticOptions, ...newOptions]
      };
    });
  }, [data]);

  return { mergedFacetOptions, isLoading };
};

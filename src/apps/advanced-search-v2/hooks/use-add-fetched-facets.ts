import { useMemo } from "react";
import {
  useComplexFacetSearchQuery,
  ComplexSearchFacetsEnum
} from "../../../core/dbc-gateway/generated/graphql";
import { INITIAL_PRE_SEARCH_FACETS_STATE } from "../lib/initial-state";
import type { Option } from "../types";

interface useAddFetchedFacetsReturn {
  optionsByFacet: Map<ComplexSearchFacetsEnum, Option[]>;
  isLoading: boolean;
}

/**
 * Fetch dynamic facets and add new options to static ones.
 * Returns a Map of facetField -> options array (static + new dynamic options).
 */
export const useAddFetchedFacets = (): useAddFetchedFacetsReturn => {
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

  const optionsByFacet = useMemo(() => {
    const map = new Map<ComplexSearchFacetsEnum, Option[]>();

    // Initialize with static options
    INITIAL_PRE_SEARCH_FACETS_STATE.forEach((config) => {
      if (config.type === "select") {
        map.set(config.facetField, [...config.options]);
      }
    });

    // Add new dynamic options if available
    if (data?.complexSearch?.facets) {
      data.complexSearch.facets.forEach((facet) => {
        if (!facet.name || !facet.values) return;

        const enumValue = facetFields.find(
          (field) =>
            facet.name === field ||
            facet.name === `facet.${field.toLowerCase()}`
        );

        if (enumValue) {
          const existingOptions = map.get(enumValue) || [];
          const existingValues = new Set(
            existingOptions.map((opt) => opt.value)
          );

          const newOptions = facet.values
            .filter((v) => v.key && !existingValues.has(v.key))
            .map((v) => ({
              label: v.key!,
              value: v.key!,
              count: v.score ?? undefined
            }));

          if (newOptions.length > 0) {
            map.set(enumValue, [...existingOptions, ...newOptions]);
          }
        }
      });
    }

    return map;
  }, [data, facetFields]);

  return { optionsByFacet, isLoading };
};

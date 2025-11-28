import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import type { Option, PreFacetConfig } from "../types";

export interface FacetData {
  name: string | null | undefined;
  values?: Array<{ key?: string; score?: number }>;
}

/**
 * Merge dynamic facet data with static config options
 * Returns all options for a facet field (static + new dynamic options)
 */
export const getFacetOptions = (
  facetField: ComplexSearchFacetsEnum,
  staticConfig: PreFacetConfig,
  facetData: FacetData[]
): Option[] => {
  // Only handle select type facets
  if (staticConfig.type !== "select") {
    return [];
  }

  const staticOptions = [...staticConfig.options];
  const staticValues = new Set(staticOptions.map((opt) => opt.value));

  // Find matching facet data
  const matchingFacet = facetData.find(
    (facet) =>
      facet.name === facetField ||
      facet.name === `facet.${facetField.toLowerCase()}`
  );

  if (!matchingFacet?.values) {
    return staticOptions;
  }

  // Add new dynamic options that don't already exist
  const newOptions = matchingFacet.values
    .filter((v) => v.key && !staticValues.has(v.key))
    .map((v) => ({
      label: v.key!,
      value: v.key!,
      count: v.score ?? undefined
    }));

  return [...staticOptions, ...newOptions];
};

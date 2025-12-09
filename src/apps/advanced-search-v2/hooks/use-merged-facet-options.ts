import { useMemo } from "react";
import {
  useComplexFacetSearchQuery,
  ComplexSearchFacetsEnum
} from "../../../core/dbc-gateway/generated/graphql";
import { INITIAL_PRE_SEARCH_FACETS_STATE } from "../lib/initial-state";
import {
  DIVIDER_VALUE,
  type Option,
  type PreSelectFacetConfig
} from "../types";

export type FacetValue = {
  key?: string | null;
  score?: number | null;
};

export type DynamicFacet = {
  name?: string | null;
  values?: FacetValue[] | null;
};

export type MergedFacetOption = {
  facetField: ComplexSearchFacetsEnum;
  options: Option[];
};

const FACET_NAME_PREFIX = "facet.";

const hasValidKey = (
  value: FacetValue
): value is FacetValue & { key: string } =>
  typeof value.key === "string" && value.key.length > 0;

const findMatchingFacet = (
  facetField: ComplexSearchFacetsEnum,
  dynamicFacets: DynamicFacet[]
): DynamicFacet | undefined =>
  dynamicFacets.find(
    (facet) =>
      facet.name === facetField ||
      facet.name === `${FACET_NAME_PREFIX}${facetField.toLowerCase()}`
  );

const toOption = (value: FacetValue & { key: string }): Option => ({
  label: value.key,
  value: value.key,
  count: value.score ?? undefined
});

const extractNewOptions = (
  facetValues: FacetValue[],
  existingValues: Set<string>
): Option[] =>
  facetValues
    .filter(hasValidKey)
    .filter((value) => !existingValues.has(value.key))
    .map(toOption)
    .sort((a, b) => a.label.localeCompare(b.label));

/**
 * Merges static options with dynamic facet values.
 * Static options keep their original order, dynamic options are sorted alphabetically.
 * A divider is inserted between static and dynamic options when both exist.
 */
export const mergeSelectFacetOptions = (
  preFacet: PreSelectFacetConfig,
  dynamicFacets: DynamicFacet[]
): MergedFacetOption => {
  const staticOptions = preFacet.options;
  const matchingFacet = findMatchingFacet(preFacet.facetField, dynamicFacets);
  const facetValues = matchingFacet?.values ?? [];
  const existingValues = new Set(staticOptions.map((opt) => opt.value));
  const newOptions = extractNewOptions(facetValues, existingValues);

  const DIVIDER: Option = { label: "", value: DIVIDER_VALUE };

  // Only insert divider if both static and dynamic options exist
  const options: Option[] =
    staticOptions.length > 0 && newOptions.length > 0
      ? [...staticOptions, DIVIDER, ...newOptions]
      : [...staticOptions, ...newOptions];

  return {
    facetField: preFacet.facetField,
    options
  };
};

interface UseMergedFacetOptionsReturn {
  mergedFacetOptions: MergedFacetOption[];
  isLoading: boolean;
}

const SELECT_PREFACETS = INITIAL_PRE_SEARCH_FACETS_STATE.filter(
  (config): config is PreSelectFacetConfig => config.type === "select"
);

/**
 * Fetch dynamic facets and merge them with static options.
 * Returns an array of { facetField, options } for each select facet.
 */
export const useMergedFacetOptions = (): UseMergedFacetOptionsReturn => {
  const { data, isLoading } = useComplexFacetSearchQuery({
    cql: "*",
    facets: {
      facets: SELECT_PREFACETS.map((preFacets) => preFacets.facetField),
      facetLimit: 50
    },
    filters: {}
  });

  const mergedFacetOptions = useMemo(() => {
    const dynamicFacets = data?.complexSearch?.facets ?? [];
    return SELECT_PREFACETS.map((preFacets) =>
      mergeSelectFacetOptions(preFacets, dynamicFacets)
    );
  }, [data]);

  return { mergedFacetOptions, isLoading };
};

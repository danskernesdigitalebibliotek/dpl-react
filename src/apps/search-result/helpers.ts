// Type for facet state stored in URL
export type FacetState = {
  facetName: string;
  selectedValues: string[];
};

// Type guard for a single facet item
const isValidFacetItem = (facet: unknown): facet is FacetState => {
  if (typeof facet !== "object" || facet === null) return false;

  const { facetName, selectedValues } = facet as Record<string, unknown>;

  const hasValidName = typeof facetName === "string";
  const hasValidValues =
    Array.isArray(selectedValues) &&
    selectedValues.every((v): v is string => typeof v === "string");

  return hasValidName && hasValidValues;
};

// Validates that URL query param is a valid FacetState array
export const isValidFacetsState = (
  facetState: unknown
): facetState is FacetState[] => {
  return Array.isArray(facetState) && facetState.every(isValidFacetItem);
};

// Convert nuqs facet state to filter format expected by createFilters
export const convertFacetsToFilters = (facets: FacetState[]) => {
  const filters: {
    [key: string]: {
      [key: string]: { key: string; term: string; traceId: string };
    };
  } = {};

  facets.forEach(({ facetName, selectedValues }) => {
    if (selectedValues.length > 0) {
      filters[facetName] = {};
      selectedValues.forEach((value) => {
        filters[facetName][value] = {
          key: value,
          term: value,
          traceId: "url-facet"
        };
      });
    }
  });

  return filters;
};

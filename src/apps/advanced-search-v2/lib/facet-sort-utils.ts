import {
  ComplexSearchFacetsEnum,
  ComplexSearchFacetValue
} from "../../../core/dbc-gateway/generated/graphql";

/**
 * Extract the leading numeric part from a facet value key.
 * Examples: "for 7 år" -> 7, "18" -> 18, "abc" -> NaN
 */
const extractNumber = (key: string): number => {
  // Match digits at start or after "for " prefix (Danish: "for X år")
  const match = key.match(/(?:^|for\s+)(\d+)/i);
  return match ? parseInt(match[1], 10) : NaN;
};

/**
 * Sort facet values numerically (ascending or descending).
 * Values without valid numbers are sorted to the end.
 */
const sortNumeric = (
  values: ComplexSearchFacetValue[],
  direction: "asc" | "desc"
): ComplexSearchFacetValue[] => {
  return [...values].sort((a, b) => {
    const numA = extractNumber(a.key);
    const numB = extractNumber(b.key);

    // Push NaN values to the end
    if (Number.isNaN(numA) && Number.isNaN(numB)) return 0;
    if (Number.isNaN(numA)) return 1;
    if (Number.isNaN(numB)) return -1;

    return direction === "asc" ? numA - numB : numB - numA;
  });
};

/**
 * Sort year facet values with newest year first (descending).
 */
const sortYearFacetValues = (
  values: ComplexSearchFacetValue[]
): ComplexSearchFacetValue[] => sortNumeric(values, "desc");

/**
 * Sort age facet values with highest age first (descending).
 * E.g. "for 18 år", "for 17 år", "for 16 år"...
 */
const sortAgeFacetValues = (
  values: ComplexSearchFacetValue[]
): ComplexSearchFacetValue[] => sortNumeric(values, "desc");

/**
 * Sort Lix facet values with lowest value first (ascending).
 */
const sortLixFacetValues = (
  values: ComplexSearchFacetValue[]
): ComplexSearchFacetValue[] => sortNumeric(values, "asc");

/**
 * Sort Let facet values with lowest value first (ascending).
 */
const sortLetFacetValues = (
  values: ComplexSearchFacetValue[]
): ComplexSearchFacetValue[] => sortNumeric(values, "asc");

/**
 * Sort facet values based on the facet field type.
 * Applies custom sorting for Year, Age, Lix, and Let facets.
 * Other facets are returned unsorted (default API order by hit count).
 */
export const sortFacetValues = (
  facetField: ComplexSearchFacetsEnum,
  values: ComplexSearchFacetValue[]
): ComplexSearchFacetValue[] => {
  switch (facetField) {
    case ComplexSearchFacetsEnum.Publicationyear:
      return sortYearFacetValues(values);
    case ComplexSearchFacetsEnum.Ages:
      return sortAgeFacetValues(values);
    case ComplexSearchFacetsEnum.Lix:
      return sortLixFacetValues(values);
    case ComplexSearchFacetsEnum.Let:
      return sortLetFacetValues(values);
    default:
      return values;
  }
};

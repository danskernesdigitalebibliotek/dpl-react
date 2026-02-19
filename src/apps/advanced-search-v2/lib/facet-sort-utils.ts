import {
  ComplexSearchFacetsEnum,
  ComplexSearchFacetValue,
  FacetFieldEnum,
  FacetValue
} from "../../../core/dbc-gateway/generated/graphql";

// Union type for facet values from both search APIs
type AnyFacetValue = ComplexSearchFacetValue | FacetValue;

/**
 * Get the sortable key from a facet value.
 * ComplexSearchFacetValue uses 'key', FacetValue uses 'term'.
 */
const getFacetKey = (value: AnyFacetValue): string => {
  return "term" in value ? value.term : value.key;
};

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
const sortNumeric = <T extends AnyFacetValue>(
  values: T[],
  direction: "asc" | "desc"
): T[] => {
  return [...values].sort((a, b) => {
    const numA = extractNumber(getFacetKey(a));
    const numB = extractNumber(getFacetKey(b));

    // Push NaN values to the end
    if (Number.isNaN(numA) && Number.isNaN(numB)) return 0;
    if (Number.isNaN(numA)) return 1;
    if (Number.isNaN(numB)) return -1;

    return direction === "asc" ? numA - numB : numB - numA;
  });
};

/**
 * Sort facet values alphabetically.
 */
const sortAlphabetic = <T extends AnyFacetValue>(values: T[]): T[] => {
  return [...values].sort((a, b) => {
    const keyA = getFacetKey(a).toLowerCase();
    const keyB = getFacetKey(b).toLowerCase();
    return keyA.localeCompare(keyB, "da");
  });
};

/**
 * Sort year facet values with newest year first (descending).
 */
const sortYearFacetValues = <T extends AnyFacetValue>(values: T[]): T[] =>
  sortNumeric(values, "desc");

/**
 * Sort age facet values with lowest value first (ascending).
 * E.g. "for 5 år", "for 7 år", "for 12 år"...
 */
const sortAgeFacetValues = <T extends AnyFacetValue>(values: T[]): T[] =>
  sortNumeric(values, "asc");

/**
 * Sort DK5 facet values with lowest value first (ascending).
 */
const sortDk5FacetValues = <T extends AnyFacetValue>(values: T[]): T[] =>
  sortNumeric(values, "asc");

/**
 * Sort Lix facet values with lowest value first (ascending).
 */
const sortLixFacetValues = <T extends AnyFacetValue>(values: T[]): T[] =>
  sortNumeric(values, "asc");

/**
 * Sort Let facet values with lowest value first (ascending).
 */
const sortLetFacetValues = <T extends AnyFacetValue>(values: T[]): T[] =>
  sortNumeric(values, "asc");

/**
 * Sort library recommendation facet values with lowest value first (ascending).
 */
const sortLibraryRecommendationFacetValues = <T extends AnyFacetValue>(
  values: T[]
): T[] => sortNumeric(values, "asc");

/**
 * Sort general audience facet values alphabetically.
 */
const sortGeneralAudienceFacetValues = <T extends AnyFacetValue>(
  values: T[]
): T[] => sortAlphabetic(values);

/**
 * Sort facet values based on the facet field type (ComplexSearchFacetsEnum).
 * Applies custom sorting for Year, Age, DK5, Lix, Let, LibraryRecommendation, and GeneralAudience facets.
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
    case ComplexSearchFacetsEnum.Libraryrecommendation:
      return sortLibraryRecommendationFacetValues(values);
    case ComplexSearchFacetsEnum.Generalaudience:
      return sortGeneralAudienceFacetValues(values);
    default:
      return values;
  }
};

/**
 * Sort facet values based on the facet field type (FacetFieldEnum for simple search).
 * Applies custom sorting for Year, Age, DK5, Lix, Let, LibraryRecommendation, and GeneralAudience facets.
 * Other facets are returned unsorted (default API order by hit count).
 */
export const sortSimpleSearchFacetValues = (
  facetField: FacetFieldEnum,
  values: FacetValue[]
): FacetValue[] => {
  switch (facetField) {
    case FacetFieldEnum.Year:
      return sortYearFacetValues(values);
    case FacetFieldEnum.Age:
      return sortAgeFacetValues(values);
    case FacetFieldEnum.Dk5:
      return sortDk5FacetValues(values);
    case FacetFieldEnum.Lix:
      return sortLixFacetValues(values);
    case FacetFieldEnum.Let:
      return sortLetFacetValues(values);
    case FacetFieldEnum.Libraryrecommendation:
      return sortLibraryRecommendationFacetValues(values);
    case FacetFieldEnum.Generalaudience:
      return sortGeneralAudienceFacetValues(values);
    default:
      return values;
  }
};

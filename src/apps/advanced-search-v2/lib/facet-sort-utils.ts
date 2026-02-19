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
 * Extract year from facet value.
 * Examples: "2024" -> 2024, "2020" -> 2020
 */
const extractYear = (key: string): number => {
  const match = key.match(/^(\d{4})$/);
  return match ? parseInt(match[1], 10) : NaN;
};

/**
 * Extract age from facet value.
 * Examples: "for 7 år" -> 7, "12" -> 12
 */
const extractAge = (key: string): number => {
  const match = key.match(/(?:^|for\s+)(\d+)/i);
  return match ? parseInt(match[1], 10) : NaN;
};

/**
 * Extract DK5 classification number.
 * Examples: "30.16" -> 30.16, "79.6" -> 79.6
 */
const extractDk5 = (key: string): number => {
  const match = key.match(/^([\d.]+)/);
  return match ? parseFloat(match[1]) : NaN;
};

/**
 * Extract Lix/Let number from facet value.
 * Examples: "25" -> 25, "10" -> 10
 */
const extractLixLet = (key: string): number => {
  const match = key.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : NaN;
};

/**
 * Extract library recommendation age.
 * Examples: "fra 7 år" -> 7, "fra 10 år" -> 10
 */
const extractLibraryRecommendation = (key: string): number => {
  const match = key.match(/(?:^|fra\s+)(\d+)/i);
  return match ? parseInt(match[1], 10) : NaN;
};

/**
 * Sort facet values numerically using a custom extractor.
 * Values without valid numbers are sorted to the end.
 */
const sortNumericWith = <T extends AnyFacetValue>(
  values: T[],
  direction: "asc" | "desc",
  extractor: (key: string) => number
): T[] => {
  return [...values].sort((a, b) => {
    const numA = extractor(getFacetKey(a));
    const numB = extractor(getFacetKey(b));

    // Push NaN values to the end
    if (Number.isNaN(numA) && Number.isNaN(numB)) return 0;
    if (Number.isNaN(numA)) return 1;
    if (Number.isNaN(numB)) return -1;

    return direction === "asc" ? numA - numB : numB - numA;
  });
};

/**
 * Sort facet values using natural sorting (alphanumeric).
 * Handles embedded numbers correctly: "for 2. klasse" < "for 10. klasse"
 * Also handles pure text like "Velegnet til oplæsning" alphabetically.
 */
const sortNatural = <T extends AnyFacetValue>(values: T[]): T[] => {
  const collator = new Intl.Collator("da", {
    numeric: true,
    sensitivity: "base"
  });
  return [...values].sort((a, b) => {
    const keyA = getFacetKey(a);
    const keyB = getFacetKey(b);
    return collator.compare(keyA, keyB);
  });
};

/**
 * Sort year facet values with newest year first (descending).
 */
const sortYearFacetValues = <T extends AnyFacetValue>(values: T[]): T[] =>
  sortNumericWith(values, "desc", extractYear);

/**
 * Sort age facet values with lowest value first (ascending).
 * E.g. "for 5 år", "for 7 år", "for 12 år"...
 */
const sortAgeFacetValues = <T extends AnyFacetValue>(values: T[]): T[] =>
  sortNumericWith(values, "asc", extractAge);

/**
 * Sort DK5 facet values with lowest value first (ascending).
 */
const sortDk5FacetValues = <T extends AnyFacetValue>(values: T[]): T[] =>
  sortNumericWith(values, "asc", extractDk5);

/**
 * Sort Lix facet values with lowest value first (ascending).
 */
const sortLixFacetValues = <T extends AnyFacetValue>(values: T[]): T[] =>
  sortNumericWith(values, "asc", extractLixLet);

/**
 * Sort Let facet values with lowest value first (ascending).
 */
const sortLetFacetValues = <T extends AnyFacetValue>(values: T[]): T[] =>
  sortNumericWith(values, "asc", extractLixLet);

/**
 * Sort library recommendation facet values with lowest value first (ascending).
 * E.g. "fra 7 år", "fra 10 år"...
 */
const sortLibraryRecommendationFacetValues = <T extends AnyFacetValue>(
  values: T[]
): T[] => sortNumericWith(values, "asc", extractLibraryRecommendation);

/**
 * Sort general audience facet values using natural sorting.
 * E.g. "for 1. klasse", "for 2. klasse", "for 10. klasse", "Velegnet til oplæsning"...
 */
const sortGeneralAudienceFacetValues = <T extends AnyFacetValue>(
  values: T[]
): T[] => sortNatural(values);

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

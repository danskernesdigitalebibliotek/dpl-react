import { SuggestState, FacetState, Operator } from "../types";
import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";

const VALID_OPERATORS: Operator[] = ["and", "or", "not"];

const isValidOperator = (value: unknown): value is Operator => {
  return (
    typeof value === "string" && VALID_OPERATORS.includes(value as Operator)
  );
};

export const isValidSuggestState = (
  value: unknown
): value is SuggestState[] => {
  if (!Array.isArray(value)) return false;

  return value.every((item) => {
    if (typeof item !== "object" || item === null) return false;

    const { term, query, operator } = item as Record<string, unknown>;

    if (typeof term !== "string") return false;
    if (typeof query !== "string") return false;
    if (operator !== undefined && !isValidOperator(operator)) return false;

    return true;
  });
};

export const isValidFacetState = (value: unknown): value is FacetState[] => {
  if (!Array.isArray(value)) return false;

  return value.every((item) => {
    if (typeof item !== "object" || item === null) return false;

    const { facetField, selectedValues } = item as Record<string, unknown>;

    // Check if facetField is a valid enum value
    if (
      typeof facetField !== "string" ||
      !Object.values(ComplexSearchFacetsEnum).includes(
        facetField as ComplexSearchFacetsEnum
      )
    ) {
      return false;
    }
    if (
      !Array.isArray(selectedValues) ||
      !selectedValues.every((v) => typeof v === "string")
    ) {
      return false;
    }

    return true;
  });
};

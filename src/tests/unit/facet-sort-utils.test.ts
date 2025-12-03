import { describe, expect, it } from "vitest";
import { ComplexSearchFacetsEnum } from "../../core/dbc-gateway/generated/graphql";
import { sortFacetValues } from "../../apps/advanced-search-v2/lib/facet-sort-utils";

const createFacetValue = (key: string, score = 100) => ({ key, score });

describe("facet-sort-utils", () => {
  describe("sortFacetValues", () => {
    describe("Year facet (PUBLICATIONYEAR)", () => {
      it("sorts years in descending order (newest first)", () => {
        const values = [
          createFacetValue("2020"),
          createFacetValue("2024"),
          createFacetValue("2018"),
          createFacetValue("2022")
        ];

        const sorted = sortFacetValues(
          ComplexSearchFacetsEnum.Publicationyear,
          values
        );

        expect(sorted.map((v) => v.key)).toEqual([
          "2024",
          "2022",
          "2020",
          "2018"
        ]);
      });

      it("pushes non-numeric values to the end", () => {
        const values = [
          createFacetValue("2020"),
          createFacetValue("unknown"),
          createFacetValue("2024")
        ];

        const sorted = sortFacetValues(
          ComplexSearchFacetsEnum.Publicationyear,
          values
        );

        expect(sorted.map((v) => v.key)).toEqual(["2024", "2020", "unknown"]);
      });
    });

    describe("Age facet (AGES)", () => {
      it("sorts ages in descending order (highest first)", () => {
        const values = [
          createFacetValue("for 7 år"),
          createFacetValue("for 12 år"),
          createFacetValue("for 5 år"),
          createFacetValue("for 18 år")
        ];

        const sorted = sortFacetValues(ComplexSearchFacetsEnum.Ages, values);

        expect(sorted.map((v) => v.key)).toEqual([
          "for 18 år",
          "for 12 år",
          "for 7 år",
          "for 5 år"
        ]);
      });

      it("handles numeric-only age values", () => {
        const values = [
          createFacetValue("7"),
          createFacetValue("12"),
          createFacetValue("5")
        ];

        const sorted = sortFacetValues(ComplexSearchFacetsEnum.Ages, values);

        expect(sorted.map((v) => v.key)).toEqual(["12", "7", "5"]);
      });
    });

    describe("Lix facet (LIX)", () => {
      it("sorts Lix values in ascending order (lowest first)", () => {
        const values = [
          createFacetValue("25"),
          createFacetValue("10"),
          createFacetValue("45"),
          createFacetValue("18")
        ];

        const sorted = sortFacetValues(ComplexSearchFacetsEnum.Lix, values);

        expect(sorted.map((v) => v.key)).toEqual(["10", "18", "25", "45"]);
      });

      it("handles leading zeros", () => {
        const values = [
          createFacetValue("05"),
          createFacetValue("1"),
          createFacetValue("10")
        ];

        const sorted = sortFacetValues(ComplexSearchFacetsEnum.Lix, values);

        expect(sorted.map((v) => v.key)).toEqual(["1", "05", "10"]);
      });
    });

    describe("Let facet (LET)", () => {
      it("sorts Let values in ascending order (lowest first)", () => {
        const values = [
          createFacetValue("30"),
          createFacetValue("15"),
          createFacetValue("8"),
          createFacetValue("22")
        ];

        const sorted = sortFacetValues(ComplexSearchFacetsEnum.Let, values);

        expect(sorted.map((v) => v.key)).toEqual(["8", "15", "22", "30"]);
      });
    });

    describe("Other facets", () => {
      it("returns values unchanged for non-sorted facets", () => {
        const values = [
          createFacetValue("value1"),
          createFacetValue("value3"),
          createFacetValue("value2")
        ];

        const sorted = sortFacetValues(ComplexSearchFacetsEnum.Creator, values);

        expect(sorted.map((v) => v.key)).toEqual([
          "value1",
          "value3",
          "value2"
        ]);
      });
    });

    describe("Edge cases", () => {
      it("handles empty array", () => {
        const sorted = sortFacetValues(
          ComplexSearchFacetsEnum.Publicationyear,
          []
        );
        expect(sorted).toEqual([]);
      });

      it("handles single item", () => {
        const values = [createFacetValue("2024")];
        const sorted = sortFacetValues(
          ComplexSearchFacetsEnum.Publicationyear,
          values
        );
        expect(sorted.map((v) => v.key)).toEqual(["2024"]);
      });

      it("preserves original array (immutable)", () => {
        const values = [createFacetValue("2020"), createFacetValue("2024")];
        const originalOrder = values.map((v) => v.key);

        sortFacetValues(ComplexSearchFacetsEnum.Publicationyear, values);

        expect(values.map((v) => v.key)).toEqual(originalOrder);
      });
    });
  });
});

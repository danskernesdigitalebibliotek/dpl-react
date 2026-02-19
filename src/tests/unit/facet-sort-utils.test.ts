import { describe, expect, it } from "vitest";
import {
  ComplexSearchFacetsEnum,
  FacetFieldEnum
} from "../../core/dbc-gateway/generated/graphql";
import {
  sortFacetValues,
  sortSimpleSearchFacetValues
} from "../../apps/advanced-search-v2/lib/facet-sort-utils";

const createFacetValue = (key: string, score = 100) => ({ key, score });
const createSimpleFacetValue = (term: string, score = 100) => ({
  key: term,
  term,
  score,
  traceId: "test"
});

describe("facet-sort-utils", () => {
  describe("sortFacetValues (ComplexSearchFacetsEnum)", () => {
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
      it("sorts ages in ascending order (lowest first)", () => {
        const values = [
          createFacetValue("for 7 år"),
          createFacetValue("for 12 år"),
          createFacetValue("for 5 år"),
          createFacetValue("for 18 år")
        ];

        const sorted = sortFacetValues(ComplexSearchFacetsEnum.Ages, values);

        expect(sorted.map((v) => v.key)).toEqual([
          "for 5 år",
          "for 7 år",
          "for 12 år",
          "for 18 år"
        ]);
      });

      it("handles numeric-only age values", () => {
        const values = [
          createFacetValue("7"),
          createFacetValue("12"),
          createFacetValue("5")
        ];

        const sorted = sortFacetValues(ComplexSearchFacetsEnum.Ages, values);

        expect(sorted.map((v) => v.key)).toEqual(["5", "7", "12"]);
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

    describe("LibraryRecommendation facet", () => {
      it("sorts library recommendation values in ascending order", () => {
        const values = [
          createFacetValue("for 12 år"),
          createFacetValue("for 7 år"),
          createFacetValue("for 15 år")
        ];

        const sorted = sortFacetValues(
          ComplexSearchFacetsEnum.Libraryrecommendation,
          values
        );

        expect(sorted.map((v) => v.key)).toEqual([
          "for 7 år",
          "for 12 år",
          "for 15 år"
        ]);
      });
    });

    describe("GeneralAudience facet", () => {
      it("sorts general audience values alphabetically", () => {
        const values = [
          createFacetValue("voksne"),
          createFacetValue("børn"),
          createFacetValue("unge")
        ];

        const sorted = sortFacetValues(
          ComplexSearchFacetsEnum.Generalaudience,
          values
        );

        expect(sorted.map((v) => v.key)).toEqual(["børn", "unge", "voksne"]);
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

  describe("sortSimpleSearchFacetValues (FacetFieldEnum)", () => {
    describe("Year facet", () => {
      it("sorts years in descending order (newest first)", () => {
        const values = [
          createSimpleFacetValue("2020"),
          createSimpleFacetValue("2024"),
          createSimpleFacetValue("2018")
        ];

        const sorted = sortSimpleSearchFacetValues(FacetFieldEnum.Year, values);

        expect(sorted.map((v) => v.term)).toEqual(["2024", "2020", "2018"]);
      });
    });

    describe("Age facet", () => {
      it("sorts ages in ascending order (lowest first)", () => {
        const values = [
          createSimpleFacetValue("for 12 år"),
          createSimpleFacetValue("for 5 år"),
          createSimpleFacetValue("for 18 år")
        ];

        const sorted = sortSimpleSearchFacetValues(FacetFieldEnum.Age, values);

        expect(sorted.map((v) => v.term)).toEqual([
          "for 5 år",
          "for 12 år",
          "for 18 år"
        ]);
      });
    });

    describe("DK5 facet", () => {
      it("sorts DK5 values in ascending order (lowest first)", () => {
        const values = [
          createSimpleFacetValue("79.6"),
          createSimpleFacetValue("30.16"),
          createSimpleFacetValue("64.8")
        ];

        const sorted = sortSimpleSearchFacetValues(FacetFieldEnum.Dk5, values);

        expect(sorted.map((v) => v.term)).toEqual(["30.16", "64.8", "79.6"]);
      });
    });

    describe("Lix facet", () => {
      it("sorts Lix values in ascending order", () => {
        const values = [
          createSimpleFacetValue("25"),
          createSimpleFacetValue("10"),
          createSimpleFacetValue("45")
        ];

        const sorted = sortSimpleSearchFacetValues(FacetFieldEnum.Lix, values);

        expect(sorted.map((v) => v.term)).toEqual(["10", "25", "45"]);
      });
    });

    describe("Let facet", () => {
      it("sorts Let values in ascending order", () => {
        const values = [
          createSimpleFacetValue("30"),
          createSimpleFacetValue("8"),
          createSimpleFacetValue("22")
        ];

        const sorted = sortSimpleSearchFacetValues(FacetFieldEnum.Let, values);

        expect(sorted.map((v) => v.term)).toEqual(["8", "22", "30"]);
      });
    });

    describe("LibraryRecommendation facet", () => {
      it("sorts library recommendation values in ascending order", () => {
        const values = [
          createSimpleFacetValue("for 12 år"),
          createSimpleFacetValue("for 7 år"),
          createSimpleFacetValue("for 15 år")
        ];

        const sorted = sortSimpleSearchFacetValues(
          FacetFieldEnum.Libraryrecommendation,
          values
        );

        expect(sorted.map((v) => v.term)).toEqual([
          "for 7 år",
          "for 12 år",
          "for 15 år"
        ]);
      });
    });

    describe("GeneralAudience facet", () => {
      it("sorts general audience values alphabetically", () => {
        const values = [
          createSimpleFacetValue("voksne"),
          createSimpleFacetValue("børn"),
          createSimpleFacetValue("unge")
        ];

        const sorted = sortSimpleSearchFacetValues(
          FacetFieldEnum.Generalaudience,
          values
        );

        expect(sorted.map((v) => v.term)).toEqual(["børn", "unge", "voksne"]);
      });
    });

    describe("Other facets", () => {
      it("returns values unchanged for non-sorted facets", () => {
        const values = [
          createSimpleFacetValue("value1"),
          createSimpleFacetValue("value3"),
          createSimpleFacetValue("value2")
        ];

        const sorted = sortSimpleSearchFacetValues(
          FacetFieldEnum.Creators,
          values
        );

        expect(sorted.map((v) => v.term)).toEqual([
          "value1",
          "value3",
          "value2"
        ]);
      });
    });
  });
});

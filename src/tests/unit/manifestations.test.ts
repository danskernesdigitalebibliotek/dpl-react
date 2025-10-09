import { describe, expect, test } from "vitest";
import { Manifestation, Work } from "../../core/utils/types/entities";
import {
  getRepresentativeManifestation,
  RepresentativeManifestationContextType
} from "../../core/utils/helpers/manifestations";

// Mock work data to test different scenarios
const createMockWork = (options: {
  withMostRelevant?: boolean;
  withBestRepresentation?: boolean;
}): Work => {
  const mockManifestation: Manifestation = {
    __typename: "Manifestation",
    pid: "000-test:pid"
  } as unknown as Manifestation;

  const mostRelevantManifestation: Manifestation | null =
    options.withMostRelevant
      ? { ...mockManifestation, pid: "000-most-relevant:pid" }
      : null;

  const bestRepresentationManifestation: Manifestation | null =
    options.withBestRepresentation
      ? { ...mockManifestation, pid: "000-best-representation:pid" }
      : null;

  return {
    __typename: "Work",
    workId: "test-work-id",
    manifestations: {
      __typename: "Manifestations",
      all: [],
      bestRepresentation: bestRepresentationManifestation,
      bestRepresentations: [],
      first: mockManifestation,
      latest: mockManifestation,
      mostRelevant: mostRelevantManifestation
        ? [mostRelevantManifestation]
        : [],
      searchHits: null
    }
  } as unknown as Work;
};

describe("getRepresentativeManifestation", () => {
  describe("when work has both mostRelevant and bestRepresentation", () => {
    const workWithBoth = createMockWork({
      withMostRelevant: true,
      withBestRepresentation: true
    });

    test("should return mostRelevant for 'cover' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithBoth,
        context: "cover"
      });
      expect(result?.pid).toBe("000-most-relevant:pid");
    });

    test("should return bestRepresentation for 'material-details' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithBoth,
        context: "material-details"
      });
      expect(result?.pid).toBe("000-best-representation:pid");
    });

    test("should return mostRelevant for 'material' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithBoth,
        context: "material"
      });
      expect(result?.pid).toBe("000-most-relevant:pid");
    });

    test("should return mostRelevant for 'material-description' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithBoth,
        context: "material-description"
      });
      expect(result?.pid).toBe("000-most-relevant:pid");
    });

    test("should return mostRelevant for 'recommended-material' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithBoth,
        context: "recommended-material"
      });
      expect(result?.pid).toBe("000-most-relevant:pid");
    });

    test("should return mostRelevant for 'auto-suggest' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithBoth,
        context: "auto-suggest"
      });
      expect(result?.pid).toBe("000-most-relevant:pid");
    });
  });

  describe("when work has only bestRepresentation", () => {
    const workWithBestOnly = createMockWork({
      withMostRelevant: false,
      withBestRepresentation: true
    });

    test("should return bestRepresentation fallback for 'cover' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithBestOnly,
        context: "cover"
      });
      expect(result?.pid).toBe("000-best-representation:pid");
    });

    test("should return bestRepresentation for 'material-details' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithBestOnly,
        context: "material-details"
      });
      expect(result?.pid).toBe("000-best-representation:pid");
    });

    test("should return bestRepresentation fallback for 'material' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithBestOnly,
        context: "material"
      });
      expect(result?.pid).toBe("000-best-representation:pid");
    });

    test("should return bestRepresentation fallback for 'material-description' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithBestOnly,
        context: "material-description"
      });
      expect(result?.pid).toBe("000-best-representation:pid");
    });

    test("should return bestRepresentation fallback for 'recommended-material' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithBestOnly,
        context: "recommended-material"
      });
      expect(result?.pid).toBe("000-best-representation:pid");
    });

    test("should return bestRepresentation fallback for 'auto-suggest' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithBestOnly,
        context: "auto-suggest"
      });
      expect(result?.pid).toBe("000-best-representation:pid");
    });
  });

  describe("when work has only mostRelevant", () => {
    const workWithMostOnly = createMockWork({
      withMostRelevant: true,
      withBestRepresentation: false
    });

    test("should return mostRelevant for 'cover' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithMostOnly,
        context: "cover"
      });
      expect(result?.pid).toBe("000-most-relevant:pid");
    });

    test("should return mostRelevant for 'material' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithMostOnly,
        context: "material"
      });
      expect(result?.pid).toBe("000-most-relevant:pid");
    });

    test("should return mostRelevant for 'material-description' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithMostOnly,
        context: "material-description"
      });
      expect(result?.pid).toBe("000-most-relevant:pid");
    });

    test("should return mostRelevant for 'recommended-material' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithMostOnly,
        context: "recommended-material"
      });
      expect(result?.pid).toBe("000-most-relevant:pid");
    });

    test("should throw error for 'material-details' context (no bestRepresentation)", () => {
      expect(() => {
        getRepresentativeManifestation({
          work: workWithMostOnly,
          context: "material-details"
        });
      }).toThrow("No valid pid found in representative manifestation");
    });

    test("should return mostRelevant for 'auto-suggest' context", () => {
      const result = getRepresentativeManifestation({
        work: workWithMostOnly,
        context: "auto-suggest"
      });
      expect(result?.pid).toBe("000-most-relevant:pid");
    });
  });

  describe("when work has neither mostRelevant nor bestRepresentation", () => {
    const workWithNeither = createMockWork({
      withMostRelevant: false,
      withBestRepresentation: false
    });

    test("should throw error for all contexts", () => {
      const contexts: RepresentativeManifestationContextType[] = [
        "cover",
        "material",
        "material-details",
        "material-description",
        "recommended-material",
        "auto-suggest"
      ];
      contexts.forEach((context) => {
        expect(() => {
          getRepresentativeManifestation({
            work: workWithNeither,
            context
          });
        }).toThrow("No valid pid found in representative manifestation");
      });
    });
  });

  describe("when work is null", () => {
    test("should throw error for all contexts", () => {
      const contexts: RepresentativeManifestationContextType[] = [
        "cover",
        "material",
        "material-details",
        "material-description",
        "recommended-material",
        "auto-suggest"
      ];
      contexts.forEach((context) => {
        expect(() => {
          getRepresentativeManifestation({
            work: null as Work | null,
            context
          });
        }).toThrow("No valid pid found in representative manifestation");
      });
    });
  });

  describe("edge cases", () => {
    test("should handle work with empty mostRelevant array", () => {
      const workWithEmptyMostRelevant = createMockWork({
        withMostRelevant: false,
        withBestRepresentation: true
      });
      // Explicitly set mostRelevant to empty array
      workWithEmptyMostRelevant.manifestations.mostRelevant = [];

      const result = getRepresentativeManifestation({
        work: workWithEmptyMostRelevant,
        context: "cover"
      });
      expect(result?.pid).toBe("000-best-representation:pid");
    });
  });
});

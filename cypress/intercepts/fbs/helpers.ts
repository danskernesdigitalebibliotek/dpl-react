import type { AvailabilityV3 } from "../../../src/core/fbs/model/availabilityV3";
import type { HoldingsForBibliographicalRecordLogisticsV1 } from "../../../src/core/fbs/model/holdingsForBibliographicalRecordLogisticsV1";
import {
  availabilityConfigMap,
  AvailabilityPattern,
  type AvailabilityConfigType
} from "./availabilityPatterns";
import { manifestationPatternsMap } from "./manifestationPatternsMap";

/**
 * Helper to extract ALL record IDs from FBS URLs
 */
export const extractRecordIdsFromUrl = (url: string): string[] => {
  const params = new URLSearchParams(url.split("?")[1]);
  return params.getAll("recordid").map((id) => decodeURIComponent(id));
};

/**
 * Normalize record ID to PID format
 */
export const normalizeToPid = (recordId: string): string => {
  return recordId.includes(":") ? recordId : `870970-basis:${recordId}`;
};

/**
 * Get the availability configuration for a manifestation PID
 */
export const getAvailabilityConfig = (
  recordId: string
): AvailabilityConfigType => {
  const pid = normalizeToPid(recordId);
  const pattern =
    manifestationPatternsMap.get(pid) ||
    AvailabilityPattern.NOT_AVAILABLE_ANYWHERE;

  return availabilityConfigMap[pattern];
};

/**
 * Create holdings entries for a manifestation based on its pattern
 */
export const createHoldingsForManifestation = (
  recordId: string
): HoldingsForBibliographicalRecordLogisticsV1["holdings"][0][] => {
  const config = getAvailabilityConfig(recordId);

  if (!config.branches || config.branches.length === 0) {
    return [];
  }

  return config.branches.map((branchConfig, branchIndex) => {
    const materials = branchConfig.materials.map((mat, materialIndex) => ({
      itemNumber: `${recordId}-${branchIndex}-${materialIndex}`,
      available: mat.available,
      periodical: undefined,
      materialGroup: {
        name: "Standard",
        description: "Std. materialegruppe"
      }
    }));

    return {
      branch: {
        branchId: branchConfig.branchId,
        title: branchConfig.title
      },
      lmsPlacement: {
        department: branchConfig.placement.department
          ? {
              departmentId: "vo",
              title: branchConfig.placement.department
            }
          : undefined,
        section: undefined,
        location: undefined,
        sublocation: branchConfig.placement.section
          ? {
              sublocationId: branchConfig.placement.section,
              title: branchConfig.placement.section
            }
          : undefined
      },
      logisticsPlacement: [],
      materials
    };
  });
};

/**
 * Generate availability response for given record IDs
 * In real FBS API, one request can include multiple recordid parameters
 * and the response is an array with one entry per recordId
 */
export const getFbsAvailabilityResponse = (
  recordIds: string[]
): AvailabilityV3[] => {
  return recordIds.map((recordId) => {
    const config = getAvailabilityConfig(recordId);

    return {
      recordId,
      reservable: config.reservable,
      available: config.available,
      reservations: config.reservations
    };
  });
};

/**
 * Generate holdings/logistics response for given record IDs
 * In real FBS API, the response is an array with one entry per manifestation
 * Each manifestation contains holdings from all libraries
 */
export const getFbsHoldingsResponse = (
  recordIds: string[]
): HoldingsForBibliographicalRecordLogisticsV1[] => {
  return recordIds.map((recordId) => {
    const config = getAvailabilityConfig(recordId);
    const holdings = createHoldingsForManifestation(recordId);

    return {
      recordId,
      reservable: config.reservable,
      reservations: config.reservations,
      holdings
    };
  });
};

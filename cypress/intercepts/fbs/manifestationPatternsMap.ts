import { AvailabilityPattern } from "./availabilityPatterns";

// Simple mapping from PID to availability pattern
export const manifestationPatternsMap = new Map<string, AvailabilityPattern>();

/**
 * Register an availability pattern for a specific manifestation PID
 */
export const registerManifestationAvailability = (
  pid: string,
  pattern: AvailabilityPattern
): void => {
  manifestationPatternsMap.set(pid, pattern);
};

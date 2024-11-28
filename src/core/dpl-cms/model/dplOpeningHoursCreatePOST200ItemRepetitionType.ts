/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * DPL CMS - REST API
 * The REST API provide by the core REST module.
 * OpenAPI spec version: Versioning not supported
 */

/**
 * If/how the instance should be repeated in the future: <br/> - single: The instance should not be repeated <br/> - weekly: The instance should be repeated weekly from the first day of the repetition until the provided end date. The week day of the first instance defines which weekday should be used for the repeated instances.
 */
export type DplOpeningHoursCreatePOST200ItemRepetitionType =
  typeof DplOpeningHoursCreatePOST200ItemRepetitionType[keyof typeof DplOpeningHoursCreatePOST200ItemRepetitionType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const DplOpeningHoursCreatePOST200ItemRepetitionType = {
  none: "none",
  weekly: "weekly"
} as const;

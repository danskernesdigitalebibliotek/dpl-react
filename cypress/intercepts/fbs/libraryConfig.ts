/**
 * Library configuration for FBS testing
 * Branch IDs ending in "00" are considered main libraries and shown first
 * (see FindOnShelfModalBody.tsx line 161-169)
 */

export const libraries = {
  hovedbiblioteket: {
    branchId: "DK-710100", // Main library - ends with 00
    title: "Hovedbiblioteket"
  },
  islandsBrygge: {
    branchId: "DK-710108",
    title: "Islands Brygge"
  },
  fjernlager: {
    branchId: "DK-710104",
    title: "Fjernlager"
  }
} as const;

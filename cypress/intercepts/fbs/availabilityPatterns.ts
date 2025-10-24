import { libraries } from "./libraryConfig";
/**
 * Availability patterns for controlling FBS responses at the manifestation level
 * These patterns define how materials are available across libraries
 */

type BranchOptions = {
  library: {
    branchId: string;
    title: string;
  };
  available: number;
  unavailable: number;
  placement: {
    department: string;
    section: string;
  };
};

const branch = ({
  library,
  available,
  unavailable,
  placement
}: BranchOptions): BranchHoldingsConfig => ({
  branchId: library.branchId,
  title: library.title,
  placement,
  materials: [
    ...Array(available).fill({ available: true }),
    ...Array(unavailable).fill({ available: false })
  ]
});

export enum AvailabilityPattern {
  ONLY_AVAILABLE_ON_MAIN_LIBRARY = "ONLY_AVAILABLE_ON_MAIN_LIBRARY",
  IS_RESERVABLE_EVERYWHERE = "IS_RESERVABLE_EVERYWHERE",
  AVAILABLE_EVERYWHERE = "AVAILABLE_EVERYWHERE",
  NOT_AVAILABLE_ANYWHERE = "NOT_AVAILABLE_ANYWHERE",
  AVAILABLE_ON_TWO_LIBRARIES = "AVAILABLE_ON_TWO_LIBRARIES",
  MAIN_LIBRARY_UNAVAILABLE_OTHERS_AVAILABLE = "MAIN_LIBRARY_UNAVAILABLE_OTHERS_AVAILABLE",
  ON_SHELF_BUT_UNAVAILABLE = "ON_SHELF_BUT_UNAVAILABLE"
}

export interface BranchHoldingsConfig {
  branchId: string;
  title: string;
  placement: {
    department?: string;
    section?: string;
  };
  materials: {
    available: boolean;
  }[];
}

export interface AvailabilityConfigType {
  // Global settings
  reservable: boolean;
  reservations: number;
  // Overall availability (used by availability API)
  available: boolean;
  // Per-branch holdings (used by holdings/logistics API)
  // Multiple entries can have the same branchId for different placements
  branches?: BranchHoldingsConfig[];
}

// Predefined configurations for common patterns
export const availabilityConfigMap: Record<
  AvailabilityPattern,
  AvailabilityConfigType
> = {
  [AvailabilityPattern.ONLY_AVAILABLE_ON_MAIN_LIBRARY]: {
    reservable: true,
    reservations: 0,
    available: true,
    branches: [
      branch({
        library: libraries.hovedbiblioteket,
        available: 2,
        unavailable: 1,
        placement: { department: "Voksen", section: "Skønlitteratur" }
      })
    ]
  },

  [AvailabilityPattern.IS_RESERVABLE_EVERYWHERE]: {
    reservable: true,
    reservations: 2,
    available: false,
    branches: [] // No holdings, but reservable
  },

  [AvailabilityPattern.AVAILABLE_EVERYWHERE]: {
    reservable: true,
    reservations: 0,
    available: true,
    branches: [
      branch({
        library: libraries.hovedbiblioteket,
        available: 2,
        unavailable: 1,
        placement: { department: "Voksen", section: "Skønlitteratur" }
      }),
      branch({
        library: libraries.islandsBrygge,
        available: 3,
        unavailable: 2,
        placement: { department: "Voksen", section: "Skønlitteratur" }
      }),
      branch({
        library: libraries.fjernlager,
        available: 1,
        unavailable: 0,
        placement: { department: "Voksen", section: "Skønlitteratur" }
      })
    ]
  },

  [AvailabilityPattern.NOT_AVAILABLE_ANYWHERE]: {
    reservable: false,
    reservations: 0,
    available: false,
    branches: [] // No holdings at all
  },

  [AvailabilityPattern.AVAILABLE_ON_TWO_LIBRARIES]: {
    reservable: true,
    reservations: 1,
    available: true,
    branches: [
      branch({
        library: libraries.hovedbiblioteket,
        available: 1,
        unavailable: 0,
        placement: { department: "Voksen", section: "Skønlitteratur" }
      }),
      branch({
        library: libraries.islandsBrygge,
        available: 1,
        unavailable: 0,
        placement: { department: "Voksen", section: "Skønlitteratur" }
      })
    ]
  },

  [AvailabilityPattern.MAIN_LIBRARY_UNAVAILABLE_OTHERS_AVAILABLE]: {
    reservable: true,
    reservations: 1,
    available: true,
    branches: [
      branch({
        library: libraries.islandsBrygge,
        available: 1,
        unavailable: 0,
        placement: { department: "Voksen", section: "Skønlitteratur" }
      }),
      branch({
        library: libraries.fjernlager,
        available: 1,
        unavailable: 0,
        placement: { department: "Voksen", section: "Skønlitteratur" }
      })
    ]
  },

  [AvailabilityPattern.ON_SHELF_BUT_UNAVAILABLE]: {
    reservable: true,
    reservations: 0,
    available: false,
    branches: [
      branch({
        library: libraries.hovedbiblioteket,
        available: 0,
        unavailable: 2,
        placement: { department: "Voksen", section: "Skønlitteratur" }
      })
    ]
  }
};

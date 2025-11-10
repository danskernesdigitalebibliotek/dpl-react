import {
  AvailabilityV3,
  HoldingsLogisticsV1
} from "../../../src/core/fbs/model";
import {
  holdingsLogisticsFactory,
  materialFactory
} from "../../factories/fbs/holdings.factory";

/**
 * Library configuration
 */
export const libraries = {
  hovedbiblioteket: {
    // Main library's branch ID ends with 00
    branchId: "DK-710100",
    title: "Hovedbiblioteket"
  },
  islandsBrygge: {
    branchId: "DK-710108",
    title: "Islands Brygge"
  },
  fjernlager: {
    branchId: "DK-710104",
    title: "Fjernlager"
  },
  vesterbro: {
    branchId: "DK-710109",
    title: "Vesterbro"
  }
} as const;

type CreateHoldingsOptions = {
  library: (typeof libraries)[keyof typeof libraries];
  availableCount: number;
  unavailableCount: number;
  placement: {
    department: { id: string; name: string };
    section: { id: string; name: string };
  };
};

/**
 * Default placement for fiction materials
 */
const defaultPlacement = {
  department: { id: "vo", name: "Voksen" },
  section: { id: "Skønlitteratur", name: "Skønlitteratur" }
} as const;

/**
 * Helper to create holdings for a library with specified copies
 */
export const createHoldingsAtLibrary = ({
  library,
  availableCount,
  unavailableCount,
  placement
}: CreateHoldingsOptions): HoldingsLogisticsV1 => {
  return holdingsLogisticsFactory.build({
    branch: library,
    lmsPlacement: {
      department: {
        departmentId: placement.department.id,
        title: placement.department.name
      },
      section: undefined,
      location: undefined,
      sublocation: {
        sublocationId: placement.section.id,
        title: placement.section.name
      }
    },
    materials: [
      // Generate available materials
      ...Array.from({ length: availableCount }, (_, i) =>
        materialFactory.build({
          itemNumber: `${library.branchId}-${i}`,
          available: true
        })
      ),
      // Generate unavailable materials
      ...Array.from({ length: unavailableCount }, (_, i) =>
        materialFactory.build({
          itemNumber: `${library.branchId}-${i + availableCount}`,
          available: false
        })
      )
    ]
  });
};

/**
 * Scenario presets for common availability patterns
 */
export const scenarios = {
  default: {
    availability: {
      available: true,
      reservable: true,
      reservations: 0
    } as Partial<AvailabilityV3>,
    holdings: [
      createHoldingsAtLibrary({
        library: libraries.hovedbiblioteket,
        availableCount: 2,
        unavailableCount: 1,
        placement: defaultPlacement
      }),
      createHoldingsAtLibrary({
        library: libraries.islandsBrygge,
        availableCount: 3,
        unavailableCount: 2,
        placement: defaultPlacement
      }),
      createHoldingsAtLibrary({
        library: libraries.fjernlager,
        availableCount: 1,
        unavailableCount: 0,
        placement: defaultPlacement
      }),
      createHoldingsAtLibrary({
        library: libraries.vesterbro,
        availableCount: 0,
        unavailableCount: 2, // All copies checked out
        placement: defaultPlacement
      })
    ]
  },

  unavailableEverywhere: {
    availability: {
      available: false,
      reservable: true,
      reservations: 0
    } as Partial<AvailabilityV3>,
    holdings: [
      createHoldingsAtLibrary({
        library: libraries.hovedbiblioteket,
        availableCount: 0,
        unavailableCount: 2,
        placement: defaultPlacement
      })
    ]
  },

  notAvailableAnywhere: {
    availability: {
      available: false,
      reservable: false,
      reservations: 0
    } as Partial<AvailabilityV3>,
    holdings: []
  },

  reservableButNoHoldings: {
    availability: {
      available: false,
      reservable: true,
      reservations: 2
    } as Partial<AvailabilityV3>,
    holdings: []
  },

  periodical: {
    availability: {
      available: true,
      reservable: true,
      reservations: 0
    } as Partial<AvailabilityV3>,
    holdings: [
      holdingsLogisticsFactory.build({
        branch: libraries.hovedbiblioteket,
        lmsPlacement: undefined,
        materials: [
          materialFactory.build({
            itemNumber: "5393541387",
            available: true,
            periodical: {
              volume: undefined,
              volumeYear: "2024",
              displayText: "2024, 46",
              volumeNumber: "46"
            }
          }),
          materialFactory.build({
            itemNumber: "5393473500",
            available: true,
            periodical: {
              volume: undefined,
              volumeYear: "2024",
              displayText: "2024, 45",
              volumeNumber: "45"
            }
          }),
          materialFactory.build({
            itemNumber: "5393469279",
            available: true,
            periodical: {
              volume: undefined,
              volumeYear: "2023",
              displayText: "2023, 40",
              volumeNumber: "40"
            }
          })
        ]
      })
    ]
  }
};

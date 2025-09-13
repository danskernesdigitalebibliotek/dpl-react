import { Factory } from "fishery";
import type { HoldingsForBibliographicalRecordLogisticsV1 } from "../../../src/core/fbs/model/holdingsForBibliographicalRecordLogisticsV1";

// Factory for individual holdings response
const holdingsResponseFactory =
  Factory.define<HoldingsForBibliographicalRecordLogisticsV1>(() => ({
    recordId: "",
    reservable: false,
    reservations: 0,
    holdings: []
  }));

// Predefined holdings responses based on real API data from our test runs
export const holdingsResponses = {
  // Complex holdings for "De syv søstre" - exact real API data with all 18 holdings entries
  "53292968": holdingsResponseFactory.build({
    recordId: "53292968",
    reservable: true,
    reservations: 2,
    holdings: [
      // Entry 1: Fjernlager (cso)
      {
        branch: { branchId: "FBS-101003", title: "Fjernlager (cso)" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5442636313",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 2: Brønshøj
      {
        branch: { branchId: "DK-710105", title: "Brønshøj" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5442636275",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          },
          {
            itemNumber: "5442636437",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 3: Biblioteket Rentemestervej (with lmsPlacement)
      {
        branch: { branchId: "DK-710110", title: "Biblioteket Rentemestervej" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5442636291",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 4: Ørestad (first)
      {
        branch: { branchId: "DK-710122", title: "Ørestad" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5442636364",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 5: Ørestad (second - historical novels)
      {
        branch: { branchId: "DK-710122", title: "Ørestad" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "hiskøn", title: "Historiske romaner" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5442636232",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 6: Biblioteket Rentemestervej (with logisticsPlacement)
      {
        branch: { branchId: "DK-710110", title: "Biblioteket Rentemestervej" },
        // lmsPlacement is null in real data
        lmsPlacement: undefined,
        logisticsPlacement: [
          "Biblioteket Rentemestervej",
          "2. sal > Voksen",
          "Skønlitteratur"
        ],
        materials: [
          {
            itemNumber: "5442636348",
            available: true,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 7: Islands Brygge (first - logisticsPlacement)
      {
        branch: { branchId: "DK-710108", title: "Islands Brygge" },
        // lmsPlacement is null in real data
        lmsPlacement: undefined,
        logisticsPlacement: ["Islands Brygge", "Voksen", "Skønlitteratur"],
        materials: [
          {
            itemNumber: "5442636402",
            available: true,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 8: Bibliotekshuset (with lmsPlacement)
      {
        branch: { branchId: "DK-710114", title: "Bibliotekshuset" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5442636356",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          },
          {
            itemNumber: "5442636410",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 9: Nørrebro
      {
        branch: { branchId: "DK-710111", title: "Nørrebro" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5442636305",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 10: Blågården
      {
        branch: { branchId: "DK-710104", title: "Blågården" },
        // lmsPlacement is null in real data
        lmsPlacement: undefined,
        logisticsPlacement: ["Blågården", "Stuen > Voksen", "Skønlitteratur"],
        materials: [
          {
            itemNumber: "5442636283",
            available: true,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          },
          {
            itemNumber: "5442636399",
            available: true,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 11: Vesterbro (historical novels)
      {
        branch: { branchId: "DK-710119", title: "Vesterbro" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "hiskøn", title: "Historiske romaner" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5442636240",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 12: Husum
      {
        branch: { branchId: "DK-710107", title: "Husum" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5442636380",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 13: Sundby
      {
        branch: { branchId: "DK-710113", title: "Sundby" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5442636259",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          },
          {
            itemNumber: "5442636445",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 14: Islands Brygge (second - with lmsPlacement)
      {
        branch: { branchId: "DK-710108", title: "Islands Brygge" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5442636321",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 15: Valby
      {
        branch: { branchId: "DK-710117", title: "Valby" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5442636372",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 16: Bibliotekshuset (with logisticsPlacement)
      {
        branch: { branchId: "DK-710114", title: "Bibliotekshuset" },
        // lmsPlacement is null in real data
        lmsPlacement: undefined,
        logisticsPlacement: [
          "Bibliotekshuset",
          "Stuen",
          "Voksen",
          "Skønlitteratur"
        ],
        materials: [
          {
            itemNumber: "5442636429",
            available: true,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      // Entry 17: Fjernlager 2
      {
        branch: { branchId: "FBS-101009", title: "Fjernlager 2" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5442636267",
            available: true,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      }
    ]
  }),

  // Holdings for second book edition - exact real API data with all 8 holdings entries
  "52557240": holdingsResponseFactory.build({
    recordId: "52557240",
    reservable: true,
    reservations: 2,
    holdings: [
      {
        branch: { branchId: "DK-710111", title: "Nørrebro" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5119213853",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      {
        branch: { branchId: "DK-710121", title: "Østerbro" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5119212504",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      {
        branch: { branchId: "FBS-101007", title: "HB Rigshospitalet" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "4892161531",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "RHnonres",
              description:
                "Nonres materialer på rigshospitalet (lavet så kun personer på RH kan låne og reserverer på disse)"
            }
          }
        ]
      },
      {
        branch: { branchId: "DK-710111", title: "Nørrebro" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "hiskøn", title: "Historiske romaner" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5119213691",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      {
        branch: { branchId: "DK-710118", title: "Vanløse" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5119213772",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          },
          {
            itemNumber: "5119212547",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      {
        branch: { branchId: "DK-710117", title: "Valby" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5119213756",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      {
        branch: { branchId: "DK-710120", title: "Vigerslev" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "skøn", title: "Skønlitteratur" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5119213764",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      },
      {
        branch: { branchId: "DK-710114", title: "Bibliotekshuset" },
        lmsPlacement: {
          department: { departmentId: "vo", title: "Voksen" },
          // section is null in real data
          section: undefined,
          // location is null in real data
          location: undefined,
          sublocation: { sublocationId: "hiskøn", title: "Historiske romaner" }
        },
        logisticsPlacement: [],
        materials: [
          {
            itemNumber: "5130200909",
            available: false,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      }
    ]
  }),

  // Simple audiobook holdings - exact real API data
  "52643414": holdingsResponseFactory.build({
    recordId: "52643414",
    reservable: true,
    reservations: 0,
    holdings: [
      {
        branch: { branchId: "DK-710109", title: "Øbro Jagtvej" },
        // lmsPlacement is null in real data
        lmsPlacement: undefined,
        logisticsPlacement: ["Øbro Jagtvej", "2.sal", "Voksen", "MP3"],
        materials: [
          {
            itemNumber: "5119760196",
            available: true,
            // periodical is null in real data
            periodical: undefined,
            materialGroup: {
              name: "Standard",
              description: "Std. materialegruppe"
            }
          }
        ]
      }
    ]
  })
};

// Helper function to get holdings response by record ID
export const getFbsHoldingsResponse = (
  recordId: string
): HoldingsForBibliographicalRecordLogisticsV1[] => {
  const response =
    holdingsResponses[recordId as keyof typeof holdingsResponses];
  if (response) {
    return [response];
  }

  // Default response for unknown record IDs
  return [
    holdingsResponseFactory.build({
      recordId,
      reservable: false,
      reservations: 0,
      holdings: []
    })
  ];
};

// Helper to extract record ID from URL
export const extractRecordIdFromHoldingsUrl = (url: string): string => {
  const match = url.match(/recordid=([^&]+)/);
  return match ? match[1] : "unknown";
};

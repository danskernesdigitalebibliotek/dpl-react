import { expect, test } from "vitest";
import { getInstantLoanBranchHoldings } from "../../components/reservation/helper";
import { HoldingsV3 } from "../../core/fbs/model";

test("getInstantLoanBranchHoldings should return materials grouped by branches filtered by instantloan config matches and branch whitelist", () => {
  const branchHoldings: HoldingsV3[] = [
    {
      branch: {
        branchId: "DK-775140",
        title: "Åby"
      },
      department: {
        departmentId: "vo",
        title: "Voksen"
      },
      location: {
        locationId: "fikdu",
        title: "Fik du læst"
      },
      sublocation: undefined,
      materials: [
        {
          itemNumber: "5385202875",
          available: false,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        },
        {
          itemNumber: "5385202883",
          available: false,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        },
        {
          itemNumber: "5385203030",
          available: true,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        },
        {
          itemNumber: "5385203057",
          available: false,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        },
        {
          itemNumber: "5385203138",
          available: false,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        }
      ]
    },
    {
      branch: {
        branchId: "DK-775149",
        title: "Sabro"
      },
      department: {
        departmentId: "vo",
        title: "Voksen"
      },
      location: {
        locationId: "krimi",
        title: "Krimi"
      },
      sublocation: undefined,
      materials: [
        {
          itemNumber: "5387025822",
          available: true,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        },
        {
          itemNumber: "5385203448",
          available: true,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        },
        {
          itemNumber: "5385203340",
          available: true,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        }
      ]
    },
    {
      branch: {
        branchId: "DK-775149",
        title: "Sabro"
      },
      department: {
        departmentId: "vo",
        title: "Voksen"
      },
      location: {
        locationId: "fikdu",
        title: "Fik du læst"
      },
      sublocation: undefined,
      materials: [
        {
          itemNumber: "5385203006",
          available: true,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        },
        {
          itemNumber: "5387007409",
          available: true,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        }
      ]
    },
    {
      branch: {
        branchId: "DK-775140",
        title: "Åby"
      },
      department: {
        departmentId: "vo",
        title: "Voksen"
      },
      location: {
        locationId: "krimi",
        title: "Krimi"
      },
      sublocation: undefined,
      materials: [
        {
          itemNumber: "5387025733",
          available: false,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        },
        {
          itemNumber: "5387025881",
          available: false,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        },
        {
          itemNumber: "5387025865",
          available: false,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        },
        {
          itemNumber: "5387496590",
          available: false,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        },
        {
          itemNumber: "5387496531",
          available: true,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        },
        {
          itemNumber: "5385203456",
          available: false,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        },
        {
          itemNumber: "5385203308",
          available: false,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        },
        {
          itemNumber: "5385203251",
          available: true,
          periodical: undefined,
          materialGroup: {
            name: "standard",
            description: "31 dages lånetid til alm lånere"
          }
        }
      ]
    }
  ];
  const whitelist = [
    {
      branchId: "DK-775147",
      title: "Hasle"
    },
    {
      branchId: "DK-775149",
      title: "Sabro"
    },
    {
      branchId: "DK-775162",
      title: "Hjortshøj"
    },
    {
      branchId: "DK-775140",
      title: "Åby"
    }
  ];
  const instantLoanStrings = ["31 dages lånetid til alm lånere"];
  const result = getInstantLoanBranchHoldings(
    branchHoldings,
    whitelist,
    instantLoanStrings
  );

  expect(result).toMatchSnapshot();
});

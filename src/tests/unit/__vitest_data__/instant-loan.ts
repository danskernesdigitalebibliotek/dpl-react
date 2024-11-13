import { AgencyBranch, HoldingsLogisticsV1 } from "../../../core/fbs/model";

const branchHoldings: HoldingsLogisticsV1[] = [
  {
    branch: {
      branchId: "DK-775140",
      title: "Åby"
    },
    materials: [
      {
        itemNumber: "000",
        available: true,
        periodical: undefined,
        materialGroup: {
          name: "I am supposed to be matched",
          description: undefined
        }
      },
      {
        itemNumber: "000",
        available: false,
        periodical: undefined,
        materialGroup: {
          name: "I am supposed to be matched", // But am not available
          description: undefined
        }
      },
      {
        itemNumber: "000",
        available: false,
        periodical: undefined,
        materialGroup: {
          name: "I am NOT supposed to be matched",
          description: "I am NOT supposed to be matched" // Description is optional and can be undefined
        }
      }
    ]
  },
  {
    branch: {
      branchId: "DK-775149",
      title: "Sabro"
    },
    materials: [
      {
        itemNumber: "000",
        available: true,
        periodical: undefined,
        materialGroup: {
          name: "I am supposed to be matched",
          description: undefined
        }
      },
      {
        itemNumber: "000",
        available: false,
        periodical: undefined,
        materialGroup: {
          name: "I am also supposed to be matched",
          description: undefined
        }
      },
      {
        itemNumber: "000",
        available: false,
        periodical: undefined,
        materialGroup: {
          name: "I am NOT supposed to be matched",
          description: undefined
        }
      }
    ]
  },
  {
    branch: {
      branchId: "DK-775147",
      title: "Hasle"
    },
    materials: [
      {
        itemNumber: "5385203006",
        available: true,
        periodical: undefined,
        materialGroup: {
          name: "I am supposed to be matched",
          description: undefined
        }
      },
      {
        itemNumber: "5387007409",
        available: true,
        periodical: undefined,
        materialGroup: {
          name: "I am also supposed to be matched",
          description: "I am also supposed to be matched" // Description is optional and can be undefined
        }
      }
    ]
  },
  {
    branch: {
      branchId: "DK-775162",
      title: "Hjortshøj"
    },
    materials: [
      {
        itemNumber: "000",
        available: false,
        periodical: undefined,
        materialGroup: {
          name: "I am NOT supposed to be matched",
          description: undefined
        }
      }
    ]
  },
  {
    branch: {
      branchId: "DK-775100",
      title: "Andeby"
    },
    materials: [
      {
        itemNumber: "5385203006",
        available: true,
        periodical: undefined,
        materialGroup: {
          name: "I am supposed to be matched",
          description: undefined
        }
      }
    ]
  },
  {
    branch: {
      branchId: "DK-775140",
      title: "Åby"
    },
    materials: [
      {
        itemNumber: "000",
        available: true,
        periodical: undefined,
        materialGroup: {
          name: "I am supposed to be matched",
          description: undefined
        }
      }
    ]
  }
];
const whitelist: AgencyBranch[] = [
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

export default {
  branchHoldings,
  whitelist
};

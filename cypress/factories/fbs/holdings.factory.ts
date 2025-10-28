import { Factory } from "fishery";
import {
  HoldingsForBibliographicalRecordLogisticsV1,
  HoldingsLogisticsV1,
  MaterialV3
} from "../../../src/core/fbs/model";

/**
 * Factory for individual material items
 */
export const materialFactory = Factory.define<MaterialV3>(() => ({
  itemNumber: "item-001",
  available: true,
  periodical: undefined,
  materialGroup: {
    name: "Standard",
    description: "Std. materialegruppe"
  }
}));

/**
 * Factory for holdings at a specific library branch
 * All data should be provided by scenarios
 */
export const holdingsLogisticsFactory = Factory.define<HoldingsLogisticsV1>(
  () => ({
    branch: {
      branchId: "",
      title: ""
    },
    lmsPlacement: {
      department: undefined,
      section: undefined,
      location: undefined,
      sublocation: undefined
    },
    logisticsPlacement: [],
    materials: []
  })
);

/**
 * Factory for complete holdings response for a bibliographical record
 * Holdings should be provided by scenarios, not defaults
 */
export const holdingsForRecordFactory =
  Factory.define<HoldingsForBibliographicalRecordLogisticsV1>(() => ({
    recordId: "870970-basis:52557240",
    reservable: true,
    reservations: 0,
    holdings: [] // Should be provided by scenarios
  }));

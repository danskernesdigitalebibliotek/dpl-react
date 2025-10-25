import { Factory } from "fishery";
import { AvailabilityV3 } from "../../../src/core/fbs/model";

/**
 * Factory for FBS AvailabilityV3
 * Default represents a material that is available and reservable with no queue
 */
export const availabilityFactory = Factory.define<AvailabilityV3>(() => ({
  recordId: "870970-basis:52557240",
  available: true,
  reservable: true,
  reservations: 0
}));

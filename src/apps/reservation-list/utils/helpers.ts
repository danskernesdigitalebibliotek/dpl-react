import { ReservationType } from "../../../core/utils/types/reservation-type";
import { AgencyBranch } from "../../../core/fbs/model";
import { ReturnValue } from "../../../core/utils/config";

export const getReadyForPickup = (list: ReservationType[]) => {
  return [...list].filter(({ state }) => state === "readyForPickup");
};

export const sortByOldestPickupDeadline = (list: ReservationType[]) => {
  return list.sort(
    (objA, objB) =>
      new Date(objA.pickupDeadline || new Date()).getTime() -
      new Date(objB.pickupDeadline || new Date()).getTime()
  );
};

export const getReserved = (list: ReservationType[]) => {
  return [...list].filter(({ state }) => state === "reserved");
};

export default {};

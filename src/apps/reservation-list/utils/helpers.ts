import { ReservationDetailsV2 } from "../../../core/fbs/model";
import { ReservationType } from "../../../core/utils/types/reservation-type";

export const sortByOldestPickupDeadline = (
  list: ReservationType[] | ReservationDetailsV2[]
) => {
  return list.sort(
    (objA, objB) =>
      new Date(objA.pickupDeadline || new Date()).getTime() -
      new Date(objB.pickupDeadline || new Date()).getTime()
  );
};

export const getReservedDigital = (list: ReservationType[]) => {
  // Sorts by pickupDeadline, then title
  return list
    .filter(({ state }) => state === "reserved")
    .sort(
      (objA, objB) =>
        new Date(objA.pickupDeadline || new Date()).getTime() -
          new Date(objB.pickupDeadline || new Date()).getTime() ||
        (objA.title || "").localeCompare(objB.title || "")
    );
};

export const getReservedPhysical = (list: ReservationType[]) => {
  return list
    .filter(({ state }) => state === "reserved")
    .sort(
      (objA, objB) => (objA.numberInQueue || 0) - (objB.numberInQueue || 0)
    );
};

export const getReadyForPickup = (list: ReservationType[]) => {
  return list.filter(({ state }) => {
    return state === "readyForPickup";
  });
};

export default {};

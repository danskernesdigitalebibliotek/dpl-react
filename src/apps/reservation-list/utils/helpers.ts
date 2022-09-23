import { ReservationMetaDataType } from "../../../core/utils/types/reservation-meta-data-type";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";

export const getReadyForPickup = (
  list: MetaDataType<ReservationMetaDataType>[]
) => {
  return [...list].filter(
    ({ reservationSpecific }) => reservationSpecific?.state === "readyForPickup"
  );
};

export const sortByOldestPickupDeadline = (
  list: MetaDataType<ReservationMetaDataType>[]
) => {
  return list.sort(
    (objA, objB) =>
      new Date(
        objA.reservationSpecific?.pickupDeadline || new Date()
      ).getTime() -
      new Date(objB.reservationSpecific?.pickupDeadline || new Date()).getTime()
  );
};

export const getReserved = (list: MetaDataType<ReservationMetaDataType>[]) => {
  return [...list].filter(
    ({ reservationSpecific }) => reservationSpecific?.state === "reserved"
  );
};

export default {};

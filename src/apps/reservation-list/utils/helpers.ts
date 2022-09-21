import type { ReservationDetailsV2 } from "../../../core/fbs/model/reservationDetailsV2";
import { ReservationMetaDataType } from "../../../core/utils/types/reservation-meta-data-type";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";
import { FaustId } from "../../../core/utils/types/ids";
import type { Reservation } from "../../../core/publizon/model/reservation";

export const mapFBSReservationToLoanMetaDataType = (
  list: ReservationDetailsV2[]
): MetaDataType<ReservationMetaDataType>[] => {
  return list.map(
    ({
      recordId,
      dateOfReservation,
      expiryDate,
      numberInQueue,
      state,
      pickupBranch,
      pickupDeadline
    }) => {
      return {
        id: recordId as FaustId,
        reservationSpecific: {
          dateOfReservation,
          expiryDate,
          numberInQueue,
          state,
          pickupBranch,
          pickupDeadline,
          type: "physical"
        }
      };
    }
  );
};

export const mapPublizonReservationToLoanMetaDataType = (
  list: Reservation[]
): MetaDataType<ReservationMetaDataType>[] => {
  return list.map(
    ({
      productId,
      createdDateUtc,
      status,
      expectedRedeemDateUtc,
      expireDateUtc
    }) => {
      return {
        id: productId as FaustId, // or identifier ?
        reservationSpecific: {
          type: "digital",
          dateOfReservation: createdDateUtc,
          expiryDate: expireDateUtc,
          state: status === 1 ? "readyForPickup" : "reserved",
          pickupDeadline: expectedRedeemDateUtc
        }
      };
    }
  );
};

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

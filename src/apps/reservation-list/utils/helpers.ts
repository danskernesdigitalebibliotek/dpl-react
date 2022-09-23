import type { ReservationDetailsV2 } from "../../../core/fbs/model/reservationDetailsV2";
import { ReservationMetaDataType } from "../../../core/utils/types/reservation-meta-data-type";
import { FaustId } from "../../../core/utils/types/ids";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";
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
        type: "physical",
        reservationSpecific: {
          dateOfReservation,
          expiryDate,
          numberInQueue,
          state,
          pickupBranch,
          pickupDeadline
        }
      };
    }
  );
};

// 1 = Queued;
// 2 = Redeemable;
// 3 = Redeemed;
// 4 = Cancelled;
// 5 = Expired;

export const mapPublizonReservationToLoanMetaDataType = (
  list: Reservation[]
): MetaDataType<ReservationMetaDataType>[] => {
  return list.map(
    ({
      identifier,
      createdDateUtc,
      status,
      expectedRedeemDateUtc,
      expireDateUtc
    }) => {
      return {
        id: identifier as FaustId, // or identifier ?
        type: "digital",
        reservationSpecific: {
          dateOfReservation: createdDateUtc,
          expiryDate: expireDateUtc,
          state: status === 1 ? "readyForPickup" : "reserved", // Todo these states are going to be fixed, I need some info about the publizon loans before
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

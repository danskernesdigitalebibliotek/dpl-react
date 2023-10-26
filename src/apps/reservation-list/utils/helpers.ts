import { ReservationDetailsV2 } from "../../../core/fbs/model";
import { formatDateDependingOnDigitalMaterial } from "../../../core/utils/helpers/date";
import { UseTextFunction } from "../../../core/utils/text";
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

export const infoLabelTextType = {
  pickUpLatest: "reservationPickUpLatestText",
  loanBefore: "reservationListLoanBeforeText"
} as const;

export const getReservationStatusInfoLabel = ({
  pickupBranch,
  date,
  isDigital,
  t
}: {
  pickupBranch: string | null | undefined;
  date: string;
  isDigital: boolean;
  t: UseTextFunction;
}) => {
  const textKey = pickupBranch
    ? infoLabelTextType.pickUpLatest
    : infoLabelTextType.loanBefore;

  return t(textKey, {
    placeholders: {
      "@date": formatDateDependingOnDigitalMaterial({
        date,
        isDigital
      })
    }
  });
};

export default {};

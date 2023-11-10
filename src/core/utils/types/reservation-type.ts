import { ListType } from "./list-type";
import { Nullable } from "./nullable";

interface Reservation extends ListType {
  dateOfReservation: string;
  expiryDate: string;
  pickupDeadline: string;
  numberInQueue: number;
  state: string;
  expectedRedeemDateUtc: string;
  /** The reservation number. This is, contrary to the name, a string containing, as an example, "Reserveringshylde 111" */
  pickupNumber: string;
  pickupBranch: string;
  title: string;
  periodical: string;
}

export type ReservationType = Nullable<Partial<Reservation>>;

type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type PhysicalReservationType = ReservationType &
  NonNullableFields<Required<Pick<ListType, "faust" | "reservationIds">>>;

export type DigitalReservationType = ReservationType &
  NonNullableFields<Required<Pick<ListType, "identifier" | "reservationId">>>;

export function reservationId(reservation: ReservationType): string {
  if (reservation?.reservationIds && reservation.reservationIds.length > 0) {
    return String(reservation.reservationIds.at(0));
  }
  return String(reservation.reservationId || reservation.identifier);
}

export function isReservationType(item: ListType): item is ReservationType {
  return (
    !!item.identifier ||
    !!item.reservationId ||
    (!!item.reservationIds && item.reservationIds.length > 0)
  );
}

export function isPhysicalReservation(
  reservation: ReservationType
): reservation is PhysicalReservationType {
  return (
    !!reservation.faust &&
    !!reservation.reservationIds &&
    reservation.reservationIds.length > 0
  );
}

export function isDigitalReservation(
  reservation: ReservationType
): reservation is DigitalReservationType {
  return !!reservation.identifier;
}

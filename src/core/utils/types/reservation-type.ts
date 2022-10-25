import { ListType } from "./list-type";
import { Nullable } from "./nullable";

interface Reservation extends ListType {
  dateOfReservation: string;
  expiryDate: string;
  pickupDeadline: string;
  numberInQueue: number;
  state: string;
  reservationId?: number;
  title?: string | null;
  pickupBranch: string;
  expectedRedeemDateUtc: string;
  /** The reservation number. This is, contrary to the name, a string containing, as an example, "Reserveringshylde 111" */
  pickupNumber: string;
}

export type ReservationType = Nullable<Partial<Reservation>>;

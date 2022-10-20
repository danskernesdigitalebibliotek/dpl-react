import { ListType } from "./list-type";
import { Nullable } from "./nullable";

interface Reservation extends ListType {
  dateOfReservation: string;
  expiryDate: string;
  pickupDeadline: string;
  numberInQueue: number;
  state: string;
  pickupBranch: string;
  expectedRedeemDateUtc: string;
  pickupNumber: string;
}

export type ReservationType = Nullable<Partial<Reservation>>;

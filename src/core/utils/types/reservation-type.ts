import { ListType } from "./list-type";

export interface ReservationType extends ListType {
  dateOfReservation: string | undefined;
  expiryDate: string | null | undefined;
  pickupDeadline: string | null | undefined;
  numberInQueue?: number | undefined;
  state: string;
  pickupBranch?: string;
  expectedRedeemDateUtc?: string;
  pickupNumber?: string;
  reservationId?: number;
}

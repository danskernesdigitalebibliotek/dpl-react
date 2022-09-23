export interface ReservationMetaDataType {
  dateOfReservation: string | undefined;
  expiryDate: string | null | undefined;
  pickupDeadline: string | null | undefined;
  numberInQueue?: number | undefined;
  state: string;
  pickupBranch?: string;
  expectedRedeemDateUtc?: string;
}

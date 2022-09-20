import { FaustId } from "./ids";
import { LoanMetaDataType } from "./loan-meta-data-type";
import { ReservationMetaDataType } from "./reservation-meta-data-type";

export type MetaDataType<
  Extra extends LoanMetaDataType | ReservationMetaDataType
> = {
  id: FaustId;
  loanSpecific?: Extra & LoanMetaDataType;
  reservationSpecific?: Extra & ReservationMetaDataType;
};

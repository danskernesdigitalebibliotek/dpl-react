import { FaustId } from "./ids";
import { LoanMetaDataType } from "./loan-meta-data-type";
import { ReservationMetaDataType } from "./reservation-meta-data-type";
import { MaterialClassification } from "./material-classification";

export type MetaDataType<
  Extra extends LoanMetaDataType | ReservationMetaDataType
> = {
  id: FaustId;
  type: MaterialClassification;
  loanSpecific?: Extra & LoanMetaDataType;
  reservationSpecific?: Extra & ReservationMetaDataType;
};

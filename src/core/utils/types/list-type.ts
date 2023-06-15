import { FaustId, LoanId } from "./ids";
import { Nullable } from "./nullable";

export type ListIdsType = {
  faust: FaustId;
  identifier: string;
  reservationId: number;
  loanId: LoanId | null;
};

export type ListType = Nullable<Partial<ListIdsType>>;

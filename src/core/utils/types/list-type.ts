import { FaustId, LoanId } from "./ids";
import { Nullable } from "./nullable";

export type ListIdsType = {
  faust: FaustId;
  identifier: string;
  /**
   * @deprecated Use reservationIds instead.
   *
   * This will be removed in the future when we have migrated to the new
   * reservationId property which supports grouped / parallel reservations.
   */
  reservationId: number;
  reservationIds: number[];
  loanId: LoanId | null;
};

export type ListType = Nullable<Partial<ListIdsType>>;

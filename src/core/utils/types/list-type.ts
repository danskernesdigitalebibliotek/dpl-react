import { FaustId, LoanId } from "./ids";
import { Nullable } from "./nullable";
import { BasicDetailsType } from "./basic-details-type";

export type ListIdsType = {
  faust: FaustId;
  identifier: string;
  reservationIds: number[];
  loanId: LoanId | null;
};

export type ListType = Nullable<
  Partial<
    ListIdsType & {
      details: BasicDetailsType;
    }
  >
>;

export function listId(listItem: ListType): string {
  if (listItem?.reservationIds && listItem.reservationIds.length > 0) {
    return listItem?.reservationIds?.join("-");
  }
  if (listItem.loanId) {
    return String(listItem.loanId);
  }
  if (listItem.identifier) {
    return listItem.identifier;
  }
  if (listItem.faust) {
    return String(listItem.faust);
  }
  throw new Error("Unable to determine id for list item");
}

import dayjs from "dayjs";
import { RenewedLoanV2 } from "../../../core/fbs/model/renewedLoanV2";
import { ListView } from "../../../core/utils/types/list-view";
import { LoanMetaDataType } from "../../../core/utils/types/loan-meta-data-type";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";

export const removeLoansWithDuplicateDueDate = (
  date: string | null,
  list: MetaDataType<LoanMetaDataType>[]
) => {
  return list.filter(({ loanSpecific }) => loanSpecific?.dueDate === date);
};

export const formatDate = (date?: string | null) => {
  if (date) {
    return dayjs(date).format("DD-MM-YYYY");
  }
  return "";
};

export const getRenewedIds = (list: RenewedLoanV2[]) => {
  return list.map(({ loanDetails }) => loanDetails.recordId);
};

export const removeLoansWithIds = (
  list: MetaDataType<LoanMetaDataType>[],
  ids: string[]
) => {
  return list.filter(({ id }) => {
    return ids.indexOf(id) === -1;
  });
};

export const materialIsOverdue = (date: string | undefined) => {
  if (date) {
    return dayjs().isAfter(dayjs(date));
  }
  return false;
};

// Simple faust match for modals
export const queryMatchesFaust = (query: string | null) => {
  // regex for finding date string from modal query param
  const regex = /^\d{8}$/;
  const faustFound = query ? query.toString().match(regex) : null;
  const returnValue =
    faustFound && faustFound.length > 0 ? faustFound[0] : null;
  return returnValue;
};

export const getStackedItems = (
  view: ListView,
  list: MetaDataType<LoanMetaDataType>[],
  itemsShown: number,
  dueDates: string[] | undefined | null[]
) => {
  let returnLoans: MetaDataType<LoanMetaDataType>[] = [];
  if (view === "stacked" && dueDates) {
    // I mean... this...
    // If the due date is null, the stacked item still has to be shown
    let dueDatesCopy = [...dueDates, null];
    dueDatesCopy = dueDatesCopy.slice(0, itemsShown);
    dueDatesCopy.forEach((uniqueDueDate) => {
      returnLoans = returnLoans.concat(
        list.filter(
          ({ loanSpecific }) => loanSpecific?.dueDate === uniqueDueDate
        )
      );
    });
  }
  return returnLoans;
};

export const getListItems = (
  list: MetaDataType<LoanMetaDataType>[],
  itemsShown: number
) => {
  return [...list].splice(0, itemsShown);
};

export default {};

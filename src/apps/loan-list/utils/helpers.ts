import dayjs from "dayjs";
import { RenewedLoanV2 } from "../../../core/fbs/model/renewedLoanV2";
import { ListView } from "../../../core/utils/types/list-view";
import { LoanType } from "../../../core/utils/types/loan-type";

export const removeLoansWithDuplicateDueDate = (
  date: string | null,
  list: LoanType[]
) => {
  return list.filter(({ dueDate }) => dueDate === date);
};

export const formatDate = (date: string) => {
  return dayjs(date).format("DD-MM-YYYY");
};

export const getRenewedIds = (list: RenewedLoanV2[]) => {
  return list.map(({ loanDetails }) => loanDetails.recordId);
};

export const removeLoansWithIds = (list: LoanType[], ids: string[]) => {
  return list.filter(({ faust, identifier }) => {
    if (faust) {
      return ids.indexOf(faust) === -1;
    }
    if (identifier) {
      return ids.indexOf(identifier) === -1;
    }
    return false;
  });
};

export const materialIsOverdue = (date: string | undefined) =>
  dayjs().isAfter(dayjs(date), "day");

// Create a string of authors with commas and a conjunction
export const getAuthorNames = (
  creators: {
    display: string;
  }[],
  by: string,
  and: string
) => {
  const names = creators.map(({ display }) => display);
  let returnContentString = "";
  if (names.length === 1) {
    returnContentString = `${by} ${names.join(", ")}`;
  } else {
    returnContentString = `${by} ${names
      .slice(0, -1)
      .join(", ")} ${and} ${names.slice(-1)}`;
  }
  return returnContentString;
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
  list: LoanType[],
  itemsShown: number,
  dueDates: string[] | undefined | null[]
) => {
  let returnLoans: LoanType[] = [];
  if (view === "stacked" && dueDates) {
    // I mean... this...
    // If the due date is null, the stacked item still has to be shown
    let dueDatesCopy = [...dueDates, null];
    dueDatesCopy = dueDatesCopy.slice(0, itemsShown);
    dueDatesCopy.forEach((uniqueDueDate) => {
      returnLoans = returnLoans.concat(
        list.filter(({ dueDate }) => dueDate === uniqueDueDate)
      );
    });
  }
  return returnLoans;
};

export const getListItems = (list: LoanType[], itemsShown: number) => {
  return [...list].splice(0, itemsShown);
};

export default {};

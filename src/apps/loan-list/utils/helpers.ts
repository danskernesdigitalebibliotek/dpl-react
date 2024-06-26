import { RenewedLoanV2 } from "../../../core/fbs/model/renewedLoanV2";
import { ListView } from "../../../core/utils/types/list-view";
import { LoanType } from "../../../core/utils/types/loan-type";
import { UseTextFunction } from "../../../core/utils/text";
import { ListType } from "../../../core/utils/types/list-type";

export const removeLoansWithDuplicateDueDate = (
  date: string,
  list: LoanType[]
) => {
  return list.filter(({ dueDate }) => dueDate === date);
};
export const loansAreEmpty = (list: LoanType[] | null) =>
  Array.isArray(list) && list.length === 0;

export const getRenewedIds = (list: RenewedLoanV2[]) => {
  return list.map(({ loanDetails }) => loanDetails.recordId);
};
export const materialsAreStacked = (materialsInStack: number) => {
  return materialsInStack > 0;
};
export const getFromListByKey = (
  list: ListType[],
  key: "identifier" | "faust" | "loanId",
  value: string
) => {
  return list.filter((loan) => String(loan[key]) === value);
};

export const getStatusText = (status: string, t: UseTextFunction) => {
  switch (status) {
    case "deniedMaxRenewalsReached":
      return t("groupModalRenewLoanDeniedMaxRenewalsReachedText");
    case "deniedReserved":
      return t("groupModalRenewLoanDeniedReservedText");
    default:
      return "";
  }
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

// Simple faust match for modals
export const queryMatchesFaust = (query: string | null) => {
  // regex for finding date string from modal query param
  const regex = /^\d{8}$/;
  const faustFound = query ? query.toString().match(regex) : null;
  const returnValue =
    faustFound && faustFound.length > 0 ? faustFound[0] : null;
  return returnValue;
};

export const isDigital = (loan: ListType) => Boolean(loan.identifier);

export const getStackedItems = (
  view: ListView,
  list: LoanType[],
  itemsShown: number,
  dueDates: string[] | undefined | null[]
) => {
  let returnLoans: LoanType[] = [];
  if (view === "stack" && dueDates) {
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

export const getLoanDeliveryDate = (
  loanType: LoanType,
  formatDate: (date: string) => string,
  t: UseTextFunction
) => {
  // Set the value of 'neutralText' based on the material type and due date
  return loanType.dueDate
    ? t(
        isDigital(loanType)
          ? "groupModalDueDateDigitalMaterialText"
          : "groupModalDueDateMaterialText",
        {
          placeholders: {
            "@date": formatDate(loanType.dueDate)
          }
        }
      )
    : "";
};

export default {};

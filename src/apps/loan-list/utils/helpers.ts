import dayjs from "dayjs";
import { LoanV2 } from "../../../core/fbs/model/loanV2";
import { RenewedLoanV2 } from "../../../core/fbs/model/renewedLoanV2";
import { ListView } from "../../../core/utils/types/list-view";
import { Loan } from "../../../core/publizon/model";
import { LoanMetaDataType } from "../../../core/utils/helpers/LoanMetaDataType";

export const removeLoansWithDuplicateDueDate = (
  date: string | null,
  list: LoanMetaDataType[]
) => {
  return list.filter(({ dueDate }) => dueDate === date);
};

export const formatDate = (date: string) => {
  return dayjs(date).format("DD-MM-YYYY");
};

export const materialIsOverdue = (date: string | undefined) => {
  if (date) {
    return dayjs().isAfter(dayjs(date));
  }
  return false;
};

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
  list: LoanMetaDataType[],
  itemsShown: number,
  dueDates: string[] | undefined | null[]
) => {
  let returnLoans: LoanMetaDataType[] = [];
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

export const getListItems = (list: LoanMetaDataType[], itemsShown: number) => {
  return [...list].splice(0, itemsShown);
};

export const mapPublizonLoanToLoanMetaDataType = (
  list: Loan[]
): LoanMetaDataType[] => {
  return list.map(({ loanExpireDateUtc, orderDateUtc, libraryBook }) => {
    return {
      dueDate: loanExpireDateUtc,
      loanDate: orderDateUtc,
      id: libraryBook?.identifier || "",
      isRenewable: false,
      materialItemNumber: libraryBook?.identifier || "",
      renewalStatusList: [],
      loanType: null
    };
  });
};

export const mapPBSLoanToLoanMetaDataType = (
  list: LoanV2[]
): LoanMetaDataType[] => {
  return list.map(({ loanDetails, isRenewable, renewalStatusList }) => {
    return {
      dueDate: loanDetails.dueDate,
      loanDate: loanDetails.loanDate,
      renewalStatusList,
      id: loanDetails.recordId,
      isRenewable,
      materialItemNumber: loanDetails.materialItemNumber,
      loanType: loanDetails.loanType
    };
  });
};

export const mapPBSRenewedLoanToLoanMetaDataType = (
  list: RenewedLoanV2[]
): LoanMetaDataType[] => {
  return list.map(({ loanDetails }) => {
    return {
      dueDate: loanDetails.dueDate,
      loanDate: loanDetails.loanDate,
      renewalStatusList: [],
      id: loanDetails.recordId,
      isRenewable: false,
      materialItemNumber: loanDetails.materialItemNumber,
      loanType: loanDetails.loanType
    };
  });
};

export default {};

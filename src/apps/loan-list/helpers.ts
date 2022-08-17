import get from "lodash.get";
import dayjs from "dayjs";
import { LoanV2 } from "../../core/fbs/model/loanV2";

export const removeLoansWithSameDueDate = (list: LoanV2[]) => {
  const seen: string[] = [];

  const loanList = list.filter((el) => {
    const duplicate = seen.includes(el.loanDetails.dueDate);
    seen.push(el.loanDetails.dueDate);
    return !duplicate;
  });

  const duplicateDueDates = seen.filter((item) => {
    return seen.lastIndexOf(item) !== seen.indexOf(item);
  });

  return { loanList, duplicateDueDates };
};
export const removeLoansWithDuplicateDueDate = (
  date: string,
  list: LoanV2[],
  filterByPath: string
) => {
  return list.filter(
    (material: LoanV2) => get(material, filterByPath) === date
  );
};

export const getRenewableMaterials = (list: LoanV2[]) => {
  const listOfLoansToCheck: number[] = [];
  list.filter(({ isRenewable }) => isRenewable);
  list.forEach((loan) => {
    if (loan.isRenewable) {
      listOfLoansToCheck.push(parseInt(loan.loanDetails.recordId, 10));
    }
  });
  return listOfLoansToCheck;
};

export const getAmountOfRenewableLoans = (list: LoanV2[]) => {
  return getRenewableMaterials(list).length;
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

export default {};

import get from "lodash.get";
import dayjs from "dayjs";
import { LoanV2 } from "../../core/fbs/model/loanV2";

export const removeLoansWithDuplicateDueDate = (
  date: string,
  list: LoanV2[],
  filterByPath: string
) => {
  return list.filter(
    (material: LoanV2) => get(material, filterByPath) === date
  );
};

export const getAmountOfRenewableLoans = (list: LoanV2[]) => {
  return list.filter(({ isRenewable }) => isRenewable).length;
};

export const formatDate = (date: string) => {
  return dayjs(date).format("DD-MM-YYYY");
};

export const materialOverdue = (date: string) => {
  return dayjs().isAfter(dayjs(date));
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

export default {};

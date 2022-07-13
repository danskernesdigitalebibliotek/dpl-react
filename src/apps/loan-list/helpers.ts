import get from "lodash.get";
import { LoanV2 } from "../../core/fbs/model/loanV2";
import dayjs from "dayjs";

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

export default {};

import { useGetLoansV2 } from "../fbs/fbs";
import { useGetV1UserLoans } from "../publizon/publizon";
import { useConfig } from "./config";
import {
  filterLoansNotOverdue,
  filterLoansOverdue,
  filterLoansSoonOverdue,
  getDueDatesLoan,
  sortByDueDate
} from "./helpers/general";
import {
  mapFBSLoanToLoanType,
  mapPublizonLoanToLoanType
} from "./helpers/list-mapper";
import { ThresholdType } from "./types/threshold-type";

const useLoans = () => {
  const config = useConfig();
  const { data: loansFbs } = useGetLoansV2();
  const { data: loansPublizon } = useGetV1UserLoans();
  const {
    colorThresholds: { warning }
  } = config<ThresholdType>("thresholdConfig", {
    transformer: "jsonParse"
  });

  // map loans to same type
  const mappedLoansFbs = loansFbs ? mapFBSLoanToLoanType(loansFbs) : [];
  const mappedLoansPublizon = loansPublizon?.loans
    ? mapPublizonLoanToLoanType(loansPublizon.loans)
        // TODO: is it necessary to filter out loans without dueDate?
        // there are loans without dueDate in the publizon MOCK data
        .filter((item) => item.dueDate)
    : [];

  // Combine all loans from both FBS and Publizon
  const allLoans = sortByDueDate([...mappedLoansFbs, ...mappedLoansPublizon]);

  // Combine "overdue loans" from both FBS and Publizon
  const overdueLoansFBS = filterLoansOverdue(mappedLoansFbs);
  const overdueLoansPublizon = filterLoansOverdue(mappedLoansPublizon);
  const allOverdueLoans = sortByDueDate([
    ...overdueLoansFBS,
    ...overdueLoansPublizon
  ]);

  // combine "soon overdue" loans from both FBS and Publizon
  const soonOverdueLoansFBS = filterLoansSoonOverdue(mappedLoansFbs, warning);
  const soonOverdueLoansPublizon = filterLoansSoonOverdue(
    mappedLoansPublizon,
    warning
  );
  const allSoonOverdueLoans = sortByDueDate([
    ...soonOverdueLoansFBS,
    ...soonOverdueLoansPublizon
  ]);

  // combine "far from overdue" loans from both FBS and Publizon
  const farFromOverdueFBS = filterLoansNotOverdue(mappedLoansFbs, warning);
  const farFromOverduePublizon = filterLoansNotOverdue(
    mappedLoansPublizon,
    warning
  );
  const allFarFromOverdueLoans = sortByDueDate([
    ...farFromOverdueFBS,
    ...farFromOverduePublizon
  ]);

  // The due dates are used for the stacked materials
  // The stacked materials view shows materials stacked by
  // due date, and for this we need a unique list of due dates
  const sortedByLoanDateFbs = sortByDueDate(mappedLoansFbs);
  const sortedByLoanDatePublizon = sortByDueDate(mappedLoansPublizon);

  // list of all due dates used for the stacked materials
  const stackedMaterialsDueDatesFbs = getDueDatesLoan(mappedLoansFbs);
  return {
    allLoans,
    sortedByLoanDateFbs,
    sortedByLoanDatePublizon,
    allOverdueLoans,
    allSoonOverdueLoans,
    allFarFromOverdueLoans,
    stackedMaterialsDueDatesFbs
  };
};

export default useLoans;

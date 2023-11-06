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
  const loans = sortByDueDate([...mappedLoansFbs, ...mappedLoansPublizon]);

  // Combine "overdue loans" from both FBS and Publizon
  const loansOverdueFBS = filterLoansOverdue(mappedLoansFbs);
  const LoansOverduePublizon = filterLoansOverdue(mappedLoansPublizon);
  const loansOverdue = sortByDueDate([
    ...loansOverdueFBS,
    ...LoansOverduePublizon
  ]);

  // combine "soon overdue" loans from both FBS and Publizon
  const loansSoonOverdueFBS = filterLoansSoonOverdue(mappedLoansFbs, warning);
  const loansSoonOverduePublizon = filterLoansSoonOverdue(
    mappedLoansPublizon,
    warning
  );
  const loansSoonOverdue = sortByDueDate([
    ...loansSoonOverdueFBS,
    ...loansSoonOverduePublizon
  ]);

  // combine "far from overdue" loans from both FBS and Publizon
  const loansFarFromOverdueFBS = filterLoansNotOverdue(mappedLoansFbs, warning);
  const loansFarFromOverduePublizon = filterLoansNotOverdue(
    mappedLoansPublizon,
    warning
  );
  const loansFarFromOverdue = sortByDueDate([
    ...loansFarFromOverdueFBS,
    ...loansFarFromOverduePublizon
  ]);

  // The due dates are used for the stacked materials
  // The stacked materials view shows materials stacked by
  // due date, and for this we need a unique list of due dates
  const loansSortedByDateFbs = sortByDueDate(mappedLoansFbs);
  const loansSortedByDatePublizon = sortByDueDate(mappedLoansPublizon);

  // list of all due dates used for the stacked materials
  const stackedMaterialsDueDatesFbs = getDueDatesLoan(mappedLoansFbs);
  return {
    loans,
    loansSortedByDateFbs,
    loansSortedByDatePublizon,
    loansOverdue,
    loansSoonOverdue,
    loansFarFromOverdue,
    stackedMaterialsDueDatesFbs
  };
};

export default useLoans;

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
import { LoanType } from "./types/loan-type";
import { ThresholdType } from "./types/threshold-type";

type Loans = {
  overdue: LoanType[];
  soonOverdue: LoanType[];
  farFromOverdue: LoanType[];
  isLoading: boolean;
  isError: boolean;
  sortedByDate?: LoanType[];
  stackedMaterialsDueDates?: string[];
};

type UseLoansType = {
  all: Loans & {
    loans: LoanType[];
  };
  fbs: Loans;
  publizon: Loans;
};

type UseLoans = () => UseLoansType;

const useLoans: UseLoans = () => {
  const config = useConfig();
  const {
    data: loansFbs,
    isLoading: isLoadingFbs,
    isError: isErrorFbs
  } = useGetLoansV2();
  const {
    data: loansPublizon,
    isLoading: isLoadingPublizon,
    isError: isErrorPublizon
  } = useGetV1UserLoans();
  const {
    colorThresholds: { warning }
  } = config<ThresholdType>("thresholdConfig", {
    transformer: "jsonParse"
  });

  const loansIsLoading = isLoadingFbs || isLoadingPublizon;
  const loansIsError = isErrorFbs || isErrorPublizon;

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
    all: {
      loans,
      overdue: loansOverdue,
      soonOverdue: loansSoonOverdue,
      farFromOverdue: loansFarFromOverdue,
      isLoading: loansIsLoading,
      isError: loansIsError
    },
    fbs: {
      overdue: loansOverdueFBS,
      soonOverdue: loansSoonOverdueFBS,
      farFromOverdue: loansFarFromOverdueFBS,
      sortedByDate: loansSortedByDateFbs,
      stackedMaterialsDueDates: stackedMaterialsDueDatesFbs,
      isLoading: isLoadingFbs,
      isError: isErrorFbs
    },
    publizon: {
      overdue: LoansOverduePublizon,
      soonOverdue: loansSoonOverduePublizon,
      farFromOverdue: loansFarFromOverduePublizon,
      sortedByDate: loansSortedByDatePublizon,
      isLoading: isLoadingPublizon,
      isError: isErrorPublizon
    }
  };
};

export default useLoans;

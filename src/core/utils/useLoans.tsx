import { useGetLoansV2 } from "../fbs/fbs";
import { useGetV1UserLoans } from "../publizon/publizon";
import { calculateRoundedUpDaysUntil } from "./helpers/date";
import { materialIsOverdue } from "./helpers/general";
import {
  mapFBSLoanToLoanType,
  mapPublizonLoanToLoanType
} from "./helpers/list-mapper";
import { LoanType } from "./types/loan-type";
import useLoanThresholds from "./useLoanThresholds";

// Loans with more than warning-threshold days until due
const filterLoansNotOverdue = (loans: LoanType[], warning: number) => {
  return loans.filter(({ dueDate }) => {
    const due: string = dueDate || "";
    const daysUntilExpiration = calculateRoundedUpDaysUntil(due);
    return daysUntilExpiration - warning > 0;
  });
};
// Loans overdue
const filterLoansOverdue = (loans: LoanType[]) => {
  return loans.filter(({ dueDate }) => {
    return materialIsOverdue(dueDate);
  });
};
//
const filterLoansSoonOverdue = (loans: LoanType[], warning: number) => {
  return loans.filter(({ dueDate }) => {
    const due: string = dueDate || "";
    const daysUntilExpiration = calculateRoundedUpDaysUntil(due);
    return (
      daysUntilExpiration - warning <= 0 &&
      daysUntilExpiration - warning >= -warning
    );
  });
};

type Loans = {
  loans: LoanType[];
  overdue: LoanType[];
  soonOverdue: LoanType[];
  farFromOverdue: LoanType[];
  isLoading: boolean;
  isError: boolean;
};

type UseLoansType = {
  all: Loans;
  fbs: Loans;
  publizon: Loans;
};

type UseLoans = () => UseLoansType;

// useLoans is a custom hook that fetches loans from both FBS and Publizon
// and combines them into lists. The loans are then divided into three
// categories: overdue, soon overdue, and far from overdue.
// The hook is NOT responsible for any sorting of the loans.
const useLoans: UseLoans = () => {
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

  const threshold = useLoanThresholds();
  const loansIsLoading = isLoadingFbs || isLoadingPublizon;
  const loansIsError = isErrorFbs || isErrorPublizon;

  // map loans to same type
  const mappedLoansFbs =
    loansFbs && Array.isArray(loansFbs) ? mapFBSLoanToLoanType(loansFbs) : [];
  const mappedLoansPublizon = loansPublizon?.loans
    ? mapPublizonLoanToLoanType(loansPublizon.loans)
        // TODO: is it necessary to filter out loans without dueDate?
        // there are loans without dueDate in the publizon MOCK data
        .filter((item) => item.dueDate)
    : [];

  // Combine all loans from both FBS and Publizon
  const loans = [...mappedLoansFbs, ...mappedLoansPublizon];

  // Combine "overdue loans" from both FBS and Publizon
  const loansOverdueFBS = filterLoansOverdue(mappedLoansFbs);
  const LoansOverduePublizon = filterLoansOverdue(mappedLoansPublizon);
  const loansOverdue = [...loansOverdueFBS, ...LoansOverduePublizon];

  // combine "soon overdue" loans from both FBS and Publizon
  const loansSoonOverdueFBS = filterLoansSoonOverdue(
    mappedLoansFbs,
    threshold.warning
  );
  const loansSoonOverduePublizon = filterLoansSoonOverdue(
    mappedLoansPublizon,
    threshold.warning
  );
  const loansSoonOverdue = [
    ...loansSoonOverdueFBS,
    ...loansSoonOverduePublizon
  ];

  // combine "far from overdue" loans from both FBS and Publizon
  const loansFarFromOverdueFBS = filterLoansNotOverdue(
    mappedLoansFbs,
    threshold.warning
  );
  const loansFarFromOverduePublizon = filterLoansNotOverdue(
    mappedLoansPublizon,
    threshold.warning
  );
  const loansFarFromOverdue = [
    ...loansFarFromOverdueFBS,
    ...loansFarFromOverduePublizon
  ];

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
      loans: mappedLoansFbs,
      overdue: loansOverdueFBS,
      soonOverdue: loansSoonOverdueFBS,
      farFromOverdue: loansFarFromOverdueFBS,
      isLoading: isLoadingFbs,
      isError: isErrorFbs
    },
    publizon: {
      loans: mappedLoansPublizon,
      overdue: LoansOverduePublizon,
      soonOverdue: loansSoonOverduePublizon,
      farFromOverdue: loansFarFromOverduePublizon,
      isLoading: isLoadingPublizon,
      isError: isErrorPublizon
    }
  };
};

export default useLoans;

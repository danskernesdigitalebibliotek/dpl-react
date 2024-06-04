import { useGetLoansV2 } from "../fbs/fbs";
import { useGetV1UserLoans } from "../publizon/publizon";
import { daysBetweenTodayAndDate, materialIsOverdue } from "./helpers/general";
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
    const daysUntilExpiration = daysBetweenTodayAndDate(due);
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
    const daysUntilExpiration = daysBetweenTodayAndDate(due);
    return (
      daysUntilExpiration - warning <= 0 &&
      daysUntilExpiration - warning >= -warning
    );
  });
};
//
const getDueDatesLoan = (list: LoanType[]) => {
  return Array.from(
    new Set(
      list
        .filter(({ dueDate }) => dueDate !== (undefined || null))
        .map(({ dueDate }) => dueDate)
        .sort()
    )
  ) as string[];
};

const sortByDueDate = (list: LoanType[]) => {
  // Todo figure out what to do if loan does not have loan date
  // For now, its at the bottom of the list
  return list.sort(
    (a, b) =>
      new Date(a.dueDate || new Date()).getTime() -
      new Date(b.dueDate || new Date()).getTime()
  );
};

type Loans = {
  loans: LoanType[];
  overdue: LoanType[];
  soonOverdue: LoanType[];
  farFromOverdue: LoanType[];
  isLoading: boolean;
  isError: boolean;
  stackedMaterialsDueDates?: string[];
};

type UseLoansType = {
  all: Loans;
  fbs: Loans;
  publizon: Loans;
};

type UseLoans = () => UseLoansType;

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
  const loans = sortByDueDate([...mappedLoansFbs, ...mappedLoansPublizon]);

  // Combine "overdue loans" from both FBS and Publizon
  const loansOverdueFBS = filterLoansOverdue(mappedLoansFbs);
  const LoansOverduePublizon = filterLoansOverdue(mappedLoansPublizon);
  const loansOverdue = sortByDueDate([
    ...loansOverdueFBS,
    ...LoansOverduePublizon
  ]);

  // combine "soon overdue" loans from both FBS and Publizon
  const loansSoonOverdueFBS = filterLoansSoonOverdue(
    mappedLoansFbs,
    threshold.warning
  );
  const loansSoonOverduePublizon = filterLoansSoonOverdue(
    mappedLoansPublizon,
    threshold.warning
  );
  const loansSoonOverdue = sortByDueDate([
    ...loansSoonOverdueFBS,
    ...loansSoonOverduePublizon
  ]);

  // combine "far from overdue" loans from both FBS and Publizon
  const loansFarFromOverdueFBS = filterLoansNotOverdue(
    mappedLoansFbs,
    threshold.warning
  );
  const loansFarFromOverduePublizon = filterLoansNotOverdue(
    mappedLoansPublizon,
    threshold.warning
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
      loans: loansSortedByDateFbs,
      overdue: loansOverdueFBS,
      soonOverdue: loansSoonOverdueFBS,
      farFromOverdue: loansFarFromOverdueFBS,
      stackedMaterialsDueDates: stackedMaterialsDueDatesFbs,
      isLoading: isLoadingFbs,
      isError: isErrorFbs
    },
    publizon: {
      loans: loansSortedByDatePublizon,
      overdue: LoansOverduePublizon,
      soonOverdue: loansSoonOverduePublizon,
      farFromOverdue: loansFarFromOverduePublizon,
      isLoading: isLoadingPublizon,
      isError: isErrorPublizon
    }
  };
};

export default useLoans;

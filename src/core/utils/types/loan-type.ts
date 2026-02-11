import { ListType } from "./list-type";

export interface LoanType extends ListType {
  dueDate?: string | null;
  loanDate?: string | null;
  periodical?: string | null;
  isRenewable: boolean;
  materialItemNumber?: string | null;
  renewalStatusList: string[];
  loanType: string | null;
  orderId?: string | null;
}

export function isLoanType(item: ListType): item is LoanType {
  return !!item.loanId || !!item.identifier;
}

export function loanId(loan: LoanType): string {
  return String(loan.loanId || loan.identifier);
}

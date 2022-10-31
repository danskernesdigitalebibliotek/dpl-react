import { ListType } from "./list-type";

export interface LoanType extends ListType {
  dueDate?: string | null;
  loanDate?: string | null;
  isRenewable: boolean;
  materialItemNumber?: string | null;
  renewalStatusList: string[];
  loanType: string | null;
}

import { ListType } from "./list-type";

export interface LoanType extends ListType {
  dueDate: string | null | undefined;
  loanDate: string | null | undefined;
  isRenewable: boolean;
  materialItemNumber: string | null | undefined;
  renewalStatusList: string[];
  loanType: string | null;
}

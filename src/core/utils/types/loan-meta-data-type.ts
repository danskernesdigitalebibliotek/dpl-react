export interface LoanMetaDataType {
  dueDate: string | null | undefined;
  loanDate: string | null | undefined;
  isRenewable: boolean;
  materialItemNumber: string | null | undefined;
  renewalStatusList: string[];
  loanType: string | null;
}

import * as React from "react";
import LoanList from "./loan-list";
import { withText } from "../../../core/utils/text";

export interface LoanListEntryProps {
  loanListTitleText: string;
  loanListPhysicalLoansTitleText: string;
  loanListRenewMultipleButtonText: string;
  loanListListText: string;
  loanListStackText: string;
  loanListRenewMultipleButtonExplanationText: string;
  loanListMaterialByAuthorText: string;
  loanListMaterialAndAuthorText: string;
  loanListLateFeeDesktopText: string;
  loanListLateFeeMobileText: string;
  loanListDaysText: string;
  LoanListToBeDeliveredText: string;
  LoanListMaterialsDesktopText: string;
  LoanListMaterialsMobileText: string;
  loanListMaterialsModalDesktopText: string;
  loanListMaterialsModalMobileText: string;
  loanListToBeDeliveredModalText: string;
  loanListStatusCircleAriaLabelText: string;
  loanListStatusBadgeDangerText: string;
  loanListStatusBadgeWarningText: string;
  loanListRenewPossibleText: string;
  loanListSelectPossibleCheckboxText: string;
  LoanListDeniedMaxRenewalsReachedText: string;
  LoanListDeniedOtherReasonText: string;
  LoanListDeniedInterLibraryLoanText: string;
  LoanListToBeDeliveredMaterialText: string;
  LoanListLabelCheckboxMaterialModalText: string;
  LoanListCloseModalText: string;
  LoanListModalDescriptionText: string;
  LoanListEmptyPhysicalLoansText: string;
  MaterialDetailsModalOverdueText: string;
}

const LoanListEntry: React.FC<LoanListEntryProps> = () => <LoanList />;

export default withText(LoanListEntry);

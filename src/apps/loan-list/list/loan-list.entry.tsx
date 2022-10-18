import React, { FC } from "react";
import LoanList from "./loan-list";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";
import { pageSizeGlobal } from "../../../core/utils/helpers/general";

export interface LoanListEntryConfigProps {
  fbsBaseUrlConfig: string;
  publizonBaseUrlConfig: string;
}

export interface LoanListEntryTextProps {
  loanListTitleText: string;
  loanListPhysicalLoansTitleText: string;
  loanListDigitalLoansTitleText: string;
  materialOverdueUrl: string;
  loanListRenewMultipleButtonText: string;
  loanListListText: string;
  loanListStackText: string;
  loanListRenewMultipleButtonExplanationText: string;
  loanListLateFeeDesktopText: string;
  loanListLateFeeMobileText: string;
  loanListDaysText: string;
  loanListToBeDeliveredText: string;
  loanListToBeDeliveredDigitalMaterialText: string;
  loanListMaterialsDesktopText: string;
  loanListMaterialsMobileText: string;
  loanListMaterialsModalDesktopText: string;
  loanListMaterialsModalMobileText: string;
  loanListStatusCircleAriaLabelText: string;
  loanListStatusBadgeDangerText: string;
  loanListStatusBadgeWarningText: string;
  loanListDeniedMaxRenewalsReachedText: string;
  loanListDeniedOtherReasonText: string;
  loanListDeniedInterLibraryLoanText: string;
  loanListToBeDeliveredMaterialText: string;
  loanListLabelCheckboxMaterialModalText: string;
  LoanListCloseModalText: string;
  loanListModalDescriptionText: string;
  loanListEmptyPhysicalLoansText: string;
  materialDetailsModalOverdueText: string;
  materialDetailsOverdueText: string;
  dueDateRenewLoanModalHeaderText: string;
  renewLoanModalHeaderText: string;
  renewLoanModalCloseModalText: string;
  dueDateRenewLoanCloseModalText: string;
  materialDetailsCloseModalText: string;
  renewLoanModalDescriptionText: string;
  dueDateRenewLoanModalDescriptionText: string;
  materialDetailsModalDescriptionText: string;
  materialDetailsRenewLoanButtonText: string;
  materialDetailsLinkToPageWithFeesText: string;
  materialDetailsHandInLabelText: string;
  materialDetailsLoanDateLabelText: string;
  materialDetailsMaterialNumberLabelText: string;
  renewLoanModalCheckboxText: string;
  renewLoanModalButtonText: string;
  dueDateRenewLoanModalCheckboxText: string;
  dueDateRenewLoanModalButtonText: string;
  dueDateWarningLoanOverdueText: string;
  dueDateLinkToPageWithFeesText: string;
  bottomRenewLoanModalCheckboxText: string;
  bottomDueDateRenewLoanModalCheckboxText: string;
  bottomRenewLoanModalButtonText: string;
  bottomDueDateRenewLoanModalButtonText: string;
  loanListDigitalLoansEmptyListText: string;
  loanListPhysicalLoansEmptyListText: string;
  loanListDigitalPhysicalLoansEmptyListText: string;
  materialAndAuthorText: string;
  materialByAuthorText: string;
  publizonAudioBookText: string;
  publizonPodcastText: string;
  publizonEbookText: string;
}

export interface LoanListEntryWithPageSizeProps
  extends LoanListEntryTextProps,
    LoanListEntryConfigProps {
  pageSizeDesktop?: number;
  pageSizeMobile?: number;
}

const LoanListEntry: FC<LoanListEntryWithPageSizeProps> = ({
  pageSizeDesktop,
  pageSizeMobile
}) => {
  const pageSize = pageSizeGlobal(
    {
      desktop: pageSizeDesktop,
      mobile: pageSizeMobile
    },
    "pageSizeLoanList"
  );

  return <LoanList pageSize={pageSize} />;
};
export default withUrls(withText(LoanListEntry));

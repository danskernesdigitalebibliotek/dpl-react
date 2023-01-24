import React, { FC } from "react";
import LoanList from "./loan-list";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";
import { pageSizeGlobal } from "../../../core/utils/helpers/general";
import { withConfig } from "../../../core/utils/config";

export interface LoanListEntryConfigProps {
  dangerThresholdConfig: string;
  warningThresholdConfig: string;
}
export interface LoanListEntryUrlProps {
  fbsBaseUrl: string;
  materialOverdueUrl: string;
  feesPageUrl: string;
  publizonBaseUrl: string;
  fbiBaseUrl: string;
}

export interface LoanListEntryTextProps {
  groupModalDueDateLinkToPageWithFeesText: string;
  groupModalDueDateRenewLoanCloseModalAriaLabelText: string;
  groupModalDueDateAriaDescriptionText: string;
  groupModalDueDateHeaderText: string;
  groupModalDueDateWarningLoanOverdueText: string;
  loanListAriaLabelListButtonText: string;
  loanListAriaLabelStackButtonText: string;
  groupModalRenewLoanDeniedInterLibraryLoanText: string;
  groupModalRenewLoanDeniedMaxRenewalsReachedText: string;
  groupModalRenewLoanDeniedReservedText: string;
  loanListDigitalLoansEmptyListText: string;
  loanListDigitalLoansTitleText: string;
  loanListDigitalPhysicalLoansEmptyListText: string;
  loanListDueDateModalAriaLabelText: string;
  loanListDueDateModalAriaDescribeMobileText: string;
  groupModalHiddenLabelCheckboxOnMaterialText: string;
  loanListLateFeeDesktopText: string;
  loanListLateFeeMobileText: string;
  loanListMaterialDaysText: string;
  loanListAdditionalMaterialsText: string;
  loanListPhysicalLoansEmptyListText: string;
  loanListPhysicalLoansTitleText: string;
  loanListRenewMultipleButtonExplanationText: string;
  loanListRenewMultipleButtonText: string;
  loanListStatusBadgeDangerText: string;
  loanListStatusBadgeWarningText: string;
  loanListTitleText: string;
  loanListToBeDeliveredDigitalMaterialText: string;
  groupModalDueDateMaterialText: string;
  loanListToBeDeliveredText: string;
  materialAndAuthorText: string;
  materialByAuthorText: string;
  materialDetailsCloseModalAriaLabelText: string;
  materialDetailsPhysicalDueDateLabelText: string;
  materialDetailsLinkToPageWithFeesText: string;
  materialDetailsLoanDateLabelText: string;
  materialDetailsMaterialNumberLabelText: string;
  materialDetailsModalAriaDescriptionText: string;
  materialDetailsOverdueText: string;
  materialDetailsRenewLoanButtonText: string;
  materialDetailsWarningLoanOverdueText: string;
  publizonAudioBookText: string;
  publizonEbookText: string;
  publizonPodcastText: string;
  groupModalAriaDescriptionText: string;
  groupModalButtonText: string;
  groupModalCheckboxText: string;
  groupModalCloseModalAriaLabelText: string;
  groupModalHeaderText: string;
  resultPagerStatusText: string;
  showMoreText: string;
  groupModalReturnLibraryText: string;
  materialDetailsGoToEreolenText: string;
}

export interface LoanListEntryWithPageSizeProps
  extends LoanListEntryTextProps,
    LoanListEntryConfigProps,
    LoanListEntryUrlProps {
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
export default withConfig(withUrls(withText(LoanListEntry)));

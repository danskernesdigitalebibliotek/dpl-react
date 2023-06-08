import React, { FC } from "react";
import LoanList from "./loan-list";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";
import { pageSizeGlobal } from "../../../core/utils/helpers/general";
import withIsPatronBlockedHoc from "../../../core/utils/withIsPatronBlockedHoc";
import { BlockedPatronEntryTextProps } from "../../../core/storybook/blockedArgs";
import { withConfig } from "../../../core/utils/config";
import GlobalUrlEntryPropsInterface from "../../../core/utils/types/global-url-props";

export interface LoanListEntryConfigProps {
  thresholdConfig: string;
}
export interface LoanListEntryUrlProps {
  loanListEreolenUrl: string;
  materialOverdueUrl: string;
  thresholdConfig: string;
}

interface LoanListEntryTextProps {
  groupModalDueDateLinkToPageWithFeesText: string;
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
  etAlText: string;
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
  loanListMaterialLateFeeText: string;
  loanListMaterialDayText: string;
  loanListStatusCircleAriaLabelText: string;
  materialDetailsDigitalDueDateLabelText: string;
  groupModalGoToMaterialText: string;
  groupModalGoToMaterialAriaLabelText: string;
}

export interface LoanListEntryWithPageSizeProps
  extends BlockedPatronEntryTextProps,
    LoanListEntryTextProps,
    LoanListEntryConfigProps,
    LoanListEntryUrlProps,
    GlobalUrlEntryPropsInterface {
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
export default withConfig(
  withUrls(withText(withIsPatronBlockedHoc(LoanListEntry)))
);

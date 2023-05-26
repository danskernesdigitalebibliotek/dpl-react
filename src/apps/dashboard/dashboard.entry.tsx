import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { pageSizeGlobal } from "../../core/utils/helpers/general";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import DashBoard from "./dashboard";

export interface DashBoardProps {
  // Url
  feesPageUrl: string;
  loansNotOverdueUrl: string;
  loansSoonOverdueUrl: string;
  loansOverdueUrl: string;
  physicalLoansUrl: string;
  feesUrl: string;
  reservationsUrl: string;
  ereolenMyPageUrl: string;
  // Page size
  pageSizeDesktop: number;
  pageSizeMobile: number;
  // Config
  reservationDetailAllowRemoveReadyReservationsConfig: string;
  blacklistedPickupBranchesConfig: string;
  branchesConfig: string;
  thresholdConfig: string;
  // Texts
  yourProfileText: string;
  deleteReservationModalAriaDescriptionText: string;
  deleteReservationModalCloseModalText: string;
  deleteReservationModalDeleteQuestionText: string;
  deleteReservationModalNotRegrettableText: string;
  deleteReservationModalDeleteButtonText: string;
  deleteReservationModalHeaderText: string;
  feesText: string;
  totalOwedText: string;
  payOwedText: string;
  totalAmountFeeText: string;
  physicalLoansText: string;
  loansOverdueText: string;
  groupModalHiddenLabelCheckboxOnMaterialText: string;
  loansSoonOverdueText: string;
  loansNotOverdueText: string;
  reservationsText: string;
  reservationsReadyForPickupText: string;
  queuedReservationsText: string;
  removeAllReservationsText: string;
  reservationsReadyText: string;
  reservationsStillInQueueForText: string;
  noPhysicalLoansText: string;
  noReservationsText: string;
  statusBadgeWarningText: string;
  readyForLoanText: string;
  readyForLoanCounterLabelText: string;
  materialDetailsCloseModalAriaLabelText: string;
  materialDetailsLinkToPageWithFeesText: string;
  materialDetailsModalAriaDescriptionText: string;
  materialDetailsOverdueText: string;
  materialDetailsMaterialNumberLabelText: string;
  materialDetailsLoanDateLabelText: string;
  materialDetailsPhysicalDueDateLabelText: string;
  groupModalDueDateLinkToPageWithFeesText: string;
  materialDetailsWarningLoanOverdueText: string;
  publizonAudioBookText: string;
  publizonEbookText: string;
  publizonPodcastText: string;
  groupModalDueDateHeaderText: string;
  groupModalReturnLibraryText: string;
  groupModalCheckboxText: string;
  groupModalAriaDescriptionText: string;
  groupModalButtonText: string;
  interestPeriodOneMonthConfigText: string;
  interestPeriodTwoMonthsConfigText: string;
  interestPeriodThreeMonthsConfigText: string;
  oneMonthText: string;
  twoMonthsText: string;
  reservationDetailsRemoveDigitalReservationText: string;
  threeMonthsText: string;
  sixMonthsText: string;
  oneYearText: string;
  interestPeriodSixMonthsConfigText: string;
  interestPeriodOneYearConfigText: string;
  reservationDetailsDateOfReservationTitleText: string;
  listDetailsNothingSelectedLabelText: string;
  reservationDetailsNoInterestAfterTitleText: string;
  reservationDetailsChangeText: string;
  reservationDetailsPickUpAtTitleText: string;
  reservationDetailsButtonRemoveText: string;
  dashboardNumberInLineText: string;
  groupModalRenewLoanDeniedMaxRenewalsReachedText: string;
  groupModalDueDateMaterialText: string;
  groupModalGoToMaterialText: string;
  reservationDetailsStatusTitleText: string;
  reservationDetailsBorrowBeforeText: string;
  resultPagerStatusText: string;
  reservationDetailsDigitalReservationGoToEreolenText: string;
  loanListMaterialDaysText: string;
  groupModalDueDateWarningLoanOverdueText: string;
  reservationDetailsReadyForLoanText: string;
  reservationDetailsPickupDeadlineTitleText: string;
  groupModalRenewLoanDeniedReservedText: string;
  groupModalRenewLoanDeniedInterLibraryLoanText: string;
  pickUpLatestText: string;
  physicalReservationsModalHeaderText: string;
  digitalReservationsModalHeaderText: string;
  materialAndAuthorText: string;
  materialByAuthorText: string;
}

const DashboardEntry: FC<DashBoardProps> = ({
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

  return <DashBoard pageSize={pageSize} />;
};

export default withConfig(withUrls(withText(DashboardEntry)));

import React, { FC } from "react";
import withIsPatronBlockedHoc from "../../core/utils/withIsPatronBlockedHoc";
import { withConfig } from "../../core/utils/config";
import { pageSizeGlobal } from "../../core/utils/helpers/general";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import DashBoard from "./dashboard";
import { BlockedPatronEntryTextProps } from "../../core/storybook/blockedArgs";
import { GroupModalProps } from "../../core/storybook/groupModalArgs";
import { GroupModalLoansProps } from "../../core/storybook/loanGroupModalArgs";
import { ReservationMaterialDetailsProps } from "../../core/storybook/reservationMaterialDetailsArgs";
import { MaterialDetailsModalProps } from "../../core/storybook/materialDetailsModalArgs";
import { GroupModalReservationsProps } from "../../core/storybook/reservationGroupModalArgs";
import { DeleteReservationModalArgs } from "../../core/storybook/deleteReservationModalArgs";
import { RenewalArgs } from "../../core/storybook/renewalArgs";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";

export interface DashBoardProps {
  // Url
  loansOverdueUrl: string;
  physicalLoansUrl: string;
  feesPageUrl: string;
  reservationsUrl: string;
  // Config
  blacklistedPickupBranchesConfig: string;
  blacklistedAvailabilityBranchesConfig: string;
  branchesConfig: string;
  expirationWarningDaysBeforeConfig: string;
  // Texts
  dashboardNumberInLineText: string;
  deleteReservationModalDeleteButtonText: string;
  deleteReservationModalDeleteProcessingText: string;
  deleteReservationModalErrorsStatusText: string;
  deleteReservationModalErrorsTitleText: string;
  deleteReservationModalSuccessStatusText: string;
  deleteReservationModalSuccessTitleText: string;
  etAlText: string;
  feesText: string;
  loanListMaterialDaysText: string;
  loansOverdueText: string;
  loansSoonOverdueText: string;
  materialAndAuthorText: string;
  materialByAuthorText: string;
  noPhysicalLoansText: string;
  noReservationsText: string;
  dashboardSeeMoreFeesText: string;
  dashboardSeeMoreFeesAriaLabelText: string;
  physicalLoansText: string;
  publizonAudioBookText: string;
  publizonEbookText: string;
  publizonPodcastText: string;
  queuedReservationsText: string;
  readyForLoanText: string;
  reservationsReadyText: string;
  reservationsText: string;
  resultPagerStatusText: string;
  statusBadgeWarningText: string;
  totalAmountFeeText: string;
  totalOwedText: string;
  yourProfileText: string;
  dashboardLoansLinkText: string;
  dashboardReservationsLinkText: string;
  reservationListLoanBeforeText: string;
}

const DashboardEntry: FC<
  DashBoardProps &
    BlockedPatronEntryTextProps &
    GroupModalProps &
    GroupModalLoansProps &
    DeleteReservationModalArgs &
    GroupModalReservationsProps &
    RenewalArgs &
    ReservationMaterialDetailsProps &
    MaterialDetailsModalProps &
    GlobalEntryTextProps
> = ({ pageSizeDesktop, pageSizeMobile }) => {
  const pageSize = pageSizeGlobal(
    {
      desktop: pageSizeDesktop,
      mobile: pageSizeMobile
    },
    "pageSizeLoanList"
  );

  return <DashBoard pageSize={pageSize} />;
};

export default withConfig(
  withUrls(withText(withIsPatronBlockedHoc(DashboardEntry)))
);

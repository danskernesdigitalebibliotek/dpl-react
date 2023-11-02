import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { pageSizeGlobal } from "../../core/utils/helpers/general";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import DashBoard from "./dashboard";
import { GroupModalProps } from "../../core/storybook/groupModalArgs";
import { GroupModalLoansProps } from "../../core/storybook/loanGroupModalArgs";
import { ReservationMaterialDetailsProps } from "../../core/storybook/reservationMaterialDetailsArgs";
import { MaterialDetailsModalProps } from "../../core/storybook/materialDetailsModalArgs";
import { GroupModalReservationsProps } from "../../core/storybook/reservationGroupModalArgs";
import { DeleteReservationModalArgs } from "../../core/storybook/deleteReservationModalArgs";
import { AcceptFeesModalEntryTextProps } from "../../core/storybook/acceptFeesModalArgs";
import { RenewalArgs } from "../../core/storybook/renewalArgs";

export interface DashBoardProps {
  // Url
  loansOverdueUrl: string;
  physicalLoansUrl: string;
  feesPageUrl: string;
  reservationsUrl: string;
  // Config
  blacklistedPickupBranchesConfig: string;
  branchesConfig: string;
  thresholdConfig: string;
  // Texts
  yourProfileText: string;
  feesText: string;
  totalOwedText: string;
  payOwedText: string;
  totalAmountFeeText: string;
  physicalLoansText: string;
  loansOverdueText: string;
  loansSoonOverdueText: string;
  loansNotOverdueText: string;
  reservationsText: string;
  queuedReservationsText: string;
  reservationsReadyText: string;
  reservationsStillInQueueForText: string;
  noPhysicalLoansText: string;
  noReservationsText: string;
  statusBadgeWarningText: string;
  readyForLoanText: string;
  publizonAudioBookText: string;
  publizonEbookText: string;
  publizonPodcastText: string;
  dashboardNumberInLineText: string;
  resultPagerStatusText: string;
  reservationDetailsOthersInQueueText: string;
  loanListMaterialDaysText: string;
  etAlText: string;
  materialByAuthorText: string;
  materialAndAuthorText: string;
}

const DashboardEntry: FC<
  DashBoardProps &
    GroupModalProps &
    GroupModalLoansProps &
    DeleteReservationModalArgs &
    AcceptFeesModalEntryTextProps &
    GroupModalReservationsProps &
    RenewalArgs &
    ReservationMaterialDetailsProps &
    MaterialDetailsModalProps
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

export default withConfig(withUrls(withText(DashboardEntry)));

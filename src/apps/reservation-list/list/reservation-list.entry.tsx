import React, { FC } from "react";
import ReservationList from "./reservation-list";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";
import { withConfig } from "../../../core/utils/config";

export interface ReservationListProps {
  headerText: string;
  physicalLoansTitleText: string;
  readyText: string;
  materialByAuthorText: string;
  materialAndAuthorText: string;
  youAreNumberInLineText: string;
  expiresSoonText: string;
  inLineText: string;
  blacklistedPickupBranchesConfig: string;
  reservationPickUpLatestText: string;
  publizonEbookText: string;
  publizonAudioBookText: string;
  publizonPodcastText: string;
  loanBeforeText: string;
  daysText: string;
  canBeLoanedInText: string;
  reservationDetailsButtonText: string;
  reservationDetailsOthersInQueueText: string;
  reservationDetailsNumberInQueueLabelText: string;
  reservationDetailsNumberInQueueTitelText: string;
  reservationDetailsPickUpAtTitelText: string;
  reservationDetailsNoInterestAfterTitelText: string;
  reservationDetailsPickupDeadlineTitleText: string;
  reservationDetailsGoToEreolenText: string;
  reservationDetailsExpiresLabelText: string;
  oneMonthText: string;
  twoMonthsText: string;
  threeMonthsText: string;
  sixMonthsText: string;
  oneYearText: string;
  listDetailsNothingSelectedLabelText: string;
  branchesConfig: string;
  reservationDetailsPickupDeadlineTitelText: string;
  reservationDetailsDateOfReservationTitelText: string;
  reservationDetailsReadyForLoanText: string;
  reservationDetailsRemoveReservationText: string;
}

const ReservationListEntry: FC<ReservationListProps> = () => (
  <ReservationList />
);

export default withConfig(withUrls(withText(ReservationListEntry)));

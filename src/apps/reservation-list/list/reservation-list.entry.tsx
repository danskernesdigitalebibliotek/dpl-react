import React, { FC } from "react";
import ReservationList from "./reservation-list";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";
import { withConfig } from "../../../core/utils/config";
import { pageSizeGlobal } from "../../../core/utils/helpers/general";

export interface ReservationListProps {
  ereolenMyPageUrl: string;
  reservationDetailsBorrowBeforeText: string;
  reservationListHeaderText: string;
  physicalLoansTitleText: string;
  reservationListReadyText: string;
  materialByAuthorText: string;
  blacklistedSearchBranchesConfig: string;
  reservationDetailsExpiresText: string;
  pauseReservationInfoUrl: string;
  materialAndAuthorText: string;
  pauseReservationStartDateConfig: string;
  reservationListNumberInQueueText: string;
  reservationListFirstInQueueText: string;
  expiresSoonText: string;
  reservationListInQueueText: string;
  blacklistedPickupBranchesConfig: string;
  reservationPickUpLatestText: string;
  publizonEbookText: string;
  publizonAudioBookText: string;
  publizonPodcastText: string;
  reservationListLoanBeforeText: string;
  reservationListDaysText: string;
  reservationListDayText: string;
  reservationListAvailableInText: string;
  reservationDetailsButtonRemoveText: string;
  reservationDetailsChangeText: string;
  reservationDetailsExpiresTitleText: string;
  reservationDetailsOthersInQueueText: string;
  reservationDetailsNumberInQueueLabelText: string;
  reservationDetailsStatusTitleText: string;
  reservationDetailsPickUpAtTitleText: string;
  reservationDetailsNoInterestAfterTitleText: string;
  reservationDetailsPickupDeadlineTitleText: string;
  reservationDetailsDigitalReservationGoToEreolenText: string;
  oneMonthText: string;
  twoMonthsText: string;
  threeMonthsText: string;
  sixMonthsText: string;
  oneYearText: string;
  listDetailsNothingSelectedLabelText: string;
  branchesConfig: string;
  reservationDetailsDateOfReservationTitleText: string;
  reservationDetailsReadyForLoanText: string;
  reservationDetailsRemoveDigitalReservationText: string;
  deleteReservationModalHeaderText: string;
  deleteReservationModalDeleteQuestionText: string;
  deleteReservationModalNotRegrettableText: string;
  deleteReservationModalDeleteButtonText: string;
  deleteReservationModalCloseModalText: string;
  deleteReservationModalAriaDescriptionText: string;
  reservationListPauseReservationText: string;
  reservationListOnHoldAriaText: string;
  reservationListPauseReservationAriaModalText: string;
  pauseReservationModalAriaDescriptionText: string;
  pauseReservationModalHeaderText: string;
  pauseReservationModalBodyText: string;
  pauseReservationModalCloseModalText: string;
  dateInputsStartDateLabelText: string;
  dateInputsEndDateLabelText: string;
  pauseReservationModalBelowInputsTextText: string;
  pauseReservationModalLinkText: string;
  pauseReservationModalSaveButtonLabelText: string;
  reservationListReadyForPickupTitleText: string;
  reservationListReadyForPickupEmptyText: string;
  reservationListPhysicalReservationsEmptyText: string;
  reservationListPhysicalReservationsHeaderText: string;
  reservationListDigitalReservationsEmptyText: string;
  reservationListDigitalReservationsHeaderText: string;
  reservationListAllEmptyText: string;
  pageSizeDesktop: number;
  pageSizeMobile: number;
}

const ReservationListEntry: FC<ReservationListProps> = ({
  pageSizeDesktop,
  pageSizeMobile
}) => {
  const pageSize = pageSizeGlobal(
    {
      desktop: pageSizeDesktop,
      mobile: pageSizeMobile
    },
    "pageSizeReservationList"
  );
  return <ReservationList pageSize={pageSize} />;
};

export default withConfig(withUrls(withText(ReservationListEntry)));

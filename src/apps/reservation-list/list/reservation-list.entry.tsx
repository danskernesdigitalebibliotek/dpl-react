import React, { FC } from "react";
import ReservationList from "./reservation-list";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";
import { withConfig } from "../../../core/utils/config";
import { pageSizeGlobal } from "../../../core/utils/helpers/general";
import withIsPatronBlockedHoc from "../../../core/utils/withIsPatronBlockedHoc";
import { BlockedPatronEntryTextProps } from "../../../core/storybook/blockedArgs";
import GlobalUrlEntryPropsInterface from "../../../core/utils/types/global-url-props";

export interface ReservationListUrlProps {
  thresholdConfig: string;
  ereolenMyPageUrl: string;
  pauseReservationInfoUrl: string;
}

export interface ReservationListConfigProps {
  thresholdConfig: string;
  pauseReservationStartDateConfig: string;
  blacklistedPickupBranchesConfig: string;
  branchesConfig: string;
}

export interface ReservationListTextProps {
  reservationDetailsBorrowBeforeText: string;
  reservationListHeaderText: string;
  physicalLoansTitleText: string;
  reservationListReadyText: string;
  materialByAuthorText: string;
  reservationDetailsExpiresText: string;
  etAlText: string;
  reservationListNumberInQueueText: string;
  reservationListFirstInQueueText: string;
  expiresSoonText: string;
  reservationListInQueueText: string;
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
  interestPeriodsConfig: string;
  reservationDetailsOthersInQueueText: string;
  reservationDetailsNumberInQueueLabelText: string;
  reservationDetailsStatusTitleText: string;
  reservationDetailsPickUpAtTitleText: string;
  reservationDetailsNoInterestAfterTitleText: string;
  reservationDetailsPickupDeadlineTitleText: string;
  reservationDetailsDigitalReservationGoToEreolenText: string;
  listDetailsNothingSelectedLabelText: string;
  reservationDetailsDateOfReservationTitleText: string;
  reservationDetailsReadyForLoanText: string;
  reservationDetailsRemoveDigitalReservationText: string;
  reservationDetailAllowRemoveReadyReservationsConfig: boolean;
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
}

export interface ReservationListEntryWithPageSizeProps
  extends ReservationListTextProps,
    BlockedPatronEntryTextProps,
    ReservationListConfigProps,
    ReservationListUrlProps,
    GlobalUrlEntryPropsInterface {
  pageSizeDesktop?: number;
  pageSizeMobile?: number;
}

const ReservationListEntry: FC<ReservationListEntryWithPageSizeProps> = ({
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

export default withConfig(
  withUrls(withText(withIsPatronBlockedHoc(ReservationListEntry)))
);

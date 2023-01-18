import React, { FC } from "react";
import ReservationList from "./reservation-list";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";
import { withConfig } from "../../../core/utils/config";
import { pageSizeGlobal } from "../../../core/utils/helpers/general";
import isPatronBlockedHoc from "../../../components/blocked-patron/isPatronBlockedHoc";
import { BlockedPatronEntryTextProps } from "../../../core/storybook/blockedArgs";

export interface ReservationListUrlProps {
  fbsBaseUrl: string;
  dplCmsBaseUrl: string;
  coverBaseUrl: string;
  materialBaseUrl: string;
  fbiBaseUrl: string;
  thresholdConfig: string;
  publizonBaseUrl: string;
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
  materialAndAuthorText: string;
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
}

export interface ReservationListEntryWithPageSizeProps
  extends ReservationListTextProps,
    ReservationListConfigProps,
    ReservationListUrlProps {
  pageSizeDesktop?: number;
  pageSizeMobile?: number;
}

const ReservationListEntry: FC<
  ReservationListEntryWithPageSizeProps & BlockedPatronEntryTextProps
> = ({ pageSizeDesktop, pageSizeMobile }) => {
  const pageSize = pageSizeGlobal(
    {
      desktop: pageSizeDesktop,
      mobile: pageSizeMobile
    },
    "pageSizeReservationList"
  );
  return <ReservationList pageSize={pageSize} />;
};

export default isPatronBlockedHoc(
  withConfig(withUrls(withText(ReservationListEntry)))
);

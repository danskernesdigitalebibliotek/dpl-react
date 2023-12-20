import React, { FC } from "react";
import ReservationList from "./reservation-list";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";
import { withConfig } from "../../../core/utils/config";
import { pageSizeGlobal } from "../../../core/utils/helpers/general";
import withIsPatronBlockedHoc from "../../../core/utils/withIsPatronBlockedHoc";
import { BlockedPatronEntryTextProps } from "../../../core/storybook/blockedArgs";
import GlobalUrlEntryPropsInterface from "../../../core/utils/types/global-url-props";
import { ReservationMaterialDetailsProps } from "../../../core/storybook/reservationMaterialDetailsArgs";
import { DeleteReservationModalArgs } from "../../../core/storybook/deleteReservationModalArgs";
import { GlobalEntryTextProps } from "../../../core/storybook/globalTextArgs";

export interface ReservationListUrlProps {
  expirationWarningDaysBeforeConfig: string;
  ereolenMyPageUrl: string;
  pauseReservationInfoUrl: string;
}

export interface ReservationListConfigProps {
  expirationWarningDaysBeforeConfig: string;
  pauseReservationStartDateConfig: string;
  blacklistedPickupBranchesConfig: string;
  branchesConfig: string;
}

export interface ReservationListTextProps {
  reservationListHeaderText: string;
  physicalLoansTitleText: string;
  reservationListReadyText: string;
  materialByAuthorText: string;
  materialAndAuthorText: string;
  reservationDetailsExpiresText: string;
  etAlText: string;
  reservationListNumberInQueueText: string;
  reservationListFirstInQueueText: string;
  reservationListDigitalPickupText: string;
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
  reservationDetailsExpiresTitleText: string;
  reservationDetailsOthersInQueueText: string;
  reservationListPauseReservationButtonText: string;
  reservationListPauseReservationText: string;
  reservationListPauseReservationOnHoldText: string;
  reservationListOnHoldAriaText: string;
  reservationListPauseReservationAriaModalText: string;
  pauseReservationModalHeaderText: string;
  pauseReservationModalBodyText: string;
  pauseReservationModalCloseModalText: string;
  dateInputsStartDateLabelText: string;
  dateInputsEndDateLabelText: string;
  pauseReservationModalLinkText: string;
  pauseReservationModalSaveButtonLabelText: string;
  pauseReservationModalCancelButtonLabelText: string;
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
    DeleteReservationModalArgs,
    ReservationMaterialDetailsProps,
    GlobalEntryTextProps,
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

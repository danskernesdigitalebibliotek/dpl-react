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
  etAlText: string;
  expiresSoonText: string;
  materialAndAuthorText: string;
  materialByAuthorText: string;
  pauseReservationModalBodyText: string;
  pauseReservationModalCancelButtonLabelText: string;
  pauseReservationModalCloseModalText: string;
  pauseReservationModalDateRangeLabelText: string;
  pauseReservationModalDateRangePlaceholderText: string;
  pauseReservationModalHeaderText: string;
  pauseReservationModalLinkText: string;
  pauseReservationModalSaveButtonLabelText: string;
  physicalLoansTitleText: string;
  publizonAudioBookText: string;
  publizonEbookText: string;
  publizonPodcastText: string;
  reservationDetailsExpiresText: string;
  reservationDetailsExpiresTitleText: string;
  reservationDetailsOthersInQueueText: string;
  reservationListAllEmptyText: string;
  reservationQueueText: string;
  reservationListAvailableInText: string;
  reservationListDaysText: string;
  reservationListDayText: string;
  reservationListDigitalPickupText: string;
  reservationListDigitalReservationsEmptyText: string;
  reservationListDigitalReservationsHeaderText: string;
  reservationListFirstInQueueText: string;
  reservationListHeaderText: string;
  reservationListInQueueText: string;
  reservationListLoanBeforeText: string;
  reservationListNumberInQueueText: string;
  reservationListOnHoldAriaText: string;
  reservationListPauseReservationAriaModalText: string;
  reservationListPauseReservationButtonText: string;
  reservationListPauseReservationOnHoldText: string;
  reservationListPauseReservationText: string;
  reservationListPhysicalReservationsEmptyText: string;
  reservationListPhysicalReservationsHeaderText: string;
  reservationListReadyForPickupEmptyText: string;
  reservationListReadyForPickupTitleText: string;
  reservationListReadyText: string;
  reservationPickUpLatestText: string;
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

import React, { FC } from "react";
import ReservationList from "./reservation-list";
import { withText } from "../../../core/utils/text";

export interface ReservationListProps {
  reservationListHeaderText: string;
  reservationListPhysicalLoansTitleText: string;
  reservationListReadyText: string;
  materialByAuthorText: string;
  materialAndAuthorText: string;
  reservationListYouAreNumberInLineText: string;
  reservationListExpiresSoonText: string;
  reservationListInLineText: string;
  reservationPickUpLatestText: string;
  publizonEbookText: string;
  publizonAudioBookText: string;
  publizonPodcastText: string;
}

const ReservationListEntry: FC<ReservationListProps> = () => (
  <ReservationList />
);

export default withText(ReservationListEntry);

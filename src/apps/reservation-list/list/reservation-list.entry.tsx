import React, { FC } from "react";
import ReservationList from "./reservation-list";
import { withText } from "../../../core/utils/text";

export interface ReservationListProps {
  headerText: string;
  physicalLoansTitleText: string;
  readyText: string;
  materialByAuthorText: string;
  materialAndAuthorText: string;
  youAreNumberInLineText: string;
  expiresSoonText: string;
  inLineText: string;
  reservationPickUpLatestText: string;
  publizonEbookText: string;
  publizonAudioBookText: string;
  publizonPodcastText: string;
  loanBeforeText: string;
}

const ReservationListEntry: FC<ReservationListProps> = () => (
  <ReservationList />
);

export default withText(ReservationListEntry);

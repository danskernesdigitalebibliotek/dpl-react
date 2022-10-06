import React, { FC } from "react";
import ReservationList from "./reservation-list";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";

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
  daysText: string;
  canBeLoanedInText: string;
}

const ReservationListEntry: FC<ReservationListProps> = () => (
  <ReservationList />
);

export default withUrls(withText(ReservationListEntry));

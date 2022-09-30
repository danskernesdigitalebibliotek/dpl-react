import React, { FC } from "react";
import ReservationList from "./reservation-list";
import { withText } from "../../../core/utils/text";

export interface ReservationListProps {
  reservationListHeaderText: string;
  reservationListPhysicalLoansTitleText: string;
}

const ReservationListEntry: FC<ReservationListProps> = () => (
  <ReservationList />
);

export default withText(ReservationListEntry);

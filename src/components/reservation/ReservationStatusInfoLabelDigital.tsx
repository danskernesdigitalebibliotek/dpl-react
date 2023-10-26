import * as React from "react";
import { FC } from "react";
import ReservationStatusInfoLabel from "./ReservationStatusInfoLabel";

export interface ReservationStatusInfoLabelDigitalProps {
  date: string;
}

const ReservationStatusInfoLabelDigital: FC<
  ReservationStatusInfoLabelDigitalProps
> = ({ date }) => {
  return <ReservationStatusInfoLabel date={date} isDigital />;
};

export default ReservationStatusInfoLabelDigital;

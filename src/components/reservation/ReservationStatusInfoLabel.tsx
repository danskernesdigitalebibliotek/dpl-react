import * as React from "react";
import { FC } from "react";
import InfoLabel from "../atoms/labels/InfoLabel";
import { useText } from "../../core/utils/text";
import { getReservationStatusInfoLabel } from "../../apps/reservation-list/utils/helpers";

export interface ReservationStatusInfoLabelProps {
  pickupBranch?: string | null;
  date: string;
  isDigital: boolean;
}

const ReservationStatusInfoLabel: FC<ReservationStatusInfoLabelProps> = ({
  pickupBranch,
  date,
  isDigital
}) => {
  const t = useText();
  return (
    <InfoLabel dataCy="reservation-status-info-label">
      {getReservationStatusInfoLabel({
        pickupBranch,
        date,
        t,
        isDigital
      })}
    </InfoLabel>
  );
};

export default ReservationStatusInfoLabel;

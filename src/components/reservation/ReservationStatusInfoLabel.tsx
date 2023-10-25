import * as React from "react";
import { FC } from "react";
import InfoLabel from "../atoms/labels/InfoLabel";
import { useText } from "../../core/utils/text";
import { getReservationStatusInfoLabel } from "../../apps/reservation-list/utils/helpers";

export interface ReservationStatusInfoLabelProps {
  pickupBranch?: string;
  expiryDate: string;
  isDigital: boolean;
}

const ReservationStatusInfoLabel: FC<ReservationStatusInfoLabelProps> = ({
  pickupBranch,
  expiryDate,
  isDigital
}) => {
  const t = useText();
  return (
    <InfoLabel>
      {getReservationStatusInfoLabel({
        pickupBranch,
        pickupDeadline: expiryDate,
        t,
        isDigital
      })}
    </InfoLabel>
  );
};

export default ReservationStatusInfoLabel;

import React, { FC, ReactNode } from "react";
import { useText } from "../../../../core/utils/text";
import StatusCircleIcon from "../utils/status-circle-icon";

interface ListReservationStatusProps {
  color: string;
  percent: number;
  expiresSoon: boolean;
  label: string;
  children: ReactNode;
}

const ListReservationStatus: FC<ListReservationStatusProps> = ({
  color,
  percent,
  expiresSoon,
  label,
  children
}) => {
  const t = useText();

  return (
    <div className="list-reservation__status">
      <StatusCircleIcon color={color} percent={percent}>
        {children}
      </StatusCircleIcon>
      <div>
        <div className="list-reservation__deadline">
          {expiresSoon && (
            <div className="status-label status-label--warning">
              {t("reservationListExpiresSoonText")}
            </div>
          )}
          <p className="text-small-caption">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default ListReservationStatus;

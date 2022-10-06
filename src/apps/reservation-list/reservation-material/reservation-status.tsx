import React, { FC, ReactNode } from "react";
import StatusCircleIcon from "../../loan-list/materials/utils/status-circle-icon";

interface ReservationStatusProps {
  color: string;
  percent: number;
  expiresSoonLabel?: string;
  infoLabel?: string;
  label: string;
  children: ReactNode;
}

const ReservationStatus: FC<ReservationStatusProps> = ({
  color,
  percent,
  expiresSoonLabel,
  infoLabel,
  label,
  children
}) => {
  return (
    <div className="list-reservation__status">
      <StatusCircleIcon color={color} percent={percent}>
        {children}
      </StatusCircleIcon>
      <div>
        <div className="list-reservation__deadline">
          {expiresSoonLabel && (
            <div className="status-label status-label--warning">
              {expiresSoonLabel}
            </div>
          )}
          {infoLabel && (
            <div className="status-label status-label--info">{infoLabel}</div>
          )}
          <p className="text-small-caption">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationStatus;

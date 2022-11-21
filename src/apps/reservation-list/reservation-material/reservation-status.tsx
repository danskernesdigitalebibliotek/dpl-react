import React, { FC, ReactNode } from "react";
import { createJSXkey } from "../../../core/utils/helpers/general";
import StatusCircleIcon from "../../loan-list/materials/utils/status-circle-icon";

interface ReservationStatusProps {
  color: string;
  percent: number;
  expiresSoonLabel?: string;
  infoLabel?: string;
  label: string | string[];
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
      <div
        className="list-reservation__counter"
        // todo create meaningful aria-explanation
      >
        <StatusCircleIcon color={color} percent={percent}>
          {children}
        </StatusCircleIcon>
      </div>
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
          {typeof label === "string" && (
            <p className="text-small-caption">{label}</p>
          )}
          {typeof label !== "string" &&
            label.map((localLabel, i) => {
              return (
                <p
                  key={createJSXkey([localLabel, i])}
                  className="text-small-caption"
                >
                  {localLabel}
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ReservationStatus;

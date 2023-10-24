import React, { FC, ReactNode } from "react";
import ArrowButton from "../../../components/Buttons/ArrowButton";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import StatusCircleIcon from "../../loan-list/materials/utils/status-circle-icon";

interface ReservationStatusProps {
  reservationInfo?: ReservationType;
  openReservationDetailsModal?: (reservation: ReservationType) => void;
  color?: string;
  empty?: boolean;
  percent: number;
  infoLabel?: string;
  label: string | string[];
  children?: ReactNode;
  showArrow?: boolean;
  className?: string;
}

const ReservationStatus: FC<ReservationStatusProps> = ({
  reservationInfo,
  openReservationDetailsModal,
  color,
  percent,
  empty = false,
  infoLabel,
  label,
  children,
  showArrow = true,
  className
}) => {
  const notificationClickEventHandler = () => {
    if (openReservationDetailsModal && reservationInfo) {
      openReservationDetailsModal(reservationInfo);
    }
  };

  return (
    <div className={className ?? "list-reservation__status"}>
      <div className="list-reservation__counter color-secondary-gray">
        {!empty && (
          <StatusCircleIcon color={color} percent={percent}>
            {children}
          </StatusCircleIcon>
        )}
      </div>
      <div>
        <div className="list-reservation__deadline">
          {infoLabel && (
            <div className="status-label status-label--info">{infoLabel}</div>
          )}
          {typeof label === "string" && (
            <p className="text-small-caption">{label}</p>
          )}
          {typeof label !== "string" &&
            label.map((localLabel) => {
              return <p className="text-small-caption">{localLabel}</p>;
            })}
        </div>
      </div>
      {showArrow && (
        <ArrowButton
          arrowLabelledBy={`${
            reservationInfo?.identifier || reservationInfo?.faust
          }-title`}
          cursorPointer
          clickEventHandler={notificationClickEventHandler}
        />
      )}
    </div>
  );
};

export default ReservationStatus;

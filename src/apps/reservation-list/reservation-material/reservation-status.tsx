import React, { FC, ReactNode } from "react";
import ArrowButton from "../../../components/Buttons/ArrowButton";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import StatusCircleIcon from "../../loan-list/materials/utils/status-circle-icon";
import InfoLabel from "../../../components/atoms/labels/InfoLabel";

interface ReservationStatusProps {
  reservationInfo?: ReservationType;
  openReservationDetailsModal?: (reservation: ReservationType) => void;
  color?: string;
  empty?: boolean;
  percent: number;
  info?: string;
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
  info,
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
          {info && <InfoLabel>{info}</InfoLabel>}
          {typeof label === "string" && reservationInfo?.faust == null && (
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

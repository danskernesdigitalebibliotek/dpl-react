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

  const shouldRenderReservationDeadline =
    info || (Array.isArray(label) ? label.length > 0 : !!label);

  return (
    <div className={className ?? "list-reservation__status"}>
      <div className="list-reservation__counter color-secondary-gray">
        {!empty && (
          <StatusCircleIcon color={color} percent={percent}>
            {children}
          </StatusCircleIcon>
        )}
      </div>

      {shouldRenderReservationDeadline && (
        <div>
          <div className="list-reservation__deadline">
            {info && <InfoLabel>{info}</InfoLabel>}
            {typeof label === "string" && (
              <p className="text-small-caption">{label}</p>
            )}
            {Array.isArray(label) &&
              label.map((localLabel, index) => (
                <p key={index} className="text-small-caption">
                  {localLabel}
                </p>
              ))}
          </div>
        </div>
      )}

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

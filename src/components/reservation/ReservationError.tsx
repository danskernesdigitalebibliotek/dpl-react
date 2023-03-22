import FocusTrap from "focus-trap-react";
import React from "react";
import { ReservationResponseV2 } from "../../core/fbs/model";
import { useText } from "../../core/utils/text";
import { Button } from "../Buttons/Button";

type ReservationErrorProps = {
  reservationResult: string;
  setReservationResponse: (
    reservationResponse: ReservationResponseV2 | null
  ) => void;
};

const ReservationError: React.FC<ReservationErrorProps> = ({
  reservationResult,
  setReservationResponse
}) => {
  const t = useText();

  const handleErrorText: {
    [key: string]: {
      title: string;
      description: string;
      buttonText: string;
    };
  } = {
    already_reserved: {
      title: t("alreadyReservedText"),
      description: "",
      buttonText: t("closeText")
    },
    default: {
      title: t("reservationErrorsTitleText"),
      description: t("reservationErrorsDescriptionText"),
      buttonText: t("tryAginButtonText")
    }
  } as const;

  const reservationErrorInfo =
    handleErrorText[reservationResult] || handleErrorText.default;

  return (
    <FocusTrap>
      <section className="reservation-modal reservation-modal--confirm">
        <h2 className="text-header-h3 pb-48">{reservationErrorInfo.title}</h2>
        {reservationErrorInfo.description && (
          <p className="text-body-medium-regular pb-48">
            {reservationErrorInfo.description}
          </p>
        )}
        <Button
          classNames="reservation-modal__confirm-button"
          label={reservationErrorInfo.buttonText}
          buttonType="none"
          disabled={false}
          collapsible={false}
          size="small"
          variant="filled"
          onClick={() => setReservationResponse(null)}
        />
      </section>
    </FocusTrap>
  );
};

export default ReservationError;

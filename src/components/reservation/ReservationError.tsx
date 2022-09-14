import React from "react";
import { ReservationResponseV2 } from "../../core/fbs/model";
import { useText } from "../../core/utils/text";
import { Button } from "../Buttons/Button";

type ReservationErrorProps = {
  errorDescription?: string;
  buttonText?: string;
  setReservationResponse: (
    reservationResponse: ReservationResponseV2 | null
  ) => void;
};

const ReservationError: React.FC<ReservationErrorProps> = ({
  errorDescription,
  buttonText,
  setReservationResponse
}) => {
  const t = useText();
  return (
    <section className="reservation-modal reservation-modal--confirm">
      {errorDescription ? (
        <h2 className="text-header-h3 pb-48">{errorDescription}</h2>
      ) : (
        <>
          <h2 className="text-header-h3 pb-48">
            {t("reservationErrorsTitleText")}
          </h2>
          <p className="text-body-medium-regular pb-48">
            {t("reservationErrorsDescriptionText")}
          </p>
        </>
      )}
      <Button
        classNames="reservation-modal__confirm-button"
        label={buttonText ?? t("tryAginButtonText")}
        buttonType="none"
        disabled={false}
        collapsible={false}
        size="small"
        variant="filled"
        onClick={() => setReservationResponse(null)}
      />
    </section>
  );
};

export default ReservationError;

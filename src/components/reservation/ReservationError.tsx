import React from "react";
import { useText } from "../../core/utils/text";
import { Button } from "../Buttons/Button";

type ReservationErrorProps = {
  setReservationDidSuccess: (value: boolean | null) => void;
};

const ReservationError: React.FC<ReservationErrorProps> = ({
  setReservationDidSuccess
}) => {
  const t = useText();
  return (
    <section className="reservation-modal reservation-modal--confirm">
      <h2 className="text-header-h3 pb-48">
        {t("reservationErrorsTitleText")}
      </h2>
      <p className="text-body-medium-regular pb-48">
        {t("reservationErrorsDescriptionText")}
      </p>
      <Button
        classNames="reservation-modal__confirm-button"
        label={t("tryAginButtonText")}
        buttonType="none"
        disabled={false}
        collapsible={false}
        size="small"
        variant="filled"
        onClick={() => setReservationDidSuccess(null)}
      />
    </section>
  );
};

export default ReservationError;

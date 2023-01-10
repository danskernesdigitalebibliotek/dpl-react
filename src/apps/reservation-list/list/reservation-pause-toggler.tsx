import React, { useState, FC, useEffect } from "react";
import ReservationsIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Reservations.svg";
import { getModalIds } from "../../../core/utils/helpers/general";
import { useModalButtonHandler } from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { PatronV5 } from "../../../core/fbs/model";

interface ReservationPauseTogglerProps {
  user: PatronV5;
}

const ReservationPauseToggler: FC<ReservationPauseTogglerProps> = ({
  user
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const { pauseReservation } = getModalIds();
  const [onHoldDates, setOnHoldDates] = useState<string>();

  const openPauseReservationModal = () => {
    open(pauseReservation as string);
  };

  useEffect(() => {
    if (user && user.onHold) {
      setOnHoldDates(`${user.onHold.from} - ${user.onHold.to}`);
    }
  }, [user]);

  return (
    <div className="dpl-pause-reservation-component m-32">
      <div className="dpl-pause-reservation-component__pagefold" />
      <div className="dpl-pause-reservation-component__flex">
        <div className="dpl-pause-reservation-component__flex__reservation-icon">
          <img src={ReservationsIcon} alt="" />
        </div>
        <div className="dpl-pause-reservation-component__flex__text">
          {t("reservationListPauseReservationText")}
        </div>
        {onHoldDates && (
          <span
            aria-label={t("reservationListOnHoldAriaText")}
            className="dpl-pause-reservation-component__flex__badge"
          >
            {onHoldDates}
          </span>
        )}
        <div className="dpl-pause-reservation-component__flex__button">
          <button
            aria-label={t("reservationListPauseReservationAriaModalText")}
            type="button"
            onClick={openPauseReservationModal}
            className={`dpl-toggle-button dpl-toggle-button--${
              !onHoldDates ? "in" : ""
            }active`}
          />
        </div>
      </div>
    </div>
  );
};

export default ReservationPauseToggler;

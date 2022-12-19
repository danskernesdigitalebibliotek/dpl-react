import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../core/modal.slice";
import { useText } from "../../core/utils/text";
import { Button } from "../Buttons/Button";
import StockAndReservationInfo from "../material/StockAndReservationInfo";

type ReservationSuccesProps = {
  title: string;
  preferredPickupBranch: string;
  modalId: string;
  numberInQueue?: number;
  reservationCount: number;
  stockCount: number;
};

const ReservationSucces: React.FC<ReservationSuccesProps> = ({
  modalId,
  title,
  preferredPickupBranch,
  numberInQueue,
  reservationCount,
  stockCount
}) => {
  const dispatch = useDispatch();
  const t = useText();
  return (
    <section className="reservation-modal reservation-modal--confirm">
      <h2
        data-cy="reservation-success-title-text"
        className="text-header-h3 pb-48"
      >
        {t("reservationSuccesTitleText")}
      </h2>
      <p
        data-cy="reservation-success-is-reserved-for-you-text"
        className="text-body-medium-regular pb-24"
      >
        {title} {t("reservationSuccesIsReservedForYouText")}
      </p>
      <p
        data-cy="number-in-queue-text"
        className="text-body-medium-regular pb-24"
      >
        <StockAndReservationInfo
          stockCount={stockCount}
          reservationCount={reservationCount}
          numberInQueue={numberInQueue}
        />
      </p>
      <p
        data-cy="reservation-success-preferred-pickup-branch-text"
        className="text-body-medium-regular pb-48"
      >
        {t("reservationSuccessPreferredPickupBranchText", {
          placeholders: { "@branch": preferredPickupBranch }
        })}
        .
      </p>
      <Button
        dataCy="reservation-success-close-button"
        classNames="reservation-modal__confirm-button"
        label={t("okButtonText")}
        buttonType="none"
        disabled={false}
        collapsible={false}
        size="small"
        variant="filled"
        onClick={() => {
          dispatch(closeModal({ modalId }));
        }}
      />
    </section>
  );
};

export default ReservationSucces;

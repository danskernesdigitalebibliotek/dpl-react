import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../core/modal.slice";
import { Button } from "../Buttons/Button";

type ReservationSuccesProps = {
  title: string;
  preferredPickupBranch: string;
  modalId: string;
};

const ReservationSucces: React.FC<ReservationSuccesProps> = ({
  modalId,
  title,
  preferredPickupBranch
}) => {
  const dispatch = useDispatch();
  return (
    <section className="reservation-modal reservation-modal--confirm">
      <h2 className="text-header-h3 pb-48">
        Materialet er hjemme og er nu reserveret til dig!
      </h2>
      <p className="text-body-medium-regular pb-24">
        {title} er reserveret til dig
      </p>
      <p className="text-body-medium-regular pb-48">
        Materialet er hjemme, og du får beksed så snart der ligger klar til dig
        - afhentning på {preferredPickupBranch}.
      </p>
      <Button
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

import React, { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { MaterialProps } from "../../../loan-list/materials/utils/material-fetch-hoc";
import { ReservationType } from "../../../../core/utils/types/reservation-type";
import LinkButton from "../../../../components/Buttons/LinkButton";
import { Button } from "../../../../components/Buttons/Button";

export interface ReservationDetailsRedirectProps {
  reservation: ReservationType;
  openReservationDeleteModal: (deleteReservation: ReservationType) => void;
  className?: string;
  linkClassNames?: string;
  externalLink: URL;
}

const ReservationDetailsRedirect: FC<
  ReservationDetailsRedirectProps & MaterialProps
> = ({
  reservation,
  openReservationDeleteModal,
  className,
  linkClassNames,
  externalLink
}) => {
  const t = useText();

  return (
    <div className={`modal-details__buttons ${className}`}>
      <Button
        buttonType="none"
        label={t("reservationDetailsRemoveDigitalReservationText")}
        size="small"
        variant="outline"
        collapsible={false}
        disabled={false}
        onClick={() => openReservationDeleteModal(reservation)}
        classNames={linkClassNames}
        dataCy="remove-digital-reservation-button"
      />
      <LinkButton
        dataCy="go-to-ereolen-button"
        size="small"
        url={externalLink}
        variant="filled"
        id="go-to-ereolen-button"
        iconClassNames="btn-icon invert"
        buttonType="external-link"
      >
        {t("reservationDetailsDigitalReservationGoToEreolenText")}
      </LinkButton>
    </div>
  );
};

export default ReservationDetailsRedirect;

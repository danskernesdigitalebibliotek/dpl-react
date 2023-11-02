import React, { FC } from "react";
import ExternalLinkIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/buttons/icon-btn-external-link.svg";
import { useText } from "../../../../core/utils/text";
import { MaterialProps } from "../../../loan-list/materials/utils/material-fetch-hoc";
import { ReservationType } from "../../../../core/utils/types/reservation-type";
import LinkButton from "../../../../components/Buttons/LinkButton";

export interface ReservationDetailsRedirectProps {
  reservation: ReservationType;
  openReservationDeleteModal: (deleteReservation: ReservationType) => void;
  reservationId: string;
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
      <button
        type="button"
        onClick={() => openReservationDeleteModal(reservation)}
        className={`link-tag cursor-pointer ${linkClassNames}`}
      >
        {t("reservationDetailsRemoveDigitalReservationText")}
      </button>
      <LinkButton
        size="small"
        url={externalLink}
        variant="filled"
        id="go-to-ereolen-button"
      >
        {t("reservationDetailsDigitalReservationGoToEreolenText")}
        <img src={ExternalLinkIcon} className="btn-icon invert" alt="" />
      </LinkButton>
    </div>
  );
};

export default ReservationDetailsRedirect;

import React, { FC } from "react";
import ExternalLinkIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/buttons/icon-btn-external-link.svg";
import { Link } from "../../../../components/atoms/link";
import { useText } from "../../../../core/utils/text";
import { MaterialProps } from "../../../loan-list/materials/utils/material-fetch-hoc";
import { useUrls } from "../../../../core/utils/url";
import { ReservationType } from "../../../../core/utils/types/reservation-type";

export interface ReservationDetailsRedirectProps {
  reservation: ReservationType;
  openReservationDeleteModal: (deleteReservation: ReservationType) => void;
  reservationId: string;
  className?: string;
  linkClassNames?: string;
}

const ReservationDetailsRedirect: FC<
  ReservationDetailsRedirectProps & MaterialProps
> = ({
  reservation,
  openReservationDeleteModal,
  className,
  linkClassNames
}) => {
  const t = useText();
  const { ereolenMyPageUrl } = useUrls();

  return (
    <div className={`modal-details__buttons ${className}`}>
      <button
        type="button"
        onClick={() => openReservationDeleteModal(reservation)}
        className={`link-tag ${linkClassNames}`}
      >
        {t("reservationDetailsRemoveDigitalReservationText")}
      </button>
      <Link
        href={new URL(ereolenMyPageUrl)}
        className="btn-primary btn-filled btn-small arrow__hover--right-small"
        id="go-to-ereolen-button"
      >
        {t("reservationDetailsDigitalReservationGoToEreolenText")}
        <img src={ExternalLinkIcon} className="btn-icon invert" alt="" />
      </Link>
    </div>
  );
};

export default ReservationDetailsRedirect;

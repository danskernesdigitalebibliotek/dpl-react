import React, { useCallback, FC } from "react";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import fetchDigitalMaterial from "../../loan-list/materials/utils/digital-material-fetch-hoc";
import MaterialInfo from "../../loan-list/materials/stackable-material/material-info";
import ReservationInfo from "./reservation-info";

export interface ReservationMaterialProps {
  reservation: ReservationType;
  openReservationDetailsModal: (reservation: ReservationType) => void;
}

const ReservationMaterial: FC<ReservationMaterialProps & MaterialProps> = ({
  material,
  reservation,
  openReservationDetailsModal
}) => {
  const openDetailsModal = useCallback(() => {
    openReservationDetailsModal(reservation);
  }, [openReservationDetailsModal, reservation]);

  return (
    <li>
      <div className="list-reservation my-32">
        {material && (
          <MaterialInfo
            openDetailsModal={openDetailsModal}
            periodical={reservation.periodical}
            material={material}
            isbnForCover={reservation.identifier || ""}
          />
        )}
        <ReservationInfo reservationInfo={reservation} />
      </div>
    </li>
  );
};

export default fetchDigitalMaterial(fetchMaterial(ReservationMaterial));

import React, { FC } from "react";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import fetchDigitalMaterial from "../../loan-list/materials/utils/digital-material-fetch-hoc";
import MaterialInfo from "../../loan-list/materials/stackable-material/material-info";
import ReservationInfo from "./reservation-info";

export interface ReservationMaterialProps {
  reservation: ReservationType;
  focused: boolean;
  openReservationDetailsModal: (reservation: ReservationType) => void;
}

const ReservationMaterial: FC<ReservationMaterialProps & MaterialProps> = ({
  material,
  reservation,
  focused,
  openReservationDetailsModal
}) => {
  const openDetailsModal = () => {
    openReservationDetailsModal(reservation);
  };

  return (
    <li>
      <div
        className="list-reservation my-32 cursor-pointer"
        role="button"
        onClick={() => openDetailsModal()}
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.key === "Space") {
            openDetailsModal();
          }
        }}
        tabIndex={0}
      >
        {material && (
          <MaterialInfo
            arrowLabelledBy={`${
              reservation.identifier || reservation.faust
            }-title`}
            focused={focused}
            openDetailsModal={openDetailsModal}
            periodical={reservation.periodical}
            material={material}
            isbnForCover={reservation.identifier || ""}
          />
        )}
        <ReservationInfo
          reservationInfo={reservation}
          openReservationDetailsModal={openReservationDetailsModal}
        />
      </div>
    </li>
  );
};

export default fetchDigitalMaterial(fetchMaterial(ReservationMaterial));

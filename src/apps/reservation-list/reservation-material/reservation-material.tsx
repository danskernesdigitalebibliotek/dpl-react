import React, { useCallback, FC, MouseEvent } from "react";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import ReservationInfo from "./reservation-info";
import fetchDigitalMaterial from "../../loan-list/materials/utils/digital-material-fetch-hoc";
import MaterialInfo from "../../loan-list/materials/stackable-material/material-info";
import MaterialDetailsModal from "../../loan-list/modal/material-details-modal";
import ReservationDetails from "../modal/reservation-details/reservation-details";
import { useModalButtonHandler } from "../../../core/utils/modal";

export interface ReservationMaterialProps {
  reservation: ReservationType;
}

const ReservationMaterial: FC<ReservationMaterialProps & MaterialProps> = ({
  material,
  reservation
}) => {
  const { open } = useModalButtonHandler();
  const { faust, identifier } = reservation;

  const openDetailsModal = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      open(faust || identifier || "");
    },
    [faust, identifier, open]
  );

  return (
    <li>
      <button
        type="button"
        onClick={(e) => openDetailsModal(e)}
        className="list-reservation my-32"
      >
        {material && (
          <MaterialInfo
            material={material}
            isbnForCover={reservation.identifier || ""}
          />
        )}
        <ReservationInfo reservationInfo={reservation} />
      </button>
      <MaterialDetailsModal modalEntity={reservation} material={material}>
        <ReservationDetails
          faust={reservation.faust}
          identifier={reservation.identifier}
          reservation={reservation}
        />
      </MaterialDetailsModal>
    </li>
  );
};

export default fetchDigitalMaterial(fetchMaterial(ReservationMaterial));

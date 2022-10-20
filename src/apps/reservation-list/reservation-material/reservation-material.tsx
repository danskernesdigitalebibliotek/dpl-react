import React, { useCallback, FC, MouseEvent } from "react";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import ReservationInfo from "./reservation-info";
import fetchDigitalMaterial from "../../loan-list/materials/utils/digital-material-fetch-hoc";
import MaterialInfo from "../../loan-list/materials/stackable-material/material-info";

export interface ReservationMaterialProps {
  reservation: ReservationType;
}

const ReservationMaterial: FC<ReservationMaterialProps & MaterialProps> = ({
  material,
  reservation
}) => {
  const openDetailsModal = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    // Todo
  }, []);

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
    </li>
  );
};

export default fetchDigitalMaterial(fetchMaterial(ReservationMaterial));

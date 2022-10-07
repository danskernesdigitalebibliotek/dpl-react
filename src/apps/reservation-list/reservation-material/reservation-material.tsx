import React, { useEffect, useCallback, FC, MouseEvent } from "react";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import ReservationInfo from "./reservation-info";
import fetchDigitalMaterial from "../../loan-list/materials/utils/digital-material-fetch-hoc";
import MaterialInfo from "../../loan-list/materials/stackable-material/material-info";
import MaterialDetailsModal from "../../loan-list/modal/material-details-modal";
import ReservationDetails from "../modal/reservation-details";
import { useModalButtonHandler } from "../../../core/utils/modal";

export interface ReservationMaterialProps {
  reservation: ReservationType;
}

const ReservationMaterial: FC<ReservationMaterialProps & MaterialProps> = ({
  material,
  reservation
}) => {
  const { open } = useModalButtonHandler();

  function stopPropagationFunction(e: Event | MouseEvent) {
    e.stopPropagation();
  }

  const { faust, identifier } = reservation;

  useEffect(() => {
    document
      .querySelector(".list-reservation a")
      ?.addEventListener("click", stopPropagationFunction, true);

    return () => {
      document
        .querySelector(".list-reservation a")
        ?.removeEventListener("click", stopPropagationFunction, true);
    };
  }, []);

  const openDetailsModal = useCallback(
    (e: MouseEvent) => {
      stopPropagationFunction(e);
      open(faust || identifier || "");
    },
    [faust, identifier, open]
  );

  return (
    <div>
      {reservation && (
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
      )}
      <MaterialDetailsModal modalEntity={reservation} material={material}>
        <ReservationDetails
          faust={reservation.faust}
          identifier={reservation.identifier}
          reservation={reservation}
        />
      </MaterialDetailsModal>
    </div>
  );
};

export default fetchDigitalMaterial(fetchMaterial(ReservationMaterial));

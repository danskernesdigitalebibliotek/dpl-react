import React, { useEffect, useCallback, FC, MouseEvent } from "react";
import fetchMaterial, { MaterialProps } from "../utils/material-fetch-hoc";
import MaterialInfo from "./material-info";
import { MetaDataType } from "../../../../core/utils/types/meta-data-type";
import { ReservationMetaDataType } from "../../../../core/utils/types/reservation-meta-data-type";
import ReservationInfo from "./reservation-info";

export interface ReservationMaterialProps {
  loanMetaData: MetaDataType<ReservationMetaDataType>;
}

const ReservationMaterial: FC<ReservationMaterialProps & MaterialProps> = ({
  material,
  loanMetaData
}) => {
  function stopPropagationFunction(e: Event | MouseEvent) {
    e.stopPropagation();
  }
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

  const openDetailsModal = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    // Todo
  }, []);

  return (
    <div>
      {loanMetaData.reservationSpecific && (
        <button
          type="button"
          onClick={(e) => openDetailsModal(e)}
          className="list-reservation my-32"
        >
          <MaterialInfo material={material} loanMetaData={loanMetaData} />
          <ReservationInfo
            state={loanMetaData.reservationSpecific.state}
            expiryDate={loanMetaData.reservationSpecific.expiryDate}
            pickupDeadline={loanMetaData.reservationSpecific.pickupDeadline}
            pickupBranch={loanMetaData.reservationSpecific.pickupBranch}
            numberInQueue={loanMetaData.reservationSpecific.numberInQueue}
          />
        </button>
      )}
    </div>
  );
};

export default fetchMaterial(ReservationMaterial);

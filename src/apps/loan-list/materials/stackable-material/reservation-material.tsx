import React, { useEffect, useCallback, FC, MouseEvent } from "react";
import {
  FetchMaterial,
  ReservationMaterialProps,
  MaterialProps
} from "../../apps/loan-list/materials/utils/material-fetch-hoc";

import MaterialInfo from "./material-info";

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
    <button
      type="button"
      onClick={(e) => openDetailsModal(e)}
      className="list-reservation my-32"
    >
      <MaterialInfo loanMetaData={loanMetaData} material={material} />
    </button>
  );
};

export default FetchMaterial(ReservationMaterial);

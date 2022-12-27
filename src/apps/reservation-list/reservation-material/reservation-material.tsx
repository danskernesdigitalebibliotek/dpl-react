import React, { useCallback, FC, MouseEvent } from "react";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import ReservationInfo from "./reservation-info";
import fetchDigitalMaterial from "../../loan-list/materials/utils/digital-material-fetch-hoc";
import MaterialInfo from "../../loan-list/materials/stackable-material/material-info";
import MaterialDetailsModal from "../../loan-list/modal/material-details-modal";
import { useModalButtonHandler } from "../../../core/utils/modal";
import { useConfig } from "../../../core/utils/config";
import { AgencyBranch } from "../../../core/fbs/model";
import { excludeBlacklistedBranches } from "../../../components/reservation/helper";
import ReservationDetails from "../modal/reservation-details/reservation-details";

export interface ReservationMaterialProps {
  reservation: ReservationType;
  openReservationDeleteModal: (
    digitalReservationId: string | null,
    physicalReservationId: number | null
  ) => void;
}

const ReservationMaterial: FC<ReservationMaterialProps & MaterialProps> = ({
  material,
  reservation,
  openReservationDeleteModal
}) => {
  const { open } = useModalButtonHandler();
  const config = useConfig();
  const { faust, identifier } = reservation;

  // Get library branches from config
  const inputBranches = config<AgencyBranch[]>("branchesConfig", {
    transformer: "jsonParse"
  });

  // Get the library branches where the user cannot pick up books at
  const blacklistBranches = config("blacklistedPickupBranchesConfig", {
    transformer: "stringToArray"
  });

  // Remove the branches where the user cannot pick up books from the library branches
  let branches = inputBranches;
  if (Array.isArray(blacklistBranches)) {
    branches = excludeBlacklistedBranches(inputBranches, blacklistBranches);
  }

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
            periodical={reservation.periodical}
            material={material}
            isbnForCover={reservation.identifier || ""}
          />
        )}
        <ReservationInfo branches={branches} reservationInfo={reservation} />
      </button>
      <MaterialDetailsModal
        modalId={reservation.faust || reservation.identifier || ""}
      >
        <ReservationDetails
          openReservationDeleteModal={openReservationDeleteModal}
          faust={reservation.faust}
          identifier={reservation.identifier}
          branches={branches}
          reservation={reservation}
        />
      </MaterialDetailsModal>
    </li>
  );
};

export default fetchDigitalMaterial(fetchMaterial(ReservationMaterial));

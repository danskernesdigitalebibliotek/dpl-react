import React, { FC } from "react";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import fetchDigitalMaterial from "../../loan-list/materials/utils/digital-material-fetch-hoc";
import MaterialInfo from "../../loan-list/materials/stackable-material/material-info";
import ReservationInfo from "./reservation-info";
import CardListItemSkeleton from "../../../components/card-item-list/card-list-item/card-list-item-skeleton";

export interface ReservationMaterialProps {
  reservation: ReservationType;
  focused: boolean;
  openReservationDetailsModal: (reservation: ReservationType) => void;
  identifier?: string | null;
}

const ReservationMaterial: FC<ReservationMaterialProps & MaterialProps> = ({
  material,
  reservation,
  focused,
  openReservationDetailsModal,
  identifier
}) => {
  const openDetailsModal = () => {
    openReservationDetailsModal(reservation);
  };
  const isDigital = !!identifier;

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
          isDigital={isDigital}
        />
      </div>
    </li>
  );
};

const ReservationMaterialSkeleton: FC = () => {
  return (
    <li>
      <div className="my-32">
        <CardListItemSkeleton />
      </div>
    </li>
  );
};

export default fetchDigitalMaterial(
  fetchMaterial(ReservationMaterial, ReservationMaterialSkeleton)
);

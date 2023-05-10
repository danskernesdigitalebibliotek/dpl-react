import React from "react";
import ReservationModal, {
  ReservationModalProps
} from "../../components/reservation/ReservationModal";
import FindOnShelfModal, {
  FindOnShelfModalProps
} from "../../components/find-on-shelf/FindOnShelfModal";
import { isAnonymous } from "../../core/utils/helpers/user";

export interface ReservationFindOnShelfModalsProps {
  isUserBlocked: boolean;
  reservationModalProps: ReservationModalProps;
  findOnShelfModalProps: FindOnShelfModalProps;
}

const ReservationFindOnShelfModals: React.FC<
  ReservationFindOnShelfModalsProps
> = ({
  isUserBlocked,
  reservationModalProps: { selectedManifestations, selectedPeriodical, work },
  findOnShelfModalProps: {
    manifestations,
    workTitles,
    authors,
    selectedPeriodical: periodicalFindOnShelf,
    setSelectedPeriodical
  }
}) => {
  return (
    <>
      {!isAnonymous() && !isUserBlocked && (
        <ReservationModal
          selectedManifestations={selectedManifestations}
          selectedPeriodical={selectedPeriodical}
          work={work}
          dataCy={
            selectedManifestations.length > 1
              ? "reservation-modal-parallel"
              : undefined
          }
        />
      )}
      <FindOnShelfModal
        manifestations={manifestations}
        workTitles={workTitles}
        authors={authors}
        selectedPeriodical={periodicalFindOnShelf}
        setSelectedPeriodical={setSelectedPeriodical}
      />
    </>
  );
};

export default ReservationFindOnShelfModals;

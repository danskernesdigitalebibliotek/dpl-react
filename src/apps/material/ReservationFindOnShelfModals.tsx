import React from "react";
import ReservationModal, {
  ReservationModalProps
} from "../../components/reservation/ReservationModal";
import FindOnShelfModal, {
  FindOnShelfModalProps
} from "../../components/find-on-shelf/FindOnShelfModal";
import { isAnonymous, isBlocked } from "../../core/utils/helpers/user";
import { PatronV5 } from "../../core/fbs/model";

export interface ReservationFindOnShelfModalsProps {
  patron: PatronV5 | undefined;
  reservationModalProps: ReservationModalProps;
  findOnShelfModalProps: FindOnShelfModalProps;
}

const ReservationFindOnShelfModals: React.FC<
  ReservationFindOnShelfModalsProps
> = ({
  patron,
  reservationModalProps: { selectedManifestations, selectedPeriodical, work },
  findOnShelfModalProps: {
    manifestations,
    workTitles,
    authors,
    selectedPeriodical: periodicalFindOnShelf,
    setSelectedPeriodical
  }
}) => {
  const isUserBlocked = !!(patron && isBlocked(patron));

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

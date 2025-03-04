import React from "react";
import ReservationModal from "../../components/reservation/ReservationModal";
import FindOnShelfModal from "../../components/find-on-shelf/FindOnShelfModal";
import { isAnonymous, isBlocked } from "../../core/utils/helpers/user";
import { PatronV5 } from "../../core/fbs/model";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { PeriodicalEdition } from "../../components/material/periodical/helper";
import { getManifestationTitle, getWorkTitle } from "./helper";
import { first } from "lodash";

export interface ReservationFindOnShelfModalsProps {
  patron: PatronV5 | undefined;
  manifestations: Manifestation[];
  selectedPeriodical: PeriodicalEdition | null;
  setSelectedPeriodical: React.Dispatch<
    React.SetStateAction<PeriodicalEdition | null>
  >;
  work: Work;
}

const ReservationFindOnShelfModals: React.FC<
  ReservationFindOnShelfModalsProps
> = ({
  patron,
  manifestations,
  selectedPeriodical,
  setSelectedPeriodical,
  work
}) => {
  const isUserBlocked = !!(patron && isBlocked(patron));
  const title =
    manifestations.length > 1
      ? getWorkTitle(work)
      : getManifestationTitle(first(manifestations)!);
  const authors =
    manifestations.length > 1 ? work.creators : manifestations[0].creators;

  return (
    <>
      {!isAnonymous() && !isUserBlocked && (
        <ReservationModal
          selectedManifestations={manifestations}
          selectedPeriodical={selectedPeriodical}
          work={work}
          dataCy={
            manifestations.length > 1 ? "reservation-modal-parallel" : undefined
          }
        />
      )}
      <FindOnShelfModal
        manifestations={manifestations}
        workTitle={title}
        authors={authors}
        selectedPeriodical={selectedPeriodical}
        setSelectedPeriodical={setSelectedPeriodical}
      />
    </>
  );
};

export default ReservationFindOnShelfModals;

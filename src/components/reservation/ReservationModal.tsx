import React from "react";
import { getAllPids, reservationModalId } from "../../apps/material/helper";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { WorkId } from "../../core/utils/types/ids";
import { PeriodicalEdition } from "../material/periodical/helper";
import { ReservationModalBody } from "./ReservationModalBody";

type ReservationModalProps = {
  selectedManifestations: Manifestation[];
  selectedPeriodical?: PeriodicalEdition | null;
  workId: WorkId;
  work: Work;
};

const ReservationModal = ({
  selectedManifestations,
  selectedPeriodical = null,
  workId,
  work
}: ReservationModalProps) => {
  const t = useText();
  const pids = getAllPids(selectedManifestations);
  const faustIds = pids.map((manifestationPid) =>
    convertPostIdToFaustId(manifestationPid)
  );

  // If this modal shows all manifestations per material type, differentiate the ID
  return (
    <Modal
      modalId={reservationModalId(faustIds)}
      screenReaderModalDescriptionText={t(
        "reservationModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("reservationModalCloseModalAriaLabelText")}
    >
      <ReservationModalBody
        selectedManifestations={selectedManifestations}
        selectedPeriodical={selectedPeriodical}
        workId={workId}
        work={work}
      />
    </Modal>
  );
};

export default ReservationModal;

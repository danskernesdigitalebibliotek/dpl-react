import React from "react";
import { reservationModalId } from "../../apps/material/helper";
import {
  convertPostIdsToFaustIds,
  getAllPids
} from "../../core/utils/helpers/general";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { PeriodicalEdition } from "../material/periodical/helper";
import { ReservationModalBody } from "./ReservationModalBody";

type ReservationModalProps = {
  selectedManifestations: Manifestation[];
  selectedPeriodical?: PeriodicalEdition | null;
  work: Work;
};

const ReservationModal = ({
  selectedManifestations,
  selectedPeriodical = null,
  work
}: ReservationModalProps) => {
  const t = useText();
  const pids = getAllPids(selectedManifestations);
  const faustIds = convertPostIdsToFaustIds(pids);

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
        work={work}
      />
    </Modal>
  );
};

export default ReservationModal;

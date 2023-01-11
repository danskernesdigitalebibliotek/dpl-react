import React from "react";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { FaustId, WorkId } from "../../core/utils/types/ids";
import { PeriodicalEdition } from "../material/periodical/helper";
import ReservationModalBody from "./ReservationModalBody";

export const reservationModalId = (faustId: FaustId) =>
  `reservation-modal-${faustId}`;

type ReservationModalProps = {
  selectedManifestations: Manifestation[];
  selectedPeriodical?: PeriodicalEdition | null;
  workId: WorkId;
  work: Work;
  isPerMaterialType?: boolean;
};

const ReservationModal = ({
  selectedManifestations,
  selectedPeriodical = null,
  workId,
  work,
  isPerMaterialType
}: ReservationModalProps) => {
  const t = useText();
  const { pid } = selectedManifestations[0];

  // If this modal shows all manifestations per material type, differentiate the ID
  return (
    <Modal
      modalId={`${reservationModalId(convertPostIdToFaustId(pid))}${
        isPerMaterialType ? "-main" : ""
      }`}
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

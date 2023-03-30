import React from "react";
import { reservationModalId } from "../../apps/material/helper";
import { getAllFaustIds } from "../../core/utils/helpers/general";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { PeriodicalEdition } from "../material/periodical/helper";
import { ReservationModalBody } from "./ReservationModalBody";

type ReservationModalProps = {
  selectedManifestations: Manifestation[];
  selectedPeriodical?: PeriodicalEdition | null;
  work: Work;
  dataCy?: string;
};

const ReservationModal = ({
  selectedManifestations,
  selectedPeriodical = null,
  work,
  dataCy
}: ReservationModalProps) => {
  const t = useText();
  const faustIds = getAllFaustIds(selectedManifestations);

  // If this modal shows all manifestations per material type, differentiate the ID
  return (
    <Modal
      modalId={reservationModalId(faustIds)}
      screenReaderModalDescriptionText={t(
        "reservationModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("reservationModalCloseModalAriaLabelText")}
      dataCy={dataCy || "reservation-modal"}
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

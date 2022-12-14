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
  mainManifestation: Manifestation;
  parallelManifestations?: Manifestation[];
  selectedPeriodical?: PeriodicalEdition | null;
  workId: WorkId;
  work: Work;
  isMainModal?: boolean;
};

const ReservationModal = ({
  mainManifestation,
  mainManifestation: { pid },
  parallelManifestations,
  selectedPeriodical = null,
  workId,
  work,
  isMainModal
}: ReservationModalProps) => {
  const t = useText();

  return (
    <Modal
      modalId={`${reservationModalId(convertPostIdToFaustId(pid))}${
        isMainModal ? "main" : ""
      }`}
      screenReaderModalDescriptionText={t(
        "reservationModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("reservationModalCloseModalAriaLabelText")}
    >
      <ReservationModalBody
        mainManifestation={mainManifestation}
        parallelManifestations={parallelManifestations}
        selectedPeriodical={selectedPeriodical}
        workId={workId}
        work={work}
        isMainModal={isMainModal}
      />
    </Modal>
  );
};

export default ReservationModal;

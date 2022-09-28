import React from "react";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { Manifestation } from "../../core/utils/types/entities";
import { FaustId } from "../../core/utils/types/ids";
import { GroupListItem } from "../material/MaterialPeriodicalSelect";
import ReservationModalBody from "./ReservationModalBody";

export const reservationModalId = (faustId: FaustId) =>
  `reservation-modal-${faustId}`;

type ReservationModalProps = {
  mainManifestation: Manifestation;
  parallelManifestations?: Manifestation[];
  periodicalSelect?: GroupListItem | null;
};

const ReservationModal = ({
  mainManifestation,
  mainManifestation: { pid },
  parallelManifestations,
  periodicalSelect
}: ReservationModalProps) => {
  const t = useText();
  return (
    <Modal
      modalId={reservationModalId(convertPostIdToFaustId(pid))}
      screenReaderModalDescriptionText={t(
        "reservationModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("reservationModalCloseModalAriaLabelText")}
    >
      <ReservationModalBody
        mainManifestation={mainManifestation}
        parallelManifestations={parallelManifestations}
        periodicalSelect={periodicalSelect}
      />
    </Modal>
  );
};

export default ReservationModal;

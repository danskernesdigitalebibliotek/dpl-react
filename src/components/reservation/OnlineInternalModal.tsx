import React from "react";
import { onlineInternalModalId } from "../../apps/material/helper";
import { getAllFaustIds } from "../../core/utils/helpers/general";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { Manifestation } from "../../core/utils/types/entities";
import OnlineInternalModalBody from "./OnlineInternalModalBody";

export type OnlineInternalModalProps = {
  selectedManifestations: Manifestation[];
  dataCy?: string;
};

const OnlineInternalModal = ({
  selectedManifestations,
  dataCy
}: OnlineInternalModalProps) => {
  const t = useText();
  const faustIds = getAllFaustIds(selectedManifestations);

  return (
    <Modal
      modalId={onlineInternalModalId(faustIds)}
      screenReaderModalDescriptionText={t(
        "onlineInternalModalScreenReaderDescriptionText"
      )}
      closeModalAriaLabelText={t("onlineInternalModalCloseAriaLabelText")}
      dataCy={dataCy || "online-internal-modal"}
      classNames="modal-cta"
    >
      <OnlineInternalModalBody
        selectedManifestations={selectedManifestations}
      />
    </Modal>
  );
};

export default OnlineInternalModal;

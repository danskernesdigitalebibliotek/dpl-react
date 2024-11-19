import React from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import Reader from "../../reader-player/Reader";

type ReaderModalType = {
  identifier: string;
};

const ReaderModal = ({ identifier }: ReaderModalType) => {
  const t = useText();
  return (
    <Modal
      isFullScreen
      modalId={`reader-modal-${identifier}`}
      screenReaderModalDescriptionText={t("readerModalDescriptionText")}
      dataCy="reader-modal"
      // We don't want to show the close button in the reader modal
      // as it's already present in the reader itself.
      closeModalAriaLabelText=""
    >
      <Reader identifier={identifier} />
    </Modal>
  );
};

export default ReaderModal;

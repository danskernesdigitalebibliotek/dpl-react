import * as React from "react";
import { FC, ReactNode } from "react";
import Modal from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";

export interface StillInQueueModalProps {
  modalId?: string;
  children: ReactNode;
}

const StillInQueueModal: FC<StillInQueueModalProps> = ({
  modalId,
  children
}) => {
  const t = useText();

  if (!modalId) {
    return null;
  }
  return (
    <Modal
      modalId={modalId}
      classNames="modal-details"
      closeModalAriaLabelText={t("materialDetailsCloseModalAriaLabelText")}
      screenReaderModalDescriptionText={t(
        "materialDetailsModalAriaDescriptionText"
      )}
    >
      {children}
    </Modal>
  );
};

export default StillInQueueModal;

import React, { FC, ReactNode } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";

interface MaterialDetailsModalProps {
  modalId?: string;
  children: ReactNode;
}

const MaterialDetailsModal: FC<MaterialDetailsModalProps> = ({
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

export default MaterialDetailsModal;

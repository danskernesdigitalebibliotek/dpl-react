import * as React from "react";
import { FC, ReactNode } from "react";
import Modal from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";

export interface ReadyToLoanModalProps {
  modalId?: string;
  children: ReactNode;
}

const ReadyToLoanModal: FC<ReadyToLoanModalProps> = ({ modalId, children }) => {
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

export default ReadyToLoanModal;

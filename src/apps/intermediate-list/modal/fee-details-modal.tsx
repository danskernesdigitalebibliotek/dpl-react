import React, { FC, ReactNode } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { BasicDetailsType } from "../../../core/utils/types/basic-details-type";

interface FeeDetailsModalProps {
  faust: string;
  material: BasicDetailsType | undefined | null;
  children: ReactNode;
}

const FeeDetailsModal: FC<FeeDetailsModalProps> = ({ faust, children }) => {
  const t = useText();

  return (
    <Modal
      modalId={faust || ""}
      classNames="modal-details"
      closeModalAriaLabelText={t("FeeDetailsModalCloseModalAriaLabelText")}
      screenReaderModalDescriptionText={t("FeeDetailsModalDescriptionText")}
    >
      {children}
    </Modal>
  );
};

export default FeeDetailsModal;

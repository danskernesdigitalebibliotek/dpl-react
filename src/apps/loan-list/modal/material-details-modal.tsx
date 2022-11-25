import React, { FC, ReactNode } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { ListType } from "../../../core/utils/types/list-type";
import { BasicDetailsType } from "../../../core/utils/types/basic-details-type";

interface MaterialDetailsModalProps {
  material: BasicDetailsType | undefined | null;
  modalEntity: ListType;
  children: ReactNode;
}

const MaterialDetailsModal: FC<MaterialDetailsModalProps> = ({
  modalEntity,
  children
}) => {
  const t = useText();

  return (
    <Modal
      modalId={modalEntity.faust || modalEntity.identifier || ""}
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

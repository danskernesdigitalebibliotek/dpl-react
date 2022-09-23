import React, { FC } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import MaterialDetails from "./material-details";
import { LoanMetaDataType } from "../../../core/utils/types/loan-meta-data-type";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";
import { ReservationMetaDataType } from "../../../core/utils/types/reservation-meta-data-type";
import { BasicDetailsType } from "../../../core/utils/types/basic-details-type";

interface MaterialDetailsModalProps {
  material: BasicDetailsType | undefined | null;
  loanMetaData: MetaDataType<LoanMetaDataType | ReservationMetaDataType>;
}

const MaterialDetailsModal: FC<MaterialDetailsModalProps> = ({
  loanMetaData
}) => {
  const t = useText();

  return (
    <Modal
      modalId={loanMetaData.id}
      classNames="modal-details"
      closeModalAriaLabelText={t("materialDetailsCloseModalText")}
      screenReaderModalDescriptionText={t(
        "materialDetailsModalDescriptionText"
      )}
    >
      <MaterialDetails
        id={loanMetaData.id}
        type={loanMetaData.type}
        loanMetaData={loanMetaData}
      />
    </Modal>
  );
};

export default MaterialDetailsModal;

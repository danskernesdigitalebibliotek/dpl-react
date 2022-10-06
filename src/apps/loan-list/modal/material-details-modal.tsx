import React, { FC } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import MaterialDetails from "./material-details";
import { LoanType } from "../../../core/utils/types/loan-type";
import { BasicDetailsType } from "../../../core/utils/types/basic-details-type";

interface MaterialDetailsModalProps {
  material: BasicDetailsType | undefined | null;
  loan: LoanType;
}

const MaterialDetailsModal: FC<MaterialDetailsModalProps> = ({ loan }) => {
  const t = useText();

  return (
    <Modal
      modalId={loan.faust || loan.identifier || ""}
      classNames="modal-details"
      closeModalAriaLabelText={t("materialDetailsCloseModalText")}
      screenReaderModalDescriptionText={t(
        "materialDetailsModalDescriptionText"
      )}
    >
      <MaterialDetails
        faust={loan.faust}
        identifier={loan.identifier}
        loan={loan}
      />
    </Modal>
  );
};

export default MaterialDetailsModal;

import React, { FC } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import MaterialDetails from "./material-details";
import { LoanMetaDataType } from "../../../core/utils/types/loan-meta-data-type";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";
import { ReservationMetaDataType } from "../../../core/utils/types/reservation-meta-data-type";

interface MaterialDetailsModalProps {
  material: GetMaterialManifestationQuery | undefined | null;
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
      <MaterialDetails id={loanMetaData.id} loanMetaData={loanMetaData} />
    </Modal>
  );
};

export default MaterialDetailsModal;

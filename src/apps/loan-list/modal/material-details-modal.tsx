import React, { FC } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import MaterialDetails from "./material-details";
import { LoanMetaDataType } from "../../../core/utils/helpers/LoanMetaDataType";

interface MaterialDetailsModalProps {
  material: GetMaterialManifestationQuery | undefined | null;
  loanMetaData: LoanMetaDataType;
}

const MaterialDetailsModal: FC<MaterialDetailsModalProps> = ({
  loanMetaData
}) => {
  const t = useText();

  return (
    <Modal
      modalId={loanMetaData.id}
      additionalClasses="modal-details"
      closeModalAriaLabelText={t("materialDetailsCloseModalText")}
      screenReaderModalDescriptionText={t(
        "materialDetailsModalDescriptionText"
      )}
    >
      <MaterialDetails loanMetaData={loanMetaData} />
    </Modal>
  );
};

export default MaterialDetailsModal;

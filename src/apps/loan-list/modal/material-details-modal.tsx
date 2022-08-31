import React, { FC } from "react";
import { LoanDetailsV2 } from "../../../core/fbs/model";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import MaterialDetails from "./material-details";
import { FaustId } from "../../../core/utils/types/ids";

interface MaterialDetailsModalProps {
  material: GetMaterialManifestationQuery | undefined | null;
  loanDetails: LoanDetailsV2;
}

const MaterialDetailsModal: FC<MaterialDetailsModalProps> = ({
  loanDetails
}) => {
  const t = useText();

  const { recordId: faust } = loanDetails || {};

  return (
    <Modal
      modalId={faust}
      additionalClasses="modal-details"
      closeModalAriaLabelText={t("materialDetailsCloseModalText")}
      screenReaderModalDescriptionText={t(
        "materialDetailsModalDescriptionText"
      )}
    >
      <MaterialDetails faust={faust as FaustId} loanDetails={loanDetails} />
    </Modal>
  );
};

export default MaterialDetailsModal;

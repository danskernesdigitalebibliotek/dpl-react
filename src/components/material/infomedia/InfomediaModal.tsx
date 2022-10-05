import React from "react";
import { useGetInfomediaQuery } from "../../../core/dbc-gateway/generated/graphql";
import Modal from "../../../core/utils/modal";
import InfomediaModalBody from "./InfomediaModalBody";

interface InfomediaModalProps {
  infomediaId: string;
}

const InfomediaModal: React.FunctionComponent<InfomediaModalProps> = ({
  infomediaId
}) => {
  const { data, error } = useGetInfomediaQuery({
    id: infomediaId
  });

  if (!data || error) {
    return null;
  }

  return (
    <Modal
      modalId="infomediaModalId"
      screenReaderModalDescriptionText={t(
        "infomediaModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("infomediaModalCloseModalAriaLabelText")}
    >
      <InfomediaModalBody infomediaArticle={data.infomedia.article} />
    </Modal>
  );
};

export default InfomediaModal;

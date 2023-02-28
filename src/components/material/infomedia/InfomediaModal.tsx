import React from "react";
import { useGetInfomediaQuery } from "../../../core/dbc-gateway/generated/graphql";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { Pid } from "../../../core/utils/types/ids";
import InfomediaModalBody from "./InfomediaModalBody";
import { Manifestation } from "../../../core/utils/types/entities";

export const infomediaModalId = (pid: Pid) => `infomedia-modal-${pid}`;

interface InfomediaModalProps {
  selectedManifestations: Manifestation[];
  infoMediaId: string;
}

const InfomediaModal: React.FunctionComponent<InfomediaModalProps> = ({
  selectedManifestations,
  infoMediaId
}) => {
  const t = useText();

  const { data, error } = useGetInfomediaQuery({
    id: infoMediaId
  });

  if (!data || error) {
    return null;
  }

  const headline = data?.infomedia?.article?.headLine;
  const text = data?.infomedia?.article?.text;

  return (
    <Modal
      modalId={infomediaModalId(selectedManifestations[0].pid)}
      screenReaderModalDescriptionText={t(
        "infomediaModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("infomediaModalCloseModalAriaLabelText")}
      dataCy="infomedia-modal"
    >
      {headline && text && (
        <InfomediaModalBody headline={headline} text={text} />
      )}
    </Modal>
  );
};

export default InfomediaModal;

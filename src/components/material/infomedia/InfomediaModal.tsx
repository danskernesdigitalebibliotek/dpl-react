import React from "react";
import {
  InfomediaService,
  useGetInfomediaQuery
} from "../../../core/dbc-gateway/generated/graphql";
import { convertPostIdToFaustId } from "../../../core/utils/helpers/general";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { FaustId } from "../../../core/utils/types/ids";
import InfomediaModalBody from "./InfomediaModalBody";
import { Manifestation } from "../../../core/utils/types/entities";

export const infomediaModalId = (faustId: FaustId) =>
  `infomedia-modal-${faustId}`;

interface InfomediaModalProps {
  mainManifestation: Manifestation;
}

const InfomediaModal: React.FunctionComponent<InfomediaModalProps> = ({
  mainManifestation,
  mainManifestation: { pid }
}) => {
  const t = useText();

  const { id } = mainManifestation.access.find(
    (item) => item.__typename === "InfomediaService"
  ) as InfomediaService;

  const { data, error } = useGetInfomediaQuery({
    id
  });

  if (!data || error) {
    return null;
  }

  return (
    <Modal
      modalId={infomediaModalId(convertPostIdToFaustId(pid))}
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

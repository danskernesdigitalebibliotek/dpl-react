import React from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import Player, { PlayerType } from "../../reader-player/Player";
import { playerModalId } from "./helper";

const PlayerModal = ({ identifier, orderId }: PlayerType) => {
  const t = useText();

  return (
    <Modal
      dataCy="player-modal"
      // Todo: Find a better way to generate the modalId
      modalId={playerModalId(identifier || orderId || "")}
      screenReaderModalDescriptionText={t("playerModalDescriptionText")}
      closeModalAriaLabelText={t("playerModalCloseButtonText")}
    >
      <Player identifier={identifier} />
    </Modal>
  );
};

export default PlayerModal;

import React, { FC } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import Player, { PlayerType } from "../../reader-player/Player";
import { playerModalId } from "./helper";

const PlayerModal: FC<PlayerType> = ({ identifier, orderId }) => {
  const t = useText();

  if (orderId) {
    return (
      <Modal
        classNames="modal--center"
        dataCy="player-modal"
        modalId={playerModalId(orderId)}
        screenReaderModalDescriptionText={t("playerModalDescriptionText")}
        closeModalAriaLabelText={t("playerModalCloseButtonText")}
      >
        {/* <div>
          <a href="/">test</a>
        </div> */}
        <Player orderId={orderId} />
      </Modal>
    );
  }

  if (identifier) {
    return (
      <Modal
        classNames="modal--center"
        dataCy="player-modal"
        modalId={playerModalId(identifier)}
        screenReaderModalDescriptionText={t("playerModalDescriptionText")}
        closeModalAriaLabelText={t("playerModalCloseButtonText")}
      >
        {/* <div>
          <a href="/">test</a>
        </div> */}
        <Player identifier={identifier} />
      </Modal>
    );
  }

  return <p>Something went wrong</p>;
};

export default PlayerModal;

import React from "react";
import { ModalId } from "../../core/modal.slice";
import Modal, { useModalButtonHandler } from "../../core/utils/modal";
import { useText, withText } from "../../core/utils/text";

const DemoModal: React.FC = () => {
  const { open } = useModalButtonHandler();
  const t = useText();
  const modalIdOne = "demo-modal-one";
  const modalIdTwo = "demo-modal-two";

  const onClick = (modalId: ModalId) => () => {
    open(modalId);
  };

  return (
    <>
      <Modal
        modalId={modalIdTwo}
        screenReaderModalDescriptionText={t("screenReaderModalDescriptionText")}
        closeModalAriaLabelText={t("ariaLabelModalTwoText")}
      >
        <h1 id={`${modalIdTwo}-header`}>{modalIdTwo}</h1>
      </Modal>
      <Modal
        modalId={modalIdOne}
        screenReaderModalDescriptionText={t("screenReaderModalDescriptionText")}
        closeModalAriaLabelText={t("ariaLabelModalOneText")}
      >
        <h1 id={`${modalIdOne}-header`}>{modalIdOne}</h1>
        <button
          type="button"
          id={`${modalIdTwo}-button`}
          onClick={onClick(modalIdTwo)}
        >
          Show Modal 2
        </button>
      </Modal>
      <button
        type="button"
        id={`${modalIdOne}-button`}
        onClick={onClick(modalIdOne)}
      >
        Show Modal 1
      </button>
    </>
  );
};

export default withText(DemoModal);

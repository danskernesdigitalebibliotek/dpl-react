import * as React from "react";
import { useDispatch } from "react-redux";
import Modal from "../../core/utils/modal";
import { openModal } from "../../core/modal.slice";
import { useText, withText } from "../../core/utils/text";

const DemoModal: React.FC = () => {
  const dispatch = useDispatch();
  const t = useText();
  const modalIdOne = "demo-modal-one";
  const modalIdTwo = "demo-modal-two";

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
          onClick={() => {
            dispatch(openModal({ modalId: modalIdTwo }));
          }}
        >
          Show Modal 2
        </button>
      </Modal>
      <button
        type="button"
        id={`${modalIdOne}-button`}
        onClick={() => {
          dispatch(openModal({ modalId: modalIdOne }));
        }}
      >
        Show Modal 1
      </button>
    </>
  );
};

export default withText(DemoModal);

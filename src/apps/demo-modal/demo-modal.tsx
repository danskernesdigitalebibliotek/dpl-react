import * as React from "react";
import { useDispatch } from "react-redux";
import ModalWrapper from "../../components/modal/modal-wrapper";
import { openModal } from "../../core/modal.slice";

export interface DemoModalProps {
  ariaLabelModalOne: string;
  ariaLabelModalTwo: string;
  screenReaderModalDescriptionText: string;
}

const DemoModal: React.FC<DemoModalProps> = ({
  ariaLabelModalOne,
  ariaLabelModalTwo,
  screenReaderModalDescriptionText
}) => {
  const dispatch = useDispatch();
  const modalIdOne = "demo-modal-one";
  const modalIdTwo = "demo-modal-two";

  return (
    <>
      <ModalWrapper
        closeModalAriaLabelText={ariaLabelModalTwo}
        screenReaderModalDescriptionText={screenReaderModalDescriptionText}
        modalId={modalIdTwo}
      >
        <h1 id={`${modalIdTwo}-header`}>{modalIdTwo}</h1>
      </ModalWrapper>
      <ModalWrapper
        closeModalAriaLabelText={ariaLabelModalOne}
        screenReaderModalDescriptionText={screenReaderModalDescriptionText}
        modalId={modalIdOne}
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
      </ModalWrapper>
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

export default DemoModal;

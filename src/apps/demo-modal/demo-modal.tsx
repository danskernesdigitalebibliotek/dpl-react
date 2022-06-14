import * as React from "react";
import { useDispatch } from "react-redux";
import ModalWrapper from "../../components/modal/modal-wrapper";
import { openModal } from "../../core/modal.slice";

export interface DemoModalProps {
  ariaLabelModalOne: string;
  ariaLabelModalTwo: string;
}

const DemoModal: React.FC<DemoModalProps> = ({
  ariaLabelModalOne,
  ariaLabelModalTwo
}) => {
  const dispatch = useDispatch();
  const modalIdOne = "demo-modal-one";
  const modalIdTwo = "demo-modal-two";

  return (
    <>
      <ModalWrapper
        closeModalAriaLabel={ariaLabelModalTwo}
        modalId={modalIdTwo}
      >
        <h1>{modalIdTwo}</h1>
      </ModalWrapper>
      <ModalWrapper
        closeModalAriaLabel={ariaLabelModalOne}
        modalId={modalIdOne}
      >
        <h1>{modalIdOne}</h1>
        <button
          type="button"
          onClick={() => {
            dispatch(openModal({ modalId: modalIdTwo }));
          }}
        >
          Show Modal 2
        </button>
      </ModalWrapper>
      <button
        type="button"
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

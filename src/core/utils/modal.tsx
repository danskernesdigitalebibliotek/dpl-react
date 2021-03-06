import React, { ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/CloseLarge.svg";
import { closeModal, openModal } from "../modal.slice";
import { useText } from "./text";

type ModalProps = {
  children: ReactNode;
  modalId: string;
  closeModalAriaLabelText: string;
};

interface ModalIdsProps {
  modal: {
    modalIds: string[];
  };
}

function Modal({ modalId, closeModalAriaLabelText, children }: ModalProps) {
  const t = useText();
  const dispatch = useDispatch();
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    // Deep link stuff: if the id is in the url, open the modal
    if (searchParams.get(modalId)) {
      dispatch(openModal({ modalId }));
    }
    return () => {
      searchParams.delete(modalId);
    };
  }, [modalId, dispatch]);

  // Check if the modal should be open
  if (modalIds && !modalIds.includes(modalId)) {
    return null;
  }

  return (
    <div
      className="modal modal-cta modal-padding modal-show"
      style={{
        zIndex: modalIds.indexOf(modalId)
      }}
      role="dialog"
    >
      <div className="modal__screen-reader-description" id={`modal-${modalId}`}>
        {t("screenReaderModalDescriptionText")}
      </div>
      <button
        type="button"
        /* A focusable element in a modal must have focus when opened, 
        or else the screen reader will remain on the main page */
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        className="btn-ui modal-btn-close"
        aria-describedby={`modal-${modalId}`}
        style={{
          zIndex: modalIds.indexOf(modalId)
        }}
        aria-label={closeModalAriaLabelText}
        onClick={() => {
          dispatch(closeModal({ modalId }));
        }}
      >
        <img src={CloseIcon} alt="" />
        {/* alt="": Hidden from screen readers, because the aria-label is sufficient */}
      </button>
      <div className="modal-cta__container">{children}</div>
    </div>
  );
}

export default Modal;

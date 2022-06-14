import React, { ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/CloseLarge.svg";
import { closeModal, openModal } from "../../core/modal.slice";

type ModalWrapperProps = {
  children: ReactNode;
  modalId: string;
  closeModalAriaLabelText: string;
  screenReaderModalDescriptionText: string;
};

interface ModalIdsProps {
  modal: {
    modalIds: string[];
  };
}

function ModalWrapper({
  modalId,
  children,
  closeModalAriaLabelText,
  screenReaderModalDescriptionText
}: ModalWrapperProps) {
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
      aria-describedby={`modal-${modalId}`}
      role="dialog"
    >
      <div className="modal-screen-reader-description" id={`modal-${modalId}`}>
        {screenReaderModalDescriptionText}
      </div>
      <button
        type="button"
        /* I am not sure this is the best way, a focusable element in a modal must have focus when opened, 
        or else the screen reader will remain on the main page */
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        className="btn-ui modal-btn-close"
        style={{
          zIndex: modalIds.indexOf(modalId)
        }}
        aria-label={closeModalAriaLabelText}
        onClick={() => {
          dispatch(closeModal({ modalId }));
        }}
      >
        <img src={CloseIcon} alt="" />{" "}
        {/* alt="": Hidden from screen readers, because the aria-label is sufficient */}
      </button>
      <div className="modal-cta__container">{children}</div>
    </div>
  );
}

export default ModalWrapper;

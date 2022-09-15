import React, { ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/CloseLarge.svg";
import { closeModal, openModal } from "../modal.slice";

type ModalId = string;

type ModalProps = {
  children: ReactNode;
  modalId: ModalId;
  closeModalAriaLabelText: string;
  screenReaderModalDescriptionText: string;
  additionalClasses?: string;
};

export interface ModalIdsProps {
  modal: {
    modalIds: ModalId[];
  };
}

function Modal({
  modalId,
  closeModalAriaLabelText,
  children,
  screenReaderModalDescriptionText,
  additionalClasses
}: ModalProps) {
  const dispatch = useDispatch();
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    // Deep link stuff: if the id is in the url, open the modal
    if (searchParams.get("modal")?.includes(modalId)) {
      dispatch(openModal({ modalId }));
    }
  }, [modalId, dispatch]);

  // Check if the modal should be open
  if (modalIds && !modalIds.includes(modalId)) {
    return null;
  }

  return (
    <div
      className={`modal ${
        modalIds.includes(modalId) ? "modal-show" : ""
      } ${additionalClasses}`}
      style={{
        // some elements are designed with z-index which means they pop up over the modal
        // so I add 10 to the z-index of the modal
        // the index of the modalid is used, so the newest modal is always on top of
        // the remaining modals
        zIndex: modalIds.indexOf(modalId) + 10
      }}
      role="dialog"
    >
      <div className="modal__screen-reader-description" id={`modal-${modalId}`}>
        {screenReaderModalDescriptionText}
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
          // same as comment above
          zIndex: modalIds.indexOf(modalId) + 10
        }}
        aria-label={closeModalAriaLabelText}
        onClick={() => {
          dispatch(closeModal({ modalId }));
        }}
      >
        <img src={CloseIcon} alt="" />
        {/* alt="": Hidden from screen readers, because the aria-label is sufficient */}
      </button>
      {children}
    </div>
  );
}

export const useModalButtonHandler = () => {
  const dispatch = useDispatch();
  return {
    open: (modalId: ModalId) => {
      return dispatch(openModal({ modalId }));
    },
    close: (modalId: ModalId) => {
      return dispatch(closeModal({ modalId }));
    }
  };
};

export default Modal;

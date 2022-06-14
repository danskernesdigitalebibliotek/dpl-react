import React, { ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/CloseLarge.svg";
import { closeModal, openModal } from "../../core/modal.slice";

type ModalWrapperProps = {
  children: ReactNode;
  modalId: string;
  closeModalAriaLabel: string;
};

interface ModalIdsProps {
  modal: {
    modalIds: string[];
  };
}

function ModalWrapper({
  modalId,
  children,
  closeModalAriaLabel
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
  }, []);

  // Check if the modal should be open
  if (modalIds && !modalIds.includes(modalId)) {
    return null;
  }

  return (
    <div className="modal modal-cta modal-padding modal-show">
      <button
        type="button"
        className="btn-ui modal-btn-close"
        style={{
          zIndex: modalIds.indexOf(modalId)
        }}
        aria-label={closeModalAriaLabel}
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

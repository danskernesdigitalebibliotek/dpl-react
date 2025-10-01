import React, { ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/CloseLarge.svg";
import clsx from "clsx";
import { FocusTrap } from "focus-trap-react";
import {
  closeAllModals,
  closeModal,
  openModal,
  ModalOptions
} from "../modal.slice";
import { isAnonymous } from "./helpers/user";
import {
  currentLocationWithParametersUrl,
  redirectToLoginAndBack
} from "./helpers/url";
import { isEnterOrSpacePressed } from "./helpers/general";

type ModalId = string;

type ModalProps = {
  children: ReactNode;
  modalId: ModalId;
  closeModalAriaLabelText: string;
  screenReaderModalDescriptionText: string;
  classNames?: string;
  dataCy?: string;
  isSlider?: boolean;
  eventCallbacks?: {
    close?: () => void;
  };
};

export interface ModalIdsProps {
  modal: {
    modalIds: ModalId[];
  };
}

const MODAL_Z_INDEX = 400;

function Modal({
  modalId,
  closeModalAriaLabelText,
  children,
  screenReaderModalDescriptionText,
  classNames,
  isSlider,
  dataCy = "modal",
  eventCallbacks
}: ModalProps) {
  const dispatch = useDispatch();
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    // Deep link stuff: if the id is in the url, open the modal
    if (searchParams.get("modal")?.includes(modalId)) {
      dispatch(openModal({ modalId }));
    }
    // If modal parameter exists, but modal ID doesn't exist - remove it
    // from the URL and re-enable scrolling (disabled in modal.slice)
    // to prevent trying to open uninitialized modals
    if (
      searchParams.get("modal") &&
      !searchParams.get("modal")?.includes(modalId)
    ) {
      searchParams.delete("modal");
      window.history.replaceState(
        {},
        "",
        window.location.href.replace(`&modal=${searchParams.get("modal")}`, "")
      );
      document.body.style.overflow = "";
    }
  }, [modalId, dispatch]);

  // Check if the modal should be open
  if (modalIds && !modalIds.includes(modalId)) {
    return null;
  }

  const close = () => {
    if (eventCallbacks?.close) {
      eventCallbacks.close();
    }
    dispatch(closeModal({ modalId }));
  };

  const handleCloseKeyUp = (e: React.KeyboardEvent) => {
    if (isEnterOrSpacePressed(e.key)) {
      close();
    }
  };

  return (
    <FocusTrap
      focusTrapOptions={{
        // Set fallbackFocus to avoid focus trap errors.
        fallbackFocus: "body"
      }}
    >
      <div>
        <button
          className="modal-backdrop"
          aria-label={closeModalAriaLabelText}
          style={{
            // Some elements are designed with z-index which means they pop up over the modal
            // so we add 20 to the z-index of the modal (20 is the highest z-index - header).
            // The index of the modalid is used, so the newest modal is always on top of
            // the remaining modals
            zIndex: modalIds.indexOf(modalId) + MODAL_Z_INDEX
          }}
          onMouseUp={() => {
            close();
          }}
          onKeyUp={handleCloseKeyUp}
        />
        <div
          className={clsx(
            "modal",
            {
              "modal-show": modalIds.includes(modalId)
            },
            classNames
          )}
          role="dialog"
          aria-labelledby={`modal-${modalId}-description`}
          data-cy={dataCy}
          style={{
            // same as comment above
            zIndex: modalIds.indexOf(modalId) + MODAL_Z_INDEX + 1
          }}
        >
          <div
            className="modal__screen-reader-description"
            id={`modal-${modalId}-description`}
          >
            {screenReaderModalDescriptionText}
          </div>
          <button
            type="button"
            className={`btn-ui modal-btn-close ${
              !isSlider ? "modal-btn-close--offset" : ""
            }`}
            style={{
              // same as comment above
              zIndex: modalIds.indexOf(modalId) + MODAL_Z_INDEX
            }}
            aria-label={closeModalAriaLabelText}
            onMouseUp={() => {
              close();
            }}
            onKeyUp={handleCloseKeyUp}
            data-cy={`modal-${modalId}-close-button`}
          >
            <img src={CloseIcon} alt="" style={{ pointerEvents: "none" }} />
            {/* alt="": Hidden from screen readers, because the aria-label is sufficient */}
          </button>
          {children}
        </div>
      </div>
    </FocusTrap>
  );
}

export type GuardedOpenModalProps = {
  authUrl: URL;
  modalId: string;
  trackOnlineView?: () => Promise<unknown>;
  modalsToClose?: string[];
};

export const useModalButtonHandler = () => {
  const dispatch = useDispatch();
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);

  return {
    open: (modalId: ModalId, options?: ModalOptions) => {
      return dispatch(
        openModal({
          modalId,
          updateUrl: options?.updateUrl
        })
      );
    },
    close: (modalId: ModalId) => {
      return dispatch(closeModal({ modalId }));
    },
    closeAll: () => {
      return dispatch(closeAllModals());
    },
    openGuarded: ({
      authUrl,
      modalId,
      trackOnlineView,
      modalsToClose
    }: GuardedOpenModalProps) => {
      // Redirect anonymous users to the login platform, including a return link
      // to this page with an open modal.
      if (isAnonymous()) {
        const returnUrl = currentLocationWithParametersUrl({
          modal: modalId
        });
        redirectToLoginAndBack({
          authUrl,
          returnUrl,
          trackingFunction: trackOnlineView
        });
        return;
      }

      if (modalsToClose?.length) {
        modalsToClose.forEach((id) => {
          if (modalIds.includes(id)) {
            dispatch(closeModal({ modalId: id }));
          }
        });
      }

      if (trackOnlineView) {
        trackOnlineView();
      }

      dispatch(openModal({ modalId }));
    }
  };
};

export default Modal;

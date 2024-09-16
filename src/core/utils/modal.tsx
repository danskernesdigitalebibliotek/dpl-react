import React, { ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/CloseLarge.svg";
import clsx from "clsx";
import FocusTrap from "focus-trap-react";
import { closeAllModals, closeModal, openModal } from "../modal.slice";
import { isAnonymous } from "./helpers/user";
import {
  currentLocationWithParametersUrl,
  redirectToLoginAndBack
} from "./helpers/url";
import { isVitestEnvironment } from "./helpers/vitest";

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
  isFullScreen?: boolean;
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
  classNames,
  isSlider,
  dataCy = "modal",
  eventCallbacks,
  isFullScreen = false
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

  return (
    <FocusTrap
      focusTrapOptions={{
        // Set fallbackFocus when running vitest to avoid focus trap errors.
        fallbackFocus: isVitestEnvironment ? "body" : undefined
      }}
    >
      <div>
        {/* The backdrop doesn't have a role or keyboard listener because it barely duplicates
          the close button's functionality which possesses both. */}
        {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className="modal-backdrop"
          style={{
            // Some elements are designed with z-index which means they pop up over the modal
            // so we add 20 to the z-index of the modal (20 is the highest z-index - header).
            // The index of the modalid is used, so the newest modal is always on top of
            // the remaining modals
            zIndex: modalIds.indexOf(modalId) + 20
          }}
          onClick={() => {
            close();
          }}
        />
        {/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className={clsx(
            "modal",
            {
              "modal-show": modalIds.includes(modalId),
              "dpl-modal--full-screen": isFullScreen
            },
            classNames
          )}
          role="dialog"
          aria-labelledby={`modal-${modalId}-description`}
          data-cy={dataCy}
          style={{
            // same as comment above
            zIndex: modalIds.indexOf(modalId) + 21
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
              zIndex: modalIds.indexOf(modalId) + 20
            }}
            aria-label={closeModalAriaLabelText}
            onClick={() => {
              close();
            }}
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
};

export const useModalButtonHandler = () => {
  const dispatch = useDispatch();
  return {
    open: (modalId: ModalId) => {
      return dispatch(openModal({ modalId }));
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
      trackOnlineView
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
      // If user is not anonymous we just open the given modal + potentially track it.
      if (trackOnlineView) {
        trackOnlineView();
      }
      dispatch(openModal({ modalId }));
    }
  };
};

export default Modal;

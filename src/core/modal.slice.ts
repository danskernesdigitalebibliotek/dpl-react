import { createSlice } from "@reduxjs/toolkit";
import {
  appendQueryParametersToUrl,
  getCurrentLocation,
  removeQueryParametersFromUrl,
  setQueryParametersInUrl
} from "./utils/helpers/url";

export type ModalId = string;

export type ModalOptions = {
  updateUrl?: boolean;
};

interface PayloadProps {
  payload: {
    modalId: ModalId;
  } & ModalOptions;
}

interface StateProps {
  modalIds: string[];
}
const focusContainerArray: Element[] = [];
const storeFocusElement = (elementToStore?: Element) => {
  if (elementToStore) {
    return focusContainerArray.push(elementToStore);
  }
  return false;
};

const returnFocusElement = () => {
  const element = focusContainerArray.pop() as HTMLElement;
  if (element) {
    element.focus();
  }
  return element;
};

// Removes the 'modal' parameter from the browser's address bar.
// If state.modalIds is not empty, adds the last modal ID as the 'modal' parameter.
const removeModalIdFromUrl = (state: StateProps) => {
  if (state.modalIds && state.modalIds.length > 0) {
    const lastModalId = state.modalIds[state.modalIds.length - 1];
    setQueryParametersInUrl({
      modal: lastModalId
    });
  } else {
    removeQueryParametersFromUrl("modal");
  }
};

const modalSlice = createSlice({
  name: "modal",
  initialState: { modalIds: [] },
  reducers: {
    openModal(state: StateProps, action: PayloadProps) {
      // Disables background scrolling whilst the Modal is open
      if (typeof window !== "undefined" && window.document) {
        document.body.style.overflow = "hidden";
      }
      // If there is a modalid in the payload, and if this modalid is not saved
      // then save the modalid
      if (
        action.payload.modalId &&
        !state.modalIds.includes(action.payload.modalId)
      ) {
        state.modalIds.push(action.payload.modalId);
        const searchParams = new URLSearchParams(window.location.search);
        const alreadyOpenModals = searchParams.get("modal");
        if (
          alreadyOpenModals !== action.payload.modalId &&
          action.payload.updateUrl !== false
        ) {
          window.history.pushState(
            "",
            "",
            appendQueryParametersToUrl(new URL(getCurrentLocation()), {
              modal: `${alreadyOpenModals ?? ""}${action.payload.modalId}`
            })
          );
        }
      }
      const { activeElement } = document;
      // Prevent body from double triggering focus store when url contains modalId
      if (activeElement && activeElement.tagName !== "BODY") {
        storeFocusElement(activeElement);
      }
    },
    closeModal(state: StateProps, action: PayloadProps) {
      const modalId = state.modalIds.pop();
      // Check if the modalId from action payload exists in state.modalIds; if so, remove it:
      if (state.modalIds.indexOf(action.payload.modalId) > -1) {
        state.modalIds.splice(
          state.modalIds.indexOf(action.payload.modalId),
          1
        );
      }
      if (modalId) {
        removeModalIdFromUrl(state);
        returnFocusElement();
      }
      // Enables background scrolling to use when last modal is closed
      if (state.modalIds.length === 0) {
        document.body.style.overflow = "";
      }
    },
    closeLastModal(state: StateProps) {
      // Enables background scrolling to use when Modal is closed
      document.body.style.overflow = "";
      const modalId = state.modalIds.pop();
      if (modalId) {
        removeModalIdFromUrl(state);
        returnFocusElement();
      }
    },
    closeAllModals(state: StateProps) {
      // Enables background scrolling to use when Modal is closed
      document.body.style.overflow = "";
      state.modalIds = [];
      removeModalIdFromUrl(state);
      returnFocusElement();
    }
  }
});

export const { openModal, closeModal, closeLastModal, closeAllModals } =
  modalSlice.actions;

export default modalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export type ModalId = string;

interface PayloadProps {
  payload: {
    modalId: ModalId;
  };
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

const removeModalIdFromUrl = (state: StateProps) => {
  let newModalParam = "?";
  if (state.modalIds?.toString() !== "") {
    newModalParam = `?modal=${state.modalIds.toString()}`;
  }
  window.history.pushState("", "", newModalParam);
};

const modalSlice = createSlice({
  name: "modal",
  initialState: { modalIds: [] },
  reducers: {
    openModal(state: StateProps, action: PayloadProps) {
      // If there is a modalid in the payload, and if this modalid is not saved
      // then save the modalid
      if (
        action.payload.modalId &&
        !state.modalIds.includes(action.payload.modalId)
      ) {
        state.modalIds.push(action.payload.modalId);
        const searchParams = new URLSearchParams(window.location.search);
        const alreadyOpenModals = searchParams.get("modal");
        if (alreadyOpenModals !== action.payload.modalId) {
          window.history.pushState(
            "",
            "",
            `?modal=${alreadyOpenModals === null ? "" : alreadyOpenModals}${
              action.payload.modalId
            }`
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
      state.modalIds.splice(state.modalIds.indexOf(action.payload.modalId), 1);
      if (modalId) {
        removeModalIdFromUrl(state);
        returnFocusElement();
      }
    },
    closeLastModal(state: StateProps) {
      const modalId = state.modalIds.pop();
      if (modalId) {
        removeModalIdFromUrl(state);
        returnFocusElement();
      }
    }
  }
});

export const { openModal, closeModal, closeLastModal } = modalSlice.actions;

export default modalSlice.reducer;

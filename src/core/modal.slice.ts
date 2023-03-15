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

const removeModalIdFromUrl = (modalId: ModalId) => {
  const searchParams = new URLSearchParams(window.location.search);
  const newSearchParams = searchParams.get("modal")?.replace(modalId, "");
  searchParams.set("modal", newSearchParams || "");
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
        if (alreadyOpenModals) {
          searchParams.set(
            "modal",
            `${alreadyOpenModals}${action.payload.modalId}`
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
      state.modalIds.splice(state.modalIds.indexOf(action.payload.modalId), 1);
      removeModalIdFromUrl(action.payload.modalId);
      returnFocusElement();
    },
    closeLastModal(state: StateProps) {
      const modalId = state.modalIds.pop();
      if (modalId) {
        removeModalIdFromUrl(modalId);
        returnFocusElement();
      }
    }
  }
});

export const { openModal, closeModal, closeLastModal } = modalSlice.actions;

export default modalSlice.reducer;

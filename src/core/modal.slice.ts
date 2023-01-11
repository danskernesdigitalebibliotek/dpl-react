import { createSlice } from "@reduxjs/toolkit";
import { handleModalFocus } from "./utils/helpers/general";

export type ModalId = string;

interface PayloadProps {
  payload: {
    modalId: ModalId;
  };
}
interface StateProps {
  modalIds: string[];
}
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
      // prevent bubbling to body when pressing enter on buttons
      if (activeElement && activeElement.tagName !== "BODY") {
        handleModalFocus(activeElement);
      }
    },
    closeModal(state: StateProps, action: PayloadProps) {
      state.modalIds.splice(state.modalIds.indexOf(action.payload.modalId), 1);
      const searchParams = new URLSearchParams(window.location.search);
      const newSearchParams = searchParams
        .get("modal")
        ?.replace(action.payload.modalId, "");
      searchParams.set("modal", newSearchParams || "");
      handleModalFocus();
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

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
const modalSlice = createSlice({
  name: "modal",
  initialState: { modalIds: [] },
  reducers: {
    openModal(state: StateProps, action: PayloadProps) {
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
    },
    closeModal(state: StateProps, action: PayloadProps) {
      state.modalIds.splice(state.modalIds.indexOf(action.payload.modalId), 1);
      const searchParams = new URLSearchParams(window.location.search);
      const newSearchParams = searchParams
        .get("modal")
        ?.replace(action.payload.modalId, "");
      searchParams.set("modal", newSearchParams || "");
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

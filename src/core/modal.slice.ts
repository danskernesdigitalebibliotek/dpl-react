import { createSlice } from "@reduxjs/toolkit";

interface PayloadProps {
  payload: {
    modalId: string;
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
      if (!state.modalIds.includes(action.payload.modalId)) {
        state.modalIds.push(action.payload.modalId);
      }
    },
    closeModal(state: StateProps, action: PayloadProps) {
      state.modalIds.splice(state.modalIds.indexOf(action.payload.modalId), 1);
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

import { useSelector } from "react-redux";
import { ModalIdsProps } from "./modal";

export const useModalIdsToCloseForReservation = () => {
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);

  const modalsToClose = [
    ...modalIds.filter((id) => id.startsWith("reservation-modal-"))
  ];

  return modalsToClose;
};

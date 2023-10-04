import React, { useState, ChangeEvent } from "react";
import Dropdown from "../../Dropdown/Dropdown";
import Modal, { useModalButtonHandler } from "../../../core/utils/modal";
import { useText, UseTextFunction } from "../../../core/utils/text";
import { modalReservationFormId, ModalReservationFormTextType } from "./helper";
import ReservationForm from "./ReservationForm";
import { getReservationModalTypeTranslation } from "../helper";
import { RequestStatus } from "../../../core/utils/types/request";
import ModalMessage from "../../message/modal-message/ModalMessage";

export interface ModalReservationFormSelectProps {
  type: ModalReservationFormTextType;
  header: {
    title: string;
    description: string[];
  };
  items: { label: string; value: string }[];
  defaultSelectedItem: string;
  selectHandler: (value: string) => void;
  ariaLabel: string;
  saveCallback?: () => void;
  reservationStatus?: RequestStatus;
  setReservationStatus?: (status: RequestStatus) => void;
}

const modalProps = (
  type: ModalReservationFormTextType,
  t: UseTextFunction
) => ({
  modalId: modalReservationFormId(type),
  screenReaderModalDescriptionText: t(
    getReservationModalTypeTranslation(type, "screenReaderModalDescriptionText")
  ),
  closeModalAriaLabelText: t(
    getReservationModalTypeTranslation(type, "closeModalAriaLabelText")
  )
});

const ModalReservationFormSelect = ({
  type,
  header,
  items,
  defaultSelectedItem,
  selectHandler,
  ariaLabel,
  saveCallback,
  reservationStatus,
  setReservationStatus
}: ModalReservationFormSelectProps) => {
  const { close } = useModalButtonHandler();
  const t = useText();
  const [selectedItem, setSelectedItem] = useState<string>(defaultSelectedItem);

  const selectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedItem(value);
  };

  const onSubmit = () => {
    selectHandler(selectedItem);
    if (saveCallback) {
      saveCallback();
    } else {
      close(modalReservationFormId(type));
    }
  };

  const { modalId, screenReaderModalDescriptionText, closeModalAriaLabelText } =
    modalProps(type, t);

  return (
    <Modal
      modalId={modalId}
      screenReaderModalDescriptionText={screenReaderModalDescriptionText}
      closeModalAriaLabelText={closeModalAriaLabelText}
    >
      {reservationStatus === "success" && (
        <ModalMessage
          title={t("reservationSuccessTitleText")}
          subTitle={t("reservationSuccessSubTitleText")}
          ctaButton={{
            modalId: "pickup",
            text: t("reservationStatusButtonText"),
            callback: () => setReservationStatus && setReservationStatus("idle")
          }}
        />
      )}
      {reservationStatus === "error" && (
        <ModalMessage
          title={t("reservationerrorTitleText")}
          subTitle={t("reservationerrorSubTitleText")}
          ctaButton={{
            modalId: "pickup",
            text: t("reservationStatusButtonText"),
            callback: () => setReservationStatus && setReservationStatus("idle")
          }}
        />
      )}
      {(!reservationStatus ||
        reservationStatus === "idle" ||
        reservationStatus === "pending") && (
        <ReservationForm
          title={header.title}
          description={header.description}
          onSubmit={onSubmit}
          buttonLabel={
            reservationStatus === "pending" ? t("loadingText") : undefined
          }
        >
          <Dropdown
            options={items.map(({ label, value }) => ({
              label,
              value
            }))}
            ariaLabel={ariaLabel}
            arrowIcon="chevron"
            handleOnChange={selectChange}
            defaultValue={selectedItem}
            placeholder={{
              label: t("chooseOneText"),
              disabled: true,
              value: ""
            }}
            cyData="modal-reservation-form-select"
          />
        </ReservationForm>
      )}
    </Modal>
  );
};

export default ModalReservationFormSelect;

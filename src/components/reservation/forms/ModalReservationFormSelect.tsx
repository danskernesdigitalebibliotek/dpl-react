import React, { useState, ChangeEvent } from "react";
import Dropdown from "../../Dropdown/Dropdown";
import Modal, { useModalButtonHandler } from "../../../core/utils/modal";
import { useText, UseTextFunction } from "../../../core/utils/text";
import {
  modalReservationFormId,
  modalReservationFormSelectTypeIsInterestPeriod,
  ModalReservationFormTextType
} from "./helper";
import ReservationForm from "./ReservationForm";
import { getReservationModalTypeTranslation } from "../helper";
import { RequestStatus } from "../../../core/utils/types/request";
import ModalMessage from "../../message/modal-message/ModalMessage";
import { FormSelectValue } from "./types";

export interface ModalReservationFormSelectProps<
  TValue extends FormSelectValue
> {
  type: ModalReservationFormTextType;
  header: {
    title: string;
    description: string[];
  };
  items: { label: string; value: TValue }[];
  defaultSelectedItem: TValue;
  selectHandler: <TSelectValue extends FormSelectValue>(
    value: TSelectValue
  ) => void;
  ariaLabel: string;
  saveCallback?: <TSaveValue extends FormSelectValue>(
    value: TSaveValue
  ) => void;
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

const ModalReservationFormSelect = <TValue extends FormSelectValue>({
  type,
  header,
  items,
  defaultSelectedItem,
  selectHandler,
  ariaLabel,
  saveCallback,
  reservationStatus,
  setReservationStatus
}: ModalReservationFormSelectProps<TValue>) => {
  const { close } = useModalButtonHandler();
  const t = useText();
  const [selectedItem, setSelectedItem] = useState<TValue>(defaultSelectedItem);

  const selectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const typedValue = modalReservationFormSelectTypeIsInterestPeriod(type)
      ? Number(value)
      : value;
    setSelectedItem(typedValue as TValue);
  };

  const onSubmit = () => {
    selectHandler(selectedItem);
    if (saveCallback) {
      saveCallback(selectedItem);
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
      eventCallbacks={{
        close: () => {
          if (setReservationStatus) setReservationStatus("idle");
        }
      }}
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
          <Dropdown<TValue>
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

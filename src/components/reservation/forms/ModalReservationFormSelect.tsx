import React, { useState, ChangeEvent } from "react";
import Modal, { useModalButtonHandler } from "../../../core/utils/modal";
import { useText, UseTextFunction } from "../../../core/utils/text";
import { modalReservationFormId, ModalReservationFormTextType } from "./helper";
import ReservationForm from "./ReservationForm";
import Dropdown from "../../Dropdown/Dropdown";

export interface ModalReservationFormSelectProps {
  type: ModalReservationFormTextType;
  header: {
    title: string;
    description: string[];
  };
  items: { label: string; value: string }[];
  defaultSelectedItem: string;
  selectHandler: (value: string) => void;
}

const modalProps = (
  type: ModalReservationFormTextType,
  t: UseTextFunction
) => ({
  modalId: modalReservationFormId(type),
  screenReaderModalDescriptionText: t(
    `screenReaderModalDescription${type.toUpperCase()}Text`
  ),
  closeModalAriaLabelText: t(`closeModalAriaLabel${type.toUpperCase()}Text`)
});

const ModalReservationFormSelect = ({
  type,
  header,
  items,
  defaultSelectedItem,
  selectHandler
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
    close(modalReservationFormId(type));
  };

  const { modalId, screenReaderModalDescriptionText, closeModalAriaLabelText } =
    modalProps(type, t);

  return (
    <Modal
      modalId={modalId}
      screenReaderModalDescriptionText={screenReaderModalDescriptionText}
      closeModalAriaLabelText={closeModalAriaLabelText}
    >
      <ReservationForm
        title={header.title}
        description={header.description}
        onSubmit={onSubmit}
      >
        <Dropdown
          list={items.map(({ label, value }) => ({
            label,
            value
          }))}
          ariaLabel=""
          arrowIcon="chevron"
          handleOnChange={selectChange}
          defaultValue={selectedItem}
          placeholder={{ label: t("chooseOneText"), disabled: true }}
        />
      </ReservationForm>
    </Modal>
  );
};

export default ModalReservationFormSelect;

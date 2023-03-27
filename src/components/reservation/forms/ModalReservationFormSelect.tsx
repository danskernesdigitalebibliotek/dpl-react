import React, { useState, ChangeEvent } from "react";
import { upperFirst } from "lodash";
import Dropdown from "../../Dropdown/Dropdown";
import Modal, { useModalButtonHandler } from "../../../core/utils/modal";
import { useText, UseTextFunction } from "../../../core/utils/text";
import { modalReservationFormId, ModalReservationFormTextType } from "./helper";
import ReservationForm from "./ReservationForm";

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
    `screenReaderModalDescription${upperFirst(type)}Text`
  ),
  closeModalAriaLabelText: t(`closeModalAriaLabel${upperFirst(type)}Text`)
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
          options={items.map(({ label, value }) => ({
            label,
            value
          }))}
          ariaLabel=""
          arrowIcon="chevron"
          handleOnChange={selectChange}
          defaultValue={selectedItem}
          placeholder={{ label: t("chooseOneText"), disabled: true, value: "" }}
        />
      </ReservationForm>
    </Modal>
  );
};

export default ModalReservationFormSelect;

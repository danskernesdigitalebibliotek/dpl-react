import React, { useState, ChangeEvent } from "react";
import ExpandMore from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { AgencyBranch } from "../../../core/fbs/model";
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
  items: AgencyBranch[];
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
        <div className="dropdown">
          <select
            className="dropdown__select"
            onChange={selectChange}
            defaultValue={selectedItem}
          >
            <option className="dropdown__option" selected disabled>
              Choose one
            </option>
            {items.map(({ title, branchId }) => (
              <option className="dropdown__option" value={branchId}>
                {title}
              </option>
            ))}
          </select>
          <div className="dropdown__arrows">
            <img className="dropdown__arrow" src={ExpandMore} alt="" />
          </div>
        </div>
      </ReservationForm>
    </Modal>
  );
};

export default ModalReservationFormSelect;

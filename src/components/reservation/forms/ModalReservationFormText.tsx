import { isEqual } from "lodash";
import React, { memo, useState } from "react";
import { stringifyValue } from "../../../core/utils/helpers/general";
import Modal, { useModalButtonHandler } from "../../../core/utils/modal";
import { useText, UseTextFunction } from "../../../core/utils/text";
import { getInputType, getReservationModalTypeTranslation } from "../helper";
import {
  modalReservationFormId,
  ModalReservationFormTextType,
  saveText
} from "./helper";
import ReservationForm from "./ReservationForm";
import useSavePatron from "../../../core/utils/useSavePatron";
import TextInput from "../../forms/input/TextInput";
import { Patron } from "../../../core/utils/types/entities";

export interface ModalReservationFormTextProps {
  type: ModalReservationFormTextType;
  defaultText?: string;
  header: {
    title: string;
    description: string[];
  };
  inputField: {
    description: string;
    label: string;
  };
  patron: Patron;
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

const ModalReservationFormText = ({
  type,
  defaultText,
  header,
  inputField,
  patron
}: ModalReservationFormTextProps) => {
  const { close } = useModalButtonHandler();
  const t = useText();
  const [text, setText] = useState<string>(stringifyValue(defaultText));
  const { savePatron } = useSavePatron({
    patron,
    fetchHandlers: {
      savePatron: {
        onSuccess: () => {
          close(modalReservationFormId(type));
        },
        // If an error occurred make sure to reset the text to the old value.
        onError: () => {
          setText(stringifyValue(defaultText));
          close(modalReservationFormId(type));
        }
      }
    }
  });
  const onChange = (input: string) => {
    setText(input);
  };
  const onSubmit = () => {
    saveText({
      type,
      changedText: text,
      savedText: defaultText,
      patron,
      savePatron
    });
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
        <TextInput
          id={type}
          label={inputField.label}
          type={getInputType(type)}
          onChange={onChange}
          value={text}
        />
      </ReservationForm>
    </Modal>
  );
};

export default memo(ModalReservationFormText, isEqual);

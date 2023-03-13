import { isEqual } from "lodash";
import React, { memo, useState } from "react";
import { useQueryClient } from "react-query";
import {
  getGetPatronInformationByPatronIdV2QueryKey,
  useUpdateV5
} from "../../../core/fbs/fbs";
import { PatronV5 } from "../../../core/fbs/model";
import { stringifyValue } from "../../../core/utils/helpers/general";
import Modal, { useModalButtonHandler } from "../../../core/utils/modal";
import { useText, UseTextFunction } from "../../../core/utils/text";
import TextInput from "../../atoms/input/TextInput";
import {
  modalReservationFormId,
  ModalReservationFormTextType,
  saveText
} from "./helper";
import ReservationForm from "./ReservationForm";

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
  patron: PatronV5;
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

const ModalReservationFormText = ({
  type,
  defaultText,
  header,
  inputField,
  patron
}: ModalReservationFormTextProps) => {
  const { close } = useModalButtonHandler();
  const queryClient = useQueryClient();
  const t = useText();
  const [text, setText] = useState<string>(stringifyValue(defaultText));
  const { mutate } = useUpdateV5();

  const onChange = (input: string) => {
    setText(input);
  };

  const onSubmit = () => {
    saveText({
      type,
      changedText: text,
      savedText: defaultText,
      patron,
      mutate
    })
      .then((response) => {
        // If we succeeded in saving we can cache the new data.
        if (response) {
          queryClient.setQueryData(
            getGetPatronInformationByPatronIdV2QueryKey(),
            response
          );
        }
      })
      .catch((e) => {
        // If an error ocurred make sure to reset the text to the old value.
        setText(stringifyValue(defaultText));
        throw e;
      })
      .finally(() => {
        // Close modal no matter what.
        close(modalReservationFormId(type));
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
          description={inputField.description}
          id={type}
          label={inputField.label}
          type="text"
          onChange={onChange}
          value={text}
        />
      </ReservationForm>
    </Modal>
  );
};

export default memo(ModalReservationFormText, isEqual);
